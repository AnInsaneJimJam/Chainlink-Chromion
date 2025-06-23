import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

const EditWill = () => {
  const navigate = useNavigate();

  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      name: "Alice Smith",
      address: "0x444878d5fd0f32e479d4e20556de47924e09690d",
      allocations: {
        ETH: { total: "50%", amount: "50" },
        USDC: { total: "100%", amount: "60" },
        NFT: { total: "100%", amount: "100" },
      },
    },
    {
      id: 2,
      name: "Bob Johnson",
      address: "0x540076f386a7d37d123d04e204d36490864860488",
      allocations: {
        ETH: { total: "50%", amount: "50" },
        USDC: { total: "100%", amount: "20" },
        NFT: { total: "100%", amount: "0" },
      },
    },
    {
      id: 3,
      name: "Beneficiary Name",
      address: "0x...",
      allocations: {
        ETH: { total: "100%", amount: "0" },
        USDC: { total: "100%", amount: "0" },
        NFT: { total: "100%", amount: "0" },
      },
    },
  ]);

  const assets = [
    { symbol: "ETH", amount: "2.5 ($4,200)", total: "50" },
    { symbol: "USDC", amount: "1000 ($1,000)", total: "60" },
    { symbol: "NFT", amount: "3 ($750)", total: "100" },
  ];

  const handleDisconnect = () => {
    navigate("/");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const addBeneficiary = () => {
    const newBeneficiary = {
      id: Date.now(),
      name: "New Beneficiary",
      address: "0x...",
      allocations: {
        ETH: { total: "100%", amount: "0" },
        USDC: { total: "100%", amount: "0" },
        NFT: { total: "100%", amount: "0" },
      },
    };
    setBeneficiaries([...beneficiaries, newBeneficiary]);
  };

  const removeBeneficiary = (id) => {
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id));
  };

  const updateBeneficiary = (id, field, value) => {
    setBeneficiaries(
      beneficiaries.map((beneficiary) => {
        if (beneficiary.id === id) {
          if (field.includes(".")) {
            const [parent, child, subChild] = field.split(".");
            return {
              ...beneficiary,
              [parent]: {
                ...beneficiary[parent],
                [child]: {
                  ...beneficiary[parent][child],
                  [subChild]: value,
                },
              },
            };
          }
          return {
            ...beneficiary,
            [field]: value,
          };
        }
        return beneficiary;
      }),
    );
  };

  const handleSave = () => {
    console.log("Saving will:", { beneficiaries });
    navigate("/dashboard");
  };

  const getAllocationSummary = () => {
    const summary = { ETH: 0, USDC: 0, NFT: 0 };
    beneficiaries.forEach((b) => {
      Object.keys(summary).forEach((asset) => {
        summary[asset] += parseInt(b.allocations[asset].amount) || 0;
      });
    });
    return summary;
  };

  const allocationSummary = getAllocationSummary();

  return (
    <motion.div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #fafbfc)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header showDisconnect onDisconnect={handleDisconnect} />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Page Header */}
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Your Will
            </h1>
            <p className="text-gray-600">
              Update your digital inheritance by modifying beneficiaries and
              asset distributions
            </p>
          </div>
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className="flex items-center gap-2"
          >
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Will Information */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Will Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-gray-600 text-sm mb-1">Created</div>
                <div className="font-medium">June 30, 2025</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm mb-1">Last Updated</div>
                <div className="font-medium">June 19, 2025</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm mb-1">Status</div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Active
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Your Assets */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Assets
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {assets.map((asset, index) => (
                <div
                  key={asset.symbol}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {asset.symbol}
                  </h3>
                  <p className="text-gray-600 text-sm">{asset.amount}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Beneficiaries & Asset Distribution */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Beneficiaries & Asset Distribution
              </h2>
              <Button
                onClick={addBeneficiary}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Beneficiary
              </Button>
            </div>

            <div className="space-y-6">
              {beneficiaries.map((beneficiary, index) => (
                <div
                  key={beneficiary.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Beneficiary {index + 1}
                    </h3>
                    <Button
                      onClick={() => removeBeneficiary(beneficiary.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        value={beneficiary.name}
                        onChange={(e) =>
                          updateBeneficiary(
                            beneficiary.id,
                            "name",
                            e.target.value,
                          )
                        }
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Wallet Address
                      </label>
                      <Input
                        value={beneficiary.address}
                        onChange={(e) =>
                          updateBeneficiary(
                            beneficiary.id,
                            "address",
                            e.target.value,
                          )
                        }
                        className="bg-white font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asset Allocation(%)
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.keys(beneficiary.allocations).map((asset) => (
                        <div key={asset}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {asset}
                            </span>
                            <span className="text-xs text-gray-500">
                              Total: {beneficiary.allocations[asset].total}
                            </span>
                          </div>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={beneficiary.allocations[asset].amount}
                            onChange={(e) =>
                              updateBeneficiary(
                                beneficiary.id,
                                `allocations.${asset}.amount`,
                                e.target.value,
                              )
                            }
                            className="bg-white text-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Allocation Summary */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Allocation Summary
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(allocationSummary).map(([asset, percentage]) => (
                <div
                  key={asset}
                  className="p-4 bg-red-50 rounded-lg text-center"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{asset}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-red-600">
                      {percentage}% Allocated
                    </span>
                    {percentage === 100 && (
                      <span className="text-green-600">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button variant="outline">Cancel Changes</Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EditWill;
