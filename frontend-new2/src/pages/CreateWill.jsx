// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Header from "@/components/Header";
// import ManageBeneficiariesModal from "@/components/ManageBeneficiariesModal";
// import DigitalAssetsModal from "@/components/DigitalAssetsModal";
// import { Edit, Users, BarChart3 } from "lucide-react";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
//   const [showAssetsModal, setShowAssetsModal] = useState(false);

//   const handleDisconnect = () => {
//     navigate("/");
//   };

//   const handleEditWill = () => {
//     navigate("/edit-will");
//   };

//   const handleManageBeneficiaries = () => {
//     setShowBeneficiariesModal(true);
//   };

//   const handleViewAssets = () => {
//     setShowAssetsModal(true);
//   };

//   return (
//     <motion.div
//       className="min-h-screen"
//       style={{
//         background: "linear-gradient(to bottom, #ffffff, #fafbfc)",
//       }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Header showDisconnect onDisconnect={handleDisconnect} />

//       <div className="container mx-auto px-6 py-8 max-w-4xl">

//         {/* Page Header */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 0.6 }}
//         >
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Testator Dashboard
//           </h1>
//           <p className="text-gray-600">
//             Create and manage your digital will to secure your assets for your
//             beneficiaries
//           </p>
//         </motion.div>

//         {/* Digital Will Status Card */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           <Card
//             className="p-6 border border-gray-200"
//             style={{
//               background: "linear-gradient(to right, #FFFFFF, #EAFFFF)",
//             }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Your Digital Will
//                 </h2>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
//                   Active
//                 </span>
//               </div>
//               <Button
//                 onClick={handleEditWill}
//                 className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit Will
//               </Button>
//             </div>

//             <div className="grid md:grid-cols-4 gap-6 text-sm">
//               <div>
//                 <div className="text-gray-600 mb-1">Created</div>
//                 <div className="font-medium text-gray-900">2025-06-18</div>
//               </div>
//               <div>
//                 <div className="text-gray-600 mb-1">Last Updated</div>
//                 <div className="font-medium text-gray-900">2025-06-18</div>
//               </div>
//               <div>
//                 <div className="text-gray-600 mb-1">Beneficiaries</div>
//                 <div className="font-medium text-gray-900">3</div>
//               </div>
//               <div>
//                 <div className="text-gray-600 mb-1">Total Assets</div>
//                 <div className="font-medium text-gray-900">6.2 ETH</div>
//               </div>
//             </div>
//           </Card>
//         </motion.div>

//         {/* Action Cards */}
//         <motion.div
//           className="grid md:grid-cols-2 gap-6"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           {/* Manage Beneficiaries Card */}
//           <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Users className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Manage Beneficiaries
//               </h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 Add, remove, or update beneficiaries and their asset allocations
//               </p>
//               <Button
//                 onClick={handleManageBeneficiaries}
//                 variant="outline"
//                 className="w-full"
//               >
//                 Manage
//               </Button>
//             </div>
//           </Card>

//           {/* Asset Overview Card */}
//           <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BarChart3 className="w-8 h-8 text-green-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Asset Overview
//               </h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 View all your digital assets and their current market values
//               </p>
//               <Button
//                 onClick={handleViewAssets}
//                 variant="outline"
//                 className="w-full"
//               >
//                 View Assets
//               </Button>
//             </div>
//           </Card>
//         </motion.div>
//       </div>

//       {/* Modals */}
//       <ManageBeneficiariesModal
//         isOpen={showBeneficiariesModal}
//         onClose={() => setShowBeneficiariesModal(false)}
//       />
//       <DigitalAssetsModal
//         isOpen={showAssetsModal}
//         onClose={() => setShowAssetsModal(false)}
//       />
//     </motion.div>
//   );
// };

// export default Dashboard;

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Header from "@/components/Header";
// import ManageBeneficiariesModal from "@/components/ManageBeneficiariesModal";
// import DigitalAssetsModal from "@/components/DigitalAssetsModal";
// import { Edit, Users, BarChart3, Plus } from "lucide-react";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
//   const [showAssetsModal, setShowAssetsModal] = useState(false);
//   const [willData, setWillData] = useState(null); // null means not loaded
//   const [loading, setLoading] = useState(true);

