// import { useEffect, useState, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { AlertTriangle, CheckCircle, XCircle, Loader, Wallet, ArrowDown, ArrowUp } from "lucide-react";
// import { ethers } from "ethers";
// import { smartWalletABI, smartWalletBytecode } from "../abi/smartwallet";

// const CHAIN_CONFIGS = {
//   polygon: {
//     chainId: "0x13882", // Polygon Amoy
//     chainName: "Polygon Amoy Testnet",
//     nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
//     rpcUrls: ["https://rpc-amoy.polygon.technology/"],
//     blockExplorerUrls: ["https://www.oklink.com/amoy"],
//     name: "Polygon",
//     logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029",
//     logicContractAddress: "0xeE12fF2A08BAF07c719adB07EFeE5DC62dE23fbd"
//   },
//   ethereum: {
//     chainId: "0xaa36a7", // Sepolia
//     chainName: "Sepolia",
//     nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
//     rpcUrls: ["https://rpc.sepolia.org"],
//     blockExplorerUrls: ["https://sepolia.etherscan.io"],
//     name: "Ethereum",
//     logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029"

//   },
//   base: {
//     chainId: "0x14a34", // Base Sepolia
//     chainName: "Base Sepolia",
//     nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
//     rpcUrls: ["https://sepolia.base.org"],
//     blockExplorerUrls: ["https://sepolia-explorer.base.org"],
//     name: "Base",
//     logo: "https://cryptologos.cc/logos/base-base-logo.svg?v=029"
//   },
// };

// const SmartWalletManager = () => {
//   const [userAddress, setUserAddress] = useState(null);
//   const [wallets, setWallets] = useState({});
//   const [balances, setBalances] = useState({});
//   const [status, setStatus] = useState("Connecting to wallet...");
//   const [chainStatus, setChainStatus] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [withdrawConfig, setWithdrawConfig] = useState(null);
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [fundAmount, setFundAmount] = useState("");
//   const [fundConfig, setFundConfig] = useState(null);

//   const getProviderAndSigner = useCallback(async () => {
//     if (!window.ethereum) {
//       throw new Error("MetaMask is not installed. Please install it to use this app.");
//     }
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();
//     return { provider, signer };
//   }, []);

//   const switchNetwork = useCallback(async (chainKey) => {
//     try {
//         const { provider } = await getProviderAndSigner();
//         const config = CHAIN_CONFIGS[chainKey];
//         await provider.send("wallet_switchEthereumChain", [{ chainId: config.chainId }]);
//     } catch (switchError) {
//         // This error code indicates that the chain has not been added to MetaMask.
//         if (switchError.code === 4902) {
//             try {
//                 const config = CHAIN_CONFIGS[chainKey];
//                 await window.ethereum.request({
//                     method: 'wallet_addEthereumChain',
//                     params: [
//                         {
//                             chainId: config.chainId,
//                             chainName: config.chainName,
//                             rpcUrls: config.rpcUrls,
//                             nativeCurrency: config.nativeCurrency,
//                             blockExplorerUrls: config.blockExplorerUrls,
//                         },
//                     ],
//                 });
//             } catch (addError) {
//                 console.error("Failed to add network:", addError);
//                 throw new Error(`Failed to add ${CHAIN_CONFIGS[chainKey].name} network.`);
//             }
//         } else {
//             console.error("Failed to switch network:", switchError);
//             throw new Error(`Failed to switch to ${CHAIN_CONFIGS[chainKey].name} network.`);
//         }
//     }
//   }, [getProviderAndSigner]);

//   const fetchWallets = useCallback(async (address) => {
//     setStatus("Fetching deployed wallets...");
//     try {
//       // Replace with your actual API endpoint
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
//       // For demonstration, we allow creating wallets even if backend fails
//     }
//   }, []);

//   const connectWallet = useCallback(async () => {
//     try {
//       const { signer } = await getProviderAndSigner();
//       const address = await signer.getAddress();
//       setUserAddress(address);
//       await fetchWallets(address);
//     } catch (err) {
//       console.error("Wallet connect error:", err);
//       setStatus(err.message || "Failed to connect wallet.");
//       setChainStatus(prev => ({ ...prev, global: { message: err.message, type: 'error' } }));
//     }
//   }, [getProviderAndSigner, fetchWallets]);

