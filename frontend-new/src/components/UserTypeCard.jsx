import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Users, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const UserTypeCard = ({ type, title, description, buttonText, onClick }) => {
  const IconComponent = type === "testator" ? FileText : Users;

  return (
    <Card className="p-8 text-center bg-gradient-to-br from-white to-brand-light-ice border-2 border-brand-crystal/30 hover:border-brand-crystal/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-crystal/5 to-brand-primary/5"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-deep-ocean rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 hover:shadow-xl"
        whileHover={{
          scale: 1.1,
          rotate: 5,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>

      <motion.h3
        className="text-xl font-semibold text-gray-800 mb-3 relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        I'm a <span className="text-brand-primary">{title}</span>
      </motion.h3>

      <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
        {description}
      </p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10"
      >
        <Button
          onClick={onClick}
          className="bg-brand-primary hover:bg-brand-deep-ocean text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto group"
        >
          {buttonText}
          <motion.div
            animate={{ x: 5 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.div>
        </Button>
      </motion.div>
    </Card>
  );
};

UserTypeCard.propTypes = {
  type: PropTypes.oneOf(["testator", "beneficiary"]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserTypeCard;
