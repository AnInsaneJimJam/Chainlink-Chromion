import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { FileClock, ShieldCheck, Play, ChevronsRight } from 'lucide-react';

const CONTRACT_ADDRESS = "0x910187850ed335706d3393815a0ec1f84ac6e958";
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

const Header = () => (
  <header className="py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
    <div className="flex items-center gap-3">
      <ShieldCheck className="text-blue-600" size={32} />
      <h1 className="text-2xl font-bold text-gray-800">InheritChain</h1>
    </div>
    <button className="font-semibold text-gray-600 hover:text-red-500 transition-colors">
      Disconnect
    </button>
  </header>
);

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
    Verified: <ShieldCheck size={16} />
  };

  const statusColors = {
    NotStarted: "bg-gray-200 text-gray-700",
    ChallengePeriodActive: "bg-amber-100 text-amber-800",
    Verified: "bg-green-100 text-green-800"
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
        {inheritance.status === "ChallengePeriodActive" && (
          <button onClick={() => onChallenge(inheritance.address)} className="flex items-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white">
            Challenge <ChevronsRight size={16} />
          </button>
        )}
        {inheritance.status === "Verified" && (
          <button onClick={() => onInherit(inheritance.address)} className="flex items-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white">
            Inherit Inheritance <ChevronsRight size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const BeneficiaryDashboard = () => {
  const [inheritances, setInheritances] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleInitiate = async (testatorAddr, customEthAmount = "0.1") => {
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


  const handleChallenge = async (addr) => {
    console.log("Challenge execution for", addr);
    // Call challengeWillExecution here
  };

  const handleInherit = async (addr) => {
    console.log("Inherit from", addr);
    // Logic for inheriting assets
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Beneficiary Dashboard</h2>
          <p className="text-gray-600">Manage inheritances where you are the designated beneficiary.</p>
        </motion.div>

        <motion.div
          className="mt-8 space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            hidden: { opacity: 0 }
          }}
        >
          <AnimatePresence>
            {loading ? (
              <div className="text-gray-500 text-center">Loading testators...</div>
            ) : inheritances.length === 0 ? (
              <div className="text-gray-500 text-center">No inheritances found.</div>
            ) : (
              inheritances.map((i) => (
                <InheritanceCard key={i.id} inheritance={i} onInitiate={handleInitiate} onChallenge={handleChallenge} onInherit={handleInherit} />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default BeneficiaryDashboard;
