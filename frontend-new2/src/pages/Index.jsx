import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import UserTypeCard from "@/components/UserTypeCard";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const navigate = useNavigate();

  const handleTestatorClick = () => {
    navigate("/connect?type=testator");
  };

  const handleBeneficiaryClick = () => {
    navigate("/connect?type=beneficiary");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light-ice via-white to-brand-crystal/20 relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              DIGITAL INHERITANCE WITH{" "}
            </motion.span>
            <motion.span
              className="text-brand-primary"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 1.0,
                ease: "easeOut",
              }}
            >
              BLOCKCHAIN
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            Secure your digital assets for your loved ones. Create tamper-proof
            wills and ensure seamless asset transfer when it matters most
          </motion.p>

          {/* Cryptocurrency Coins Image with fast responsive animation */}
          <motion.div
            className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/assets/e22bd1c1a044432692e5c31b8a55a823/image-4fbb4c?format=webp&width=800"
              alt="Cryptocurrency coins representing digital assets"
              className="w-80 h-80 object-contain opacity-80"
            />
          </motion.div>

          {/* Stats with fast, responsive animations */}
          <motion.div
            className="flex justify-center gap-12 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <div className="text-4xl font-bold text-gray-800 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Secure</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <div className="text-4xl font-bold text-gray-800 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Available</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <div className="text-4xl font-bold text-gray-800 mb-2">0</div>
              <div className="text-gray-600 font-medium">Intermediaries</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <UserTypeCard
              type="testator"
              title="Testator"
              description="Create and manage your digital will. Distribute your assets to your beneficiaries according to your wishes."
              buttonText="Create Will"
              onClick={handleTestatorClick}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <UserTypeCard
              type="beneficiary"
              title="Beneficiary"
              description="View wills where you are named as a beneficiary. Track status and initiate inheritance processes."
              buttonText="View Inheritances"
              onClick={handleBeneficiaryClick}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose InheritChain */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{ once: true, margin: "-150px" }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 1.0,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            Why Choose InheritChain?
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-150px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -15,
              scale: 1.03,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            <FeatureCard
              type="secure"
              title="Secure & Immutable"
              description="Your will is stored on blockchain, making it tamper-proof and permanently accessible."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 140 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.9,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -18,
              scale: 1.05,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            <FeatureCard
              type="management"
              title="Easy Management"
              description="Simple interface to create, edit and manage your digital inheritance plans."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 160 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 1.0,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -15,
              scale: 1.03,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            <FeatureCard
              type="transfer"
              title="Automated Transfer"
              description="Assets are automatically transferred to beneficiaries when conditions are met."
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