//   useEffect(() => {
//     connectWallet();
//   }, [connectWallet]);

//   const updateBalance = useCallback(async (chainKey, walletAddress) => {
//       try {
//         await switchNetwork(chainKey);
//         const { provider } = await getProviderAndSigner();
//         const balance = await provider.getBalance(walletAddress);
//         setBalances(prev => ({ ...prev, [chainKey]: ethers.formatEther(balance) }));
//     } catch (err) {
//         console.error(`Failed to fetch balance for ${chainKey}:`, err);
//         setChainStatus(prev => ({
//             ...prev,
//             [chainKey]: { message: `Balance fetch failed: ${err.message}`, type: 'error' }
//         }));
//     }
//   }, [getProviderAndSigner, switchNetwork]);

//   useEffect(() => {
//     Object.entries(wallets).forEach(([chainKey, walletAddress]) => {
//       if (walletAddress) {
//         updateBalance(chainKey, walletAddress);
//       }
//     });
//   }, [wallets, updateBalance]);

//   const saveToBackend = async (userAddress, chain, walletAddress) => {
//     try {
//       // Replace with your actual API endpoint
//       const res = await fetch("http://localhost:5000/api/wallets", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userAddress, chain, walletAddress })
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error.message || "Failed to save wallet to database.");
//       }
//       return await res.json();
//     } catch (err) {
//       console.error("Backend Save Error:", err);
//       throw err; // Re-throw to be caught by the caller
//     }
//   };

//   const handleDeploy = async (chainKey) => {
//     setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Deploying...", type: 'loading' } }));

//     try {
//         await switchNetwork(chainKey);
//         const { signer } = await getProviderAndSigner();

//         // This check is important because bytecode might not be available
//         if (!smartWalletBytecode || smartWalletBytecode === "YOUR_SMART_WALLET_BYTECODE") {
//           throw new Error("Smart wallet bytecode is not configured. Cannot deploy.");
//         }

//         const factory = new ethers.ContractFactory(smartWalletABI, smartWalletBytecode, signer);
//         const contract = await factory.deploy(await signer.getAddress());
//         await contract.waitForDeployment();
//         const address = await contract.getAddress();
//         const logicAddress = CHAIN_CONFIGS[chainKey].logicContractAddress;
//         if (!logicAddress) throw new Error(`Missing logic contract for ${chainKey}`);

//         const tx = await contract.setLogicContract(logicAddress);
//         await tx.wait();

//         setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Saving to backend...", type: 'loading' } }));
//         await saveToBackend(userAddress, chainKey, address);

//         setWallets(prev => ({ ...prev, [chainKey]: address }));
//         setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Deployed", type: 'success' } }));
//         updateBalance(chainKey, address);

//     } catch (err) {
//         console.error("Deployment failed:", err);
//         setChainStatus(prev => ({ ...prev, [chainKey]: { message: `Deployment failed: ${err.message}`, type: 'error' } }));
//     }
//   };

//   const handleFund = async (chainKey, walletAddress) => {
//      setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Funding...", type: 'loading' } }));
//      try {
//         await switchNetwork(chainKey);
//         const { signer } = await getProviderAndSigner();
//         const tx = await signer.sendTransaction({
//             to: walletAddress,
//             value: ethers.parseEther("0.01"),
//         });
//         await tx.wait();
//         setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Funded successfully!", type: 'success' } }));
//         updateBalance(chainKey, walletAddress);
//      } catch(err) {
//         console.error("Funding failed:", err);
//         setChainStatus(prev => ({ ...prev, [chainKey]: { message: `Funding failed: ${err.message}`, type: 'error' } }));
//      }
//   };

//   const openWithdrawModal = (chainKey, walletAddress) => {
//     setWithdrawConfig({ chainKey, walletAddress });
//     setIsModalOpen(true);
//   };

//   const handleWithdraw = async () => {
//     if (!withdrawConfig || !withdrawAmount || isNaN(withdrawAmount) || parseFloat(withdrawAmount) <= 0) {
//       const { chainKey } = withdrawConfig;
//       setChainStatus(prev => ({ ...prev, [chainKey]: { message: 'Invalid amount.', type: 'error' } }));
//       return;
//     }

