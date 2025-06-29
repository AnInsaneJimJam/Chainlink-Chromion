import React, { useState } from "react";
import { ChevronRight, Eye, ArrowDown, ArrowUp, X } from "lucide-react";

const DeployWallet = () => {
  const [deployedChains, setDeployedChains] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState({});

  const chainData = {
    polygon: {
      name: "Polygon",
      currency: "MATIC",
      logo: "P",
      color: "bg-purple-600",
    },
    ethereum: {
      name: "Ethereum",
      currency: "ETH",
      logo: "E",
      color: "bg-blue-600",
    },
    avalanche: {
      name: "Avalanche",
      currency: "AVAX",
      logo: "A",
      color: "bg-red-500",
    },
    base: { name: "Base", currency: "ETH", logo: "B", color: "bg-blue-500" },
  };

  const generateMockAddress = () => {
    const chars = "0123456789abcdef";
    let result = "0x";
    for (let i = 0; i < 8; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    result += "...";
    for (let i = 0; i < 8; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const deployWallet = (chainId) => {
    const mockAddress = generateMockAddress();
    const balance = (Math.random() * 20).toFixed(2);

    setDeployedChains((prev) => ({
      ...prev,
      [chainId]: {
        address: mockAddress,
        balance: balance,
      },
    }));
  };

  const openModal = (type, chainId) => {
    const chain = chainData[chainId];
    const deployedData = deployedChains[chainId];

    setModalData({
      type,
      chain: chain.name,
      chainId,
      address: deployedData.address,
      balance: `${deployedData.balance} ${chain.currency}`,
      currency: chain.currency,
      logo: chain.logo,
      color: chain.color,
    });
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData({});
  };

  const ChainCard = ({ chainId, chain }) => {
    const isDeployed = deployedChains[chainId];

    return (
      <div className="w-full max-w-[1126px] min-h-[170px] rounded-[9px] border-2 border-blue-500/50 bg-[rgba(167,217,255,0.18)] backdrop-blur-2xl opacity-89 p-6 flex items-center justify-between gap-4">
        <div className="flex-grow flex items-center gap-6">
          <div
            className={`w-16 h-16 flex-shrink-0 rounded-full ${chain.color} flex items-center justify-center text-white text-2xl font-bold`}
          >
            {chain.logo}
          </div>
          <div className="info-container">
            <h2 className="text-[#59595a] text-3xl font-semibold text-start" style={{ fontFamily: 'Inter, sans-serif' }}>
              {chain.name}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-600 text-lg font-semibold">
                Status:
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-sm font-semibold ${isDeployed
                    ? "border border-green-700 bg-green-100 text-green-700 shadow-md shadow-green-800/30"
                    : "border border-amber-700 bg-amber-100 text-amber-700 shadow-md shadow-amber-800/30"
                  }`}
              >
                {isDeployed ? "✔ Deployed" : "⊗ Not Deployed"}
              </span>
            </div>
            {isDeployed && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600 text-lg font-semibold">
                  Address:
                </span>
                <span className="text-gray-800 text-lg font-semibold">
                  {isDeployed.address}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="buttons-container flex-shrink-0">
          {!isDeployed ? (
            <button
              onClick={() => deployWallet(chainId)}
              className="w-52 h-12 bg-[#3b8dc7] hover:bg-[#3b8dc7] text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 shadow-sm shadow-blue-900/50 transition-transform hover:scale-105"
            >
              <ChevronRight size={20} />
              Deploy Wallet
            </button>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openModal("balance", chainId)}
                className="w-52 h-12 bg-sky-400 hover:bg-sky-400 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <Eye size={20} />
                View Balance
              </button>
              <button
                onClick={() => openModal("fund", chainId)}
                className="w-52 h-12 bg-[#0685e0] hover:bg-[#0685e0] text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md shadow-gray-600/25 transition-transform hover:scale-105"
              >
                <ArrowDown size={20} />
                Fund Wallet
              </button>
              <button
                onClick={() => openModal("withdraw", chainId)}
                className="w-52 h-12 bg-[#8c5cfa] hover:bg-[#8c5cfa] text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <ArrowUp size={20} />
                Withdraw
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Modal = () => {
    if (!activeModal) return null;

    const renderModalContent = () => {
      switch (activeModal) {
        case "balance":
          return (
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-[#0469AB] text-[28px] font-semibold font-clash">
                Your Smart Contract Wallet Balance
              </h2>
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Address:
                  </span>
                  <span className="text-gray-600 text-xl font-medium">
                    {modalData.address}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Chain:
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                    <div
                      className={`w-6 h-6 rounded-full ${modalData.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {modalData.logo}
                    </div>
                    {modalData.chain}
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Balance:
                  </span>
                  <span className="text-gray-600 text-xl font-medium">
                    {modalData.balance}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-base font-medium">
                This is the available amount in your smart contract wallet on{" "}
                {modalData.chain}.
              </p>
            </div>
          );

        case "fund":
          return (
            <div className="flex flex-col items-center gap-5 text-center">
              <h2 className="text-[#0469AB] text-3xl font-semibold font-clash">
                Fund Your Wallet
              </h2>
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Address:
                  </span>
                  <span className="text-gray-600 text-xl font-medium">
                    {modalData.address}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Chain:
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                    <div
                      className={`w-6 h-6 rounded-full ${modalData.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {modalData.logo}
                    </div>
                    {modalData.chain}
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Current Balance:
                  </span>
                  <span className="text-gray-600 text-xl font-medium">
                    {modalData.balance}
                  </span>
                </div>
              </div>
              <div className="w-full text-left">
                <label className="text-gray-800 text-lg font-semibold">
                  Enter amount to Fund in {modalData.currency}
                </label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-lg"
                  placeholder="Eg-0.01"
                />
              </div>
              <button className="w-52 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-3xl font-semibold text-lg shadow-md shadow-gray-600/25 transition-transform hover:scale-105">
                Fund Wallet
              </button>
              <p className="text-gray-600 text-base font-medium">
                Funds will be transferred from your connected wallet to your
                smart contract wallet. Make sure you're on the right chain
              </p>
            </div>
          );

        case "withdraw":
          return (
            <div className="flex flex-col items-center gap-5 text-center">
              <h2 className="text-[#0469AB] text-3xl font-semibold font-clash">
                Withdraw Funds
              </h2>
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Address:
                  </span>
                  <span className="text-gray-600 text-xl font-medium">
                    {modalData.address}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Chain:
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                    <div
                      className={`w-6 h-6 rounded-full ${modalData.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {modalData.logo}
                    </div>
                    {modalData.chain}
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Current Balance:
                  </span>
                  <span className="text-gray-600 text-xl font-medium">
                    {modalData.balance}
                  </span>
                </div>
              </div>
              <div className="w-full text-left">
                <label className="text-gray-800 text-lg font-semibold">
                  Enter Withdrawal Amount in {modalData.currency}
                </label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-lg"
                  placeholder="Eg-0.01"
                />
              </div>
              <button className="w-52 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105">
                <ArrowUp size={20} />
                Withdraw
              </button>
              <p className="text-gray-600 text-base font-medium">
                Withdrawals will send funds from your smart contract wallet back
                to your connected wallet. Make sure you're on the right chain
              </p>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={closeModal}
        />

        {/* Modal */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-50 w-[541px] max-w-[90vw] p-8">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 bg-transparent hover:bg-transparent text-black"
          >
            <X size={24} />
          </button>
          {renderModalContent()}
        </div>
      </>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 p-8 lg:p-12 z-10 w-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black text-2xl font-bold">
            L
          </div>
          <span className="text-gray-800 text-[32px] font-semibold" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            InheritChain
          </span>
        </div>
      </header>
      <div className="min-h-screen relative overflow-hidden">

        {/* Header */}


        {/* Fixed Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%)",
          }}
        >
          {/* Background overlays */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                'url("https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg") lightgray 50% / cover no-repeat',
              boxShadow: "0px 0px 114.717px 0px #CDEFFF",
            }}
          />
        </div>



        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4">
          <div className="text-center">
            <h1 className="text-[#0469AB] text-4xl lg:text-[54px] font-semibold mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Deploy Your Smart Contract Wallets
            </h1>
            <p className="text-[#767676] text-xl lg:text-[22px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Please ensure you're on the correct network when funding or
              withdrawing
            </p>
          </div>

          {/* Warning Box */}
          <div className="max-w-[741px] w-full h-11 mt-6 rounded-[10px] border-[0.5px] border-[#8F6112] bg-yellow-100 flex items-center justify-center px-4">
            <p className="text-amber-700 text-lg lg:text-[23px] font-medium text-center">
              Make sure your MetaMask network matches the selected chain
            </p>
          </div>

          {/* Chain Cards */}
          <div className="space-y-6 mt-8 w-full flex flex-col items-center">
            {Object.entries(chainData).map(([chainId, chain]) => (
              <ChainCard key={chainId} chainId={chainId} chain={chain} />
            ))}
          </div>
        </div>

        {/* Modal */}
        <Modal />
      </div>
    </>
  );
};

export default DeployWallet;
