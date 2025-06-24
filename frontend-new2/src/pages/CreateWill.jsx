import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import ManageBeneficiariesModal from "@/components/ManageBeneficiariesModal";
import DigitalAssetsModal from "@/components/DigitalAssetsModal";
import { Edit, Users, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
  const [showAssetsModal, setShowAssetsModal] = useState(false);

  const handleDisconnect = () => {
    navigate("/");
  };

  const handleEditWill = () => {
    navigate("/edit-will");
  };

  const handleManageBeneficiaries = () => {
    setShowBeneficiariesModal(true);
  };

  const handleViewAssets = () => {
    setShowAssetsModal(true);
  };

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
            Testator Dashboard
          </h1>
          <p className="text-gray-600">
            Create and manage your digital will to secure your assets for your
            beneficiaries
          </p>
        </motion.div>

        {/* Digital Will Status Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card
            className="p-6 border border-gray-200"
            style={{
              background: "linear-gradient(to right, #FFFFFF, #EAFFFF)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Digital Will
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Active
                </span>
              </div>
              <Button
                onClick={handleEditWill}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Will
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div>
                <div className="text-gray-600 mb-1">Created</div>
                <div className="font-medium text-gray-900">2025-06-18</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Last Updated</div>
                <div className="font-medium text-gray-900">2025-06-18</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Beneficiaries</div>
                <div className="font-medium text-gray-900">3</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Total Assets</div>
                <div className="font-medium text-gray-900">6.2 ETH</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Manage Beneficiaries Card */}
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Manage Beneficiaries
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Add, remove, or update beneficiaries and their asset allocations
              </p>
              <Button
                onClick={handleManageBeneficiaries}
                variant="outline"
                className="w-full"
              >
                Manage
              </Button>
            </div>
          </Card>

          {/* Asset Overview Card */}
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Asset Overview
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                View all your digital assets and their current market values
              </p>
              <Button
                onClick={handleViewAssets}
                variant="outline"
                className="w-full"
              >
                View Assets
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <ManageBeneficiariesModal
        isOpen={showBeneficiariesModal}
        onClose={() => setShowBeneficiariesModal(false)}
      />
      <DigitalAssetsModal
        isOpen={showAssetsModal}
        onClose={() => setShowAssetsModal(false)}
      />
    </motion.div>
  );
};

export default Dashboard;
