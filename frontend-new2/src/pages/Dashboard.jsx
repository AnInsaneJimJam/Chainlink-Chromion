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
      className="min-h-screen"
      style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header showDisconnect onDisconnect={handleDisconnect} />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Testator Dashboard</h1>
          <p className="text-gray-600">
            Create and manage your digital will to secure your assets for your beneficiaries
          </p>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/smartWalletManager")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
            >
              Manage smart wallets
            </Button>
          </div>
        </motion.div>

        {!loading && (
          <>
            {hasWill ? (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card
                  className="p-6 border border-gray-200"
                  style={{ background: "linear-gradient(to right, #FFFFFF, #EAFFFF)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-gray-900">Your Digital Will</h2>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <Button
                      onClick={handleEditWill}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Will
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Created</div>
                      <div className="font-medium text-gray-900">{new Date(willData.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Last Updated</div>
                      <div className="font-medium text-gray-900">{new Date(willData.updatedAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Beneficiaries</div>
                      <div className="font-medium text-gray-900">{willData.beneficiaries.length}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Assets Covered</div>
                      <div className="font-medium text-gray-900">
                        {Array.from(
                          new Set(
                            willData.beneficiaries.flatMap(b => b.allocations.map(a => a.chain))
                          )
                        ).join(", ")}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="p-6 text-center border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">No Will Found</h2>
                  <p className="text-gray-600 mb-6">
                    You have not created a digital will yet. Create one now to secure your assets.
                  </p>
                  <Button
                    onClick={handleCreateWill}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Will
                  </Button>
                </Card>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Beneficiaries</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add, remove, or update beneficiaries and their asset allocations
              </p>
              <Button
                onClick={handleManageBeneficiaries}
                variant="outline"
                className="w-full"
              >
                Manage
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Asset Overview</h3>
              <p className="text-gray-600 text-sm mb-4">
                View all your digital assets and their current market values
              </p>
              <Button
                onClick={handleViewAssets}
                variant="outline"
                className="w-full"
              >
                View Assets
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <ManageBeneficiariesModal
        isOpen={showBeneficiariesModal}
        onClose={() => setShowBeneficiariesModal(false)}
      />
      <DigitalAssetsModal
        isOpen={showAssetsModal}
        onClose={() => setShowAssetsModal(false)}
      />
    </motion.div>
  );
};

export default Dashboard;