//   const handleDisconnect = () => {
//     navigate("/");
//   };

//   const handleEditWill = () => {
//     navigate("/edit-will");
//   };

//   const handleCreateWill = () => {
//     navigate("/create-will");
//   };

//   const handleManageBeneficiaries = () => {
//     setShowBeneficiariesModal(true);
//   };

//   const handleViewAssets = () => {
//     setShowAssetsModal(true);
//   };

//   useEffect(() => {
//     const fetchWillData = async () => {
//       try {
//         // TODO: Replace with on-chain call or backend API
//         // Example placeholder logic:
//         const res = await fetch(`/api/will/${"0xUSER"}`);
//         const data = await res.json();
//         if (data?.willExists) {
//           setWillData(data);
//         } else {
//           setWillData(undefined); // explicitly means no will
//         }
//       } catch (err) {
//         console.error("Error loading will data", err);
//         setWillData(undefined);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWillData();
//   }, []);

//   return (
//     <motion.div
//       className="min-h-screen"
//       style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Header showDisconnect onDisconnect={handleDisconnect} />

//       <div className="container mx-auto px-6 py-8 max-w-4xl">
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 0.6 }}
//         >
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Testator Dashboard
//           </h1>
//           <p className="text-gray-600">
//             Create and manage your digital will to secure your assets for your beneficiaries
//           </p>
//         </motion.div>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading your will...</p>
//         ) : willData ? (
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             <Card className="p-6 border border-gray-200" style={{ background: "linear-gradient(to right, #FFFFFF, #EAFFFF)" }}>
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <h2 className="text-xl font-semibold text-gray-900">Your Digital Will</h2>
//                   <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
//                     Active
//                   </span>
//                 </div>
//                 <Button
//                   onClick={handleEditWill}
//                   className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Edit Will
//                 </Button>
//               </div>

//               <div className="grid md:grid-cols-4 gap-6 text-sm">
//                 <div>
//                   <div className="text-gray-600 mb-1">Created</div>
//                   <div className="font-medium text-gray-900">{willData.createdDate || '...'}</div>
//                 </div>
//                 <div>
//                   <div className="text-gray-600 mb-1">Last Updated</div>
//                   <div className="font-medium text-gray-900">{willData.updatedDate || '...'}</div>
//                 </div>
//                 <div>
//                   <div className="text-gray-600 mb-1">Beneficiaries</div>
//                   <div className="font-medium text-gray-900">{willData.beneficiaries?.length || 0}</div>
//                 </div>
//                 <div>
//                   <div className="text-gray-600 mb-1">Total Assets</div>
//                   <div className="font-medium text-gray-900">{willData.totalAssets || '...'} ETH</div>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>
//         ) : (
//           <div className="text-center mb-8">
//             <p className="text-gray-600 mb-4">You have not created a digital will yet.</p>
//             <Button onClick={handleCreateWill} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
//               <Plus className="w-4 h-4" />
//               Create Will
//             </Button>
//           </div>
//         )}

//         {/* Action Cards */}
//         <motion.div
//           className="grid md:grid-cols-2 gap-6"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Users className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Manage Beneficiaries
//               </h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 Add, remove, or update beneficiaries and their asset allocations
//               </p>
//               <Button onClick={handleManageBeneficiaries} variant="outline" className="w-full">
//                 Manage
//               </Button>
//             </div>
//           </Card>

//           <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BarChart3 className="w-8 h-8 text-green-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Asset Overview
//               </h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 View all your digital assets and their current market values
//               </p>
//               <Button onClick={handleViewAssets} variant="outline" className="w-full">
//                 View Assets
//               </Button>
//             </div>
//           </Card>
//         </motion.div>
//       </div>

//       <ManageBeneficiariesModal isOpen={showBeneficiariesModal} onClose={() => setShowBeneficiariesModal(false)} />
//       <DigitalAssetsModal isOpen={showAssetsModal} onClose={() => setShowAssetsModal(false)} />
//     </motion.div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import Header from "@/components/Header";
// import useWalletStore from "../EtherJs/walletStore.js";
// import { ethers } from "ethers";

