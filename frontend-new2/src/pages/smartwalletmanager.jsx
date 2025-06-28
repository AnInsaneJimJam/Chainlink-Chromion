// export default SmartWalletManager;
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
  Wallet,
  ArrowDown,
  ArrowUp,
  Shield,
  Eye,
  X,
} from "lucide-react";
import { ethers } from "https://esm.sh/ethers@6.12.1";
import { smartWalletABI, smartWalletBytecode } from "../abi/smartwallet";

const CHAIN_CONFIGS = {
  polygon: {
    chainId: "0x13882",
    chainName: "Polygon Amoy Testnet",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
    name: "Polygon",
    logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/matic.png",
    logicContractAddress: "0xeE12fF2A08BAF07c719adB07EFeE5DC62dE23fbd",
  },
  ethereum: {
    chainId: "0xaa36a7",
    chainName: "Sepolia",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://rpc.sepolia.org"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    name: "Ethereum",
    logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png",
    logicContractAddress: "0x3996AC2788485e56b25F48E5825fed4f409c8cB7",
  },
  base: {
    chainId: "0x14a34",
    chainName: "Base Sepolia",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://sepolia-explorer.base.org"],
    name: "Base",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
  },
  avalanche: {
    chainId: "0xa869",
    chainName: "Avalanche Fuji Testnet",
    nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
    name: "Avalanche",
    logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png",
    logicContractAddress: "0xE60f79571E7EDba477ff98BAdeE618b5605DF7aE",
  },
  solana: {
    chainId: "0x65",
    chainName: "Solana Devnet",
    nativeCurrency: { name: "SOL", symbol: "SOL", decimals: 9 },
    rpcUrls: ["https://api.devnet.solana.com"],
    blockExplorerUrls: ["https://explorer.solana.com/?cluster=devnet"],
    name: "Solana",
    logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png",
  },
};

const COLORS = {
  buttonPrimary: "#0167AF",
  buttonAccent: "#00A6F8",
  headlineDark: "#146397",
  headlineLight: "#07AAF4",
  bgCardLight: "#CDEFFF",
  bgCardLightAlt: "#EAF6FF",
  bgPage: "#FFFFFF",
  textDark: "#25292A",
  textSecondary: "#767676",
};

