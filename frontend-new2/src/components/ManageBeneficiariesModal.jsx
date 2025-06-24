import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const ManageBeneficiariesModal = ({ isOpen, onClose }) => {
  const beneficiaries = [
    {
      name: "Alice Smith",
      address: "0x268...44595",
      percentage: 50,
    },
    {
      name: "Bob Johnson",
      address: "0x287...44185",
      percentage: 30,
    },
    {
      name: "Carol Davis",
      address: "0x787...84655",
      percentage: 20,
    },
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
          >
            <Card className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                      Manage Beneficiaries
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Current beneficiaries and their asset allocations
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

                {/* Beneficiaries List with staggered animations */}
                <div className="space-y-4 mb-6">
                  {beneficiaries.map((beneficiary, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.2,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 1.02,
                        x: 5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Card className="p-4 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.6 + index * 0.2,
                              duration: 0.4,
                            }}
                          >
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {beneficiary.name}
                            </h4>
                            <p className="text-gray-600 text-sm font-mono">
                              {beneficiary.address}
                            </p>
                          </motion.div>
                          <motion.div
                            className="px-3 py-1 bg-brand-crystal text-brand-primary rounded-full text-sm font-medium"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.7 + index * 0.2,
                              duration: 0.4,
                              type: "spring",
                              stiffness: 300,
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {beneficiary.percentage}%
                          </motion.div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  className="flex items-center justify-between pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <motion.div
                    className="text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.4 }}
                  >
                    <span className="font-medium">Total Beneficiaries: </span>
                    <span className="font-semibold">
                      {beneficiaries.length}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-brand-primary hover:bg-brand-deep-ocean text-white">
                      Edit Beneficiaries
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

ManageBeneficiariesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ManageBeneficiariesModal;
