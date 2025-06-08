// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Will {
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
    address[] private allTestators; //keep track of all Testators 
    mapping(address => bool) private isTestator;
    mapping(address => UserWill) private wills;
    mapping(address => address[]) private beneficiaryToTestators;
    mapping(address => mapping(address => bool)) private hasWillLink;

    // Create or overwrite a will
    function createWill(Beneficiary[] calldata newBeneficiaries) external {
        require(!wills[msg.sender].exists, "Will already exists");

        allTestators.push(msg.sender);
        isTestator[msg.sender] = true;

        for (uint256 i = 0; i < newBeneficiaries.length; i++) {
            address beneficiary = newBeneficiaries[i].beneficiaryAddress;

            if (!hasWillLink[beneficiary][msg.sender]) {
                beneficiaryToTestators[beneficiary].push(msg.sender);
                hasWillLink[beneficiary][msg.sender] = true;
            }

            wills[msg.sender].beneficiaries.push(newBeneficiaries[i]);
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

    // in the frontend, first call beneficiaryToTestator() then call getInheritancePerWIll for each address you recieve from beneficiaryToTestator
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

    // Called by the owner to view their will
    function getWill() external view returns (Beneficiary[] memory) {
        require(wills[msg.sender].exists, "No will created");
        return wills[msg.sender].beneficiaries;
    }
    // verify API function(use chainlink API)
    // transfer function(use chainlink CCIP)
    // get random number of beneficiaries for consensus()
}