//     const { chainKey, walletAddress } = withdrawConfig;
//     setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Withdrawing...", type: 'loading' } }));
//     setIsModalOpen(false);

//     try {
//         await switchNetwork(chainKey);
//         const { signer } = await getProviderAndSigner();
//         const contract = new ethers.Contract(walletAddress, smartWalletABI, signer);

//         const tx = await contract.withdraw(ethers.parseEther(withdrawAmount));
//         await tx.wait();

//         setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Withdraw successful!", type: 'success' } }));
//         updateBalance(chainKey, walletAddress);
//         setWithdrawAmount("");
//         setWithdrawConfig(null);

//     } catch (err) {
//         console.error("Withdraw failed:", err);
//         setChainStatus(prev => ({ ...prev, [chainKey]: { message: `Withdraw failed: ${err.message}`, type: 'error' } }));
//     }
//   };

//   const StatusIcon = ({ status }) => {
//     if (!status) return null;
//     switch (status.type) {
//       case 'loading':
//         return <Loader className="w-4 h-4 animate-spin text-blue-500" />;
//       case 'success':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'error':
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-4xl mx-auto">
//         <header className="text-center mb-10">
//           <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
//             Deploy Your Smart Wallets
//           </h1>
//           <p className="mt-3 text-lg text-gray-400">
//             A unified dashboard to manage your cross-chain smart contract wallets.
//           </p>
//         </header>

//          {chainStatus.global && (
//              <div className={`flex items-center justify-center gap-3 p-3 rounded-lg mb-6 ${
//                 chainStatus.global.type === 'error' ? 'bg-red-900/50 text-red-300' : 'bg-yellow-900/50 text-yellow-300'
//              }`}>
//                 <AlertTriangle className="w-5 h-5" />
//                 <span>{chainStatus.global.message}</span>
//             </div>
//          )}

//         <div className="space-y-6">
//           {Object.entries(CHAIN_CONFIGS).map(([chainKey, config]) => {
//             const walletAddress = wallets[chainKey];
//             const balance = balances[chainKey];
//             const statusInfo = chainStatus[chainKey] || {};
//             const isDeployed = !!walletAddress;

