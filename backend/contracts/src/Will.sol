// SPDX-License-Identifier: MIT

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

pragma solidity ^0.8.13;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract Will is VRFConsumerBaseV2Plus {
    ////////////Errors////////////

    error Will_WillAlreadyCreated();
    error Will_WillDoesNotExist();
    error Will_NotABeneficiary();
    error Will_VerificationAlreadyInProgressOrCompleted();
    error Will_NotEnoughBeneficiariesForRandomSelection();
    error Will_NotASelectedVerifier();
    error Will_VerifierAlreadyVoted();
    error Will_VerificationNotInCorrectState();
    error Will_RequestNotFound();
    error Will_CallerNotTestator();

    //////////////Type Declarations//////////

    enum VerificationStatus {
        NotStarted, // Default state
        PendingRandomSelection, // VRF request sent, waiting for callback
        PendingVerification, // Verifiers have been selected, waiting for votes
        Verified, // Quorum reached, will can be executed
        Failed // Future use: if verification fails

    }

    // struct Asset {
    //     string chain; // e.g., "Ethereum", "Solana", etc.
    //     uint256 chainId;
    //     string assetType; // e.g., "native", "USDC", "NFT"
    //     string assetId;   // for NFTs or metadata; empty for native
    //     uint256 amount;   // amount or 1 for NFTs
    // }

    // struct Beneficiary {
    //     address beneficiaryAddress;
    //     Asset[] inheritedAssets;
    // }

    // struct UserWill {
    //     Beneficiary[] beneficiaries;
    //     bool exists;
    // }

    // Chainlink VRF Variables
    uint256 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;
    uint32 private constant NUM_VERIFIERS_TO_SELECT = 3;
    uint256 private constant VERIFICATION_QUORUM = 2;

    mapping(address => bytes32) public s_willHashes;
    // address[] private testatorsAddress; // array of Testators
    mapping(address => bool) private isTestator; // Whether a address has registered to be testator
    // mapping(address => UserWill) private wills; // Mapping => Testator -> will
    mapping(address => address[]) private s_beneficiaryToTestators;
    mapping(address => bool) public s_willExists;
    mapping(address => address[]) private s_beneficiaryLists; // Testator -> Beneficiary Addresses
    // mapping(address => mapping(address => bool)) private hasWillLink;

    // VErifiction Process State
    mapping(address => VerificationStatus) public s_verificationState; // Testator -> Status
    mapping(uint256 => address) private s_requestIdToTestator; // VRF Request ID -> Testator
    mapping(address => address[]) public s_selectedVerifiers; // Testator -> Array of randomly selected verifiers
    mapping(address => uint256) public s_verificationVoteCount; // Testator -> Count of "yes" votes
    mapping(address => mapping(address => bool)) public s_verifierHasVoted; // Testator -> Verifier -> Voted?

    /////////////////Events///////////////
    event WillCreated(address indexed testator, bytes32 indexed willHash);
    event WillEdited(address indexed testator, bytes32 indexed newWillHash);
    event VerificationInitiated(address indexed testator, address indexed initiator, uint256 indexed requestId);
    event VerifiersSelected(address indexed testator, address[] verifiers);
    event VerificationVoteCast(address indexed testator, address indexed verifier, bool vote);
    event WillVerified(address indexed testator);

    //////////////////Modifiers//////////////
    modifier onlyTestator() {
        if (!s_willExists[msg.sender]) revert Will_WillDoesNotExist();
        _;
    }

    ////////////////Constructor//////////////
    constructor(
        uint256 subscriptionId,
        bytes32 gasLane, // keyHash
        uint32 callbackGasLimit,
        address vrfCoordinatorV2
    ) VRFConsumerBaseV2Plus(vrfCoordinatorV2) {
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
    }

    // function createWill(Beneficiary[] calldata beneficiaries) external {
    //     // Will Aready made
    //     require(!wills[msg.sender].exists, Will_WillAlreadyCreated());

    //     testatorsAddress.push(msg.sender);
    //     isTestator[msg.sender] = true;

    //     for (uint256 i = 0; i < beneficiaries.length; i++) {
    //         address beneficiary = beneficiaries[i].beneficiaryAddress;

    //         if (!hasWillLink[beneficiary][msg.sender]) {
    //             s_beneficiaryToTestators[beneficiary].push(msg.sender);
    //             hasWillLink[beneficiary][msg.sender] = true;
    //         }

    //         wills[msg.sender].beneficiaries.push(beneficiaries[i]);
    //     }

    //     wills[msg.sender].exists = true;
    // }

     function createWill(address[] calldata _beneficiaries, bytes32 _willHash) external {
        if (s_willExists[msg.sender]) {
            revert Will_WillAlreadyCreated();
        }

        s_willExists[msg.sender] = true;
        s_willHashes[msg.sender] = _willHash;
        s_beneficiaryLists[msg.sender] = _beneficiaries;

        emit WillCreated(msg.sender, _willHash);
    }


    // Edit will: fully replaces existing beneficiaries
    // function editWill(Beneficiary[] calldata updatedBeneficiaries) external {
    //     require(wills[msg.sender].exists, "Will does not exist");

    //     // Clean up old beneficiary-to-testator links
    //     Beneficiary[] storage oldBeneficiaries = wills[msg.sender].beneficiaries;
    //     for (uint256 i = 0; i < oldBeneficiaries.length; i++) {
    //         address oldBeneficiary = oldBeneficiaries[i].beneficiaryAddress;

    //         if (hasWillLink[oldBeneficiary][msg.sender]) {
    //             // Remove from array
    //             address[] storage testators = s_beneficiaryToTestators[oldBeneficiary];
    //             for (uint256 j = 0; j < testators.length; j++) {
    //                 if (testators[j] == msg.sender) {
    //                     testators[j] = testators[testators.length - 1];
    //                     testators.pop();
    //                     break;
    //                 }
    //             }

    //             hasWillLink[oldBeneficiary][msg.sender] = false;
    //         }
    //     }

    //     // Replace beneficiaries
    //     delete wills[msg.sender].beneficiaries;

    //     for (uint256 i = 0; i < updatedBeneficiaries.length; i++) {
    //         address newBeneficiary = updatedBeneficiaries[i].beneficiaryAddress;

    //         if (!hasWillLink[newBeneficiary][msg.sender]) {
    //             // needed such that user cant added multiple beneficiaries with same address
    //             s_beneficiaryToTestators[newBeneficiary].push(msg.sender);
    //             hasWillLink[newBeneficiary][msg.sender] = true;
    //         }

    //         wills[msg.sender].beneficiaries.push(updatedBeneficiaries[i]);
    //     }
    // }

    function editWill(address[] calldata _newBeneficiaries, bytes32 _newWillHash) external onlyTestator {
        s_willHashes[msg.sender] = _newWillHash;
        s_beneficiaryLists[msg.sender] = _newBeneficiaries;

        emit WillEdited(msg.sender, _newWillHash);
    }

    // in the frontend, first call getWIllLinkedToBeneficiary() then call getInheritancePerWIll for each address you recieve from getWIllLinkedToBeneficiary
    // returns inhertiance of a beneficiary for a specific will
    // function getInheritancePerWill(address testator, address beneficiary) external view returns (Asset[] memory) {
    //     UserWill storage userWill = wills[testator];
    //     require(userWill.exists, "Will does not exist");
    //     uint256 count = 0;

    //     // Count how many assets this beneficiary has in this will
    //     for (uint256 i = 0; i < userWill.beneficiaries.length; i++) {
    //         if (userWill.beneficiaries[i].beneficiaryAddress == beneficiary) {
    //             count += userWill.beneficiaries[i].inheritedAssets.length;
    //         }
    //     }

    //     Asset[] memory result = new Asset[](count);
    //     uint256 index = 0;

    //     // Copy those assets into result
    //     for (uint256 i = 0; i < userWill.beneficiaries.length; i++) {
    //         if (userWill.beneficiaries[i].beneficiaryAddress == beneficiary) {
    //             for (uint256 j = 0; j < userWill.beneficiaries[i].inheritedAssets.length; j++) {
    //                 result[index] = userWill.beneficiaries[i].inheritedAssets[j];
    //                 index++;
    //             }
    //         }
    //     }

    //     return result;
    // }

    //Called by a beneficiary to start the verification process for a testator.
    function initiateVerification(address _testator) external {
        if (!s_willExists[_testator]) revert Will_WillDoesNotExist();
        if (!_isBeneficiary(_testator, msg.sender)) revert Will_NotABeneficiary();
        if (s_verificationState[_testator] != VerificationStatus.NotStarted) {
            revert Will_VerificationAlreadyInProgressOrCompleted();
        }
        if (s_beneficiaryLists[_testator].length < NUM_VERIFIERS_TO_SELECT) {
            revert Will_NotEnoughBeneficiariesForRandomSelection();
        }

        s_verificationState[_testator] = VerificationStatus.PendingRandomSelection;

        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: i_gasLane,
                subId: i_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: i_callbackGasLimit,
                numWords: NUM_VERIFIERS_TO_SELECT,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );

        s_requestIdToTestator[requestId] = _testator;
        emit VerificationInitiated(_testator, msg.sender, requestId);
    }

    // function getWillsLinkedToBeneficiary(address beneficiary) external view returns (address[] memory) {
    //     return s_beneficiaryToTestators[beneficiary];
    // }
    // Called by the owner to view their will

    // function getWill() external view returns (Beneficiary[] memory) {
    //     require(wills[msg.sender].exists, "No will created");
    //     return wills[msg.sender].beneficiaries;
    // }
    // verify API function(use chainlink API)
    // transfer function(use chainlink CCIP)
    // get random number of beneficiaries for consensus()

    // function generateRandomBeneficiary() internal {
    //     uint256 requestId = s_vrfCoordinator.requestRandomWords(
    //         VRFV2PlusClient.RandomWordsRequest({
    //             keyHash: i_gasLane,
    //             subId: i_subscriptionId,
    //             requestConfirmations: REQUEST_CONFIRMATIONS,
    //             callbackGasLimit: i_callbackGasLimit,
    //             numWords: NUM_WORDS,
    //             extraArgs: VRFV2PlusClient._argsToBytes(
    //                 // Set nativePayment to true to pay for VRF requests with Sepolia ETH instead of LINK
    //                 VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
    //             )
    //         })
    //     );
    // }

     function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
        address testator = s_requestIdToTestator[_requestId];
        if (testator == address(0)) revert Will_RequestNotFound();

        address[] memory beneficiaries = s_beneficiaryLists[testator];
        uint256 numBeneficiaries = beneficiaries.length;
        address[] storage selected = s_selectedVerifiers[testator];

        // Algorithm to pick unique beneficiaries
        for (uint256 i = 0; i < _randomWords.length && selected.length < NUM_VERIFIERS_TO_SELECT; i++) {
            uint256 randomIndex = _randomWords[i] % numBeneficiaries;
            address candidate = beneficiaries[randomIndex];

            bool isAlreadySelected = false;
            for (uint256 j = 0; j < selected.length; j++) {
                if (selected[j] == candidate) {
                    isAlreadySelected = true;
                    break;
                }
            }

            if (!isAlreadySelected) {
                selected.push(candidate);
            }
        }
        
        // In the rare case of not getting enough unique random numbers, we revert
        // to ensure the process is fair and has the required number of verifiers.
        if(selected.length < NUM_VERIFIERS_TO_SELECT) {
            // Reset state to allow re-initiation
            delete s_selectedVerifiers[testator];
            s_verificationState[testator] = VerificationStatus.NotStarted;
            // Optionally emit an event here
            return;
        }

        s_verificationState[testator] = VerificationStatus.PendingVerification;
        emit VerifiersSelected(testator, selected);
    }

    //Allows a randomly selected verifier to cast their vote.
    function submitVerificationVote(address _testator, bool _vote) external {
        if (s_verificationState[_testator] != VerificationStatus.PendingVerification) {
            revert Will_VerificationNotInCorrectState();
        }
        if (!_isVerifier(_testator, msg.sender)) revert Will_NotASelectedVerifier();
        if (s_verifierHasVoted[_testator][msg.sender]) revert Will_VerifierAlreadyVoted();

        s_verifierHasVoted[_testator][msg.sender] = true;

        if (_vote) {
            s_verificationVoteCount[_testator]++;
        }

        emit VerificationVoteCast(_testator, msg.sender, _vote);

        if (s_verificationVoteCount[_testator] >= VERIFICATION_QUORUM) {
            s_verificationState[_testator] = VerificationStatus.Verified;
            emit WillVerified(_testator);
        }
    }


    //list of beneficiary addresses for a given testator
    function getBeneficiaries(address _testator) external view returns (address[] memory) {
        return s_beneficiaryLists[_testator];
    }

    function _isBeneficiary(address _testator, address _user) private view returns (bool) {
        address[] memory beneficiaries = s_beneficiaryLists[_testator];
        for (uint256 i = 0; i < beneficiaries.length; i++) {
            if (beneficiaries[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function _isVerifier(address _testator, address _user) private view returns (bool) {
        address[] storage verifiers = s_selectedVerifiers[_testator];
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _user) {
                return true;
            }
        }
        return false;
    }
}

