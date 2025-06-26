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

import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import useWalletStore from "../EtherJs/walletStore.js";

const chainToSymbol = {
  polygon: "MATIC",
  ethereum: "ETH",
  binancesmartchain: "BNB",
  avalanche: "AVAX",
};

const CreateWill = () => {
  const { contract } = useWalletStore();
  const [wallets, setWallets] = useState({});
  const [balances, setBalances] = useState({});
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("Fetching wallets...");
  const [beneficiaries, setBeneficiaries] = useState([]);

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

  const handleSaveWill = async () => {
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

    // console.log("willObject", willObject);

    // return;
    try {
      const res = await fetch("http://localhost:5000/api/wills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(willObject),
      });

      if (res.ok) {
        alert("Will saved successfully!");
      } else {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        alert("Failed to save will to backend.");
      }
    } catch (error) {
      console.error("Error saving will:", error);
      alert("Request failed.");
    }

    // smart contract integratin: createWill
    createWill(beneficiaries, walletAddress);
  };

  const createWill = async (_beneficiaries, _testatorAddr) => {
    console.log(contract);
    if (!contract) return;

    try {
      // Get the new beneficiaries
      const newBeneficiaries = _beneficiaries.map((b) => b.address);

      let createdWillHash = null;
      // get the data from database and therefore hash
      try {
        const res = await fetch(
          `http://localhost:5000/api/wills/${_testatorAddr}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("data for willhash for createWIll interaction", res);

        const jsonStr = stringifyDeterministic(res);
        const bytes = ethers.utils.toUtf8Bytes(jsonStr);
        createdWillHash = ethers.utils.keccak256(bytes);

        if (res.ok) {
          console.log("data successfull got for smart contract hash");
        } else {
          const errorText = await res.text();
          console.error("Backend error:", errorText);
          alert("Failed to get data for smart contract.");
        }
      } catch (error) {
        console.error("Error data getting:", error);
        alert("Request failed.");
      }

      // interact with contract
      const tx = await contract.createWill(newBeneficiaries, createdWillHash);

      await tx.wait();

      console.log("new Will created successfully on smart contract");
    } catch (error) {
      console.error("Error saving to smart contract:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen"
      style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header showDisconnect onDisconnect={() => {}} />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Will
          </h1>
          <p className="text-gray-600">
            Deploy your digital inheritance structure with smart wallets and
            assign beneficiaries.
          </p>
        </div>

        {status && <p className="text-center text-gray-500 mb-4">{status}</p>}

        <div className="grid gap-6">
          {Object.entries(wallets).map(([chainKey, address]) => (
            <Card key={chainKey} className="p-4 border border-gray-300">
              <h3 className="text-lg font-semibold mb-2">
                Wallet on {chainKey}
              </h3>
              <p className="text-sm text-gray-700 break-words">{address}</p>
              <p className="text-sm text-gray-800 mt-2">
                Balance:{" "}
                {balances[chainKey]
                  ? `${balances[chainKey]} ${chainToSymbol[chainKey]}`
                  : "Loading..."}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Add Beneficiaries
            </h2>
            <Button
              onClick={addBeneficiary}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Beneficiary
            </Button>
          </div>

          {beneficiaries.map((b, idx) => (
            <Card key={b.id} className="p-4 mb-4 border">
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-semibold">Beneficiary {idx + 1}</h3>
                <Button variant="ghost" onClick={() => removeBeneficiary(b.id)}>
                  <Trash2 className="text-red-600" />
                </Button>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Wallet Address
                </label>
                <Input
                  value={b.address}
                  onChange={(e) =>
                    updateBeneficiary(b.id, "address", e.target.value)
                  }
                  placeholder="0x..."
                  className="w-full font-mono"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(wallets).map(([chainKey]) => (
                  <div key={chainKey}>
                    <label className="text-sm font-medium text-gray-700">
                      {chainToSymbol[chainKey]} Allocation (%) — Total:{" "}
                      {getTotalAllocations(chainKey)}%
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={b.allocations[chainKey] || ""}
                      onChange={(e) =>
                        updateBeneficiary(
                          b.id,
                          "allocation",
                          e.target.value,
                          chainKey,
                        )
                      }
                      placeholder={`% of ${chainToSymbol[chainKey]}`}
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Button
            onClick={() => {
              handleSaveWill();
            }}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Will (Save to Backend + Chain)
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateWill;