//             return (
//               <Card key={chainKey} className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
//                 <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700">
//                    <div className="flex items-center gap-4">
//                       <img src={config.logo} alt={`${config.name} logo`} className="w-8 h-8"/>
//                       <CardTitle className="text-2xl font-semibold text-gray-200">{config.name}</CardTitle>
//                    </div>
//                    <div className="flex items-center gap-2 text-sm">
//                       <StatusIcon status={statusInfo} />
//                       <span className={`${
//                         statusInfo.type === 'error' ? 'text-red-400' :
//                         statusInfo.type === 'success' ? 'text-green-400' :
//                         'text-gray-400'
//                       }`}>
//                           {statusInfo.message || (isDeployed ? 'Deployed' : 'Not Deployed')}
//                       </span>
//                    </div>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   {isDeployed ? (
//                     <div>
//                       <div className="mb-4">
//                           <p className="text-sm text-gray-500">Address:</p>
//                           <a href={`${config.blockExplorerUrls[0]}/address/${walletAddress}`} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-purple-400 hover:text-purple-300 break-all">
//                               {walletAddress}
//                           </a>
//                       </div>
//                        <div className="mb-6">
//                           <p className="text-sm text-gray-500">Balance:</p>
//                           <p className="text-lg font-semibold text-gray-200">
//                             {balance !== undefined ? `${parseFloat(balance).toFixed(5)} ${config.nativeCurrency.symbol}`: "Loading..."}
//                           </p>
//                       </div>
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         <Button onClick={() => updateBalance(chainKey, walletAddress)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold">
//                           <Wallet className="mr-2 h-4 w-4"/> View Balance
//                         </Button>
//                         <Button onClick={() => handleFund(chainKey, walletAddress)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
//                           <ArrowDown className="mr-2 h-4 w-4"/> Fund Wallet
//                         </Button>
//                         <Button onClick={() => openWithdrawModal(chainKey, walletAddress)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold">
//                            <ArrowUp className="mr-2 h-4 w-4"/> Withdraw
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center h-full">
//                         <p className="text-gray-400 mb-4">This wallet has not been deployed yet.</p>
//                         <Button
//                             onClick={() => handleDeploy(chainKey)}
//                             disabled={statusInfo.type === 'loading'}
//                             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
//                             {statusInfo.type === 'loading' ? 'Deploying...' : 'Deploy Wallet'}
//                         </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>

//        {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
//             <h2 className="text-2xl font-bold mb-4 text-white">Withdraw Funds</h2>
//             <p className="text-gray-400 mb-2">From: {CHAIN_CONFIGS[withdrawConfig.chainKey].name}</p>
//             <p className="text-gray-400 mb-4 font-mono text-sm break-all">{withdrawConfig.walletAddress}</p>

//             <div className="mb-4">
//               <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-300 mb-1">
//                 Amount in {CHAIN_CONFIGS[withdrawConfig.chainKey].nativeCurrency.symbol}
//               </label>
//               <input
//                 type="text"
//                 id="withdrawAmount"
//                 value={withdrawAmount}
//                 onChange={(e) => setWithdrawAmount(e.target.value)}
//                 placeholder="e.g., 0.01"
//                 className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             <div className="flex justify-end gap-4 mt-6">
//               <Button onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-700">Cancel</Button>
//               <Button onClick={handleWithdraw} className="bg-green-600 hover:bg-green-700">Confirm Withdraw</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

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
        className="w-8 h-8 rounded-full"
        onError={() => setErr(true)}
      />
    );
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
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 border border-green-200">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span className="text-xs font-medium text-green-700">Deployed</span>
        </div>
      );
    }

    return (
      <div className="px-2 py-1 rounded-full bg-orange-50 border border-orange-200">
        <span className="text-xs font-medium text-orange-700">
          Not Deployed
        </span>
      </div>
    );
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
      <div className="min-h-screen relative overflow-hidden"
      >
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



        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-3 tracking-tight">
              Deploy Your Smart Contract Wallets
            </h1>

            <p className="text-gray-600 mb-4 text-lg">
              Please ensure you're on the correct network when funding or
              withdrawing
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium shadow-sm">
              <AlertTriangle className="w-4 h-4" />
              Make sure your MetaMask network matches the selected chain
            </div>
          </div>


          {/* Main Container */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="space-y-4">
              {Object.entries(CHAIN_CONFIGS).map(([chainKey, cfg]) => {
                const wallet = wallets[chainKey];
                const bal = balances[chainKey];
                const statusInfo = chainStatus[chainKey] || {};
                const isDeployed = !!wallet;

                return (
                  <div
                    key={chainKey}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 hover:shadow-md transition-all duration-200"
                  >
                    {isDeployed ? (
                      <div className="flex items-center justify-between">
                        {/* Left side - Chain info */}
                        <div className="flex items-center gap-4">
                          <ChainLogo chainKey={chainKey} config={cfg} />
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {cfg.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Status:</span>
                              <StatusBadge
                                isDeployed={isDeployed}
                                statusInfo={statusInfo}
                              />
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              <span>Address: </span>
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

                        {/* Right side - Actions */}
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={() => updateBalance(chainKey, wallet)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Balance
                          </Button>
                          <Button
                            onClick={() => openFundModal(chainKey, wallet)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                          >
                            <ArrowDown className="w-4 h-4" />
                            Fund Wallet
                          </Button>
                          <Button
                            onClick={() => openWithdrawModal(chainKey, wallet)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                          >
                            <ArrowUp className="w-4 h-4" />
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        {/* Left side - Chain info */}
                        <div className="flex items-center gap-4">
                          <ChainLogo chainKey={chainKey} config={cfg} />
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {cfg.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Status:</span>
                              <StatusBadge
                                isDeployed={isDeployed}
                                statusInfo={statusInfo}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right side - Deploy button */}
                        <div>
                          <Button
                            onClick={() => handleDeploy(chainKey)}
                            disabled={statusInfo.type === "loading"}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
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
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

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
