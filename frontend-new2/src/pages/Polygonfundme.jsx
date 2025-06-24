// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { useNavigate } from "react-router-dom";

// import { smartWalletABI, smartWalletBytecode } from "../abi/smartwallet.js";


// // Replace with your actual logic contract address
// const LOGIC_CONTRACT_ADDRESS = "0xeE12fF2A08BAF07c719adB07EFeE5DC62dE23fbd";

// const PolygonFundMe = () => {
//   const [contractAddress, setContractAddress] = useState("");
//   const [walletInstance, setWalletInstance] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [status, setStatus] = useState("");
//   const navigate = useNavigate();

//   const deployContract = async () => {
//     try {
//       setStatus("Deploying contract...");

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const factory = new ethers.ContractFactory(
//         smartWalletABI,
//         smartWalletBytecode,
//         signer
//         );


//       const contract = await factory.deploy();
//       await contract.waitForDeployment();

//       const address = await contract.getAddress();
//       setContractAddress(address);
//       setWalletInstance(contract);
//       setStatus(`Contract deployed at ${address}`);

//       // Automatically set logic contract
//       const tx = await contract.setLogicContract(LOGIC_CONTRACT_ADDRESS);
//       await tx.wait();
//       setStatus("Logic contract set.");
//     } catch (err) {
//       console.error("Deployment failed:", err);
//       setStatus("Deployment failed.");
//     }
//   };

//   const fundWallet = async () => {
//     try {
//       if (!walletInstance) return;
//       setStatus("Funding wallet...");
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const tx = await signer.sendTransaction({
//         to: contractAddress,
//         value: ethers.parseEther(amount),
//       });

//       await tx.wait();
//       setStatus("Wallet funded.");
//     } catch (err) {
//       console.error("Funding failed:", err);
//       setStatus("Funding failed.");
//     }
//   };

//   const withdraw = async () => {
//     try {
//       if (!walletInstance) return;
//       setStatus("Withdrawing...");
//       const tx = await walletInstance.withdraw(ethers.parseEther(amount));
//       await tx.wait();
//       setStatus("Withdraw successful.");
//     } catch (err) {
//       console.error("Withdraw failed:", err);
//       setStatus("Withdraw failed.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="mb-4 text-sm border border-gray-400 px-3 py-1 rounded"
//       >
//         Back to Dashboard
//       </button>

//       <h1 className="text-xl font-semibold mb-4">Polygon Smart Wallet</h1>

//       <button
//         onClick={deployContract}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
//       >
//         Deploy Smart Wallet
//       </button>

//       {contractAddress && (
//         <p className="text-sm mb-2">Deployed at: {contractAddress}</p>
//       )}

//       <div className="mb-4">
//         <label className="block mb-1 text-sm">Amount (MATIC)</label>
//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//       </div>

//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={fundWallet}
//           disabled={!contractAddress}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Fund Wallet
//         </button>

//         <button
//           onClick={withdraw}
//           disabled={!contractAddress}
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Withdraw
//         </button>
//       </div>

//       {status && <p className="text-sm text-gray-700 mt-4">{status}</p>}
//     </div>
//   );
// };

// export default PolygonFundMe;


import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { smartWalletABI, smartWalletBytecode } from "../abi/smartwallet";

const LOGIC_CONTRACT_ADDRESS = "0xeE12fF2A08BAF07c719adB07EFeE5DC62dE23fbd"; // Replace

const PolygonFundMe = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [walletInstance, setWalletInstance] = useState(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const navigate = useNavigate();

  const deployContract = async () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setStatus("Deploying SmartWallet...");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const factory = new ethers.ContractFactory(
        smartWalletABI,
        smartWalletBytecode,
        signer
      );

      const contract = await factory.deploy();
      await contract.waitForDeployment();
      const address = await contract.getAddress();

      setContractAddress(address);
      setWalletInstance(contract);
      setStatus("Contract deployed at " + address);

      const tx = await contract.setLogicContract(LOGIC_CONTRACT_ADDRESS);
      await tx.wait();
      setStatus("Logic contract set successfully");

      // ✅ Save to backend MongoDB
      const userAddress = await signer.getAddress();
      await saveToMongo(userAddress, "polygon", address);
    } catch (err) {
      console.error("Deployment Error:", err);
      setStatus("Deployment failed.");
    } finally {
      setIsDeploying(false);
    }
  };

  const saveToMongo = async (userAddress, chain, walletAddress) => {
    try {
      const res = await fetch("http://localhost:5000/api/wallets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress, chain, walletAddress })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save to DB");
      }

      setStatus("Wallet saved to dashboard.");
    } catch (err) {
      console.error("MongoDB Save Error:", err);
      setStatus("Failed to save to DB.");
    }
  };

  const fundWallet = async () => {
    try {
      if (!walletInstance) return;
      setStatus("Sending funds...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: ethers.parseEther(amount),
      });

      await tx.wait();
      setStatus("Wallet funded.");
    } catch (err) {
      console.error("Funding failed:", err);
      setStatus("Funding failed.");
    }
  };

  const withdraw = async () => {
    try {
      if (!walletInstance) return;
      setStatus("Withdrawing...");
      const tx = await walletInstance.withdraw(ethers.parseEther(amount));
      await tx.wait();
      setStatus("Withdraw successful.");
    } catch (err) {
      console.error("Withdraw failed:", err);
      setStatus("Withdraw failed.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-sm border border-gray-400 px-3 py-1 rounded"
      >
        Back to Dashboard
      </button>

      <h1 className="text-xl font-semibold mb-4">Polygon Smart Wallet</h1>

      <button
        onClick={deployContract}
        disabled={isDeploying}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {isDeploying ? "Deploying..." : "Deploy Smart Wallet"}
      </button>

      {contractAddress && (
        <p className="text-sm mb-2">Deployed at: {contractAddress}</p>
      )}

      <div className="mb-4">
        <label className="block mb-1 text-sm">Amount (MATIC)</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={fundWallet}
          disabled={!contractAddress}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Fund Wallet
        </button>

        <button
          onClick={withdraw}
          disabled={!contractAddress}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Withdraw
        </button>
      </div>

      {status && <p className="text-sm text-gray-700 mt-4">{status}</p>}
    </div>
  );
};

export default PolygonFundMe;
