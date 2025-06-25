import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { FileClock, ShieldCheck, Play, AlertTriangle, ChevronsRight } from 'lucide-react';

// --- MOCK/PSEUDOCODE for Smart Contract & Chainlink ---

// This is a mock ABI for demonstration purposes.
const InheritanceABI = [
    "function initiateInheritance(uint256 inheritanceId) payable",
    "function challenge(uint256 inheritanceId)",
    "function claimInheritance(uint256 inheritanceId)",
    "function getInheritanceStatus(uint256 inheritanceId) view returns (uint8)",
    "event InheritanceInitiated(uint256 indexed inheritanceId, address indexed beneficiary, uint256 waitingPeriodEnds)",
    "event ChallengeSucceeded(uint256 indexed inheritanceId, address indexed challenger)",
    "event InheritanceClaimed(uint256 indexed inheritanceId, address indexed beneficiary)"
];

const CONTRACT_ADDRESS = "0x...YourContractAddress"; // Replace with your actual contract address

// Pseudo-function to simulate calling a Chainlink function for verification
const triggerChainlinkVerification = async (inheritance) => {
    console.log(`(PSEUDO) Triggering Chainlink verification for: ${inheritance.name}`);
    // This would involve:
    // 1. Creating a Chainlink Functions request.
    // 2. The request script would query an off-chain API (e.g., vital records).
    // 3. The result would be reported back to the smart contract.
    // For this demo, we'll simulate a 'false' return (person is not deceased).
    return new Promise(resolve => setTimeout(() => resolve(false), 2000));
};


// --- React Components ---

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

const StakeModal = ({ isOpen, onClose, onConfirm, inheritance }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col items-center text-center">
                        <AlertTriangle className="text-yellow-500 mb-4" size={48} />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Inheritance Initiation</h2>
                        <p className="text-gray-600 mb-6">
                            You are about to initiate the inheritance process for{' '}
                            <span className="font-semibold text-gray-900">{inheritance.name}</span>. This requires staking{' '}
                            <span className="font-bold text-blue-600">0.5 ETH</span> to start the 10-day waiting period.
                        </p>
                        <div className="flex gap-4 w-full">
                            <button
                                onClick={onClose}
                                className="w-full py-3 px-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-700/40"
                            >
                                Stake & Initiate
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


const InheritanceCard = ({ inheritance, onUpdate }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleInitiate = async () => {
        setIsLoading(true);
        console.log(`(PSEUDO) Initiating for ${inheritance.id}`);
        try {
            // --- SMART CONTRACT INTERACTION ---
            // const provider = new ethers.BrowserProvider(window.ethereum);
            // const signer = await provider.getSigner();
            // const contract = new ethers.Contract(CONTRACT_ADDRESS, InheritanceABI, signer);
            // const stakeAmount = ethers.parseEther("0.5");
            // const tx = await contract.initiateInheritance(inheritance.id, { value: stakeAmount });
            // await tx.wait();

            // For demonstration, we simulate success after 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log("✅ (PSEUDO) Initiation successful!");
            const waitingPeriodEndDate = new Date();
            waitingPeriodEndDate.setDate(waitingPeriodEndDate.getDate() + 10);
            onUpdate(inheritance.id, { status: 'WaitingPeriodActive', waitingPeriodEndDate: waitingPeriodEndDate.toISOString() });
        } catch (error) {
            console.error("Initiation failed:", error);
            alert("Failed to initiate inheritance.");
        }
        setIsLoading(false);
    };

    const handleChallenge = async () => {
        if (!confirm("Are you sure you want to challenge this inheritance? This will trigger a Chainlink verification.")) return;
        
        setIsLoading(true);
        console.log(`(PSEUDO) Challenging for ${inheritance.id}`);
        try {
            const isAlive = await triggerChainlinkVerification(inheritance);
            
            // --- SMART CONTRACT INTERACTION ---
            // The Chainlink function would return this value to the contract,
            // which would then handle the state change and stake slashing.
            // const tx = await contract.challenge(inheritance.id); // The contract would get the result from the oracle
            // await tx.wait();

            if (isAlive === false) { // Simulating the person is NOT alive
                 console.log("✅ (PSEUDO) Challenge passed! Person confirmed deceased.");
                 // In a real scenario, the contract would update the status.
                 // Here, we manually move to Verified.
                 onUpdate(inheritance.id, { status: 'Verified' });
            } else {
                 console.log("❌ (PSEUDO) Challenge failed! Person is alive. Stake lost.");
                 // Stake is lost, revert status to Not Started
                 alert("Verification returned that the person is alive. Your stake has been lost.");
                 onUpdate(inheritance.id, { status: 'NotStarted' });
            }

        } catch (error) {
            console.error("Challenge failed:", error);
            alert("Failed to challenge inheritance.");
        }
        setIsLoading(false);
    };

    const handleInherit = async () => {
        setIsLoading(true);
        console.log(`(PSEUDO) Inheriting for ${inheritance.id}`);
        try {
             // --- SMART CONTRACT INTERACTION ---
            // const tx = await contract.claimInheritance(inheritance.id);
            // await tx.wait();
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log("✅ (PSEUDO) Inheritance successful!");
            onUpdate(inheritance.id, { status: 'Completed', estimatedValue: '0 ETH' });
        } catch (error) {
            console.error("Inheritance claim failed:", error);
            alert("Failed to claim inheritance.");
        }
        setIsLoading(false);
    };

    const Countdown = ({ endDate }) => {
        const calculateTimeLeft = () => {
            const difference = +new Date(endDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                };
            }
            return timeLeft;
        };

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

        useEffect(() => {
            const timer = setTimeout(() => {
                const newTimeLeft = calculateTimeLeft();
                if (Object.keys(newTimeLeft).length === 0) {
                    onUpdate(inheritance.id, { status: 'Verified' });
                    clearInterval(timer);
                } else {
                    setTimeLeft(newTimeLeft);
                }
            }, 1000 * 60); // Update every minute is enough for this demo

            return () => clearTimeout(timer);
        });

        return (
            <div className="text-sm font-medium text-amber-700">
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {timeLeft.hours > 0 && `${timeLeft.hours}h `}
                {timeLeft.minutes > 0 && `${timeLeft.minutes}m `}
                left to challenge
            </div>
        );
    };

    const statusConfig = {
        NotStarted: {
            label: 'Not Started',
            color: 'bg-gray-200 text-gray-700',
            icon: <Play size={16} />,
            action: () => setModalOpen(true),
            actionLabel: 'Initiate Inheritance',
            actionColor: 'bg-blue-600 hover:bg-blue-700 text-white'
        },
        WaitingPeriodActive: {
            label: 'Waiting Period Active',
            color: 'bg-amber-100 text-amber-800',
            icon: <FileClock size={16} />,
            action: handleChallenge,
            actionLabel: 'Challenge',
            actionColor: 'bg-red-600 hover:bg-red-700 text-white'
        },
        Verified: {
            label: 'Verified',
            color: 'bg-green-100 text-green-800',
            icon: <ShieldCheck size={16} />,
            action: handleInherit,
            actionLabel: 'Inherit Amount',
            actionColor: 'bg-green-600 hover:bg-green-700 text-white'
        },
         Completed: {
            label: 'Completed',
            color: 'bg-indigo-100 text-indigo-800',
            icon: <ShieldCheck size={16} />,
        },
    };

    const currentStatus = statusConfig[inheritance.status];
    const [isModalOpen, setModalOpen] = useState(false);

    return (
       <>
         <StakeModal 
            isOpen={isModalOpen} 
            onClose={() => setModalOpen(false)} 
            onConfirm={() => {
                setModalOpen(false);
                handleInitiate();
            }}
            inheritance={inheritance}
        />
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="border border-gray-200/80 rounded-xl p-5 bg-white shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{inheritance.name}</h3>
                         <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${currentStatus.color}`}>
                            {currentStatus.icon}
                            {currentStatus.label}
                        </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                        <div><span className="font-medium text-gray-700">Testator Address:</span> {inheritance.address}</div>
                        <div><span className="font-medium text-gray-700">Estimated Value:</span> <span className="font-bold text-gray-800">{inheritance.estimatedValue}</span></div>
                        {inheritance.status === 'WaitingPeriodActive' && inheritance.waitingPeriodEndDate && (
                            <div className="pt-1">
                                <Countdown endDate={inheritance.waitingPeriodEndDate} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                   {currentStatus.action && (
                        <button
                            onClick={currentStatus.action}
                            disabled={isLoading}
                            className={`w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg shadow-md transition-all ${currentStatus.actionColor} disabled:bg-gray-400 disabled:cursor-not-allowed`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                 {currentStatus.actionLabel}
                                 {inheritance.status !== 'WaitingPeriodActive' && <ChevronsRight size={16} />}
                                </>
                            )}
                        </button>
                   )}
                </div>
            </div>
        </motion.div>
       </>
    );
};


const BeneficiaryDashboard = () => {
    const [inheritances, setInheritances] = useState([
        {
            id: 1,
            name: "Alice Worthington",
            address: "0x91f...44955",
            estimatedValue: "2.5 ETH",
            status: "NotStarted",
            waitingPeriodEndDate: null
        },
        {
            id: 2,
            name: "Robert Pendelton",
            address: "0x157...59961",
            estimatedValue: "1.8 ETH",
            status: "WaitingPeriodActive",
            waitingPeriodEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days from now
        },
        {
            id: 3,
            name: "Eleanor Vance",
            address: "0x127...40758",
            estimatedValue: "5.2 ETH",
            status: "Verified",
            waitingPeriodEndDate: null
        },
    ]);

    const handleUpdateInheritance = (id, newProps) => {
        setInheritances(prev =>
            prev.map(item => (item.id === id ? { ...item, ...newProps } : item))
        );
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
                    <p className="text-gray-600">
                        Manage inheritances where you are the designated beneficiary.
                    </p>
                </motion.div>
                
                <motion.div
                    className="mt-8 space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        },
                        hidden: { opacity: 0 }
                    }}
                >
                   <AnimatePresence>
                    {inheritances.map((inheritance) => (
                        <InheritanceCard
                            key={inheritance.id}
                            inheritance={inheritance}
                            onUpdate={handleUpdateInheritance}
                        />
                    ))}
                   </AnimatePresence>
                </motion.div>
            </main>
        </div>
    );
};

export default BeneficiaryDashboard;