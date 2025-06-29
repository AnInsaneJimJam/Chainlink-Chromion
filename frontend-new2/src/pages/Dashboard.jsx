import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
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
  const [wallets, setWallets] = useState({});
  const [walletsLoading, setWalletsLoading] = useState(true);
  const [noWallets, setNoWallets] = useState(false);

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

  // Fetch wallets for the connected address
  const fetchWallets = useCallback(async (address) => {
    setWalletsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
      console.log("/api/wallets status:", res.status);
      if (res.status === 200) {
        const data = await res.json();
        setWallets(data.wallets || {});
        setNoWallets(false);
      } else if (res.status === 404) {
        setNoWallets(true);
        setWallets({});
      } else {
        setNoWallets(true);
        setWallets({});
      }
    } catch (err) {
      setNoWallets(true);
      setWallets({});
    } finally {
      setWalletsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getConnectedAddressAndWallets = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          await fetchWallets(address);
        } catch (error) {
          setWallets({});
        }
      }
    };
    getConnectedAddressAndWallets();
  }, [fetchWallets]);

  const isNewTestator = !hasWill;
  // Blur if: wallets exist and no will, OR no wallets at all
  const blurForNoWallets = !walletsLoading && noWallets;
  const blurForNoWill = !walletsLoading && !noWallets && isNewTestator;
  const blurDashboard = blurForNoWallets || blurForNoWill;

  useEffect(() => {
    const fetchWillStatus = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          const res = await fetch(`http://localhost:5000/api/wills/${address}`);
          console.log("/api/wills status:", res.status);
          if (res.status === 200) {
            const data = await res.json();
            setWillData(data);
            setHasWill(true);
          } else if (res.status === 404) {
            setHasWill(false);
          } else {
            setHasWill(false);
          }
        }
      } catch (err) {
        setHasWill(false);
      } finally {
        setLoading(false);
      }
    };
    fetchWillStatus();
  }, []);

  // Debugging: log key state values before rendering
  console.log({
    wallets,
    hasWill,
    blurDashboard,
    walletsLoading,
    willData,
    noWallets,
    isNewTestator
  });

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

        <div className="pt-32 pb-12 px-4 lg:px-12 max-w-7xl mx-auto relative">
          {/* Overlay for no wallets or wallets exist but no will */}
          {blurDashboard && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[rgba(234,246,255,0.7)] backdrop-blur-[2px] rounded-[15px]">
              <div className="bg-white/90 border border-[#0469AB] rounded-[15px] px-8 py-6 shadow-lg flex flex-col items-center">
                <h2 className="font-clash text-2xl md:text-3xl font-semibold text-[#0469AB] mb-2 text-center">
                  {blurForNoWallets ? 'Deploy a smart wallet to get started' : 'Create your digital will'}
                </h2>
                <p className="font-inter text-lg text-[#767676] text-center">
                  {blurForNoWallets
                    ? 'You need to deploy at least one smart wallet before you can create your digital will.'
                    : 'You have deployed a smart wallet. Now create your digital will to continue.'}
                </p>
              </div>
            </div>
          )}
          {/* Smart Wallet Button (always visible) and Create Will button (if needed) - always above blur */}
          <div className="flex justify-center mb-8 z-40 relative">
            <button
              onClick={() => navigate('/smartWalletManager')}
              className="header-btn border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A] bg-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Manage Smart Wallets
            </button>
            {/* Show Create Will button only if wallets exist and no will yet */}
            {blurForNoWill && (
              <button
                onClick={handleCreateWill}
                className="ml-4 btn-primary font-inter font-semibold rounded-full px-8 py-3 text-xl bg-[#0167AF] hover:bg-[#0469AB] text-white shadow"
              >
                + Create Will
              </button>
            )}
          </div>
          {/* Blur all other content if wallets = 0 or wallets exist but no will */}
          <div className={blurDashboard ? 'pointer-events-none filter blur-sm select-none opacity-60' : ''}>
            <div className="text-center mb-8">
              <h1 className="font-clash text-[48px] font-semibold text-[#2D2D2D]">Testator Dashboard</h1>
              <p className="font-inter text-[22px] text-[#767676] font-medium mt-1">Create and manage your digital will to secure your assets for your beneficiaries</p>
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
        </div>

        <ManageBeneficiariesModal
          isOpen={showBeneficiariesModal}
          onClose={() => setShowBeneficiariesModal(false)}
          beneficiaries={willData?.beneficiaries || []}
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
