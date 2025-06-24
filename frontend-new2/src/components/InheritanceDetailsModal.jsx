import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const InheritanceDetailsModal = ({ isOpen, onClose, inheritance }) => {
  if (!inheritance) return null;

  const testatorInfo = {
    name: "John Smith",
    address: "0xTc1...44595",
    status: "Active",
  };

  const timeline = {
    lastUpdated: "2025-06-19",
    estimatedValue: "2.5 ETH",
  };

  const assetsToInherit = [
    { symbol: "ETH", amount: "2.5", value: "500 USDC" },
    { symbol: "NFT", amount: "1", value: "" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="bg-white rounded-lg shadow-xl">
              <div className="p-6">
                {/* Header */}
                <motion.div
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div>
                    <h2 className="text-xl font-semibold text-brand-primary mb-1">
                      Inheritance Details
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Detailed information about your inheritance from{" "}
                      {testatorInfo.name}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="p-1 hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </Button>
                  </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Testator Information */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <Card className="p-4 bg-gray-50 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Testator Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Name:
                          </span>
                          <span className="ml-2 text-gray-800">
                            {testatorInfo.name}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Address:
                          </span>
                          <span className="ml-2 text-gray-800 font-mono">
                            {testatorInfo.address}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Status:
                          </span>
                          <span className="ml-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              {testatorInfo.status}
                            </span>
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Timeline */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Card className="p-4 bg-gray-50 border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Timeline
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Last Updated:
                          </span>
                          <span className="ml-2 text-gray-800">
                            {timeline.lastUpdated}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Estimated Value:
                          </span>
                          <span className="ml-2 text-gray-800 font-semibold">
                            {timeline.estimatedValue}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Assets to Inherit */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Card className="p-4 bg-gray-50 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Assets to Inherit
                    </h3>

                    <div className="space-y-3">
                      {assetsToInherit.map((asset, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.6 + index * 0.1,
                            duration: 0.5,
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {asset.symbol}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Amount: {asset.amount}
                            </p>
                          </div>
                          {asset.value && (
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-800">
                                {asset.value}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                      Close
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-brand-primary hover:bg-brand-deep-ocean text-white">
                      Claim Inheritance
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

InheritanceDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  inheritance: PropTypes.any,
};

export default InheritanceDetailsModal;