// const chainToSymbol = {
//           polygon: "MATIC",
//           ethereum: "ETH",
//           binancesmartchain: "BNB",
//           avalanche: "AVAX",
//         };

// const CreateWill = () => {
//   const { address, provider, contract } = useWalletStore();
//   const [wallets, setWallets] = useState({});
//   const [status, setStatus] = useState("");
//   const [balances, setBalances] = useState({});
//   const [walletAddress, setWalletAddress] = useState("");
//   const [beneficiaries, setBeneficiaries] = useState([
//     { id: 1, address: "", share: "" },
//   ]);

//   const fetchWallets = useCallback(async (address) => {
//     setStatus("Fetching deployed wallets...");
//     try {
//       const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
//       if (res.ok) {
//         const data = await res.json();
//         setWallets(data.wallets || {});
//         setStatus("");
//       } else {
//         setStatus("No existing smart wallets found.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setStatus("Could not fetch wallets. Using local state.");
//     }
//   }, []);

//   const fetchBalances = useCallback(async () => {
//     if (!provider || !wallets) return;
//     const newBalances = {};
//     for (const chain in wallets) {
//       const addr = wallets[chain];
//       try {
//         const balance = await provider.getBalance(addr);
//         newBalances[addr] = ethers.formatEther(balance);
//       } catch (err) {
//         newBalances[addr] = "0";
//       }
//     }
//     setBalances(newBalances);
//   }, [provider, wallets]);

//   useEffect(() => {
//     const getConnectedAddress = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();
//           const address = await signer.getAddress(); // ✅ gets mixed-case address
//           setWalletAddress(address);
//           fetchWallets(address);
//         } catch (error) {
//           console.error("Error fetching wallet:", error);
//         }
//       } else {
//         console.error("MetaMask not detected");
//       }
//     };

//     getConnectedAddress();
//   }, [fetchWallets]);

//   const addBeneficiary = () => {
//     setBeneficiaries([
//       ...beneficiaries,
//       { id: Date.now(), address: "", share: "" },
//     ]);
//   };

//   const updateBeneficiary = (id, field, value) => {
//     setBeneficiaries(
//       beneficiaries.map((b) =>
//         b.id === id ? { ...b, [field]: value } : b
//       )
//     );
//   };

//   const removeBeneficiary = (id) => {
//     setBeneficiaries(beneficiaries.filter((b) => b.id !== id));
//   };

//   const totalShare = beneficiaries.reduce(
//     (sum, b) => sum + parseFloat(b.share || 0),
//     0
//   );

//   const handleSubmit = async () => {
//     const payload = {
//       testator: address,
//       beneficiaries: beneficiaries.map(({ address, share }) => ({
//         address,
//         share,
//       })),
//     };

//     // Store will in MongoDB
//     try {
//       await fetch("http://localhost:5000/api/create-will", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//     } catch (err) {
//       console.error("Failed to save will in DB", err);
//     }

//     // On-chain logic
//     // const willHash = generateWillHash(payload); // TBD
//     // const tx = await contract.createWill(payload.beneficiaries.map(b => b.address), willHash);
//     // await tx.wait();
//   };

//   return (
//     <motion.div
//       className="min-h-screen"
//       style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Header />
//       <div className="container mx-auto px-6 py-8 max-w-4xl">
//         <h1 className="text-3xl font-bold mb-6">Create Your Digital Will</h1>

//         {/* Smart Wallets */}
//         <Card className="p-4 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Your Smart Wallets</h2>
//           {Object.entries(wallets).map(([chain, addr]) => (
//             <div key={addr} className="mb-2">
//               <p className="text-sm">{chain} - {addr}</p>
//               <p className="text-sm text-gray-600">
//                 Balance: {balances[addr] || "..."} native tokens
//               </p>
//             </div>
//           ))}
//           <p className="text-red-500 mt-2">{status}</p>
//         </Card>

//         {/* Beneficiaries */}
//         <Card className="p-4 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Beneficiaries</h2>
//           {beneficiaries.map((b) => (
//             <div key={b.id} className="mb-4 flex gap-4 items-center">
//               <Input
//                 value={b.address}
//                 onChange={(e) => updateBeneficiary(b.id, "address", e.target.value)}
//                 placeholder="Beneficiary Address"
//               />
//               <Input
//                 value={b.share}
//                 type="number"
//                 min="0"
//                 max="100"
//                 onChange={(e) => updateBeneficiary(b.id, "share", e.target.value)}
//                 placeholder="% Share"
//               />
//               <Button variant="outline" onClick={() => removeBeneficiary(b.id)}>
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <Button onClick={addBeneficiary}>Add Beneficiary</Button>
//           <p className="mt-2 text-sm text-gray-600">
//             Total share: {totalShare}%
//           </p>
//         </Card>

//         <Button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white hover:bg-blue-700"
//         >
//           Submit Will
//         </Button>
//       </div>
//     </motion.div>
//   );
// };

// export default CreateWill;

// import { useEffect, useState, useCallback } from "react";
// import { ethers } from "ethers";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Header from "@/components/Header";
// import { Input } from "@/components/ui/input";
// import { Plus, Trash2 } from "lucide-react";
// import useWalletStore from "../EtherJs/walletStore.js";

// const chainToSymbol = {
//   polygon: "MATIC",
//   ethereum: "ETH",
//   binancesmartchain: "BNB",
//   avalanche: "AVAX",
// };

// const CreateWill = () => {
//   const { contract } = useWalletStore();
//   const [wallets, setWallets] = useState({});
//   const [balances, setBalances] = useState({});
//   const [walletAddress, setWalletAddress] = useState("");
//   const [status, setStatus] = useState("Fetching wallets...");
//   const [beneficiaries, setBeneficiaries] = useState([]);

//   const fetchWallets = useCallback(async (address) => {
//     setStatus("Fetching deployed wallets...");
//     try {
//       const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
//       if (res.ok) {
//         const data = await res.json();
//         setWallets(data.wallets || {});
//         setStatus("");
//       } else {
//         setStatus("No existing smart wallets found.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setStatus("Could not fetch wallets. Using local state.");
//     }
//   }, []);

//   const updateBalance = useCallback(async (chainKey, walletAddress) => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const balance = await provider.getBalance(walletAddress);
//       setBalances((prev) => ({
//         ...prev,
//         [chainKey]: ethers.formatEther(balance),
//       }));
//     } catch (err) {
//       console.error(`Failed to fetch balance for ${chainKey}:`, err);
//     }
//   }, []);

//   useEffect(() => {
//     const getConnectedAddress = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();
//           const address = await signer.getAddress();
//           setWalletAddress(address);
//           fetchWallets(address);
//         } catch (error) {
//           console.error("Error fetching wallet:", error);
//         }
//       } else {
//         console.error("MetaMask not detected");
//       }
//     };

//     getConnectedAddress();
//   }, [fetchWallets]);

//   useEffect(() => {
//     Object.entries(wallets).forEach(([chainKey, walletAddress]) => {
//       if (walletAddress) {
//         updateBalance(chainKey, walletAddress);
//       }
//     });
//   }, [wallets, updateBalance]);

//   const addBeneficiary = () => {
//     const newBeneficiary = {
//       id: Date.now(),
//       address: "",
//       allocations: Object.fromEntries(
//         Object.keys(wallets).map((chainKey) => [chainKey, ""]),
//       ),
//     };
//     setBeneficiaries((prev) => [...prev, newBeneficiary]);
//   };

//   const removeBeneficiary = (id) => {
//     setBeneficiaries((prev) => prev.filter((b) => b.id !== id));
//   };

//   const updateBeneficiary = (id, field, value, chainKey = null) => {
//     setBeneficiaries((prev) =>
//       prev.map((b) => {
//         if (b.id !== id) return b;
//         if (field === "address") return { ...b, address: value };
//         if (field === "allocation" && chainKey)
//           return {
//             ...b,
//             allocations: {
//               ...b.allocations,
//               [chainKey]: value,
//             },
//           };
//         return b;
//       }),
//     );
//   };

//   const getTotalAllocations = (chainKey) => {
//     return beneficiaries.reduce(
//       (sum, b) => sum + Number(b.allocations[chainKey] || 0),
//       0,
//     );
//   };

