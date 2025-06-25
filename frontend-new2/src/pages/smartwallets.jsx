import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { ethers } from "ethers";
import { smartWalletABI, smartWalletBytecode } from "../abi/smartwallet";

const CHAIN_CONFIGS = {
  polygon: {
    chainId: 80002n, // Polygon Amoy
    name: "Polygon",
  },
  ethereum: {
    chainId: 11155111n, // Sepolia
    name: "Ethereum",
  },
  base: {
    chainId: 84532n,
    name: "Base",
  },
};

const SmartWallets = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [wallets, setWallets] = useState({});
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install Metamask");

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress(); // ✅ gets mixed-case address

            setUserAddress(address);
            fetchWallets(address);
        } catch (err) {
            console.error("Wallet connect error:", err);
            setStatus("Failed to connect wallet.");
        }
        };


    connectWallet();
  }, []);
  
  const fetchWallets = async (address) => {
    try {
        const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
        if (!res.ok) {
        setStatus("No wallets found.");
        return;
        }
        const data = await res.json();
        console.log(data.wallets)
        setWallets(data.wallets || {}); // ✅ avoid null
        setStatus("");
    } catch (err) {
        console.error("Fetch error:", err);
        setStatus("Failed to load wallets.");
    }
    };

  const handleFund = async (chainKey, walletAddress) => {
    const expectedChainId = CHAIN_CONFIGS[chainKey]?.chainId;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      console.log(network.chainId)
      if (network.chainId !== expectedChainId) {
        alert(`Please switch to ${CHAIN_CONFIGS[chainKey].name} network.`);
        return;
      }

      const tx = await signer.sendTransaction({
        to: walletAddress,
        value: ethers.parseEther("0.01"),
      });

      await tx.wait();
      alert("Transaction successful!");
    } catch (err) {
      console.error("Funding failed:", err);
      alert("Transaction failed");
    }
  };

  const handleWithdraw = async (chainKey, walletAddress) => {
  const expectedChainId = CHAIN_CONFIGS[chainKey]?.chainId;

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();

    if (network.chainId !== expectedChainId) {
      alert(`Please switch to ${CHAIN_CONFIGS[chainKey].name} network.`);
      return;
    }

    const amount = prompt("Enter amount to withdraw (in ETH):");
    if (!amount || isNaN(amount)) {
      alert("Invalid amount");
      return;
    }

    const contract = new ethers.Contract(walletAddress, smartWalletABI, signer);

    const tx = await contract.withdraw(ethers.parseEther(amount));
    await tx.wait();

    alert("Withdraw successful!");
  } catch (err) {
    console.error("Withdraw failed:", err);
    alert("Withdraw failed. Check console for details.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Smart Wallets</h1>

        <div className="mb-4 text-center text-gray-600">
          Please ensure you're on the correct network when funding or withdrawing.
        </div>

        <div className="flex justify-center items-center mb-6 text-sm text-yellow-600 bg-yellow-100 p-3 rounded-md gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Make sure your MetaMask network matches the selected chain.</span>
        </div>

        {status && <p className="text-center text-gray-500">{status}</p>}

        <div className="grid gap-6">
          {Object.entries(wallets).map(([chainKey, walletAddress]) => (
            <Card key={chainKey} className="p-6 bg-white border">
              <h2 className="text-xl font-semibold mb-2">
                {CHAIN_CONFIGS[chainKey]?.name || chainKey}
              </h2>
              <p className="mb-4 text-sm text-gray-600">{walletAddress}</p>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleFund(chainKey, walletAddress)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Fund Wallet
                </Button>
                <Button
                  onClick={() => handleWithdraw(chainKey, walletAddress)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Withdraw
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartWallets;
