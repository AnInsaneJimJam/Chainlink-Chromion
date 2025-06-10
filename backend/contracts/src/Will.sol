// SPDX-License-Identifier: UNLICENSED

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

    error Will_WillAlreadyCreated();
    struct Asset {
        string chain; // e.g., "Ethereum", "Solana", etc.
        uint256 chainId;  
        string assetType; // e.g., "native", "USDC", "NFT"
        string assetId;   // for NFTs or metadata; empty for native
        uint256 amount;   // amount or 1 for NFTs
    }

    struct Beneficiary {
        address beneficiaryAddress;
        Asset[] inheritedAssets;
    }

    struct UserWill {
        Beneficiary[] beneficiaries;
        bool exists;
    }

    // Chainlink VRF Variables
    uint256 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    address[] private testatorsAddress; // array of Testators 
    mapping(address => bool) private isTestator; // Whether a address has registered to be testator
    mapping(address => UserWill) private wills; // Mapping => Testator -> will
    mapping(address => address[]) private beneficiaryToTestators;
    mapping(address => mapping(address => bool)) private hasWillLink;


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

    function createWill(Beneficiary[] calldata beneficiaries) external {
        
        // Will Aready made 
        require(!wills[msg.sender].exists, Will_WillAlreadyCreated());

        testatorsAddress.push(msg.sender);
        isTestator[msg.sender] = true;

        for (uint256 i = 0; i < beneficiaries.length; i++) {
            address beneficiary = beneficiaries[i].beneficiaryAddress;

            if (!hasWillLink[beneficiary][msg.sender]) {
                beneficiaryToTestators[beneficiary].push(msg.sender);
                hasWillLink[beneficiary][msg.sender] = true;
            }

            wills[msg.sender].beneficiaries.push(beneficiaries[i]);
        }

        wills[msg.sender].exists = true;
    }


    // Edit will: fully replaces existing beneficiaries
    function editWill(Beneficiary[] calldata updatedBeneficiaries) external {
        require(wills[msg.sender].exists, "Will does not exist");

        // Clean up old beneficiary-to-testator links
        Beneficiary[] storage oldBeneficiaries = wills[msg.sender].beneficiaries;
        for (uint256 i = 0; i < oldBeneficiaries.length; i++) {
            address oldBeneficiary = oldBeneficiaries[i].beneficiaryAddress;

            if (hasWillLink[oldBeneficiary][msg.sender]) {
                // Remove from array
                address[] storage testators = beneficiaryToTestators[oldBeneficiary];
                for (uint256 j = 0; j < testators.length; j++) {
                    if (testators[j] == msg.sender) {
                        testators[j] = testators[testators.length - 1];
                        testators.pop();
                        break;
                    }
                }

                hasWillLink[oldBeneficiary][msg.sender] = false;
            }
        }

        // Replace beneficiaries 
        delete wills[msg.sender].beneficiaries;

        for (uint256 i = 0; i < updatedBeneficiaries.length; i++) { 
            address newBeneficiary = updatedBeneficiaries[i].beneficiaryAddress; 

            if (!hasWillLink[newBeneficiary][msg.sender]) {        // needed such that user cant added multiple beneficiaries with same address
                beneficiaryToTestators[newBeneficiary].push(msg.sender);
                hasWillLink[newBeneficiary][msg.sender] = true;
            }

            wills[msg.sender].beneficiaries.push(updatedBeneficiaries[i]);
        }
    }

    // in the frontend, first call getWIllLinkedToBeneficiary() then call getInheritancePerWIll for each address you recieve from getWIllLinkedToBeneficiary
    // returns inhertiance of a beneficiary for a specific will 
    function getInheritancePerWill(address testator, address beneficiary) external view returns (Asset[] memory) {
        UserWill storage userWill = wills[testator];
        require(userWill.exists, "Will does not exist");
        uint256 count = 0;

        // Count how many assets this beneficiary has in this will
        for (uint256 i = 0; i < userWill.beneficiaries.length; i++) {
            if (userWill.beneficiaries[i].beneficiaryAddress == beneficiary) {
                count += userWill.beneficiaries[i].inheritedAssets.length;
            }
        }

        Asset[] memory result = new Asset[](count);
        uint256 index = 0;

        // Copy those assets into result
        for (uint256 i = 0; i < userWill.beneficiaries.length; i++) {
            if (userWill.beneficiaries[i].beneficiaryAddress == beneficiary) {
                for (uint256 j = 0; j < userWill.beneficiaries[i].inheritedAssets.length; j++) {
                    result[index] = userWill.beneficiaries[i].inheritedAssets[j];
                    index++;
                }
            }
        }


        return result;
    }
    function getWillsLinkedToBeneficiary(address beneficiary) external view returns (address[] memory) {
        return beneficiaryToTestators[beneficiary];
    }
    // Called by the owner to view their will
    function getWill() external view returns (Beneficiary[] memory) {
        require(wills[msg.sender].exists, "No will created");
        return wills[msg.sender].beneficiaries;
    }
    // verify API function(use chainlink API)
    // transfer function(use chainlink CCIP)
    // get random number of beneficiaries for consensus()
    function generateRandomBeneficiary() internal {
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
                VRFV2PlusClient.RandomWordsRequest({
                    keyHash: i_gasLane,
                    subId: i_subscriptionId,
                    requestConfirmations: REQUEST_CONFIRMATIONS,
                    callbackGasLimit: i_callbackGasLimit,
                    numWords: NUM_WORDS,
                    extraArgs: VRFV2PlusClient._argsToBytes(
                        // Set nativePayment to true to pay for VRF requests with Sepolia ETH instead of LINK
                        VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                    )
                })
            );}


}