//   const handleSaveWill = async () => {
//     const willObject = {
//       testator: walletAddress,
//       beneficiaries: beneficiaries.map((b) => ({
//         address: b.address,
//         allocations: Object.entries(b.allocations).map(
//           ([chain, percentage]) => ({
//             chain,
//             percentage: Number(percentage),
//           }),
//         ),
//       })),
//     };

//     // console.log("willObject", willObject);

//     // return;
//     try {
//       const res = await fetch("http://localhost:5000/api/wills", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(willObject),
//       });

//       if (res.ok) {
//         alert("Will saved successfully!");
//       } else {
//         const errorText = await res.text();
//         console.error("Backend error:", errorText);
//         alert("Failed to save will to backend.");
//       }
//     } catch (error) {
//       console.error("Error saving will:", error);
//       alert("Request failed.");
//     }

//     // smart contract integratin: createWill
//     createWill(beneficiaries, walletAddress);
//   };

//   const createWill = async (_beneficiaries, _testatorAddr) => {
//     console.log(contract);
//     if (!contract) return;

//     try {
//       // Get the new beneficiaries
//       const newBeneficiaries = _beneficiaries.map((b) => b.address);

//       let createdWillHash = null;
//       // get the data from database and therefore hash
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/wills/${_testatorAddr}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           },
//         );

//         console.log("data for willhash for createWIll interaction", res);

//         const jsonStr = stringifyDeterministic(res);
//         const bytes = ethers.utils.toUtf8Bytes(jsonStr);
//         createdWillHash = ethers.utils.keccak256(bytes);

//         if (res.ok) {
//           console.log("data successfull got for smart contract hash");
//         } else {
//           const errorText = await res.text();
//           console.error("Backend error:", errorText);
//           alert("Failed to get data for smart contract.");
//         }
//       } catch (error) {
//         console.error("Error data getting:", error);
//         alert("Request failed.");
//       }

//       // interact with contract
//       const tx = await contract.createWill(newBeneficiaries, createdWillHash);

//       await tx.wait();

//       console.log("new Will created successfully on smart contract");
//     } catch (error) {
//       console.error("Error saving to smart contract:", error);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen"
//       style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Header showDisconnect onDisconnect={() => {}} />

//       <div className="container mx-auto px-6 py-8 max-w-4xl">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Create New Will
//           </h1>
//           <p className="text-gray-600">
//             Deploy your digital inheritance structure with smart wallets and
//             assign beneficiaries.
//           </p>
//         </div>

//         {status && <p className="text-center text-gray-500 mb-4">{status}</p>}

//         <div className="grid gap-6">
//           {Object.entries(wallets).map(([chainKey, address]) => (
//             <Card key={chainKey} className="p-4 border border-gray-300">
//               <h3 className="text-lg font-semibold mb-2">
//                 Wallet on {chainKey}
//               </h3>
//               <p className="text-sm text-gray-700 break-words">{address}</p>
//               <p className="text-sm text-gray-800 mt-2">
//                 Balance:{" "}
//                 {balances[chainKey]
//                   ? `${balances[chainKey]} ${chainToSymbol[chainKey]}`
//                   : "Loading..."}
//               </p>
//             </Card>
//           ))}
//         </div>

//         <div className="mt-10">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Add Beneficiaries
//             </h2>
//             <Button
//               onClick={addBeneficiary}
//               className="flex items-center gap-1"
//             >
//               <Plus className="w-4 h-4" /> Add Beneficiary
//             </Button>
//           </div>

