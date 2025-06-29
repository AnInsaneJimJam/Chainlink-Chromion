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

pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
// Interface to communicate with the Functions Consumer contract
import {IGettingStartedFunctionsConsumer} from "./IGettingStartedFunctionsConsumer.sol";
import {AutomationCompatibleInterface} from
    "https://github.com/smartcontractkit/chainlink-brownie-contracts/blob/main/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

/**
 * @title A Digital Will Contract with a Challenge Period Verification Method
 * @author Anand
 * @notice This contract uses a challenge period with economic incentives to verify a will.
 * It is designed to be paired with an off-chain oracle for dispute resolution.
 * @dev The will's sensitive details are stored off-chain. This contract only manages the verification trigger.
 */
contract Will is Ownable, AutomationCompatibleInterface {
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
    error Will_FunctionsConsumerNotSet();
    error Will_TestatorInfoNotSet();
    error Will_line255();

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

    uint256 public constant MIN_INITIATOR_BOND = 0.001 ether;
    uint256 public constant MIN_CHALLENGE_BOND = 0.001 ether;
    uint256 public constant CHALLENGE_DURATION = 3 minutes;
    uint256 public constant CONTRACT_FEE = 0.01 ether;

    //////////////////////// STATE VARIABLES ///////////////////////////////

    address public functionsConsumerAddress;
    uint64 public functionsSubscriptionId;

    mapping(address => bytes32) public s_willHashes; // Testator -> Hash of off-chain will
    mapping(address => address[]) private s_beneficiaryLists; // Testator -> On-chain list of beneficiary addresses
    mapping(address => address[]) private s_testators; // Beneficiary -> On-chain list of testators (wills basically) which beneficiary is part of
    mapping(address => bool) public s_willExists;
    mapping(address => Status) public s_verificationStatus; // Testator -> Status
    mapping(address => ChallengeInfo) private s_challenges; // Testator -> Challenge Info
    mapping(address => string) private s_testatorName; // Testator -> Challenge Info
    mapping(address => string) public s_testatorYearOfBirth; // Testator -> Year of Birth

     address[] private s_activeChallengeTestators;


    ////////////////////// EVENTS ///////////////////////////////////////

    event WillCreated(address indexed testator, bytes32 indexed willHash);
    event WillEdited(address indexed testator, bytes32 indexed newWillHash);
    event ExecutionInitiated(address indexed testator, address indexed initiator, uint256 bond, uint256 endTime);
    event ExecutionChallenged(address indexed testator, address indexed challenger, uint256 bond);
    event ExecutionSlashed(address indexed testator, address indexed initiator);
    event DisputeResolved(address indexed testator, bool wasInitiationCorrect);
    event WillVerified(address indexed testator);
    event TestatorNameUpdated(address indexed testator, string newName);
    event TestatorInfoUpdated(address indexed testator, string name, string yearOfBirth);
     event UpkeepFinalizedWill(address indexed testator);

    modifier onlyTestator() {
        if (!s_willExists[msg.sender]) revert Will_WillDoesNotExist();
        _;
    }

    modifier onlyFunctionsConsumer() {
        if (msg.sender != functionsConsumerAddress) revert("Caller is not the Functions Consumer");
        _;
    }
    /////////////////// CONSTRUCTOR /////////////////////////////////////

    constructor() Ownable(msg.sender) {}

    ////////////////////////////////FUNCTIONS //////////////////////////

    // --- Configuration ---
    function setFunctionsConsumer(address _consumerAddress) external onlyOwner {
        functionsConsumerAddress = _consumerAddress;
    }

    function setFunctionsSubscriptionId(uint64 _subscriptionId) external onlyOwner {
        functionsSubscriptionId = _subscriptionId;
    }

    // --- Will Management ---

    function createWill(address[] calldata _beneficiaries, bytes32 _willHash) external {
        //if will already exsists
        if (s_willExists[msg.sender]) revert Will_WillAlreadyCreated();

        s_willExists[msg.sender] = true;
        s_willHashes[msg.sender] = _willHash;
        s_beneficiaryLists[msg.sender] = _beneficiaries;
        s_verificationStatus[msg.sender] = Status.NotStarted;

        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            s_testators[_beneficiaries[i]].push(msg.sender);
        }

        emit WillCreated(msg.sender, _willHash);
    }

    /**
     * @notice Allows a testator to set or update their name and year of birth.
     * @dev This information is required for the oracle to verify their status during a dispute.
     */
    function setTestatorInfo(string calldata _name, string calldata _yearOfBirth) external onlyTestator {
        s_testatorName[msg.sender] = _name;
        s_testatorYearOfBirth[msg.sender] = _yearOfBirth;
        emit TestatorInfoUpdated(msg.sender, _name, _yearOfBirth);
    }

    function editWill(address[] calldata _newBeneficiaries, bytes32 _newWillHash) external onlyTestator {
        // if the will doesn't already exsist
        if (!s_willExists[msg.sender]) revert Will_WillDoesNotExist();

        // Status should be not started
        if (s_verificationStatus[msg.sender] != Status.NotStarted) {
            revert Will_VerificationAlreadyInProgressOrCompleted();
        }

        address testator = msg.sender;

        s_willHashes[msg.sender] = _newWillHash;

        // 1. Remove testator from old beneficiaries
        address[] storage oldBeneficiaries = s_beneficiaryLists[testator];
        for (uint256 i = 0; i < oldBeneficiaries.length; i++) {
            address beneficiary = oldBeneficiaries[i];
            address[] storage testators = s_testators[beneficiary];
            for (uint256 j = 0; j < testators.length; j++) {
                if (testators[j] == testator) {
                    testators[j] = testators[testators.length - 1]; // swap with last
                    testators.pop(); // remove last
                    break;
                }
            }
        }

        // 2. Add will to new beneficiaries
        for (uint256 i = 0; i < _newBeneficiaries.length; i++) {
            s_testators[_newBeneficiaries[i]].push(testator);
        }

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
        s_activeChallengeTestators.push(_testator);


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
        s_verificationStatus[_testator] = Status.PendingResolution;
        emit ExecutionChallenged(_testator, msg.sender, msg.value);
    }

    function finalizeExecution(address _testator) public { 
        ChallengeInfo storage challenge = s_challenges[_testator];
        if (block.timestamp < challenge.endTime) revert Will_ChallengePeriodNotOver();
        if (challenge.challengerList.length > 0) {
            // If there are challengers, resolution must go through the oracle.

            if (functionsConsumerAddress == address(0)) revert Will_FunctionsConsumerNotSet();
            string memory name = s_testatorName[_testator];
            string memory yob = s_testatorYearOfBirth[_testator];
            if (bytes(name).length == 0 || bytes(yob).length == 0) revert Will_TestatorInfoNotSet();
            string[] memory args = new string[](2);
            args[0] = name;
            args[1] = yob;
            IGettingStartedFunctionsConsumer(functionsConsumerAddress).requestDeathVerification(_testator, functionsSubscriptionId, args);
            return;
        }

        // Happy path: No challengers, period is over.
        s_verificationStatus[_testator] = Status.Verified;
        (bool success,) = challenge.initiator.call{value: challenge.initiatorBond}("");
        if (!success) revert Will_TransferFailed();

        emit WillVerified(_testator);
        delete s_challenges[_testator];
        _removeTestatorFromActive(_testator);

    }

    // --- AUTOMATION LOGIC ---

    /**
     * @notice This is the function that the Chainlink Automation nodes call off-chain to check if
     * any work needs to be done.
     * @dev It iterates through the list of wills in an active challenge period and checks their timers.
     * @return upkeepNeeded A boolean to indicate if performUpkeep should be called.
     * @return performData The data to be passed to performUpkeep, containing the testator address.
     */
    function checkUpkeep(bytes calldata /* checkData */)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        upkeepNeeded = false;
        performData = "";
        for (uint256 i = 0; i < s_activeChallengeTestators.length; i++) {
            address testator = s_activeChallengeTestators[i];
            if ((s_verificationStatus[testator] == Status.ChallengePeriodActive&& block.timestamp > s_challenges[testator].endTime) || (s_verificationStatus[testator] == Status.PendingResolution && block.timestamp > s_challenges[testator].endTime)) {
                upkeepNeeded = true;
                performData = abi.encode(testator);
                break; // Found one, no need to check further
            }
        }
        return (upkeepNeeded, performData);
    }

    /**
     * @notice This is the function that the Chainlink Automation nodes call on-chain when checkUpkeep returns true.
     * @dev It calls the finalizeExecution function for the testator address passed in performData.
     */
    function performUpkeep(bytes calldata performData) external override {
        address testator = abi.decode(performData, (address));
        finalizeExecution(testator);
        emit UpkeepFinalizedWill(testator);
    }

    function _removeTestatorFromActive(address _testator) internal {
    for (uint256 i = 0; i < s_activeChallengeTestators.length; i++) {
        if (s_activeChallengeTestators[i] == _testator) {
            s_activeChallengeTestators[i] = s_activeChallengeTestators[s_activeChallengeTestators.length - 1];
            s_activeChallengeTestators.pop();
            break;
        }
    }
}

    /**
     * @notice Resolves a dispute after a challenge period ends with challengers.
     * @dev This function is owner-only to simulate a trusted oracle callback for the demo.
     * In a production system, this would be callable only by a Chainlink Oracle contract.
     * @param _testator The address of the testator whose will is in dispute.
     * @param _wasInitiationCorrect The ruling from the oracle/ultimate truth source.
     */
    function resolveDispute(address _testator, bool _wasInitiationCorrect) external onlyFunctionsConsumer() {
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

    function getTestatorsForBeneficiary(address _beneficiary) external view returns (address[] memory) {
        return s_testators[_beneficiary];
    }
    function getWIllhash(address testator) external view returns (bytes32) {
        return s_willHashes[testator];
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
    function getVerificationStatus(address _testator) external view returns (Status) {
    return s_verificationStatus[_testator];
    }

    function getChallengeEndTime(address _testator) external view returns (uint256) {
    return s_challenges[_testator].endTime;
    }
    
    function getTestatorName(address _testator) external view returns (string memory) {
    return s_testatorName[_testator];
    }
    function getActiveChallengeTestators() external view returns (address[] memory) {
        return s_activeChallengeTestators;
    }

    function getActiveChallengeTestatorsLength() external view returns (uint256) {
        return s_activeChallengeTestators.length;
    }

}