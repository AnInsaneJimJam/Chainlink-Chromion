// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

/**
 * @title A Digital Will Contract with Dual Verification Methods
 * @author Your Name/Team
 * @notice This contract allows a testator to choose between two methods for will verification:
 * 1. Beneficiary Quorum: A random 60% of beneficiaries are selected by Chainlink VRF to vote.
 * 2. Challenge Period: A guardian posts a bond to start a challenge period.
 * @dev The will's sensitive details are stored off-chain. This contract only manages the verification trigger.
 */
contract Will is VRFConsumerBaseV2Plus {
    // --- Errors ---
    error Will_WillAlreadyCreated();
    error Will_WillDoesNotExist();
    error Will_NotABeneficiary();
    error Will_NotAGuardian();
    error Will_VerificationAlreadyInProgressOrCompleted();
    error Will_NotEnoughBeneficiariesForRandomSelection();
    error Will_NotASelectedVerifier();
    error Will_VerifierAlreadyVoted();
    error Will_VerificationNotInCorrectState(address testator, Status currentStatus, Status requiredStatus);
    error Will_RequestNotFound();
    error Will_IncorrectVerificationMethod();
    error Will_ChallengePeriodNotActive();
    error Will_ChallengePeriodActive();
    error Will_ChallengePeriodNotOver();
    error Will_IncorrectBondAmount(uint256 expected, uint256 provided);
    error Will_NoActiveChallenge();
    error Will_TransferFailed();

    // --- Type Declarations ---
    enum VerificationMethod {
        BeneficiaryQuorum,
        ChallengePeriod
    }
    enum Status {
        NotStarted,
        PendingRandomSelection,
        PendingVerification,
        ChallengePeriodActive,
        Verified,
        Challenged
    }

    struct WillInfo {
        bytes32 willHash;
        address[] beneficiaries;
        address[] guardians; // Only for ChallengePeriod method
        VerificationMethod verificationMethod;
        uint256 challengeBond; // Only for ChallengePeriod method
        uint32 challengeDuration; // In seconds, only for ChallengePeriod
        bool exists;
    }

    struct ActiveChallenge {
        address initiator;
        uint256 bond;
        uint256 endTime;
    }

    // --- State Variables ---

    // Chainlink VRF Configuration
    uint256 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;

    // Will Storage
    mapping(address => WillInfo) public s_wills; // Testator -> Will Info
    mapping(address => Status) public s_verificationStatus; // Testator -> Status

    // Beneficiary Quorum State
    mapping(uint256 => address) private s_requestIdToTestator;
    mapping(address => address[]) public s_selectedVerifiers;
    mapping(address => uint256) public s_verificationVoteCount;
    mapping(address => mapping(address => bool)) public s_verifierHasVoted;

    // Challenge Period State
    mapping(address => ActiveChallenge) public s_activeChallenges;

    // --- Events ---
    event WillCreated(address indexed testator, VerificationMethod method);
    event VerificationInitiated(address indexed testator, address indexed initiator);
    event VRFRequestInitiated(address indexed testator, uint256 indexed requestId);
    event VerifiersSelected(address indexed testator, address[] verifiers);
    event VerificationVoteCast(address indexed testator, address indexed verifier, bool vote);
    event ChallengePeriodStarted(address indexed testator, address indexed initiator, uint256 endTime, uint256 bond);
    event WillChallenged(address indexed testator, address indexed challenger);
    event WillVerified(address indexed testator);

    // --- Constructor ---
    constructor(
        address vrfCoordinatorV2,
        uint256 subscriptionId,
        bytes32 gasLane, // keyHash
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2Plus(vrfCoordinatorV2) {
        i_subscriptionId = subscriptionId;
        i_gasLane = gasLane;
        i_callbackGasLimit = callbackGasLimit;
    }

    // --- Will Management ---

    function createWill(WillInfo calldata _info) external {
        if (s_wills[msg.sender].exists) revert Will_WillAlreadyCreated();

        s_wills[msg.sender] = _info;
        s_wills[msg.sender].exists = true;
        s_verificationStatus[msg.sender] = Status.NotStarted;
        emit WillCreated(msg.sender, _info.verificationMethod);
    }

    // --- Method 1: Beneficiary Quorum Flow ---

    function initiateBeneficiaryVerification(address _testator) external {
        WillInfo storage willInfo = s_wills[_testator];
        if (willInfo.verificationMethod != VerificationMethod.BeneficiaryQuorum) {
            revert Will_IncorrectVerificationMethod();
        }
        if (s_verificationStatus[_testator] != Status.NotStarted) {
            revert Will_VerificationAlreadyInProgressOrCompleted();
        }
        if (!_isBeneficiary(_testator, msg.sender)) revert Will_NotABeneficiary();

        uint256 numBeneficiaries = willInfo.beneficiaries.length;
        uint256 numToSelect = (numBeneficiaries * 60) / 100;
        if (numBeneficiaries < 2) revert Will_NotEnoughBeneficiariesForRandomSelection(); // Need at least 2 beneficiaries for this method
        if (numToSelect == 0) numToSelect = 1;

        s_verificationStatus[_testator] = Status.PendingRandomSelection;

        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: i_gasLane,
                subId: i_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: i_callbackGasLimit,
                numWords: uint32(numToSelect),
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );

        s_requestIdToTestator[requestId] = _testator;
        emit VRFRequestInitiated(_testator, requestId);
        emit VerificationInitiated(_testator, msg.sender);
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
        address testator = s_requestIdToTestator[_requestId];
        if (testator == address(0)) revert Will_RequestNotFound();

        address[] memory beneficiaries = s_wills[testator].beneficiaries;
        uint256 numBeneficiaries = beneficiaries.length;
        address[] storage selected = s_selectedVerifiers[testator];
        uint256 numToSelect = (numBeneficiaries * 60) / 100;
        if (numToSelect == 0) numToSelect = 1;

        for (uint256 i = 0; i < _randomWords.length && selected.length < numToSelect; i++) {
            uint256 randomIndex = _randomWords[i] % numBeneficiaries;
            address candidate = beneficiaries[randomIndex];
            if (!_isAlreadySelected(selected, candidate)) {
                selected.push(candidate);
            }
        }

        s_verificationStatus[testator] = Status.PendingVerification;
        emit VerifiersSelected(testator, selected);
    }

    function submitVerificationVote(address _testator, bool _vote) external {
        if (s_verificationStatus[_testator] != Status.PendingVerification) {
            revert Will_VerificationNotInCorrectState(
                _testator, s_verificationStatus[_testator], Status.PendingVerification
            );
        }
        if (!_isVerifier(_testator, msg.sender)) revert Will_NotASelectedVerifier();
        if (s_verifierHasVoted[_testator][msg.sender]) revert Will_VerifierAlreadyVoted();

        s_verifierHasVoted[_testator][msg.sender] = true;
        if (_vote) {
            s_verificationVoteCount[_testator]++;
        }
        emit VerificationVoteCast(_testator, msg.sender, _vote);

        uint256 quorum = (s_selectedVerifiers[_testator].length / 2) + 1;
        if (s_verificationVoteCount[_testator] >= quorum) {
            s_verificationStatus[_testator] = Status.Verified;
            emit WillVerified(_testator);
        }
    }

    // --- Method 2: Challenge Period Flow ---

    function initiateChallengePeriod(address _testator) external payable {
        WillInfo storage willInfo = s_wills[_testator];
        if (willInfo.verificationMethod != VerificationMethod.ChallengePeriod) {
            revert Will_IncorrectVerificationMethod();
        }
        if (s_verificationStatus[_testator] != Status.NotStarted) revert Will_ChallengePeriodActive();
        if (!_isGuardian(_testator, msg.sender)) revert Will_NotAGuardian();
        if (msg.value != willInfo.challengeBond) revert Will_IncorrectBondAmount(willInfo.challengeBond, msg.value);

        s_verificationStatus[_testator] = Status.ChallengePeriodActive;
        s_activeChallenges[_testator] = ActiveChallenge({
            initiator: msg.sender,
            bond: msg.value,
            endTime: block.timestamp + willInfo.challengeDuration
        });

        emit ChallengePeriodStarted(_testator, msg.sender, block.timestamp + willInfo.challengeDuration, msg.value);
        emit VerificationInitiated(_testator, msg.sender);
    }

    function challengeClaim(address _testator) external payable {
        if (s_verificationStatus[_testator] != Status.ChallengePeriodActive) revert Will_ChallengePeriodNotActive();
        ActiveChallenge storage challenge = s_activeChallenges[_testator];
        // The challenger must post a bond equal to the initiator's bond to slash it.
        if (msg.value != challenge.bond) revert Will_IncorrectBondAmount(challenge.bond, msg.value);

        s_verificationStatus[_testator] = Status.Challenged;
        address initiator = challenge.initiator;
        delete s_activeChallenges[_testator]; // Clear the challenge

        // Transfer the initiator's bond AND the challenger's bond to the challenger.
        (bool success,) = msg.sender.call{value: challenge.bond + msg.value}("");
        if (!success) revert Will_TransferFailed();

        emit WillChallenged(_testator, msg.sender);
    }

    function finalizeChallengePeriod(address _testator) external {
        if (s_verificationStatus[_testator] != Status.ChallengePeriodActive) revert Will_ChallengePeriodNotActive();
        ActiveChallenge memory challenge = s_activeChallenges[_testator];
        if (block.timestamp < challenge.endTime) revert Will_ChallengePeriodNotOver();

        s_verificationStatus[_testator] = Status.Verified;
        address initiator = challenge.initiator;
        uint256 bond = challenge.bond;
        delete s_activeChallenges[_testator];

        // Refund the bond to the successful initiator
        (bool success,) = initiator.call{value: bond}("");
        if (!success) revert Will_TransferFailed();

        emit WillVerified(_testator);
    }

    // --- View & Internal Functions ---

    function getWillInfo(address _testator) external view returns (WillInfo memory) {
        return s_wills[_testator];
    }

    function _isBeneficiary(address _testator, address _user) internal view returns (bool) {
        address[] memory beneficiaries = s_wills[_testator].beneficiaries;
        for (uint256 i = 0; i < beneficiaries.length; i++) {
            if (beneficiaries[i] == _user) return true;
        }
        return false;
    }

    function _isGuardian(address _testator, address _user) internal view returns (bool) {
        address[] memory guardians = s_wills[_testator].guardians;
        for (uint256 i = 0; i < guardians.length; i++) {
            if (guardians[i] == _user) return true;
        }
        return false;
    }

    function _isVerifier(address _testator, address _user) internal view returns (bool) {
        address[] storage verifiers = s_selectedVerifiers[_testator];
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _user) return true;
        }
        return false;
    }

    function _isAlreadySelected(address[] storage _selected, address _candidate) internal view returns (bool) {
        for (uint256 j = 0; j < _selected.length; j++) {
            if (_selected[j] == _candidate) return true;
        }
        return false;
    }
}
