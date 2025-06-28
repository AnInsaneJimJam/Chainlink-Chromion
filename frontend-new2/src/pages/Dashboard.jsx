// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Header from "@/components/Header";
// import ManageBeneficiariesModal from "@/components/ManageBeneficiariesModal";
// import DigitalAssetsModal from "@/components/DigitalAssetsModal";
// import { Edit, Users, BarChart3, Eye } from "lucide-react";

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
//       style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Header showDisconnect onDisconnect={() => {
//         handleDisconnect();
//         }} />

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
//             Create and manage your digital will to secure your assets for your beneficiaries
//           </p>
//         </motion.div>

//         {/* Smart Wallet Buttons */}
//         <motion.div
//           className="mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex gap-4 justify-center">
//             <Button
//               onClick={() => navigate("/smartWalletManager")}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
//             >
//               Manage smart wallets
//             </Button>
//           </div>
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

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Header from "@/components/Header";
// import ManageBeneficiariesModal from "@/components/ManageBeneficiariesModal";
// import DigitalAssetsModal from "@/components/DigitalAssetsModal";
// import { Edit, Users, BarChart3, PlusCircle } from "lucide-react";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
//   const [showAssetsModal, setShowAssetsModal] = useState(false);
//   const [hasWill, setHasWill] = useState(false); // Track if user has a will
//   const [loading, setLoading] = useState(true); // Optional: show loader while checking

//   const handleDisconnect = () => {
//     navigate("/");
//   };

//   const handleManageBeneficiaries = () => {
//     setShowBeneficiariesModal(true);
//   };

//   const handleViewAssets = () => {
//     setShowAssetsModal(true);
//   };

//   const handleCreateWill = () => {
//     navigate("/create-will");
//   };

//   const handleEditWill = () => {
//     navigate("/edit-will");
//   };

//   // Simulate fetching on-chain will status
//   useEffect(() => {
//     const fetchWillStatus = async () => {
//       try {
//         // TODO: Replace this with real ethers.js/wagmi call
//         const willExists = false; // mock true or false
//         setHasWill(willExists);
//       } catch (err) {
//         console.error("Error checking will status:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWillStatus();
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
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Testator Dashboard</h1>
//           <p className="text-gray-600">
//             Create and manage your digital will to secure your assets for your beneficiaries
//           </p>
//         </motion.div>

//         <motion.div
//           className="mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex gap-4 justify-center">
//             <Button
//               onClick={() => navigate("/smartWalletManager")}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
//             >
//               Manage smart wallets
//             </Button>
//           </div>
//         </motion.div>

//         {/* Will Card or Create Prompt */}
//         {!loading && (
//           <>
//             {hasWill ? (
//               <motion.div
//                 className="mb-8"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//               >
//                 <Card
//                   className="p-6 border border-gray-200"
//                   style={{ background: "linear-gradient(to right, #FFFFFF, #EAFFFF)" }}
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <h2 className="text-xl font-semibold text-gray-900">Your Digital Will</h2>
//                       <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
//                         Active
//                       </span>
//                     </div>
//                     <Button
//                       onClick={handleEditWill}
//                       className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Will
//                     </Button>
//                   </div>

//                   {/* Placeholder: replace with actual fetched data */}
//                   <div className="grid md:grid-cols-4 gap-6 text-sm">
//                     <div>
//                       <div className="text-gray-600 mb-1">Created</div>
//                       <div className="font-medium text-gray-900">2025-06-18</div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600 mb-1">Last Updated</div>
//                       <div className="font-medium text-gray-900">2025-06-19</div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600 mb-1">Beneficiaries</div>
//                       <div className="font-medium text-gray-900">3</div>
//                     </div>
//                     <div>
//                       <div className="text-gray-600 mb-1">Total Assets</div>
//                       <div className="font-medium text-gray-900">6.2 ETH</div>
//                     </div>
//                   </div>
//                 </Card>
//               </motion.div>
//             ) : (
//               <motion.div
//                 className="mb-8"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//               >
//                 <Card className="p-6 text-center border border-gray-200">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                     No Will Found
//                   </h2>
//                   <p className="text-gray-600 mb-6">
//                     You have not created a digital will yet. Create one now to secure your assets.
//                   </p>
//                   <Button
//                     onClick={handleCreateWill}
//                     className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
//                   >
//                     <PlusCircle className="w-4 h-4" />
//                     Create Will
//                   </Button>
//                 </Card>
//               </motion.div>
//             )}
//           </>
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
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Beneficiaries</h3>
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

