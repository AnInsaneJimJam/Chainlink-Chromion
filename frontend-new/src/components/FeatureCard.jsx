import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Shield, Settings, RefreshCw } from "lucide-react";
import PropTypes from "prop-types";

const FeatureCard = ({ type, title, description }) => {
  const getIcon = () => {
    switch (type) {
      case "secure":
        return (
          <Shield className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors duration-300" />
        );
      case "management":
        return (
          <Settings className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors duration-300" />
        );
      case "transfer":
        return (
          <RefreshCw className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors duration-300" />
        );
      default:
        return (
          <Shield className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors duration-300" />
        );
    }
  };

  return (
    <Card className="p-6 text-center bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-light-ice/50 to-brand-crystal/20 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="w-16 h-16 bg-brand-light-ice rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:bg-brand-primary transition-colors duration-300"
        whileHover={{
          scale: 1.2,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={
            type === "transfer"
              ? {
                  rotate: 360,
                }
              : {}
          }
          transition={
            type === "transfer"
              ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }
              : {}
          }
        >
          {getIcon()}
        </motion.div>
      </motion.div>

      <motion.h4
        className="text-lg font-semibold text-gray-800 mb-3 relative z-10 group-hover:text-brand-primary transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h4>

      <motion.p
        className="text-gray-600 text-sm leading-relaxed relative z-10"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {description}
      </motion.p>

      {/* Floating particles effect */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-brand-crystal rounded-full opacity-0 group-hover:opacity-100"
        animate={{
          y: -10,
          opacity: 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-1 h-1 bg-brand-primary rounded-full opacity-0 group-hover:opacity-100"
        animate={{
          y: -15,
          opacity: 0.8,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </Card>
  );
};

FeatureCard.propTypes = {
  type: PropTypes.oneOf(["secure", "management", "transfer"]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
