import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import InheritanceDetailsModal from "@/components/InheritanceDetailsModal";

const BeneficiaryDashboard = () => {
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInheritance, setSelectedInheritance] = useState(null);

  const handleDisconnect = () => {
    navigate("/");
  };

  const handleViewDetails = (inheritance) => {
    setSelectedInheritance(inheritance);
    setShowDetailsModal(true);
  };

  const inheritances = [
    {
      id: 1,
      name: "John Smith",
      address: "0x91f...44955",
      lastUpdate: "2025-06-19",
      estimatedValue: "2.5 ETH",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      address: "0x157...59961",
      lastUpdate: "2025-06-19",
      estimatedValue: "1.8 ETH",
      status: "Pending Investigation",
    },
    {
      id: 3,
      name: "Michael Brown",
      address: "0x127...40758",
      lastUpdate: "2025-06-19",
      estimatedValue: "1.8 ETH",
      status: "Inherit Ready",
    },
  ];

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
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Beneficiary Dashboard
          </h1>
          <p className="text-gray-600">
            View and manage inheritances where you are named as a beneficiary
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-6 bg-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-sm text-gray-600">Total Inheritances</div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                5.05 ETH
              </div>
              <div className="text-sm text-gray-600">Total Estimated Value</div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
              <div className="text-sm text-gray-600">Pending Investigation</div>
            </div>
          </Card>
        </motion.div>

        {/* Your Inheritances Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Inheritances
            </h2>

            <div className="space-y-4">
              {inheritances.map((inheritance, index) => (
                <motion.div
                  key={inheritance.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {inheritance.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            inheritance.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : inheritance.status === "Pending Investigation"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {inheritance.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Address: {inheritance.address}</div>
                        <div>Last Updated: {inheritance.lastUpdate}</div>
                        <div>Estimated Value: {inheritance.estimatedValue}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {inheritance.status === "Pending Investigation" && (
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Start Investigation
                        </Button>
                      )}
                      <Button
                        onClick={() => handleViewDetails(inheritance)}
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Details Modal */}
      <InheritanceDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        inheritance={selectedInheritance}
      />
    </motion.div>
  );
};

export default BeneficiaryDashboard;
