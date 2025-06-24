// SPDX-License-Identifier: MIT

// This is currently the most ideated iterated version

// Layout of Contract:
// version
// imports
// interfaces, libraries, contracts
// errors
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions

pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A Digital Will Contract with a Challenge Period Verification Method
 * @author Anand
 * @notice This contract uses a challenge period with economic incentives to verify a will.
 * It is designed to be paired with an off-chain oracle for dispute resolution.
 * @dev The will's sensitive details are stored off-chain. This contract only manages the verification trigger.
 */
contract Will is Ownable {
    
    ///////////////////////// ERRORS //////////////////////////////////////
    error Will_WillAlreadyCreated();
    error Will_WillDoesNotExist();
    error Will_NotABeneficiary();
    error Will_VerificationAlreadyInProgressOrCompleted();
    error Will_VerificationNotInCorrectState(Status currentStatus);
    error Will_ChallengePeriodNotOver();
    error Will_ChallengePeriodOver();
    error Will_IncorrectBondAmount();
    error Will_AlreadyChallenged();
    error Will_NoActiveChallenge();
    error Will_TransferFailed();

    ///////////////////////// TYPE DECLARATIONS /////////////////////////////
    enum Status {
        NotStarted,
        ChallengePeriodActive,
        PendingResolution,
        Verified,
        Slashed
    }

    struct ChallengeInfo {
        address initiator;
        uint256 initiatorBond;
        uint256 endTime;
        mapping(address => uint256) challengers;
        address[] challengerList;
        uint256 totalChallengeBond;
    }

    ////////////////////////// CONSTANTS ////////////////////////////////////


    uint256 public constant MIN_INITIATOR_BOND = 0.1 ether;
    uint256 public constant MIN_CHALLENGE_BOND = 0.01 ether;
    uint256 public constant CHALLENGE_DURATION = 10 days;
    uint256 public constant CONTRACT_FEE = 0.01 ether;

    //////////////////////// STATE VARIABLES ///////////////////////////////

    mapping(address => bytes32) public s_willHashes; // Testator -> Hash of off-chain will
    mapping(address => address[]) private s_beneficiaryLists; // Testator -> On-chain list of beneficiary addresses
    mapping(address => bool) public s_willExists;
    mapping(address => Status) public s_verificationStatus; // Testator -> Status
    mapping(address => ChallengeInfo) private s_challenges; // Testator -> Challenge Info
    mapping(address => string) private s_testatorName; // Testator -> Challenge Info

    ////////////////////// EVENTS ///////////////////////////////////////

    event WillCreated(address indexed testator, bytes32 indexed willHash);
    event ExecutionInitiated(address indexed testator, address indexed initiator, uint256 bond, uint256 endTime);
    event ExecutionChallenged(address indexed testator, address indexed challenger, uint256 bond);
    event ExecutionSlashed(address indexed testator, address indexed initiator);
    event DisputeResolved(address indexed testator, bool wasInitiationCorrect);
    event WillVerified(address indexed testator);
    event WillEdited(address indexed testator, bytes32 indexed newWillHash);
    event TestatorNameUpdated(address indexed testator, string newName);

    modifier onlyTestator() {
        if (!s_willExists[msg.sender]) revert Will_WillDoesNotExist();
        _;
    }

    /////////////////// CONSTRUCTOR /////////////////////////////////////

    constructor() Ownable(msg.sender) {}

    ////////////////////////////////FUNCTIONS //////////////////////////

    // --- Will Management ---

    function createWill(address[] calldata _beneficiaries, bytes32 _willHash) external {

        //if will already exsists
        if (s_willExists[msg.sender]) revert Will_WillAlreadyCreated();

        s_willExists[msg.sender] = true;
        s_willHashes[msg.sender] = _willHash;
        s_beneficiaryLists[msg.sender] = _beneficiaries;
        s_verificationStatus[msg.sender] = Status.NotStarted;

        emit WillCreated(msg.sender, _willHash);
    }

    function editWill(address[] calldata _newBeneficiaries, bytes32 _newWillHash) external onlyTestator {

        // if the will doesn't already exsist
        if (!s_willExists[msg.sender]) revert Will_WillDoesNotExist();

        // Status should be not started
        if(s_verificationStatus[msg.sender] != Status.NotStarted) revert Will_VerificationAlreadyInProgressOrCompleted();

        s_willHashes[msg.sender] = _newWillHash;
        s_beneficiaryLists[msg.sender] = _newBeneficiaries;

        emit WillEdited(msg.sender, _newWillHash);
    }

    // --- Verification Flow ---

    function initiateWillExecution(address _testator) external payable {
        if (!s_willExists[_testator]) revert Will_WillDoesNotExist();
        if (s_verificationStatus[_testator] != Status.NotStarted) {
            revert Will_VerificationAlreadyInProgressOrCompleted();
        }
        if (!_isBeneficiary(_testator, msg.sender)) revert Will_NotABeneficiary();
        if (msg.value < MIN_INITIATOR_BOND) revert Will_IncorrectBondAmount();

        s_verificationStatus[_testator] = Status.ChallengePeriodActive;
        ChallengeInfo storage challenge = s_challenges[_testator];
        challenge.initiator = msg.sender;
        challenge.initiatorBond = msg.value;
        challenge.endTime = block.timestamp + CHALLENGE_DURATION;

        emit ExecutionInitiated(_testator, msg.sender, msg.value, challenge.endTime);
    }

    function challengeWillExecution(address _testator) external payable {
        if (s_verificationStatus[_testator] != Status.ChallengePeriodActive) {
            revert Will_VerificationNotInCorrectState(s_verificationStatus[_testator]);
        }
        if (block.timestamp > s_challenges[_testator].endTime) revert Will_ChallengePeriodOver();

        // Case 1: Testator challenges for free, immediately slashes the initiator
        if (msg.sender == _testator) {
            s_verificationStatus[_testator] = Status.Slashed;
            // The contract keeps the initiator's bond as a penalty.
            // This could be sent to a treasury or burned.
            emit ExecutionSlashed(_testator, s_challenges[_testator].initiator);
            delete s_challenges[_testator];
            return;
        }

        // Case 2: A beneficiary challenges by posting a bond
        if (!_isBeneficiary(_testator, msg.sender)) revert Will_NotABeneficiary();
        if (msg.value < MIN_CHALLENGE_BOND) revert Will_IncorrectBondAmount();
        ChallengeInfo storage challenge = s_challenges[_testator];
        if (challenge.challengers[msg.sender] > 0) revert Will_AlreadyChallenged();

        challenge.challengers[msg.sender] = msg.value;
        challenge.challengerList.push(msg.sender);
        challenge.totalChallengeBond += msg.value;

        emit ExecutionChallenged(_testator, msg.sender, msg.value);
    }

    function finalizeExecution(address _testator) external {
        if (s_verificationStatus[_testator] != Status.ChallengePeriodActive) {
            revert Will_VerificationNotInCorrectState(s_verificationStatus[_testator]);
        }
        ChallengeInfo storage challenge = s_challenges[_testator];
        if (block.timestamp < challenge.endTime) revert Will_ChallengePeriodNotOver();
        if (challenge.challengerList.length > 0) {
            // If there are challengers, resolution must go through the oracle.
            s_verificationStatus[_testator] = Status.PendingResolution;
            return;
        }

        // Happy path: No challengers, period is over.
        s_verificationStatus[_testator] = Status.Verified;
        (bool success,) = challenge.initiator.call{value: challenge.initiatorBond}("");
        if (!success) revert Will_TransferFailed();

        emit WillVerified(_testator);
        delete s_challenges[_testator];
    }

    /**
     * @notice Resolves a dispute after a challenge period ends with challengers.
     * @dev This function is owner-only to simulate a trusted oracle callback for the demo.
     * In a production system, this would be callable only by a Chainlink Oracle contract.
     * @param _testator The address of the testator whose will is in dispute.
     * @param _wasInitiationCorrect The ruling from the oracle/ultimate truth source.
     */
    function resolveDispute(address _testator, bool _wasInitiationCorrect) external onlyOwner {
        if (s_verificationStatus[_testator] != Status.PendingResolution) {
            revert Will_VerificationNotInCorrectState(s_verificationStatus[_testator]);
        }

        ChallengeInfo storage challenge = s_challenges[_testator];

        if (_wasInitiationCorrect) {
            // Initiator was right, challengers lose their bonds (kept by contract).
            // Refund initiator's bond.
            (bool success,) = challenge.initiator.call{value: challenge.initiatorBond}("");
            if (!success) revert Will_TransferFailed();

            s_verificationStatus[_testator] = Status.Verified;
            emit WillVerified(_testator);
        } else {
            // Initiator was wrong, their bond is distributed to the challengers.
            // Refund the challengers' own bonds first.
            for (uint256 i = 0; i < challenge.challengerList.length; i++) {
                address challenger = challenge.challengerList[i];
                uint256 bond = challenge.challengers[challenger];
                (bool success,) = challenger.call{value: bond}("");
                if (!success) revert Will_TransferFailed();
            }

            // Distribute the initiator's bond minus a contract fee.
            uint256 distributable = challenge.initiatorBond - CONTRACT_FEE;
            for (uint256 i = 0; i < challenge.challengerList.length; i++) {
                address challenger = challenge.challengerList[i];
                uint256 challengerBond = challenge.challengers[challenger];
                uint256 share = (distributable * challengerBond) / challenge.totalChallengeBond;
                (bool success,) = challenger.call{value: share}("");
                if (!success) revert Will_TransferFailed();
            }

            s_verificationStatus[_testator] = Status.NotStarted; // Reset the process
        }

        emit DisputeResolved(_testator, _wasInitiationCorrect);
        delete s_challenges[_testator];
    }

    // testator name mapping and its getter

    function setTestatorName(string calldata name) external {
        s_testatorName[msg.sender] = name;
        emit TestatorNameUpdated(msg.sender, name);
    }

    // --- View & Internal Functions ---
    function getBeneficiaries(address _testator) external view returns (address[] memory) {
        if (!s_willExists[_testator]) revert Will_WillDoesNotExist();
        return s_beneficiaryLists[_testator];
    }

    function _isBeneficiary(address _testator, address _user) internal view returns (bool) {
        address[] memory beneficiaries = s_beneficiaryLists[_testator];
        for (uint256 i = 0; i < beneficiaries.length; i++) {
            if (beneficiaries[i] == _user) return true;
        }
        return false;
    }
}
