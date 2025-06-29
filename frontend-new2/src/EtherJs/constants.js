// Contract configuration
export const CONTRACT_ADDRESS = "0x1F08307D976f7fEE660886f9C40AAD8217645135"; // Replace with your deployed contract address
export const SEPOLIA_CHAIN_ID = "0xaa36a7";
export const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/"; // Replace with your RPC URL

// Contract ABI - Add your full ABI here
export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			}
		],
		"name": "challengeWillExecution",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_beneficiaries",
				"type": "address[]"
			},
			{
				"internalType": "bytes32",
				"name": "_willHash",
				"type": "bytes32"
			}
		],
		"name": "createWill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_newBeneficiaries",
				"type": "address[]"
			},
			{
				"internalType": "bytes32",
				"name": "_newWillHash",
				"type": "bytes32"
			}
		],
		"name": "editWill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			}
		],
		"name": "finalizeExecution",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_AlreadyChallenged",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_ChallengePeriodNotOver",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_ChallengePeriodOver",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_FunctionsConsumerNotSet",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_IncorrectBondAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_NoActiveChallenge",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_NotABeneficiary",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_TestatorInfoNotSet",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_TransferFailed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_VerificationAlreadyInProgressOrCompleted",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "enum Will.Status",
				"name": "currentStatus",
				"type": "uint8"
			}
		],
		"name": "Will_VerificationNotInCorrectState",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_WillAlreadyCreated",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Will_WillDoesNotExist",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "wasInitiationCorrect",
				"type": "bool"
			}
		],
		"name": "DisputeResolved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "challenger",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bond",
				"type": "uint256"
			}
		],
		"name": "ExecutionChallenged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "initiator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bond",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "ExecutionInitiated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "initiator",
				"type": "address"
			}
		],
		"name": "ExecutionSlashed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			}
		],
		"name": "initiateWillExecution",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "performData",
				"type": "bytes"
			}
		],
		"name": "performUpkeep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_wasInitiationCorrect",
				"type": "bool"
			}
		],
		"name": "resolveDispute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_consumerAddress",
				"type": "address"
			}
		],
		"name": "setFunctionsConsumer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_subscriptionId",
				"type": "uint64"
			}
		],
		"name": "setFunctionsSubscriptionId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_yearOfBirth",
				"type": "string"
			}
		],
		"name": "setTestatorInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "yearOfBirth",
				"type": "string"
			}
		],
		"name": "TestatorInfoUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newName",
				"type": "string"
			}
		],
		"name": "TestatorNameUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			}
		],
		"name": "UpkeepFinalizedWill",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "willHash",
				"type": "bytes32"
			}
		],
		"name": "WillCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newWillHash",
				"type": "bytes32"
			}
		],
		"name": "WillEdited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "testator",
				"type": "address"
			}
		],
		"name": "WillVerified",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "CHALLENGE_DURATION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "checkUpkeep",
		"outputs": [
			{
				"internalType": "bool",
				"name": "upkeepNeeded",
				"type": "bool"
			},
			{
				"internalType": "bytes",
				"name": "performData",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CONTRACT_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "functionsConsumerAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "functionsSubscriptionId",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			}
		],
		"name": "getBeneficiaries",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			}
		],
		"name": "getChallengeEndTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			}
		],
		"name": "getTestatorName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_beneficiary",
				"type": "address"
			}
		],
		"name": "getTestatorsForBeneficiary",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_testator",
				"type": "address"
			}
		],
		"name": "getVerificationStatus",
		"outputs": [
			{
				"internalType": "enum Will.Status",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "testator",
				"type": "address"
			}
		],
		"name": "getWIllhash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_CHALLENGE_BOND",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_INITIATOR_BOND",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "s_testatorYearOfBirth",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "s_verificationStatus",
		"outputs": [
			{
				"internalType": "enum Will.Status",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "s_willExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "s_willHashes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Hardcoded test data
export const HARDCODED_DATA = {
  beneficiaries: [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  ],
  willHash:
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  testatorAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  bondAmount: "0.1", // ETH
};

// Status mapping
export const STATUS_NAMES = {
  0: "Not Started",
  1: "Challenge Period Active",
  2: "Pending Resolution",
  3: "Verified",
  4: "Slashed",
};

export const STATUS_CLASSES = {
  0: "status-not-started",
  1: "status-challenge-period",
  2: "status-pending",
  3: "status-verified",
  4: "status-slashed",
};
