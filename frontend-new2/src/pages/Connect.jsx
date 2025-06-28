import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import {ethers} from "ethers"; 
import useWalletStore from "../EtherJs/walletStore.js";
import {getContract} from "../EtherJs/contract.js";

const Connect = () => {
  const { setContract } = useWalletStore()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type");
  const [connectionState, setConnectionState] = useState("idle");

const handleConnectWallet = async () => {
  try {
    setConnectionState("connecting");

    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      setConnectionState("idle");
      return;
    }

    // Request wallet connection
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const address = await signer.getAddress();
    console.log("Connected wallet address:", address);

    const contractInstance = getContract(signer);
    setContract(contractInstance);
    
    // Simulate connection animations
    setConnectionState("connected");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setConnectionState("success");

    // Redirect after short delay
    setTimeout(() => {
      if (userType === "testator") {
        navigate("/dashboard");
      } else {
        navigate("/beneficiary-dashboard");
      }
    }, 1500);
    return { provider, signer, address }

  } catch (err) {
    console.error("Wallet connection failed", err);
    setConnectionState("idle");
  }
};

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <style jsx>{`
        body {
            position: relative;
            font-family: 'Inter', sans-serif;
            overflow: hidden;
        }

        .fixed-background {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background: radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%);
            z-index: 0;
            overflow: hidden;
        }

        .fixed-background::before {
            content: '';
            position: absolute;
            width: 150vmax;
            height: 150vmax;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-9.478deg);
            background: #CDEFFF;
            mix-blend-mode: hue;
        }

        .fixed-background::after {
            content: '';
            position: absolute;
            width: 150vmax;
            height: 150vmax;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30.74deg);
            background: url('https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg') lightgray 50% / cover no-repeat;
            opacity: 0.25;
            box-shadow: 0px 0px 114.717px 0px #CDEFFF;
        }
        
        .main-content {
            position: relative;
            z-index: 2;
        }

        .font-clash { font-family: 'Clash Display', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        .page-header-text {
            color: #25292A;
            font-family: "Clash Display", sans-serif;
            font-size: 32px;
            font-weight: 600;
        }
        
        .connect-wallet-box {
            width: 541px;
            height: 407px;
            flex-shrink: 0;
            border-radius: 25px;
            border: 2px solid rgba(4, 105, 171, 0.50);
            background: rgba(255, 255, 255, 0.34);
            box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(25px);
            opacity: 0.8;
        }

        .wallet-icon-container {
            width: 72px;
            height: 72px;
            background-color: #0167AF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .connect-title-prefix {
            color: #25292A;
            font-family: "Clash Display", sans-serif;
            font-size: 28px;
            font-weight: 600;
        }
        .connect-title-main {
            color: #0469AB;
            font-family: "Clash Display", sans-serif;
            font-size: 28px;
            font-weight: 600;
        }
        
        .connect-subtext {
            color: #767676;
            font-family: 'Inter', sans-serif;
            font-size: 22px;
            font-weight: 500;
            text-align: center;
        }

        .connect-button {
            width: 224px;
            height: 48px;
            flex-shrink: 0;
            border-radius: 25px;
            background: #0167AF;
            color: #FFF;
            font-family: 'Inter', sans-serif;
            font-size: 20px;
            font-weight: 600;
            transition: background-color 0.3s;
            border: none;
            cursor: pointer;
        }
        .connect-button:hover {
            background: #00A6F8;
        }
        
        .supported-wallets-text {
            color: #767676;
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 500;
        }

        .connecting-animation {
            animation: rotate 2s linear infinite;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .success-pulse {
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
            }
            70% {
                transform: scale(1.2);
                box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap" rel="stylesheet" />

      <div className="fixed-background"></div>

      <div className="main-content min-h-screen">
        <header className="absolute top-0 left-0 p-8 lg:p-12">
          <div className="flex items-center gap-4">
         
            <img src="logo.png" alt="InheritChain Logo" className="w-12 h-12" />
            <span className="page-header-text">InheritChain</span>
          </div>
        </header>

        <div className="min-h-screen flex items-center justify-center">
          <div className="connect-wallet-box p-8 flex flex-col items-center justify-around text-center">
            
            <AnimatePresence mode="wait">
              {connectionState === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-around h-full"
                >
                  <div className="wallet-icon-container">
                    {/* Replace with your wallet.png */}
                    <img src="Wallet.png" alt="Wallet Icon" className="w-12 h-12" />
                  </div>

                  <h1 className="font-clash">
                    <span className="connect-title-prefix">Connect your </span>
                    <span className="connect-title-main">wallet</span>
                  </h1>

                  <p className="connect-subtext">Login to your Smart Contract Wallet<br />using your connected wallet</p>
                  
                  <motion.button 
                    className="connect-button flex items-center justify-center"
                    onClick={handleConnectWallet}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Connect Wallet
                  </motion.button>

                  <p className="supported-wallets-text">We support MetaMask, WalletConnect, and other Web3 wallets</p>
                </motion.div>
              )}

              {connectionState === "connecting" && (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-around h-full"
                >
                  <div className="wallet-icon-container connecting-animation">
                    <Loader2 className="w-12 h-12 text-white" />
                  </div>

                  <h1 className="font-clash">
                    <span className="connect-title-prefix">Connecting...</span>
                  </h1>

                  <p className="connect-subtext">Please confirm the connection in your wallet</p>

                  <div className="w-56 h-2 bg-gray-200 rounded-full">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </div>

                  <p className="supported-wallets-text">Processing your connection...</p>
                </motion.div>
              )}

              {connectionState === "connected" && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-around h-full"
                >
                  <motion.div 
                    className="w-18 h-18 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    style={{ width: '72px', height: '72px' }}
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>

                  <h1 className="font-clash">
                    <span className="connect-title-main">Connected!</span>
                  </h1>

                  <p className="connect-subtext">Your wallet has been successfully connected</p>

                  <div className="connect-button bg-green-500">
                    ✓ Connected
                  </div>

                  <p className="supported-wallets-text">Connection established successfully</p>
                </motion.div>
              )}

              {connectionState === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-around h-full"
                >
                  <div 
                    className="w-18 h-18 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center success-pulse"
                    style={{ width: '72px', height: '72px' }}
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>

                  <h1 className="font-clash">
                    <span className="connect-title-main">Welcome to InheritChain!</span>
                  </h1>

                  <p className="connect-subtext">Redirecting to your dashboard...</p>

                  <div className="connect-button bg-green-500">
                    🎉 Success!
                  </div>

                  <p className="supported-wallets-text">Taking you to your dashboard...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connect;