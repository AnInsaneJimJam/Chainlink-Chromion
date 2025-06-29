import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { FileClock, ShieldCheck, Play, ChevronsRight } from 'lucide-react';
import Header from "@/components/Header";

const CONTRACT_ADDRESS = "0x1F08307D976f7fEE660886f9C40AAD8217645135";
const InheritanceABI = [
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

const statusMap = {
	0: "NotStarted",
	1: "ChallengePeriodActive",
	2: "PendingResolution",
	3: "Verified",
	4: "Slashed"
};

const InheritanceCard = ({ inheritance, onInitiate, onChallenge, onInherit }) => {
	const Countdown = ({ endDate }) => {
		const calculateTimeLeft = () => {
			const diff = +new Date(endDate) - +new Date();
			let time = {};
			if (diff > 0) {
				time = {
					days: Math.floor(diff / (1000 * 60 * 60 * 24)),
					hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((diff / 1000 / 60) % 60)
				};
			}
			return time;
		};

		const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

		useEffect(() => {
			const timer = setInterval(() => {
				setTimeLeft(calculateTimeLeft());
			}, 60000);
			return () => clearInterval(timer);
		}, []);

		return (
			<div className="text-sm font-medium text-amber-700">
				{timeLeft.days > 0 && `${timeLeft.days}d `}
				{timeLeft.hours > 0 && `${timeLeft.hours}h `}
				{timeLeft.minutes > 0 && `${timeLeft.minutes}m `}left to challenge
			</div>
		);
	};

	const statusIcons = {
		NotStarted: <Play size={16} />,
		ChallengePeriodActive: <FileClock size={16} />,
		PendingResolution: <FileClock size={16} />,
		Verified: <ShieldCheck size={16} />,
		Slashed: <ShieldCheck className="text-red-600" size={16} />
	};

	const statusColors = {
		NotStarted: "bg-gray-200 text-gray-700",
		ChallengePeriodActive: "bg-amber-100 text-amber-800",
		PendingResolution: "bg-blue-100 text-blue-800",
		Verified: "bg-green-100 text-green-800",
		Slashed: "bg-red-100 text-red-800"
	};


	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.4 }}
			className="border border-gray-200/80 rounded-xl p-5 bg-white shadow-sm hover:shadow-lg transition-all"
		>
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						<h3 className="font-semibold text-lg text-gray-900">{inheritance.name}</h3>
						<span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${statusColors[inheritance.status]}`}>
							{statusIcons[inheritance.status]}
							{inheritance.status.replace(/([A-Z])/g, ' $1').trim()}
						</span>
					</div>
					<div className="text-sm text-gray-600">
						<div>
							<span className="font-medium text-gray-700">Testator Address:</span> {inheritance.address}
						</div>
						{inheritance.status === "ChallengePeriodActive" && inheritance.waitingPeriodEndDate && (
							<Countdown endDate={inheritance.waitingPeriodEndDate} />
						)}
					</div>
				</div>
				{inheritance.status === "NotStarted" && (
					<button
						onClick={() => {
							const eth = prompt("Enter ETH to bond (min 0.001):", "0.001");
							if (eth && parseFloat(eth) >= 0.001) {
								onInitiate(inheritance.address, eth);
							} else {
								alert("Must bond at least 0.001 ETH");
							}
						}}
						className="flex items-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
					>
						Initiate Inheritance <ChevronsRight size={16} />
					</button>
				)}
				{/* {inheritance.status === "ChallengePeriodActive" && (
					<button
						onClick={() => onChallenge(inheritance.address)}
						className="flex items-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg bg-orange-600 hover:bg-orange-700 text-white"
					>
						Challenge
          </button>
				)} */}
				{inheritance.status === "Verified" && (
					<button
						onClick={() => onInherit(inheritance.address)}
						className="flex items-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white"
					>
						✔ Inheritable
					</button>
				)}
				{inheritance.status === "PendingResolution" && (
					<div className="px-4 py-2 text-sm text-blue-800 bg-blue-50 font-medium rounded-lg">
						Will is under dispute – Pending Resolution
					</div>
				)}
			</div>
		</motion.div>
	);
};

const BeneficiaryDashboard = () => {
	const [inheritances, setInheritances] = useState([]);
	const [loading, setLoading] = useState(true);
	const [walletAddress, setWalletAddress] = useState("");

	useEffect(() => {
		const getWalletAddress = async () => {
			if (window.ethereum) {
				try {
					const provider = new ethers.BrowserProvider(window.ethereum);
					const signer = await provider.getSigner();
					const address = await signer.getAddress();
					setWalletAddress(address);
				} catch (err) {
					setWalletAddress("");
				}
			}
		};
		getWalletAddress();
	}, []);

	const handleDisconnect = () => {
		// Optionally clear wallet state, then reload
		setWalletAddress("");
		window.location.href = "/";
	};

	const fetchTestators = async () => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const userAddress = await signer.getAddress();
			console.log(userAddress);

			const contract = new ethers.Contract(CONTRACT_ADDRESS, [
				...InheritanceABI,
				"function getChallengeEndTime(address) view returns (uint256)"
			], provider);

			const rawResult = await contract.getTestatorsForBeneficiary(userAddress);
			const testatorAddresses = Array.from(rawResult);
			console.log("Testators:", testatorAddresses);

			const data = await Promise.all(
				testatorAddresses.map(async (addr, index) => {
					let name = await contract.getTestatorName(addr);
					let statusEnum = await contract.s_verificationStatus(addr);
					const status = statusMap[statusEnum];

					let endTime = null;
					if (status === "ChallengePeriodActive") {
						try {
							const endTimeRaw = await contract.getChallengeEndTime(addr);
							endTime = new Date(Number(endTimeRaw) * 1000).toISOString(); // convert from seconds to ISO string
						} catch (e) {
							console.warn(`Failed to fetch endTime for ${addr}:`, e);
						}
					}

					return {
						id: index + 1,
						address: addr,
						name: name || `Testator ${addr.slice(0, 6)}...`,
						status,
						waitingPeriodEndDate: endTime
					};
				})
			);

			setInheritances(data);
		} catch (e) {
			console.error("Error loading testators:", e);
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		fetchTestators();
	}, []);

	const handleInitiate = async (testatorAddr, customEthAmount = "0.001") => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, InheritanceABI, signer);

			const tx = await contract.initiateWillExecution(testatorAddr, {
				value: ethers.parseEther(customEthAmount),
			});

			console.log("Transaction sent:", tx.hash);
			await tx.wait();
			console.log("Inheritance initiation successful");

			fetchTestators(); // refresh UI
		} catch (err) {
			console.error("Error initiating inheritance:", err);
			alert("Failed to initiate inheritance: " + (err.reason || err.message));
		}
	};


	const handleChallenge = async (testatorAddress) => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, InheritanceABI, signer);

			const tx = await contract.challengeWillExecution(testatorAddress, {
				value: ethers.parseEther("0.001"), // MIN_CHALLENGE_BOND
			});
			await tx.wait();

			alert("Challenge submitted! Waiting for dispute resolution.");
			fetchTestators(); // refresh UI
		} catch (err) {
			console.error("Challenge failed:", err);
			alert("Challenge failed. See console for details.");
		}
	};

	const RPC_URLS = {
		sepolia: "https://sepolia.infura.io/v3/YOUR_INFURA_ID", // optional, in case needed
		polygon: "https://rpc-amoy.polygon.technology/",
		avalanche: "https://api.avax-test.network/ext/bc/C/rpc"
	};


	const handleInherit = async (testatorAddress) => {
		console.log("handleInherit called")
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const beneficiaryAddress = await signer.getAddress();

		// 1. Fetch smart wallets of testator
		const walletsRes = await fetch(`http://localhost:5000/api/wallets/${testatorAddress}`);
		const { wallets: testatorSmartWallets } = await walletsRes.json();
		// 2. Fetch will allocations for this testator
		const willRes = await fetch(`http://localhost:5000/api/wills/${testatorAddress}`);
		const willData = await willRes.json(); // ensure this returns full will, not wrapped
		const beneficiary = willData.beneficiaries.find(
			(b) => b.address.toLowerCase() === beneficiaryAddress.toLowerCase()
		);
		const batchTransfers = [];

		// 3. Iterate through each allocation
		for (const { chain, percentage } of beneficiary.allocations) {
			const smartWallet = testatorSmartWallets[chain];
			console.log(`Checking smart wallet on ${chain}:`, smartWallet);
			if (!smartWallet) throw new Error(`Smart wallet not found for chain: ${chain}`);

			const rpcUrl = RPC_URLS[chain];
			if (!rpcUrl) throw new Error(`Unsupported chain: ${chain}`);

			const chainProvider = new ethers.JsonRpcProvider(rpcUrl);
			const walletBalance = await chainProvider.getBalance(smartWallet); // returns BigInt
			console.log(`Balance on ${chain}:`, walletBalance.toString());

			const share = walletBalance * BigInt(percentage) / BigInt(100);

			// Truncate to 4 decimal places (in ETH)
			const shareInEthFloat = parseFloat(ethers.formatEther(share)).toFixed(4);
			const finalShare = ethers.parseEther(shareInEthFloat); // convert back to BigInt

			batchTransfers.push({
				destChainName: chain,
				amount: finalShare,
				destChainWallet: smartWallet
			});
		}
		console.log(batchTransfers)
		const MAIN_COORDINATOR_ADDRESS = "0xD3B2010d2CD19A6B8C53588Afc46483f70367dFA";
		const ABI = [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_router",
						"type": "address"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"inputs": [],
				"name": "BatchCannotBeEmpty",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "required",
						"type": "uint256"
					}
				],
				"name": "NotEnoughNative",
				"type": "error"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "uint64",
						"name": "destChainSelector",
						"type": "uint64"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "CrossChainActionInitiated",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "messageId",
						"type": "bytes32"
					},
					{
						"indexed": true,
						"internalType": "uint64",
						"name": "destinationChainSelector",
						"type": "uint64"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "receiver",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "action",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "address",
						"name": "feeToken",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "fees",
						"type": "uint256"
					}
				],
				"name": "MessageSent",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint64",
						"name": "chainSelector",
						"type": "uint64"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"name": "receiveBalance",
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
						"name": "user",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint64",
						"name": "chainSelector",
						"type": "uint64"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"name": "ReceivedBalance",
				"type": "event"
			},
			{
				"inputs": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "destChainName",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "destChainWallet",
								"type": "address"
							}
						],
						"internalType": "struct MainCoordinator.BatchTransfer[]",
						"name": "_transfers",
						"type": "tuple[]"
					},
					{
						"internalType": "address",
						"name": "_to",
						"type": "address"
					}
				],
				"name": "requestActionBatch",
				"outputs": [
					{
						"internalType": "bytes32[]",
						"name": "messageIds",
						"type": "bytes32[]"
					}
				],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"stateMutability": "payable",
				"type": "receive"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"name": "s_destChainInfo",
				"outputs": [
					{
						"internalType": "uint64",
						"name": "selector",
						"type": "uint64"
					},
					{
						"internalType": "address",
						"name": "logicContract",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		]
		// 4. Prepare and call MainCoordinator contract
		const coordinator = new ethers.Contract(MAIN_COORDINATOR_ADDRESS, ABI, signer);

		// Optional: Estimate fees first by looping over s_router.getFee(...) off-chain

		// Call contract: _to = beneficiaryAddress
		const tx = await coordinator.requestActionBatch(batchTransfers, beneficiaryAddress, {
			value: ethers.parseEther("0.002") // rough overpayment for gas fee
		});
		//     await coordinator.requestActionBatch(
		//   [
		//     {
		//       destChainName: "polygon",
		//       amount: 250000000000000000n,
		//       destChainWallet: "0x3914AC378A3D94192fC902C4b8e328ED2611F849"
		//     },
		//     {
		//       destChainName: "avalanche",
		//       amount: 50000000000000000n,
		//       destChainWallet: "0x7D0cd861fAC3E694511946695c353534C7c3808B"
		//     }
		//   ],
		//   "0x8dd2dFFBc2eaf6daa0bFF956fF5bc24D00724c1A", // <-- passed separately here
		//   { value: ethers.parseEther("0.02") }
		// );


		await tx.wait();
		console.log("Inheritance claim triggered via CCIP");
	};


	return (
		<div className="relative min-h-screen w-full font-inter overflow-x-hidden flex flex-col" style={{ background: '#EAF6FF' }}>
			{/* Fixed Background Layers */}
			<div className="fixed-background" style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, background: 'radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%)', zIndex: 0, overflow: 'hidden' }}>
				<div style={{ position: 'absolute', width: '150vmax', height: '150vmax', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-9.478deg)', background: '#CDEFFF', mixBlendMode: 'hue' }}></div>
				<div style={{ position: 'absolute', width: '150vmax', height: '150vmax', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-30.74deg)', background: 'url(https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg) lightgray 50% / cover no-repeat', opacity: 0.25, boxShadow: '0px 0px 114.717px 0px #CDEFFF' }}></div>
			</div>
			<Header showDisconnect onDisconnect={handleDisconnect} walletAddress={walletAddress} />
			{/* Main Dashboard */}
			<div className="main-content flex-1 flex flex-col text-center items-center justify-center pt-28 pb-12 px-8 lg:px-12 relative z-10 w-full max-w-[1400px] mx-auto">
				<h1 className="font-clash page-title text-[48px] font-semibold text-[#2D2D2D] ">Beneficiary Dashboard</h1>
				<p className="font-inter page-subtitle mt-1 text-[22px] text-[#767676]">View and manage inheritances where you are named as a beneficiary</p>
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-8">
					<div className="stat-card rounded-[15px] border border-[rgba(4,105,171,0.3)] bg-[rgba(255,255,255,0.5)] p-5 text-center">
						<p className="font-clash stat-value text-[36px] text-[#25292A] font-semibold">{inheritances.length}</p>
						<p className="font-inter stat-label text-[18px] text-[#767676] font-medium">Total Inheritances</p>
					</div>
					<div className="stat-card rounded-[15px] border border-[rgba(4,105,171,0.3)] bg-[rgba(255,255,255,0.5)] p-5 text-center">
						<p className="font-clash stat-value text-[36px] text-[#25292A] font-semibold">{inheritances.filter(i => i.status === 'ChallengePeriodActive').length}</p>
						<p className="font-inter stat-label text-[18px] text-[#767676] font-medium">Pending Investigation</p>
					</div>
				</div>
				<h2 className="font-clash section-title text-[36px] font-semibold text-[#2D2D2D] mb-6">Your Inheritances</h2>
				<div className="w-full space-y-6 min-h-[40vh] flex flex-col justify-center">
					<AnimatePresence>
						{loading ? (
							<div className="text-gray-500 text-center">Loading testators...</div>
						) : inheritances.length === 0 ? (
							<div className="text-gray-500 text-center">No inheritances found.</div>
						) : (
							inheritances.map((i) => (
								<div
									key={i.id}
									className={
										`inheritance-card flex justify-between items-center rounded-[15px] border-[1.5px] border-[rgba(4,105,171,0.3)] bg-[rgba(234,246,255,0.5)] backdrop-blur-[10px] p-6` +
										(i.status === 'Slashed' ? ' opacity-60' : '')
									}
								>
									<div>
										<div className="flex items-center gap-4">
											<h3 className="card-name font-inter text-[24px] font-semibold text-[#2D2D2D]">{i.name}</h3>
											{/* Status badge */}
											{i.status === 'Verified' && (
												<span className="status-badge status-green inline-flex items-center gap-1 px-3 py-1 rounded-[20px] text-[14px] font-semibold bg-[#D5FFE6] text-[#12703D] border border-[#12703D]">✔ Active</span>
											)}
											{i.status === 'ChallengePeriodActive' && (
												<span className="status-badge status-orange inline-flex items-center gap-1 px-3 py-1 rounded-[20px] text-[14px] font-semibold bg-[#FEF3C7] text-[#B45309] border border-[#B45309]">⊗ Pending Investigation</span>
											)}
											{i.status === 'NotStarted' && (
												<span className="status-badge status-gray inline-flex items-center gap-1 px-3 py-1 rounded-[20px] text-[14px] font-semibold bg-[#F3F4F6] text-[#4B5563] border border-[#9CA3AF]">⊗ Not Yet Initiated</span>
											)}
											{i.status === 'PendingResolution' && (
												<span className="status-badge status-purple inline-flex items-center gap-1 px-3 py-1 rounded-[20px] text-[14px] font-semibold bg-[#E0E7FF] text-[#4338CA] border border-[#6366F1]">⟳ Under Oracle Review</span>
											)}
											{i.status === 'Slashed' && (
												<span className="status-badge status-red inline-flex items-center gap-1 px-3 py-1 rounded-[20px] text-[14px] font-semibold bg-[#FEE2E2] text-[#B91C1C] border border-[#DC2626]">⊗ Canceled by Testator</span>
											)}
										</div>
										<div className="mt-2 space-y-1 text-left">
											{/* Card content by status */}
											{i.status === 'Verified' && (
												<>
													<p><span className="card-label text-[#767676] text-[16px] font-medium">Address:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.address}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-medium">Last Updated:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.lastUpdated || '--'}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-medium">Estimated Value:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.estimatedValue || '--'} ETH</span></p>
													<p className="card-description mt-2 text-[#767676] italic">Will successfully executed and assets distributed</p>
												</>
											)}
											{i.status === 'ChallengePeriodActive' && (
												<>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Initiated by:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.initiatedBy || '--'}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Staked:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.staked || '0.001'} ETH</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Last Updated:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.lastUpdated || '--'}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Estimated Value:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.estimatedValue || '--'} ETH</span></p>
													<p className="card-description mt-2 italic text-orange-600 font-inter font-semibold">{i.timeLeft || '9d 23h 19m'} left to challenge</p>
												</>
											)}
											{i.status === 'NotStarted' && (
												<>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Address:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.address}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Last Updated:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.lastUpdated || '--'}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Estimated Value:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.estimatedValue || '--'} ETH</span></p>
												</>
											)}
											{i.status === 'PendingResolution' && (
												<>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Address:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.address}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Last Updated:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.lastUpdated || '--'}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash display font-medium">Estimated Value:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.estimatedValue || '--'} ETH</span></p>
													<p className="card-description mt-2 italic text-purple-600 font-semibold">Calling Chainlink API...</p>
												</>
											)}
											{i.status === 'Slashed' && (
												<>
													<p><span className="card-label text-[#767676] text-[16px] font-clash displayfont-medium">Address:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.address}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash displayfont-medium">Last Updated:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.lastUpdated || '--'}</span></p>
													<p><span className="card-label text-[#767676] text-[16px] font-clash displayfont-medium">Estimated Value:</span> <span className="card-value text-[#2D2D2D] text-[16px] font-medium">{i.estimatedValue || '--'} ETH</span></p>
												</>
											)}
										</div>
									</div>
									{/* Card Button by status */}
									{i.status === 'Verified' && (
										<button className="card-button btn-green flex items-center gap-2 px-6 py-3 rounded-[25px] text-[16px] font-semibold bg-[#12703D] text-white shadow" onClick={() => handleInherit(i.address)}>✔ Inheritable</button>
									)}
									{i.status === 'ChallengePeriodActive' && (
										<button className="card-button btn-orange flex items-center gap-2 px-6 py-3 rounded-[25px] text-[16px] font-semibold bg-[#D97706] text-white shadow" onClick={() => handleChallenge(i.address)}>Challenge</button>
									)}
									{i.status === 'NotStarted' && (
										<button className="card-button btn-blue flex items-center gap-2 px-6 py-3 rounded-[25px] text-[16px] font-semibold bg-[#0167AF] text-white shadow" onClick={() => handleInitiate(i.address)}>Initiate Inheritance</button>
									)}
									{i.status === 'PendingResolution' && (
										<button className="card-button btn-gray flex items-center gap-2 px-6 py-3 rounded-[25px] text-[16px] font-semibold bg-[#D1D5DB] text-[#4B5563] cursor-not-allowed" disabled>Reviewing</button>
									)}
									{i.status === 'Slashed' && (
										<button className="card-button btn-red flex items-center gap-2 px-6 py-3 rounded-[25px] text-[16px] font-semibold bg-[#DC2626] text-white cursor-not-allowed" disabled>Will Rejected</button>
									)}
								</div>
							))
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default BeneficiaryDashboard;
