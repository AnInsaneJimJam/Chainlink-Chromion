import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Wallet, Loader2, CheckCircle } from "lucide-react";

const Connect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type");
  const [connectionState, setConnectionState] = useState("idle");

  const handleConnectWallet = async () => {
    setConnectionState("connecting");

    // Simulate wallet connection process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConnectionState("connected");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setConnectionState("success");

    // Navigate after animation
    setTimeout(() => {
      if (userType === "testator") {
        navigate("/dashboard");
      } else {
        navigate("/beneficiary-dashboard");
      }
    }, 1500);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light-ice via-white to-brand-crystal/20">
      <Header />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="p-8 text-center bg-white border-2 border-brand-crystal/30 shadow-lg">
              <AnimatePresence mode="wait">
                {connectionState === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-deep-ocean rounded-full flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Wallet className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      Connect your{" "}
                      <span className="text-brand-primary">wallet</span>
                    </h2>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Connect your wallet to create and manage your digital will
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleConnectWallet}
                        className="w-full bg-brand-primary hover:bg-brand-deep-ocean text-white font-medium py-3 rounded-lg mb-4"
                      >
                        Connect Wallet
                      </Button>
                    </motion.div>

                    <p className="text-sm text-gray-500 mb-6">
                      We support MetaMask, WalletConnect, and other Web3 wallets
                    </p>

                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                      Back to Home
                    </Button>
                  </motion.div>
                )}

                {connectionState === "connecting" && (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-deep-ocean rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-10 h-10 text-white animate-spin" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      Connecting...
                    </h2>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Please confirm the connection in your wallet
                    </p>

                    <motion.div
                      className="w-full h-2 bg-gray-200 rounded-full mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="h-full bg-brand-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {connectionState === "connected" && (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2,
                      }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      Connected!
                    </h2>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Your wallet has been successfully connected
                    </p>
                  </motion.div>
                )}

                {connectionState === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(34, 197, 94, 0.7)",
                          "0 0 0 10px rgba(34, 197, 94, 0)",
                          "0 0 0 0 rgba(34, 197, 94, 0)",
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      Welcome to InheritChain!
                    </h2>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Redirecting to your dashboard...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