const SmartWalletManager = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [wallets, setWallets] = useState({});
  const [balances, setBalances] = useState({});
  const [status, setStatus] = useState("Connecting to wallet...");
  const [chainStatus, setChainStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawConfig, setWithdrawConfig] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [fundConfig, setFundConfig] = useState(null);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState({});

  const getProviderAndSigner = useCallback(async () => {
    if (!window.ethereum) throw new Error("MetaMask is not installed.");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
  }, []);

  const switchNetwork = useCallback(
    async (chainKey) => {
      try {
        const { provider } = await getProviderAndSigner();
        const cfg = CHAIN_CONFIGS[chainKey];
        await provider.send("wallet_switchEthereumChain", [
          { chainId: cfg.chainId },
        ]);
      } catch (e) {
        if (e.code === 4902) {
          const cfg = CHAIN_CONFIGS[chainKey];
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: cfg.chainId,
                chainName: cfg.chainName,
                rpcUrls: cfg.rpcUrls,
                nativeCurrency: cfg.nativeCurrency,
                blockExplorerUrls: cfg.blockExplorerUrls,
              },
            ],
          });
        } else {
          console.error(e);
          throw new Error(
            `Failed to switch network to ${CHAIN_CONFIGS[chainKey].name}`,
          );
        }
      }
    },
    [getProviderAndSigner],
  );

  const fetchWallets = useCallback(async (address) => {
    setStatus("Fetching deployed wallets...");
    try {
      const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
      if (res.ok) {
        const data = await res.json();
        setWallets(data.wallets || {});
      } else setStatus("No existing smart wallets found.");
    } catch (e) {
      console.error(e);
      setStatus("Could not fetch wallets. Using local state.");
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const { signer } = await getProviderAndSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
      await fetchWallets(address);
    } catch (e) {
      console.error(e);
      setStatus(e.message || "Failed to connect wallet.");
      setChainStatus((ps) => ({
        ...ps,
        global: { message: e.message, type: "error" },
      }));
    }
  }, [getProviderAndSigner, fetchWallets]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  const updateBalance = useCallback(
    async (chainKey, walletAddress) => {
      try {
        await switchNetwork(chainKey);
        const { provider } = await getProviderAndSigner();
        const bal = await provider.getBalance(walletAddress);
        setBalances((ps) => ({ ...ps, [chainKey]: ethers.formatEther(bal) }));
      } catch (e) {
        console.error(e);
        setChainStatus((ps) => ({
          ...ps,
          [chainKey]: {
            message: `Balance fetch failed: ${e.message}`,
            type: "error",
          },
        }));
      }
    },
    [getProviderAndSigner, switchNetwork],
  );

  useEffect(() => {
    Object.entries(wallets).forEach(
      ([k, addr]) => addr && updateBalance(k, addr),
    );
  }, [wallets, updateBalance]);

  const saveToBackend = async (ua, chain, wa) => {
    const res = await fetch("http://localhost:5000/api/wallets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userAddress: ua, chain, walletAddress: wa }),
    });
    if (!res.ok)
      throw new Error((await res.json()).message || "Failed to save wallet.");
    return res.json();
  };

  const handleDeploy = async (chainKey) => {
    setChainStatus((ps) => ({
      ...ps,
      [chainKey]: { message: "Deploying...", type: "loading" },
    }));
    try {
      await switchNetwork(chainKey);
      const { signer } = await getProviderAndSigner();
      if (
        !smartWalletBytecode ||
        smartWalletBytecode === "YOUR_SMART_WALLET_BYTECODE"
      )
        throw new Error("Bytecode not configured.");

      const factory = new ethers.ContractFactory(
        smartWalletABI,
        smartWalletBytecode,
        signer,
      );
      const contract = await factory.deploy();
      await contract.waitForDeployment();
      const address = await contract.getAddress();

      const logic = CHAIN_CONFIGS[chainKey].logicContractAddress;
      if (!logic) throw new Error(`Missing logic contract for ${chainKey}`);
      await (await contract.setLogicContract(logic)).wait();

      setChainStatus((ps) => ({
        ...ps,
        [chainKey]: { message: "Saving to backend...", type: "loading" },
      }));
      await saveToBackend(userAddress, chainKey, address);

      setWallets((ps) => ({ ...ps, [chainKey]: address }));
      setChainStatus((ps) => ({
        ...ps,
        [chainKey]: { message: "Deployed", type: "success" },
      }));
      updateBalance(chainKey, address);
    } catch (e) {
      console.error(e);
      setChainStatus((ps) => ({
        ...ps,
        [chainKey]: {
          message: `Deployment failed: ${e.message}`,
          type: "error",
        },
      }));
    }
  };

  const handleFund = async () => {
    if (!fundConfig || !fundAmount || isNaN(fundAmount) || +fundAmount <= 0) {
      setChainStatus((ps) => ({
        ...ps,
        [fundConfig?.chainKey]: { message: "Invalid amount.", type: "error" },
      }));
      return;
    }
    const { chainKey, walletAddress } = fundConfig;
    setChainStatus((ps) => ({
      ...ps,
      [chainKey]: { message: "Funding...", type: "loading" },
    }));
    setIsFundModalOpen(false);

    try {
      await switchNetwork(chainKey);
      const { signer } = await getProviderAndSigner();
      await (
        await signer.sendTransaction({
          to: walletAddress,
          value: ethers.parseEther(fundAmount),
        })
      ).wait();

      setChainStatus((ps) => ({
        ...ps,
        [chainKey]: { message: "Funded successfully!", type: "success" },
      }));
      updateBalance(chainKey, walletAddress);
      setFundAmount("");
      setFundConfig(null);
    } catch (e) {
      console.error(e);
      setChainStatus((ps) => ({
        ...ps,
        [chainKey]: { message: `Funding failed: ${e.message}`, type: "error" },
      }));
    }
  };

  const handleWithdraw = async () => {
    if (
      !withdrawConfig ||
      !withdrawAmount ||
      isNaN(withdrawAmount) ||
      +withdrawAmount <= 0
    ) {
      setChainStatus((ps) => ({
        ...ps,
        [withdrawConfig.chainKey]: {
          message: "Invalid amount.",
          type: "error",
        },
      }));
      return;
    }
    const { chainKey, walletAddress } = withdrawConfig;
    setChainStatus((ps) => ({
      ...ps,
      [chainKey]: { message: "Withdrawing...", type: "loading" },
    }));
    setIsModalOpen(false);

    try {
      await switchNetwork(chainKey);
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(
        walletAddress,
        smartWalletABI,
        signer,
      );
      await (await contract.withdraw(ethers.parseEther(withdrawAmount))).wait();

      setChainStatus((ps) => ({
        ...ps,
        [chainKey]: { message: "Withdraw successful!", type: "success" },
      }));
      updateBalance(chainKey, walletAddress);
      setWithdrawAmount("");
      setWithdrawConfig(null);
    } catch (e) {
      console.error(e);
      setChainStatus((ps) => ({
        ...ps,
        [chainKey]: { message: `Withdraw failed: ${e.message}`, type: "error" },
      }));
    }
  };

  const openFundModal = (chainKey, walletAddress) => {
    setFundConfig({ chainKey, walletAddress });
    setIsFundModalOpen(true);
  };

  const openWithdrawModal = (chainKey, walletAddress) => {
    setWithdrawConfig({ chainKey, walletAddress });
    setIsModalOpen(true);
  };

  const ChainLogo = ({ chainKey, config }) => {
    const [err, setErr] = useState(false);
    if (err) {
      const icons = {
        polygon: "🔷",
        ethereum: "🔵",
        base: "🔶",
        avalanche: "❄️",
        solana: "☀️",
      };
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-sm">
          {icons[chainKey] || "⚫"}
        </div>
      );
    }
    return (
      <img
        src={config.logo}
        alt={`${config.name}`}
        className="w-16 h-16 rounded-full"
        onError={() => setErr(true)}
      />
    );
  };

  const openModal = (type, chainKey) => {
    const chain = CHAIN_CONFIGS[chainKey];
    const walletAddr = wallets[chainKey];

    setModalData({
      type,
      chain: chain.name,
      chainKey,
      address: walletAddr,
      balance: `11101111`,
      currency: chain.nativeCurrency.symbol,
      logo: chain.logo,
    });
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData({});
  };

  const StatusBadge = ({ isDeployed, statusInfo }) => {
    if (statusInfo?.type === "loading") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 border border-blue-200">
          <Loader className="w-3 h-3 animate-spin text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Loading</span>
        </div>
      );
    }

    if (statusInfo?.type === "success") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 border border-green-200">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">
            Funded successfully
          </span>
        </div>
      );
    }

    if (isDeployed) {
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-sm font-semibold border border-green-700 bg-green-100 text-green-700 shadow-md shadow-green-800/30`}
        >
          ✔ Deployed
        </span>
      );
    }

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-sm font-semibold border border-amber-700 bg-amber-100 text-amber-700 shadow-md shadow-amber-800/30`}
      >
        ⊗ Not Deployed
      </span>
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
                    {truncateAddressForModals(modalData.address)}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Chain:
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                    <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden`}
                      >
                        <img
                          src={modalData.logo}
                          alt="logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* You can show a label or name here if needed */}
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
                    {truncateAddressForModals(modalData.address)}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Chain:
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        src={modalData.logo}
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
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
                    {truncateAddressForModals(modalData.address)}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-800 text-xl font-semibold">
                    Chain:
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 text-xl font-medium">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        src={modalData.logo}
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
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
  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const truncateAddressForModals = (address) => {
    if (!address) return "";
    return `${address.slice(0, 10)}......${address.slice(-8)}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 p-8 lg:p-12 z-10 w-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black text-2xl font-bold">
            L
          </div>
          <span
            className="text-gray-800 text-[32px] font-semibold"
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            InheritChain
          </span>
        </div>
      </header>
      <div className="min-h-screen relative overflow-hidden">
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

        {/* main content  */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4">
          <div className="text-center">
            <h1
              className="text-[#0469AB] text-4xl lg:text-[54px] font-semibold mb-8"
              style={{ fontFamily: "Clash Display, sans-serif" }}
            >
              Deploy Your Smart Contract Wallets
            </h1>
            <p
              className="text-[#767676] text-xl lg:text-[22px] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
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
            {Object.entries(CHAIN_CONFIGS).map(([chainKey, cfg]) => {
              const wallet = wallets[chainKey];
              const bal = balances[chainKey];
              const statusInfo = chainStatus[chainKey] || {};
              const isDeployed = !!wallet;

              return (
                <div
                  key={chainKey}
                  className="w-full max-w-[1126px] min-h-[170px] rounded-[9px] border-2 border-blue-500/50 bg-[rgba(167,217,255,0.18)] backdrop-blur-2xl opacity-89 p-6 flex items-center justify-between gap-4"
                >
                  {isDeployed ? (
                    <>
                      <div className="flex-grow flex items-center gap-6">
                        <ChainLogo chainKey={chainKey} config={cfg} />
                        <div className="info-container">
                          <h2
                            className="text-[#59595a] text-3xl font-semibold text-start"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {cfg.name}
                          </h2>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-600 text-lg font-semibold">
                              Status:
                            </span>

                            <StatusBadge
                              isDeployed={isDeployed}
                              statusInfo={statusInfo}
                            />
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-600 text-lg font-semibold">
                              Address:{" "}
                            </span>
                            <a
                              href={`${cfg.blockExplorerUrls[0]}/address/${wallet}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {truncateAddress(wallet)}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="buttons-container flex-shrink-0">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                          <button
                            onClick={() => openModal("balance", chainKey)}
                            className="w-52 h-12 bg-sky-400 hover:bg-sky-400 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
                          >
                            <Eye size={20} />
                            View Balance
                          </button>
                          <button
                            onClick={() => openModal("fund", chainKey)}
                            className="w-52 h-12 bg-[#0685e0] hover:bg-[#0685e0] text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md shadow-gray-600/25 transition-transform hover:scale-105"
                          >
                            <ArrowDown size={20} />
                            Fund Wallet
                          </button>
                          <button
                            onClick={() => openModal("withdraw", chainKey)}
                            className="w-52 h-12 bg-[#8c5cfa] hover:bg-[#8c5cfa] text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
                          >
                            <ArrowUp size={20} />
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-grow flex items-center gap-6">
                        <ChainLogo chainKey={chainKey} config={cfg} />
                        <div className="info-container">
                          <h2
                            className="text-[#59595a] text-3xl font-semibold text-start"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {cfg.name}
                          </h2>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-600 text-lg font-semibold">
                              Status:
                            </span>

                            {/* //// edit karna hai  status badge ko*/}
                            {/* <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl text-sm font-semibold ${
                      isDeployed
                        ? "border border-green-700 bg-green-100 text-green-700 shadow-md shadow-green-800/30"
                        : "border border-amber-700 bg-amber-100 text-amber-700 shadow-md shadow-amber-800/30"
                    }`}
                  >
                    {isDeployed ? "✔ Deployed" : "⊗ Not Deployed"}
                  </span> */}
                            {/* yahan tk  */}
                            <StatusBadge
                              isDeployed={isDeployed}
                              statusInfo={statusInfo}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="buttons-container flex-shrink-0">
                        <Button
                          onClick={() => handleDeploy(chainKey)}
                          disabled={statusInfo.type === "loading"}
                          className="w-52 h-12 bg-[#3b8dc7] hover:bg-[#3b8dc7] text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 shadow-sm shadow-blue-900/50 transition-transform hover:scale-105"
                        >
                          {statusInfo.type === "loading" ? (
                            <>
                              <Loader className="mr-2 h-4 w-4 animate-spin" />
                              Deploying...
                            </>
                          ) : (
                            "Deploy Wallet"
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* models  */}

        <Modal />

        {/* Withdraw Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Withdraw Funds
                </h2>
                <p className="text-gray-600 mb-2">
                  From: {CHAIN_CONFIGS[withdrawConfig.chainKey].name}
                </p>
                <p className="text-gray-600 mb-4 font-mono text-sm break-all bg-gray-50 p-2 rounded">
                  {withdrawConfig.walletAddress}
                </p>

                <div className="mb-6">
                  <label
                    htmlFor="withdrawAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Amount in{" "}
                    {
                      CHAIN_CONFIGS[withdrawConfig.chainKey].nativeCurrency
                        .symbol
                    }
                  </label>
                  <input
                    type="text"
                    id="withdrawAmount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="e.g., 0.01"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleWithdraw}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Confirm Withdraw
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fund Modal */}
        {isFundModalOpen && (
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Fund Wallet
                </h2>
                <p className="text-gray-600 mb-2">
                  To: {CHAIN_CONFIGS[fundConfig.chainKey].name}
                </p>
                <p className="text-gray-600 mb-4 font-mono text-sm break-all bg-gray-50 p-2 rounded">
                  {fundConfig.walletAddress}
                </p>

                <div className="mb-6">
                  <label
                    htmlFor="fundAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Amount in{" "}
                    {CHAIN_CONFIGS[fundConfig.chainKey].nativeCurrency.symbol}
                  </label>
                  <input
                    type="text"
                    id="fundAmount"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="e.g., 0.01"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setIsFundModalOpen(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleFund}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Confirm Fund
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SmartWalletManager;