//           <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BarChart3 className="w-8 h-8 text-green-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Asset Overview</h3>
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


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import ManageBeneficiariesModal from "@/components/ManageBeneficiariesModal";
import DigitalAssetsModal from "@/components/DigitalAssetsModal";
import { Edit, Users, BarChart3, PlusCircle } from "lucide-react";
import { ethers } from "ethers";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
  const [showAssetsModal, setShowAssetsModal] = useState(false);
  const [hasWill, setHasWill] = useState(false);
  const [loading, setLoading] = useState(true);
  const [willData, setWillData] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  const handleDisconnect = () => {
    navigate("/");
  };

  const handleManageBeneficiaries = () => {
    setShowBeneficiariesModal(true);
  };

  const handleViewAssets = () => {
    setShowAssetsModal(true);
  };

  const handleCreateWill = () => {
    navigate("/create-will");
  };

  const handleEditWill = () => {
    navigate("/edit-will");
  };

  useEffect(() => {
    const fetchWillStatus = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          const res = await fetch(`http://localhost:5000/api/wills/${address}`);
          if (res.ok) {
            const data = await res.json();
            setWillData(data);
            setHasWill(true);
          } else {
            setHasWill(false);
          }
        }
      } catch (err) {
        console.error("Error checking will status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWillStatus();
  }, []);

  return (
    <motion.div
      className="min-h-screen relative font-inter overflow-x-hidden"
      style={{ background: '#EAF6FF' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
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
        {/* Page Header */}
        <Header showDisconnect onDisconnect={handleDisconnect} walletAddress={walletAddress} />

        <div className="pt-32 pb-12 px-4 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-clash text-[48px] font-semibold text-[#2D2D2D]">Testator Dashboard</h1>
            <p className="font-inter text-[22px] text-[#767676] font-medium mt-1">Create and manage your digital will to secure your assets for your beneficiaries</p>
          </div>

          {/* Smart Wallet Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => navigate('/smartWalletManager')}
              className="header-btn border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A] bg-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Manage Smart Wallets
            </button>
          </div>

          {/* Will Status or Create Prompt */}
          {!loading && (
            <>
              {hasWill && willData ? (
                <div className="dashboard-card my-8 max-w-4xl mx-auto p-6 bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="font-clash text-3xl font-semibold flex items-center gap-4 text-gray-700">
                        Your Digital Will <span className="status-badge-green inline-flex items-center gap-2 px-3 py-1 rounded-full text-[14px] font-semibold bg-[#D5FFE6] text-[#12703D] border border-[#12703D]">Active</span>
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 mt-4">
                        <span className="label text-[#767676] text-[16px] font-medium">Created</span>
                        <span className="label text-[#767676] text-[16px] font-medium">Last Updated</span>
                        <span className="label text-[#767676] text-[16px] font-medium">Beneficiaries</span>
                        <span className="label text-[#767676] text-[16px] font-medium">Assets Covered</span>
                        <span className="value text-[#2D2D2D] text-[18px] font-semibold">{new Date(willData.createdAt).toLocaleDateString()}</span>
                        <span className="value text-[#2D2D2D] text-[18px] font-semibold">{new Date(willData.updatedAt).toLocaleDateString()}</span>
                        <span className="value text-[#2D2D2D] text-[18px] font-semibold">{willData.beneficiaries.length}</span>
                        <span className="value text-[#2D2D2D] text-[18px] font-semibold">{Array.from(new Set(willData.beneficiaries.flatMap(b => b.allocations.map(a => a.chain)))).join(', ')}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleEditWill}
                      className="btn-primary header-btn text-white rounded-full px-8 py-3 text-xl mt-4 md:mt-0 inline-flex items-center gap-2 bg-[#0167AF] hover:bg-[#0469AB] font-inter font-semibold shadow"
                    >
                      Edit Will
                    </button>
                  </div>
                </div>
              ) : (
                <div className="dashboard-card text-center my-8 max-w-4xl mx-auto p-10 bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px]">
                  <h2 className="font-clash text-3xl font-semibold text-gray-700">START YOUR DIGITAL LEGACY BY CREATING YOUR FIRST SMART WILL</h2>
                  <button
                    onClick={handleCreateWill}
                    className="btn-primary font-inter font-semibold rounded-full px-8 py-3 text-xl mt-6 inline-flex items-center gap-2 bg-[#0167AF] hover:bg-[#0469AB] shadow"
                  >
                    + Create Will
                  </button>
                </div>
              )}
            </>
          )}

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 max-w-5xl mx-auto">
            <div className={`dashboard-card p-6 ${!hasWill ? 'disabled' : ''} bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px]`}>
              <h3 className="font-clash text-2xl font-semibold">Manage Beneficiaries</h3>
              <p className="mt-2 text-gray-600">Add, remove, or update beneficiaries and their asset allocations</p>
              <button
                onClick={hasWill ? handleManageBeneficiaries : undefined}
                className="header-btn mt-4 border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A] bg-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
                disabled={!hasWill}
              >
                Manage
              </button>
            </div>
            <div className={`dashboard-card p-6 ${!hasWill ? 'disabled' : ''} bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px]`}>
              <h3 className="font-clash text-2xl font-semibold">Manage Smart Wallets</h3>
              <p className="mt-2 text-gray-600">View and control your deployed smart contract wallets across blockchains</p>
              <button
                onClick={hasWill ? () => navigate('/smartWalletManager') : undefined}
                className="header-btn mt-4 border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A] bg-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
                disabled={!hasWill}
              >
                Manage
              </button>
            </div>
          </div>
        </div>

        <ManageBeneficiariesModal
          isOpen={showBeneficiariesModal}
          onClose={() => setShowBeneficiariesModal(false)}
        />
        <DigitalAssetsModal
          isOpen={showAssetsModal}
          onClose={() => setShowAssetsModal(false)}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
