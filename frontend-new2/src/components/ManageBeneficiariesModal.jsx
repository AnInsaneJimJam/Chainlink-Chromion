import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import CloseButton from "@/components/ui/CloseButton";

const chainToSymbol = {
  polygon: "MATIC",
  ethereum: "ETH",
  binancesmartchain: "BNB",
  avalanche: "AVAX",
};

const ManageBeneficiariesModal = ({ isOpen, onClose, beneficiaries = [] }) => {
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
            <Card className="bg-white/90 border border-[rgba(4,105,171,0.3)] rounded-[15px] backdrop-blur-[10px] shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto font-inter">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-clash font-semibold text-[#0469AB]  text-left mb-1">
                      Manage Beneficiaries
                    </h2>
                    <p className="text-gray-600 text-sm font-inter font-semibold">
                      Current beneficiaries and their asset allocations
                    </p>
                  </div>
                  <CloseButton onClick={onClose} />
                </div>

                {/* Beneficiaries List with staggered animations */}
                <div className="space-y-4 mb-6">
                  {beneficiaries.length === 0 ? (
                    <div className="text-center text-gray-500">No beneficiaries found.</div>
                  ) : (
                    beneficiaries.map((beneficiary, index) => (
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
                        <Card className="p-4 border border-[rgba(4,105,171,0.3)] bg-[rgba(234,246,255,0.5)] backdrop-blur-[10px] transition-colors duration-200 rounded-[10px]">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <p className="text-gray-800 font-semibold font-mono break-all mb-1">
                                {beneficiary.address}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {beneficiary.allocations && beneficiary.allocations.length > 0 ? (
                                  beneficiary.allocations.map((alloc, i) => (
                                    <span key={i} className="inline-block px-3 py-1 bg-[#EAF6FF] text-[#0469AB] rounded-full text-xs font-medium border border-[#0469AB]/20">
                                      {chainToSymbol[alloc.chain] || alloc.chain}: {alloc.percentage}%
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-gray-400 text-xs">No allocations</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))
                  )}
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
                    <Button
                      className="bg-[#0469AB] hover:bg-[#0167AF] text-white rounded-full font-inter font-semibold px-6 py-2"
                      onClick={() => { window.location.href = '/edit-will'; }}
                    >
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
  beneficiaries: PropTypes.array,
};

export default ManageBeneficiariesModal;
