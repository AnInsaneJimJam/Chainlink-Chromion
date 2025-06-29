// edit will new - FIXED VERSION
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { Trash2, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../EtherJs/constants.js";

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
        const transformedBeneficiaries = willData.beneficiaries.map(
          (beneficiary, index) => {
            const allocations = {};

            // Convert allocations array to object keyed by chain
            beneficiary.allocations.forEach((allocation) => {
              allocations[allocation.chain] = allocation.percentage.toString();
            });

            return {
              id: Date.now() + index, // Generate unique ID
              address: beneficiary.address,
              allocations: allocations,
            };
          },
        );

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
      }, {}),
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
    return Object.keys(wallets).every((chainKey) => {
      const total = getTotalAllocations(chainKey);
      return total <= 100;
    });
  };

  // Get chains that exceed 100%
  const getInvalidChains = () => {
    return Object.keys(wallets).filter((chainKey) => {
      const total = getTotalAllocations(chainKey);
      return total > 100;
    });
  };

  const editWill = async (_beneficiaries, _testatorAddr) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );

      const newBeneficiaries = _beneficiaries.map((b) => b.address);

      const res = await fetch(
        `http://localhost:5000/api/wills/${_testatorAddr}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await res.json();
      const jsonStr = JSON.stringify(data);
      const bytes = ethers.toUtf8Bytes(jsonStr);
      const createdWillHash = ethers.keccak256(bytes);

      console.log("newB, createdW", newBeneficiaries, createdWillHash);
      const tx = await contract.editWill(newBeneficiaries, createdWillHash);
      await tx.wait();

      console.log("Will updated on-chain successfully");
    } catch (error) {
      console.error("Error updating smart contract:", error);
      throw error; // Re-throw to handle in calling function
    }
  };

  const handleUpdateWill = async () => {
    // Check allocation validity before proceeding
    if (!isAllocationValid()) {
      const invalidChains = getInvalidChains();
      const chainNames = invalidChains
        .map((chain) => chainToSymbol[chain])
        .join(", ");
      alert(
        `Cannot update will: Total allocation exceeds 100% for ${chainNames}. Please adjust allocations.`,
      );
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

    try {
      // Delete the existing will first (like in old version)
      const deleteRes = await fetch(
        `http://localhost:5000/api/wills/${walletAddress}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      // Note: We don't alert here immediately, just log if there's an issue
      if (!deleteRes.ok) {
        console.warn(
          "Will deletion failed or will didn't exist:",
          await deleteRes.text(),
        );
      }

      // Add the new will data
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

  const handleDeleteWill = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your will? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/wills/${walletAddress}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.ok) {
        alert("Will deleted successfully!");
        // Redirect to dashboard or clear the form
        setBeneficiaries([]);
        // You might want to redirect here: window.location.href = '/dashboard';
      } else {
        alert("Failed to delete will.");
      }
    } catch (error) {
      console.error("Error deleting will:", error);
      alert("Failed to delete will.");
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
      className="min-h-screen relative font-inter overflow-x-hidden"
      style={{ background: "#EAF6FF" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fixed Background Layers */}
      <div
        className="fixed w-full h-full top-0 left-0 z-0 overflow-hidden"
        style={{
          background:
            "radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%)",
        }}
      >
        <div
          className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%) rotate(-9.478deg)",
            background: "#CDEFFF",
            mixBlendMode: "hue",
          }}
        />
        <div
          className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2 opacity-25"
          style={{
            transform: "translate(-50%, -50%) rotate(-30.74deg)",
            background:
              "url('https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg') lightgray 50% / cover no-repeat",
            boxShadow: "0px 0px 114.717px 0px #CDEFFF",
          }}
        />
      </div>

      <div className="main-content relative z-10 min-h-screen">
        <Header
          showDisconnect
          onDisconnect={() => {}}
          walletAddress={walletAddress}
        />

        <div className="pt-32 pb-12 px-4 lg:px-12 max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="font-clash text-[48px] font-semibold text-[#2D2D2D]">
              Edit Your Will
            </h1>
            <p className="font-inter text-[22px] text-[#767676] font-medium mt-1">
              Update your digital inheritance by modifying beneficiaries and
              asset distributions
            </p>
          </div>
          <div className="inline-flex h-11 rounded-[10px] border-[0.5px] border-[#8F6112] bg-yellow-100 items-center justify-center px-4 mt-4">
            <p className="text-amber-700 text-md lg:text-[19px] font-medium text-center whitespace-nowrap">
              Make sure your Metamask matches the Sepolia Chain
            </p>
          </div>

          {status && <p className="text-center text-gray-500 mb-4">{status}</p>}

          {/* Allocation Warning - from old version */}
          {!isAllocationValid() && (
            <div className="form-section bg-[#FEE2E2] border border-[#DC2626] rounded-[15px] p-6 mt-8">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-semibold">Allocation Error</h3>
              </div>
              <p className="text-red-700 mt-2">
                Total allocation exceeds 100% for:{" "}
                {getInvalidChains()
                  .map((chain) => chainToSymbol[chain])
                  .join(", ")}
              </p>
              <p className="text-red-600 text-sm mt-1">
                Please adjust allocations before updating your will.
              </p>
            </div>
          )}

          {/* Wallet Information Section - from old version */}
          <div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6 mt-8">
            <h3 className="font-clash text-2xl font-semibold mb-4">
              Connected Wallets
            </h3>
            <div className="grid gap-4">
              {Object.entries(wallets).map(([chainKey, address]) => (
                <div
                  key={chainKey}
                  className="p-4 border border-gray-300 rounded-lg bg-white/50"
                >
                  <h4 className="text-lg font-semibold mb-2">
                    Wallet on {chainKey}
                  </h4>
                  <p className="text-sm text-gray-700 break-words font-mono">
                    {address}
                  </p>
                  <p className="text-sm text-gray-800 mt-2">
                    Balance:{" "}
                    {balances[chainKey]
                      ? `${balances[chainKey]} ${chainToSymbol[chainKey]}`
                      : "Loading..."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 mt-8">
            {/* Will Information Section */}
            <div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
              <h3 className="font-clash text-2xl font-semibold mb-4">
                Will Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div>
                  <span className="label font-semibold text-[#0469AB]">
                    Created:
                  </span>{" "}
                  <span className="value text-[#25292A]">2025-06-18</span>
                </div>
                <div>
                  <span className="label font-semibold text-[#0469AB]">
                    Last Updated:
                  </span>{" "}
                  <span className="value text-[#25292A]">2025-06-18</span>
                </div>
                <div>
                  <span className="label font-semibold text-[#0469AB]">
                    Status:
                  </span>{" "}
                  <span className="status-badge-green bg-[#D5FFE6] text-[#12703D] px-3 py-1 rounded-full ml-2">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Beneficiaries & Asset Distribution Section */}
            <div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="font-clash text-2xl font-semibold">
                  Beneficiaries & Asset Distribution
                </h3>
                <button
                  type="button"
                  onClick={addBeneficiary}
                  className="btn-add-beneficiary bg-[#07AAF4] text-white rounded-full px-6 py-2 font-semibold text-base mt-4 md:mt-0 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Beneficiary
                </button>
              </div>
              <div className="space-y-6 mt-4">
                {/* Beneficiary Cards */}
                {beneficiaries.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 mb-4">
                      No beneficiaries found in your will.
                    </p>
                    <button
                      type="button"
                      onClick={addBeneficiary}
                      className="bg-[#07AAF4] text-white rounded-full px-6 py-2 font-semibold text-base flex items-center gap-2 mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Beneficiary
                    </button>
                  </div>
                ) : (
                  beneficiaries.map((b, idx) => (
                    <div
                      key={b.id}
                      className="beneficiary-card border-t border-gray-300 pt-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-clash text-xl font-semibold">
                          Beneficiary {idx + 1}
                        </h4>
                        <button
                          type="button"
                          className="bg-transparent border border-[#EF4444] text-[#EF4444] p-2 rounded"
                          onClick={() => removeBeneficiary(b.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label text-[#25292A] font-semibold">
                            Wallet Address
                          </label>
                          <input
                            type="text"
                            className="form-input w-full border border-[#CBD5E1] bg-white/70 rounded-lg px-3 py-2 mt-1 font-mono"
                            placeholder="Enter beneficiary wallet address (0x...)"
                            value={b.address}
                            onChange={(e) =>
                              updateBeneficiary(b.id, "address", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="form-label mb-2 text-[#25292A] font-semibold">
                          Asset Allocation (%)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {Object.keys(wallets).map((chainKey) => {
                            const totalAllocation =
                              getTotalAllocations(chainKey);
                            const isOverAllocation = totalAllocation > 100;

                            return (
                              <div
                                className="flex-1 min-w-[120px]"
                                key={chainKey}
                              >
                                <label
                                  className={`form-label text-sm ${isOverAllocation ? "text-red-700" : ""}`}
                                >
                                  {chainToSymbol[chainKey]} — Total:{" "}
                                  {totalAllocation}%
                                  {isOverAllocation && (
                                    <span className="text-red-600 ml-1">
                                      ⚠️
                                    </span>
                                  )}
                                </label>
                                <input
                                  type="number"
                                  className={`form-input w-full border bg-white/70 rounded-lg px-3 py-2 mt-1 ${isOverAllocation ? "border-red-300 focus:border-red-500" : "border-[#CBD5E1]"}`}
                                  min="0"
                                  max="100"
                                  placeholder={`% of ${chainToSymbol[chainKey]}`}
                                  value={b.allocations[chainKey] || ""}
                                  onChange={(e) =>
                                    updateBeneficiary(
                                      b.id,
                                      "allocation",
                                      e.target.value,
                                      chainKey,
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Allocation Summary Section */}
            <div className="form-section bg-[rgba(234,246,255,0.5)] border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] p-6">
              <h3 className="font-clash text-2xl font-semibold">
                Allocation Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {Object.keys(wallets).map((chainKey) => {
                  const total = getTotalAllocations(chainKey);
                  const isValid = total <= 100;
                  return (
                    <div
                      key={chainKey}
                      className={`allocation-summary-box rounded-lg p-4 text-center ${isValid ? "summary-green bg-[#D5FFE6] text-[#12703D] border border-[#12703D]" : "summary-red bg-[#FEE2E2] text-[#B91C1C] border border-[#DC2626]"}`}
                    >
                      <p className="font-semibold">{chainToSymbol[chainKey]}</p>
                      <p className="text-xl font-bold">
                        {total}% Allocated {isValid ? "✔" : "⊗"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save/Cancel/Delete Buttons */}
            <div className="flex justify-between items-center pt-6">
              <div>
                <button
                  type="button"
                  className="header-btn bg-white border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A]"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Back to Dashboard
                </button>
                <button
                  type="button"
                  className="header-btn btn-danger ml-4 bg-[#EF4444] text-white rounded-[25px] px-6 py-2 font-semibold hover:bg-[#DC2626]"
                  onClick={handleDeleteWill}
                >
                  Delete Will
                </button>
              </div>
              <button
                type="button"
                className="btn-primary header-btn text-white rounded-full px-8 py-3 text-xl bg-[#0167AF] hover:bg-[#0469AB] font-inter font-semibold shadow disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleUpdateWill}
                disabled={beneficiaries.length === 0 || !isAllocationValid()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditWill;
