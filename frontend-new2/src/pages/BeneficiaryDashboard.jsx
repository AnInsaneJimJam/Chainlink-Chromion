import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { FileClock, ShieldCheck, Play, AlertTriangle, ChevronsRight } from 'lucide-react';

// --- MOCK CONTRACT CONFIG ---
const CONTRACT_ADDRESS = "0x076af07022a92cCFdAF1aB6CA42AfA9Ed0360097"; // Replace with your contract
const InheritanceABI = [
    "function getTestatorsForBeneficiary(address _beneficiary) view returns (address[])"
];

// --- UI COMPONENTS ---
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

const InheritanceCard = ({ inheritance }) => {
    const Countdown = ({ endDate }) => {
        const calculateTimeLeft = () => {
            const diff = +new Date(endDate) - +new Date();
            let time = {};
            if (diff > 0) {
                time = {
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                };
            }
            return time;
        };

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

        useEffect(() => {
            const timer = setInterval(() => {
                const newTime = calculateTimeLeft();
                setTimeLeft(newTime);
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

    const statusConfig = {
        NotStarted: {
            label: 'Not Started',
            color: 'bg-gray-200 text-gray-700',
            icon: <Play size={16} />,
            actionLabel: 'Initiate Inheritance',
            actionColor: 'bg-blue-600 hover:bg-blue-700 text-white'
        },
        WaitingPeriodActive: {
            label: 'Waiting Period Active',
            color: 'bg-amber-100 text-amber-800',
            icon: <FileClock size={16} />,
            actionLabel: 'Challenge',
            actionColor: 'bg-red-600 hover:bg-red-700 text-white'
        },
        Verified: {
            label: 'Verified',
            color: 'bg-green-100 text-green-800',
            icon: <ShieldCheck size={16} />,
            actionLabel: 'Inherit Amount',
            actionColor: 'bg-green-600 hover:bg-green-700 text-white'
        },
        Completed: {
            label: 'Completed',
            color: 'bg-indigo-100 text-indigo-800',
            icon: <ShieldCheck size={16} />
        },
    };

    const currentStatus = statusConfig[inheritance.status];

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
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${currentStatus.color}`}>
                            {currentStatus.icon}
                            {currentStatus.label}
                        </span>
                    </div>
                    <div className="text-sm text-gray-600">
                        <div>
                            <span className="font-medium text-gray-700">Testator Address:</span> {inheritance.address}
                        </div>
                        {inheritance.status === "WaitingPeriodActive" && inheritance.waitingPeriodEndDate && (
                            <Countdown endDate={inheritance.waitingPeriodEndDate} />
                        )}
                    </div>
                </div>
                {currentStatus.actionLabel && (
                    <button
                        className={`flex items-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg shadow ${currentStatus.actionColor}`}
                    >
                        {currentStatus.actionLabel}
                        <ChevronsRight size={16} />
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
            if (!window.ethereum) return alert("Please connect your wallet.");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, InheritanceABI, provider);
            const userAddress = await signer.getAddress();

            const testatorAddresses = await contract.getTestatorsForBeneficiary(userAddress);

            const dummyNames = [
                "Alice Worthington",
                "Robert Pendelton",
                "Eleanor Vance",
                "Lucius Holt",
                "Isabel Crane"
            ];

            const mockStatuses = ["NotStarted", "WaitingPeriodActive", "Verified"];

            const mockInheritances = testatorAddresses.map((addr, index) => ({
                id: index + 1,
                address: addr,
                name: dummyNames[index % dummyNames.length],
                status: mockStatuses[index % mockStatuses.length],
                waitingPeriodEndDate: mockStatuses[index % mockStatuses.length] === "WaitingPeriodActive"
                    ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
                    : null
            }));

            setInheritances(mockInheritances);
        } catch (e) {
            console.error("Error loading testators:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestators();
    }, []);

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
                                <InheritanceCard key={i.id} inheritance={i} />
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
        </div>
    );
};

export default BeneficiaryDashboard;
