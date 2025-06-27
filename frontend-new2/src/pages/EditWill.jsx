import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { Trash2, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";

// --- Contract Info ---
const CONTRACT_ADDRESS = "0x076af07022a92cCFdAF1aB6CA42AfA9Ed0360097";
const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "address[]", name: "_beneficiaries", type: "address[]" },
      { internalType: "bytes32", name: "_willHash", type: "bytes32" },
    ],
    name: "editWill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const chainToSymbol = {
  polygon: "MATIC",
  ethereum: "ETH",
  binancesmartchain: "BNB",
  avalanche: "AVAX",
};

const EditWill = () => {
  const [wallets, setWallets] = useState({});
  const [balances, setBalances] = useState({});
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("Loading will data...");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWallets = useCallback(async (address) => {
    try {
      const res = await fetch(`http://localhost:5000/api/wallets/${address}`);
      if (res.ok) {
        const data = await res.json();
        setWallets(data.wallets || {});
      }
    } catch (err) {
      console.error("Fetch wallets error:", err);
    }
  }, []);

  const fetchWillData = useCallback(async (address) => {
    setStatus("Loading will data...");
    try {
      const res = await fetch(`http://localhost:5000/api/wills/${address}`);
      if (res.ok) {
        const willData = await res.json();
        
        // Transform the will data to match the beneficiaries state structure
        const transformedBeneficiaries = willData.beneficiaries.map((beneficiary, index) => {
          const allocations = {};
          
          // Convert allocations array to object keyed by chain
          beneficiary.allocations.forEach(allocation => {
            allocations[allocation.chain] = allocation.percentage.toString();
          });
          
          return {
            id: Date.now() + index, // Generate unique ID
            address: beneficiary.address,
            allocations: allocations
          };
        });
        
        setBeneficiaries(transformedBeneficiaries);
        setStatus("");
      } else {
        setStatus("Will not found.");
      }
    } catch (err) {
      console.error("Fetch will data error:", err);
      setStatus("Error loading will data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBalance = useCallback(async (chainKey, walletAddress) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(walletAddress);
      setBalances((prev) => ({
        ...prev,
        [chainKey]: ethers.formatEther(balance),
      }));
    } catch (err) {
      console.error(`Failed to fetch balance for ${chainKey}:`, err);
    }
  }, []);

  useEffect(() => {
    const getConnectedAddress = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          await fetchWallets(address);
          await fetchWillData(address);
        } catch (error) {
          console.error("Error fetching wallet:", error);
          setStatus("Error connecting to wallet.");
          setLoading(false);
        }
      } else {
        console.error("MetaMask not detected");
        setStatus("MetaMask not detected.");
        setLoading(false);
      }
    };

    getConnectedAddress();
  }, [fetchWallets, fetchWillData]);

  useEffect(() => {
    Object.entries(wallets).forEach(([chainKey, walletAddress]) => {
      if (walletAddress) {
        updateBalance(chainKey, walletAddress);
      }
    });
  }, [wallets, updateBalance]);

  const addBeneficiary = () => {
    const newBeneficiary = {
      id: Date.now(), // Generate unique ID
      address: "",
      allocations: Object.keys(wallets).reduce((acc, chainKey) => {
        acc[chainKey] = "";
        return acc;
      }, {})
    };
    setBeneficiaries((prev) => [...prev, newBeneficiary]);
  };

  const removeBeneficiary = (id) => {
    setBeneficiaries((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBeneficiary = (id, field, value, chainKey = null) => {
    setBeneficiaries((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (field === "address") {
          return { ...b, address: value };
        }
        if (field === "allocation" && chainKey) {
          return {
            ...b,
            allocations: {
              ...b.allocations,
              [chainKey]: value,
            },
          };
        }
        return b;
      }),
    );
  };

  const getTotalAllocations = (chainKey) => {
    return beneficiaries.reduce(
      (sum, b) => sum + Number(b.allocations[chainKey] || 0),
      0,
    );
  };

  // Check if allocations are valid (don't exceed 100% for any chain)
  const isAllocationValid = () => {
    return Object.keys(wallets).every(chainKey => {
      const total = getTotalAllocations(chainKey);
      return total <= 100;
    });
  };

  // Get chains that exceed 100%
  const getInvalidChains = () => {
    return Object.keys(wallets).filter(chainKey => {
      const total = getTotalAllocations(chainKey);
      return total > 100;
    });
  };

  const editWill = async (_beneficiaries, _testatorAddr) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const newBeneficiaries = _beneficiaries.map((b) => b.address);

      const res = await fetch(`http://localhost:5000/api/wills/${_testatorAddr}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      const jsonStr = JSON.stringify(data);
      const bytes = ethers.toUtf8Bytes(jsonStr);
      const createdWillHash = ethers.keccak256(bytes);

      const tx = await contract.editWill(newBeneficiaries, createdWillHash);
      await tx.wait();

      console.log("Will updated on-chain successfully");
    } catch (error) {
      console.error("Error updating smart contract:", error);
    }
  };

  const handleUpdateWill = async () => {
    // Check allocation validity before proceeding
    if (!isAllocationValid()) {
      const invalidChains = getInvalidChains();
      const chainNames = invalidChains.map(chain => chainToSymbol[chain]).join(', ');
      alert(`Cannot update will: Total allocation exceeds 100% for ${chainNames}. Please adjust allocations.`);
      return;
    }

    const willObject = {
      testator: walletAddress,
      beneficiaries: beneficiaries.map((b) => ({
        address: b.address,
        allocations: Object.entries(b.allocations).map(
          ([chain, percentage]) => ({
            chain,
            percentage: Number(percentage),
          }),
        ),
      })),
    };

    // delete the existing database
    try {
      const res = await fetch(`http://localhost:5000/api/wills/${walletAddress}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      alert("Will deleted successfully!");
    } catch (error) {
      console.error("Error deltet will:", error);
      alert("Failed to dleete will.");
    }
    

    // add the database
    try {
      // Update in database (override existing data)
      const res = await fetch(`http://localhost:5000/api/wills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(willObject),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        alert("Failed to update will in backend.");
        return;
      }

      // Update on blockchain
      await editWill(beneficiaries, walletAddress);

      alert("Will updated successfully!");
    } catch (error) {
      console.error("Error updating will:", error);
      alert("Failed to update will.");
    }
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
      >
        <div className="text-center">
          <p className="text-gray-500 text-lg">Loading will data...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      style={{ background: "linear-gradient(to bottom, #ffffff, #fafbfc)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header showDisconnect onDisconnect={() => {}} />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Will</h1>
          <p className="text-gray-600">
            Update your digital inheritance structure and beneficiary allocations.
          </p>
        </div>

        {status && <p className="text-center text-gray-500 mb-4">{status}</p>}

        {/* Allocation Warning */}
        {!isAllocationValid() && (
          <Card className="p-4 mb-6 border-red-300 bg-red-50">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-semibold">Allocation Error</h3>
            </div>
            <p className="text-red-700 mt-2">
              Total allocation exceeds 100% for: {getInvalidChains().map(chain => chainToSymbol[chain]).join(', ')}
            </p>
            <p className="text-red-600 text-sm mt-1">
              Please adjust allocations before updating your will.
            </p>
          </Card>
        )}

        <div className="grid gap-6">
          {Object.entries(wallets).map(([chainKey, address]) => (
            <Card key={chainKey} className="p-4 border border-gray-300">
              <h3 className="text-lg font-semibold mb-2">Wallet on {chainKey}</h3>
              <p className="text-sm text-gray-700 break-words">{address}</p>
              <p className="text-sm text-gray-800 mt-2">
                Balance:{" "}
                {balances[chainKey]
                  ? `${balances[chainKey]} ${chainToSymbol[chainKey]}`
                  : "Loading..."}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Beneficiaries</h2>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                {beneficiaries.length} beneficiar{beneficiaries.length !== 1 ? "ies" : "y"}
              </p>
              <Button 
                onClick={addBeneficiary}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Beneficiary
              </Button>
            </div>
          </div>

          {beneficiaries.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500 mb-4">No beneficiaries found in your will.</p>
              <Button 
                onClick={addBeneficiary}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Add Your First Beneficiary
              </Button>
            </Card>
          ) : (
            beneficiaries.map((b, idx) => (
              <Card key={b.id} className="p-4 mb-4 border">
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-semibold">Beneficiary {idx + 1}</h3>
                  <Button variant="ghost" onClick={() => removeBeneficiary(b.id)}>
                    <Trash2 className="text-red-600" />
                  </Button>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Wallet Address
                  </label>
                  <Input
                    value={b.address}
                    onChange={(e) => updateBeneficiary(b.id, "address", e.target.value)}
                    placeholder="Enter beneficiary wallet address (0x...)"
                    className="w-full font-mono"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(wallets).map(([chainKey]) => {
                    const totalAllocation = getTotalAllocations(chainKey);
                    const isOverAllocation = totalAllocation > 100;
                    
                    return (
                      <div key={chainKey}>
                        <label className={`text-sm font-medium ${isOverAllocation ? 'text-red-700' : 'text-gray-700'}`}>
                          {chainToSymbol[chainKey]} Allocation (%) — Total: {totalAllocation}%
                          {isOverAllocation && <span className="text-red-600 ml-1">⚠️</span>}
                        </label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={b.allocations[chainKey] || ""}
                          onChange={(e) =>
                            updateBeneficiary(b.id, "allocation", e.target.value, chainKey)
                          }
                          placeholder={`% of ${chainToSymbol[chainKey]}`}
                          className={isOverAllocation ? 'border-red-300 focus:border-red-500' : ''}
                        />
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-10 flex justify-end">
          <Button
            onClick={handleUpdateWill}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={beneficiaries.length === 0 || !isAllocationValid()}
          >
            Update Will (Save to Backend + Chain)
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditWill;