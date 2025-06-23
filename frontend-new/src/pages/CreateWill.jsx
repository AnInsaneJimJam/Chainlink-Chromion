import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import ManageBeneficiariesModal from "@/components/ManageBeneficiariesModal";
import DigitalAssetsModal from "@/components/DigitalAssetsModal";
import { Users, BarChart3 } from "lucide-react";

const CreateWill = () => {
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
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #fafbfc)",
      }}
    >
      <Header showDisconnect onDisconnect={handleDisconnect} />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Testator Dashboard
          </h1>
          <p className="text-gray-600">
            Create and manage your digital will to secure your assets for your
            beneficiaries
          </p>
        </div>

        {/* Digital Will Status Card */}
        <div className="mb-8">
          <Card
            className="p-6 border border-gray-200"
            style={{
              background: "linear-gradient(to right, #FFFFFF, #EAFFFF)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                Edit Will
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-8 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Created</div>
                <div className="font-medium text-gray-900">2025-06-18</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Last Updated</div>
                <div className="font-medium text-gray-900">2025-06-18</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Beneficiaries</div>
                <div className="font-medium text-gray-900">3</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Total Assets</div>
                <div className="font-medium text-gray-900">6.2 ETH</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Manage Beneficiaries Card */}
          <div className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <Card className="p-8 border border-gray-200 cursor-pointer overflow-hidden relative bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-200">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Manage Beneficiaries
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Add, remove, or update beneficiaries and their asset
                  allocations
                </p>
                <Button
                  onClick={handleManageBeneficiaries}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md"
                >
                  Manage
                </Button>
              </div>
            </Card>
          </div>

          {/* Asset Overview Card */}
          <div className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <Card className="p-8 border border-gray-200 cursor-pointer overflow-hidden relative bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-200">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Asset Overview
                </h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  View all your digital assets and their current market values
                </p>
                <Button
                  onClick={handleViewAssets}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md"
                >
                  View Assets
                </Button>
              </div>
            </Card>
          </div>
        </div>
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
    </div>
  );
};

export default CreateWill;
