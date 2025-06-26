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
 import { AlertTriangle, CheckCircle, XCircle, Loader, Wallet, ArrowDown, ArrowUp } from "lucide-react";
 import { ethers } from "https://esm.sh/ethers@6.12.1";
 import { smartWalletABI, smartWalletBytecode } from "../abi/smartwallet";

 const CHAIN_CONFIGS = {
  polygon: {
  chainId: "0x13882", // Polygon Amoy
  chainName: "Polygon Amoy Testnet",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: ["https://rpc-amoy.polygon.technology/"],
  blockExplorerUrls: ["https://www.oklink.com/amoy"],
  name: "Polygon",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029",
  logicContractAddress: "0xeE12fF2A08BAF07c719adB07EFeE5DC62dE23fbd"
  },
  ethereum: {
  chainId: "0xaa36a7", // Sepolia
  chainName: "Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://rpc.sepolia.org"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
  name: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029"

  },
  base: {
  chainId: "0x14a34", // Base Sepolia
  chainName: "Base Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia-explorer.base.org"],
  name: "Base",
  logo: "https://cryptologos.cc/logos/base-base-logo.svg?v=029"
  },
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
  const [isFundModalOpen, setIsFundModalOpen] = useState(false); // State for funding modal

  const getProviderAndSigner = useCallback(async () => {
  if (!window.ethereum) {
  throw new Error("MetaMask is not installed. Please install it to use this app.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { provider, signer };
  }, []);

  const switchNetwork = useCallback(async (chainKey) => {
  try {
  const { provider } = await getProviderAndSigner();
  const config = CHAIN_CONFIGS[chainKey];
  await provider.send("wallet_switchEthereumChain", [{ chainId: config.chainId }]);
  } catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
  try {
  const config = CHAIN_CONFIGS[chainKey];
  await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [
  {
  chainId: config.chainId,
  chainName: config.chainName,
  rpcUrls: config.rpcUrls,
  nativeCurrency: config.nativeCurrency,
  blockExplorerUrls: config.blockExplorerUrls,
  },
  ],
  });
  } catch (addError) {
  console.error("Failed to add network:", addError);
  throw new Error(`Failed to add ${CHAIN_CONFIGS[chainKey].name} network.`);
  }
  } else {
  console.error("Failed to switch network:", switchError);
  throw new Error(`Failed to switch to ${CHAIN_CONFIGS[chainKey].name} network.`);
  }
  }
  }, [getProviderAndSigner]);


  const fetchWallets = useCallback(async (address) => {
  setStatus("Fetching deployed wallets...");
  try {
  // Replace with your actual API endpoint
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
  // For demonstration, we allow creating wallets even if backend fails
  }
  }, []);

  const connectWallet = useCallback(async () => {
  try {
  const { signer } = await getProviderAndSigner();
  const address = await signer.getAddress();
  setUserAddress(address);
  await fetchWallets(address);
  } catch (err) {
  console.error("Wallet connect error:", err);
  setStatus(err.message || "Failed to connect wallet.");
  setChainStatus(prev => ({ ...prev, global: { message: err.message, type: 'error' } }));
  }
  }, [getProviderAndSigner, fetchWallets]);


  useEffect(() => {
  connectWallet();
  }, [connectWallet]);
  
  const updateBalance = useCallback(async (chainKey, walletAddress) => {
  try {
  await switchNetwork(chainKey);
  const { provider } = await getProviderAndSigner();
  const balance = await provider.getBalance(walletAddress);
  setBalances(prev => ({ ...prev, [chainKey]: ethers.formatEther(balance) }));
  } catch (err) {
  console.error(`Failed to fetch balance for ${chainKey}:`, err);
  setChainStatus(prev => ({
  ...prev,
  [chainKey]: { message: `Balance fetch failed: ${err.message}`, type: 'error' }
  }));
  }
  }, [getProviderAndSigner, switchNetwork]);

  useEffect(() => {
  Object.entries(wallets).forEach(([chainKey, walletAddress]) => {
  if (walletAddress) {
  updateBalance(chainKey, walletAddress);
  }
  });
  }, [wallets, updateBalance]);


  const saveToBackend = async (userAddress, chain, walletAddress) => {
  try {
  // Replace with your actual API endpoint
  const res = await fetch("http://localhost:5000/api/wallets", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userAddress, chain, walletAddress })
  });

  if (!res.ok) {
  const error = await res.json();
  throw new Error(error.message || "Failed to save wallet to database.");
  }
  return await res.json();
  } catch (err) {
  console.error("Backend Save Error:", err);
  throw err; // Re-throw to be caught by the caller
  }
  };

  const handleDeploy = async (chainKey) => {
  setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Deploying...", type: 'loading' } }));

  try {
  await switchNetwork(chainKey);
  const { signer } = await getProviderAndSigner();
  
  // This check is important because bytecode might not be available
  if (!smartWalletBytecode || smartWalletBytecode === "YOUR_SMART_WALLET_BYTECODE") {
  throw new Error("Smart wallet bytecode is not configured. Cannot deploy.");
  }

  const factory = new ethers.ContractFactory(smartWalletABI, smartWalletBytecode, signer);
  const contract = await factory.deploy(await signer.getAddress());
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  const logicAddress = CHAIN_CONFIGS[chainKey].logicContractAddress;
  if (!logicAddress) throw new Error(`Missing logic contract for ${chainKey}`);

  const tx = await contract.setLogicContract(logicAddress);
  await tx.wait();

  setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Saving to backend...", type: 'loading' } }));
  await saveToBackend(userAddress, chainKey, address);

  setWallets(prev => ({ ...prev, [chainKey]: address }));
  setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Deployed", type: 'success' } }));
  updateBalance(chainKey, address);

  } catch (err) {
  console.error("Deployment failed:", err);
  setChainStatus(prev => ({ ...prev, [chainKey]: { message: `Deployment failed: ${err.message}`, type: 'error' } }));
  }
  };

  const handleFund = async () => {
     if (!fundConfig || !fundAmount || isNaN(fundAmount) || parseFloat(fundAmount) <= 0) {
       const { chainKey } = fundConfig || {};
       if (chainKey) {
         setChainStatus(prev => ({ ...prev, [chainKey]: { message: 'Invalid amount.', type: 'error' } }));
       }
       return;
     }
 
     const { chainKey, walletAddress } = fundConfig;
     setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Funding...", type: 'loading' } }));
     setIsFundModalOpen(false);
 
     try {
       await switchNetwork(chainKey);
       const { signer } = await getProviderAndSigner();
       const tx = await signer.sendTransaction({
         to: walletAddress,
         value: ethers.parseEther(fundAmount),
       });
       await tx.wait();
       setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Funded successfully!", type: 'success' } }));
       updateBalance(chainKey, walletAddress);
       setFundAmount("");
       setFundConfig(null);
     } catch (err) {
       console.error("Funding failed:", err);
       setChainStatus(prev => ({ ...prev, [chainKey]: { message: `Funding failed: ${err.message}`, type: 'error' } }));
     }
   };
  
  const openWithdrawModal = (chainKey, walletAddress) => {
  setWithdrawConfig({ chainKey, walletAddress });
  setIsModalOpen(true);
  };

  const openFundModal = (chainKey, walletAddress) => {
    setFundConfig({ chainKey, walletAddress });
    setIsFundModalOpen(true);
  };

  const handleWithdraw = async () => {
  if (!withdrawConfig || !withdrawAmount || isNaN(withdrawAmount) || parseFloat(withdrawAmount) <= 0) {
  const { chainKey } = withdrawConfig;
  setChainStatus(prev => ({ ...prev, [chainKey]: { message: 'Invalid amount.', type: 'error' } }));
  return;
  }


  const { chainKey, walletAddress } = withdrawConfig;
  setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Withdrawing...", type: 'loading' } }));
  setIsModalOpen(false);

  try {
  await switchNetwork(chainKey);
  const { signer } = await getProviderAndSigner();
  const contract = new ethers.Contract(walletAddress, smartWalletABI, signer);
  
  const tx = await contract.withdraw(ethers.parseEther(withdrawAmount));
  await tx.wait();
  
  setChainStatus(prev => ({ ...prev, [chainKey]: { message: "Withdraw successful!", type: 'success' } }));
  updateBalance(chainKey, walletAddress);
  setWithdrawAmount("");
  setWithdrawConfig(null);

  } catch (err) {
  console.error("Withdraw failed:", err);
  setChainStatus(prev => ({ ...prev, [chainKey]: { message: `Withdraw failed: ${err.message}`, type: 'error' } }));
  }
  };


  const StatusIcon = ({ status }) => {
  if (!status) return null;
  switch (status.type) {
  case 'loading':
  return <Loader className="w-4 h-4 animate-spin text-blue-500" />;
  case 'success':
  return <CheckCircle className="w-4 h-4 text-green-500" />;
  case 'error':
  return <XCircle className="w-4 h-4 text-red-500" />;
  default:
  return null;
  }
  };


  return (
  <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
  <div className="max-w-4xl mx-auto">
  <header className="text-center mb-10">
  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
  Deploy Your Smart Wallets
  </h1>
  <p className="mt-3 text-lg text-gray-400">
  A unified dashboard to manage your cross-chain smart contract wallets.
  </p>
  </header>

  {chainStatus.global && (
  <div className={`flex items-center justify-center gap-3 p-3 rounded-lg mb-6 ${
  chainStatus.global.type === 'error' ? 'bg-red-900/50 text-red-300' : 'bg-yellow-900/50 text-yellow-300'
  }`}>
  <AlertTriangle className="w-5 h-5" />
  <span>{chainStatus.global.message}</span>
  </div>
  )}

  <div className="space-y-6">
  {Object.entries(CHAIN_CONFIGS).map(([chainKey, config]) => {
  const walletAddress = wallets[chainKey];
  const balance = balances[chainKey];
  const statusInfo = chainStatus[chainKey] || {};
  const isDeployed = !!walletAddress;

  return (
  <Card key={chainKey} className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
  <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700">
  <div className="flex items-center gap-4">
  <img src={config.logo} alt={`${config.name} logo`} className="w-8 h-8"/>
  <CardTitle className="text-2xl font-semibold text-gray-200">{config.name}</CardTitle>
  </div>
  <div className="flex items-center gap-2 text-sm">
  <StatusIcon status={statusInfo} />
  <span className={`${
  statusInfo.type === 'error' ? 'text-red-400' :
  statusInfo.type === 'success' ? 'text-green-400' :
  'text-gray-400'
  }`}>
  {statusInfo.message || (isDeployed ? 'Deployed' : 'Not Deployed')}
  </span>
  </div>
  </CardHeader>
  <CardContent className="p-6">
  {isDeployed ? (
  <div>
  <div className="mb-4">
  <p className="text-sm text-gray-500">Address:</p>
  <a href={`${config.blockExplorerUrls[0]}/address/${walletAddress}`} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-purple-400 hover:text-purple-300 break-all">
  {walletAddress}
  </a>
  </div>
  <div className="mb-6">
  <p className="text-sm text-gray-500">Balance:</p>
  <p className="text-lg font-semibold text-gray-200">
  {balance !== undefined ? `${parseFloat(balance).toFixed(5)} ${config.nativeCurrency.symbol}` : "Loading..."}
  </p>
  </div>
  <div className="flex flex-col sm:flex-row gap-3">
  <Button onClick={() => updateBalance(chainKey, walletAddress)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold">
  <Wallet className="mr-2 h-4 w-4"/> View Balance
  </Button>
  <Button onClick={() => openFundModal(chainKey, walletAddress)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
  <ArrowDown className="mr-2 h-4 w-4"/> Fund Wallet
  </Button>
  <Button onClick={() => openWithdrawModal(chainKey, walletAddress)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold">
  <ArrowUp className="mr-2 h-4 w-4"/> Withdraw
  </Button>
  </div>
  </div>
  ) : (
  <div className="flex flex-col items-center justify-center h-full">
  <p className="text-gray-400 mb-4">This wallet has not been deployed yet.</p>
  <Button 
  onClick={() => handleDeploy(chainKey)}
  disabled={statusInfo.type === 'loading'}
  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
  {statusInfo.type === 'loading' ? 'Deploying...' : 'Deploy Wallet'}
  </Button>
  </div>
  )}
  </CardContent>
  </Card>
  );
  })}
  </div>
  </div>

  {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
  <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
  <h2 className="text-2xl font-bold mb-4 text-white">Withdraw Funds</h2>
  <p className="text-gray-400 mb-2">From: {CHAIN_CONFIGS[withdrawConfig.chainKey].name}</p>
  <p className="text-gray-400 mb-4 font-mono text-sm break-all">{withdrawConfig.walletAddress}</p>
  
  <div className="mb-4">
  <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-300 mb-1">
  Amount in {CHAIN_CONFIGS[withdrawConfig.chainKey].nativeCurrency.symbol}
  </label>
  <input
  type="text"
  id="withdrawAmount"
  value={withdrawAmount}
  onChange={(e) => setWithdrawAmount(e.target.value)}
  placeholder="e.g., 0.01"
  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
  />
  </div>

  <div className="flex justify-end gap-4 mt-6">
  <Button onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-700">Cancel</Button>
  <Button onClick={handleWithdraw} className="bg-green-600 hover:bg-green-700">Confirm Withdraw</Button>
  </div>
  </div>
  </div>
  )}

  {isFundModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Fund Wallet</h2>
            <p className="text-gray-400 mb-2">To: {CHAIN_CONFIGS[fundConfig.chainKey].name}</p>
            <p className="text-gray-400 mb-4 font-mono text-sm break-all">{fundConfig.walletAddress}</p>
            
            <div className="mb-4">
              <label htmlFor="fundAmount" className="block text-sm font-medium text-gray-300 mb-1">
                Amount in {CHAIN_CONFIGS[fundConfig.chainKey].nativeCurrency.symbol}
              </label>
              <input
                type="text"
                id="fundAmount"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="e.g., 0.01"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => setIsFundModalOpen(false)} className="bg-gray-600 hover:bg-gray-700">Cancel</Button>
              <Button onClick={handleFund} className="bg-blue-600 hover:bg-blue-700">Confirm Fund</Button>
            </div>
          </div>
        </div>
      )}
  </div>
  );
 };

 export default SmartWalletManager;