//           {beneficiaries.map((b, idx) => (
//             <Card key={b.id} className="p-4 mb-4 border">
//               <div className="flex justify-between mb-3">
//                 <h3 className="text-lg font-semibold">Beneficiary {idx + 1}</h3>
//                 <Button variant="ghost" onClick={() => removeBeneficiary(b.id)}>
//                   <Trash2 className="text-red-600" />
//                 </Button>
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm font-medium text-gray-700 mb-1 block">
//                   Wallet Address
//                 </label>
//                 <Input
//                   value={b.address}
//                   onChange={(e) =>
//                     updateBeneficiary(b.id, "address", e.target.value)
//                   }
//                   placeholder="0x..."
//                   className="w-full font-mono"
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.entries(wallets).map(([chainKey]) => (
//                   <div key={chainKey}>
//                     <label className="text-sm font-medium text-gray-700">
//                       {chainToSymbol[chainKey]} Allocation (%) — Total:{" "}
//                       {getTotalAllocations(chainKey)}%
//                     </label>
//                     <Input
//                       type="number"
//                       min="0"
//                       max="100"
//                       value={b.allocations[chainKey] || ""}
//                       onChange={(e) =>
//                         updateBeneficiary(
//                           b.id,
//                           "allocation",
//                           e.target.value,
//                           chainKey,
//                         )
//                       }
//                       placeholder={`% of ${chainToSymbol[chainKey]}`}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           ))}
//         </div>

//         <div className="mt-10 flex justify-end">
//           <Button
//             onClick={() => {
//               handleSaveWill();
//             }}
//             className="bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Create Will (Save to Backend + Chain)
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CreateWill;
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";

// --- Contract Info ---
const CONTRACT_ADDRESS = "0xce7085553C88BeC5Da3f1A2688b4Cf8Cd0d03dFb";
const CONTRACT_ABI = [
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


const chainToSymbol = {
	polygon: "MATIC",
	ethereum: "ETH",
	binancesmartchain: "BNB",
	avalanche: "AVAX",
};

const CreateWill = () => {
	const [wallets, setWallets] = useState({});
	const [balances, setBalances] = useState({});
	const [walletAddress, setWalletAddress] = useState("");
	const [status, setStatus] = useState("Fetching wallets...");
	const [beneficiaries, setBeneficiaries] = useState([]);
	const [testatorName, setTestatorName] = useState("");
	const [yearOfBirth, setYearOfBirth] = useState("");

	const fetchWallets = useCallback(async (address) => {
		setStatus("Fetching deployed wallets...");
		try {
			const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
			if (res.ok) {
				const data = await res.json();
				setWallets(data.wallets || {});
				setStatus("");
			} else {
				setStatus("No existing smart wallets found.");
			}
		} catch (err) {
			console.error("Fetch error:", err);
			setStatus("Could not fetch wallets. Using local state.");
		}
	}, []);

	const updateBalance = useCallback(async (chainKey, walletAddress) => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const balance = await provider.getBalance(walletAddress);
			setBalances((prev) => ({
				...prev,
				[chainKey]: ethers.formatEther(balance),
			}));
		} catch (err) {
			console.error(`Failed to fetch balance for ${chainKey}:`, err);
		}
	}, []);

	useEffect(() => {
		const getConnectedAddress = async () => {
			if (window.ethereum) {
				try {
					const provider = new ethers.BrowserProvider(window.ethereum);
					const signer = await provider.getSigner();
					const address = await signer.getAddress();
					setWalletAddress(address);
					fetchWallets(address);
				} catch (error) {
					console.error("Error fetching wallet:", error);
				}
			} else {
				console.error("MetaMask not detected");
			}
		};

		getConnectedAddress();
	}, [fetchWallets]);

	useEffect(() => {
		Object.entries(wallets).forEach(([chainKey, walletAddress]) => {
			if (walletAddress) {
				updateBalance(chainKey, walletAddress);
			}
		});
	}, [wallets, updateBalance]);

	const addBeneficiary = () => {
		const newBeneficiary = {
			id: Date.now(),
			address: "",
			allocations: Object.fromEntries(
				Object.keys(wallets).map((chainKey) => [chainKey, ""]),
			),
		};
		setBeneficiaries((prev) => [...prev, newBeneficiary]);
	};

	const removeBeneficiary = (id) => {
		setBeneficiaries((prev) => prev.filter((b) => b.id !== id));
	};

	const updateBeneficiary = (id, field, value, chainKey = null) => {
		setBeneficiaries((prev) =>
			prev.map((b) => {
				if (b.id !== id) return b;
				if (field === "address") return { ...b, address: value };
				if (field === "allocation" && chainKey)
					return {
						...b,
						allocations: {
							...b.allocations,
							[chainKey]: value,
						},
					};
				return b;
			}),
		);
	};

	const getTotalAllocations = (chainKey) => {
		return beneficiaries.reduce(
			(sum, b) => sum + Number(b.allocations[chainKey] || 0),
			0,
		);
	};

	const validateAllocations = () => {
		const errors = [];

		// Check if all beneficiaries have addresses
		const missingAddresses = beneficiaries.some(b => !b.address.trim());
		if (missingAddresses) {
			errors.push("All beneficiaries must have wallet addresses.");
		}

		// Check if total allocations for each chain don't exceed 100%
		Object.keys(wallets).forEach(chainKey => {
			const total = getTotalAllocations(chainKey);
			if (total > 100) {
				errors.push(`Total allocation for ${chainToSymbol[chainKey]} exceeds 100% (current: ${total}%)`);
			}
		});

		return errors;
	};

	const createWill = async (_beneficiaries, _testatorAddr) => {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

			const newBeneficiaries = _beneficiaries.map((b) => b.address);

			const res = await fetch(`http://localhost:5000/api/wills/${_testatorAddr}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			const jsonStr = JSON.stringify(data);
			const bytes = ethers.toUtf8Bytes(jsonStr);
			const createdWillHash = ethers.keccak256(bytes);
			console.log("Will hash:", createdWillHash);
			console.log("Beneficiaries:", newBeneficiaries);
			const tx = await contract.createWill(newBeneficiaries, createdWillHash);
			await tx.wait();

			console.log("Will created on-chain successfully");
		} catch (error) {
			console.error("Error saving to smart contract:", error);
		}
	};

	const handleSaveWill = async () => {
		// Validate allocations before saving
		const validationErrors = validateAllocations();
		if (validationErrors.length > 0) {
			alert("Please fix the following errors:\n\n" + validationErrors.join("\n"));
			return;
		}

		// Validate testator info
		if (!testatorName.trim() || !yearOfBirth.trim()) {
			alert("Please provide both testator name and year of birth.");
			return;
		}

		const willObject = {
			testator: walletAddress,
			beneficiaries: beneficiaries.map((b) => ({
				address: b.address,
				allocations: Object.entries(b.allocations).map(
					([chain, percentage]) => ({
						chain,
						percentage: Number(percentage),
					}),
				),
			})),
		};

		try {
			const res = await fetch("http://localhost:5000/api/wills", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(willObject),
			});

			console.log("willObject", willObject);

			if (!res.ok) {
				const errorText = await res.text();
				console.error("Backend error:", errorText);
				alert("Failed to save will to backend.");
				return;
			}

			await createWill(beneficiaries, walletAddress);

			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

			const tx = await contract.setTestatorInfo(testatorName, yearOfBirth);
			await tx.wait();

			console.log("Testator info updated");
			alert("Will & Testator info saved successfully!");
		} catch (error) {
			console.error("Error saving will:", error);
			alert("Request failed.");
		}
	};

	return (
		<div className="min-h-screen relative font-inter overflow-x-hidden" style={{ background: '#EAF6FF' }}>
			{/* Fixed Background Layers */}
			<div className="fixed w-full h-full top-0 left-0 z-0 overflow-hidden"
				style={{
					background: 'radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%)'
				}}
			>
				<div
					className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2"
					style={{
						transform: 'translate(-50%, -50%) rotate(-9.478deg)',
						background: '#CDEFFF',
						mixBlendMode: 'hue'
					}}
				/>
				<div
					className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2 opacity-25"
					style={{
						transform: 'translate(-50%, -50%) rotate(-30.74deg)',
						background: "url('https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg') lightgray 50% / cover no-repeat",
						boxShadow: '0px 0px 114.717px 0px #CDEFFF'
					}}
				/>
			</div>
			<div className="main-content relative z-10 min-h-screen">
				<Header showDisconnect onDisconnect={() => window.location.href = '/'} walletAddress={walletAddress} />
				<div className="pt-32 pb-12 px-4 lg:px-12 max-w-5xl mx-auto">
					<div className="text-center">
						<h1 className="font-clash text-[48px] font-semibold text-[#2D2D2D]">Create Your Will</h1>
						<p className="font-inter text-[22px] text-[#767676] font-medium mt-1">Define your beneficiaries and how your assets will be distributed.</p>
					</div>
					<div className="space-y-6 mt-8">
						{/* Testator Info Section */}
						<div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
							<h3 className="font-clash text-2xl font-semibold mb-4">Testator Information</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="form-label text-[#25292A] font-semibold">Name</label>
									<input
										type="text"
										className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
										placeholder="Full Name"
										value={testatorName}
										onChange={e => setTestatorName(e.target.value)}
									/>
								</div>
								<div>
									<label className="form-label text-[#25292A] font-semibold">Year of Birth</label>
									<input
										type="number"
										className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
										placeholder="e.g. 1975"
										value={yearOfBirth}
										onChange={e => setYearOfBirth(e.target.value)}
									/>
								</div>
							</div>
						</div>
						{/* Beneficiaries & Asset Distribution Section */}
						<div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
								<h3 className="font-clash text-2xl font-semibold">Beneficiaries & Asset Distribution</h3>
								<button
									type="button"
									onClick={addBeneficiary}
									className="btn-add-beneficiary bg-[#07AAF4] text-white rounded-full px-6 py-2 font-semibold text-base mt-4 md:mt-0"
								>
									+ Add Beneficiary
								</button>
							</div>
							<div className="space-y-6 mt-4">
								{/* Beneficiary Cards */}
								{beneficiaries.map((b, idx) => (
									<div key={b.id} className="beneficiary-card border-t border-gray-300 pt-4">
										<div className="flex justify-between items-center mb-4">
											<h4 className="font-clash text-xl font-semibold">Beneficiary {idx + 1}</h4>
											<button
												type="button"
												className="btn-delete-beneficiary text-[#EF4444] text-lg"
												onClick={() => removeBeneficiary(b.id)}
											>
												&#10005;
											</button>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="form-label text-[#25292A] font-semibold">Wallet Address</label>
												<input
													type="text"
													className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
													placeholder="0x..."
													value={b.address}
													onChange={e => updateBeneficiary(b.id, 'address', e.target.value)}
												/>
											</div>
										</div>
										<div className="mt-4">
											<p className="form-label mb-2 text-[#25292A] font-semibold">Asset Allocation (%)</p>
											<div className="flex gap-4 flex-wrap">
												{Object.keys(wallets).map(chainKey => (
													<div className="flex-1 min-w-[120px]" key={chainKey}>
														<label className="form-label text-sm">{chainToSymbol[chainKey]} <span className="text-gray-400">Total: 100%</span></label>
														<input
															type="number"
															className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1"
															min="0"
															max="100"
															value={b.allocations[chainKey] || ""}
															onChange={e => updateBeneficiary(b.id, 'allocation', e.target.value, chainKey)}
														/>
													</div>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Allocation Summary Section */}
						<div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
							<h3 className="font-clash text-2xl font-semibold">Allocation Summary</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
								{Object.keys(wallets).map(chainKey => {
									const total = getTotalAllocations(chainKey);
									const isValid = total === 100;
									return (
										<div
											key={chainKey}
											className={`allocation-summary-box rounded-lg p-4 text-center ${isValid ? 'summary-green bg-[#D5FFE6] text-[#12703D] border border-[#12703D]' : 'summary-red bg-[#FEE2E2] text-[#B91C1C] border border-[#DC2626]'}`}
										>
											<p className="font-semibold">{chainToSymbol[chainKey]}</p>
											<p className="text-xl font-bold">{total}% Allocated {isValid ? '✔' : '⊗'}</p>
										</div>
									);
								})}
							</div>
						</div>
						{/* Save/Cancel Buttons */}
						<div className="flex justify-end items-center pt-6 gap-4">
							<button
								type="button"
								className="header-btn bg-white border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A]"
								onClick={() => window.location.href = '/dashboard'}
							>
								Cancel
							</button>
							<button
								type="button"
								className="btn-primary header-btn text-white rounded-full px-8 py-3 text-xl bg-[#0167AF] hover:bg-[#0469AB] font-inter font-semibold shadow"
								onClick={handleSaveWill}
							>
								Save Will
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateWill;