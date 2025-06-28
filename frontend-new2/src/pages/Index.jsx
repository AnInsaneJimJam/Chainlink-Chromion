import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const handleTestatorClick = () => {
    navigate("/connect?type=testator");
  };

  const handleBeneficiaryClick = () => {
    navigate("/connect?type=beneficiary");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Fixed Background Layer */}
      <div 
        className="fixed w-full h-full top-0 left-0 z-0 overflow-hidden"
        style={{
          background: 'radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%)'
        }}
      >
        {/* Background Hue Layer */}
        <div 
          className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2"
          style={{
            transform: 'translate(-50%, -50%) rotate(-9.478deg)',
            background: '#CDEFFF',
            mixBlendMode: 'hue'
          }}
        />
        {/* Background Logo Layer */}
        <div 
          className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2 opacity-25"
          style={{
            transform: 'translate(-50%, -50%) rotate(-30.74deg)',
            background: "url('https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg') lightgray 50% / cover no-repeat",
            boxShadow: '0px 0px 114.717px 0px #CDEFFF'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-7xl mx-auto">

            {/* Hero Section */}
            <header className="text-center">
              <motion.h1
                className="font-semibold text-[#25292A] leading-tight mb-4"
                style={{
                  fontSize: 'clamp(40px, 5.5vw, 79px)',
                  fontFamily: "'Clash Display', sans-serif"
                }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  DIGITAL INHERITANCE WITH
                </motion.span>
              </motion.h1>
              
              <motion.h2
                className="font-semibold text-[#0469AB] leading-tight"
                style={{
                  fontSize: 'clamp(40px, 5.5vw, 79px)',
                  fontFamily: "'Clash Display', sans-serif"
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.0, ease: "easeOut" }}
              >
                BLOCKCHAIN
              </motion.h2>

              <motion.p
                className="text-[#767676] font-medium mt-4 max-w-4xl mx-auto"
                style={{
                  fontSize: 'clamp(16px, 1.5vw, 22px)',
                  fontFamily: "'Inter', sans-serif"
                }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.9, ease: "easeOut" }}
              >
                Secure your digital assets for your loved ones. Create tamper-proof wills and ensure seamless asset transfer when it matters most.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="mt-8 flex justify-center items-center gap-8 sm:gap-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2, ease: "easeOut" }}}
                >
                  <p 
                    className="text-[#25292A] font-semibold"
                    style={{
                      fontSize: 'clamp(32px, 3vw, 40px)',
                      fontFamily: "'Clash Display', sans-serif"
                    }}
                  >
                    100%
                  </p>
                  <p 
                    className="text-[#767676] font-medium"
                    style={{
                      fontSize: 'clamp(16px, 1.5vw, 22px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    Secure
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2, ease: "easeOut" }}}
                >
                  <p 
                    className="text-[#25292A] font-semibold"
                    style={{
                      fontSize: 'clamp(32px, 3vw, 40px)',
                      fontFamily: "'Clash Display', sans-serif"
                    }}
                  >
                    24/7
                  </p>
                  <p 
                    className="text-[#767676] font-medium"
                    style={{
                      fontSize: 'clamp(16px, 1.5vw, 22px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    Available
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2, ease: "easeOut" }}}
                >
                  <p 
                    className="text-[#25292A] font-semibold"
                    style={{
                      fontSize: 'clamp(32px, 3vw, 40px)',
                      fontFamily: "'Clash Display', sans-serif"
                    }}
                  >
                    0
                  </p>
                  <p 
                    className="text-[#767676] font-medium"
                    style={{
                      fontSize: 'clamp(16px, 1.5vw, 22px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    Intermediaries
                  </p>
                </motion.div>
              </motion.div>
            </header>

            {/* Action Cards Section */}
            <main className="flex flex-col lg:flex-row justify-center items-center gap-8 my-8 lg:my-10">
              {/* Testator Card */}
              <motion.div
                className="w-full max-w-[460px] min-h-[276px] p-6 flex flex-col justify-between rounded-[25px] border-2 border-[rgba(4,105,171,0.50)] bg-[rgba(255,255,255,0.34)] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[25px] opacity-80"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 }}}
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-[62px] h-[62px] bg-[#0167AF] rounded-full flex items-center justify-center flex-shrink-0">
                      <img src="testator.png" alt="Testator Icon" className="w-10 h-10" />
                    </div>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      <span 
                        className="text-[#25292A] font-medium"
                        style={{ fontSize: 'clamp(28px, 2.5vw, 35px)' }}
                      >
                        I'm a{' '}
                      </span>
                      <span 
                        className="text-[#07AAF4] font-medium"
                        style={{ fontSize: 'clamp(28px, 2.5vw, 35px)' }}
                      >
                        Testator
                      </span>
                    </h3>
                  </div>
                  <p 
                    className="text-[#767676] font-medium mt-4"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    Create and manage your digital will. Distribute your assets to your beneficiaries according to your wishes.
                  </p>
                </div>
                <button
                  onClick={handleTestatorClick}
                  className="text-[#146397] font-semibold flex items-center mt-4 hover:underline"
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: 'clamp(18px, 1.6vw, 24px)',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  Create Will →
                </button>
              </motion.div>

              {/* Beneficiary Card */}
              <motion.div
                className="w-full max-w-[460px] min-h-[276px] p-6 flex flex-col justify-between rounded-[25px] border-2 border-[rgba(4,105,171,0.50)] bg-[rgba(255,255,255,0.34)] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[25px] opacity-80"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 }}}
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-[62px] h-[62px] bg-[#0167AF] rounded-full flex items-center justify-center flex-shrink-0">
                      <img src="beneficiary.png" alt="Beneficiary Icon" className="w-7 h-7" />
                    </div>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      <span 
                        className="text-[#25292A] font-medium"
                        style={{ fontSize: 'clamp(28px, 2.5vw, 35px)' }}
                      >
                        I'm a{' '}
                      </span>
                      <span 
                        className="text-[#07AAF4] font-medium"
                        style={{ fontSize: 'clamp(28px, 2.5vw, 35px)' }}
                      >
                        Beneficiary
                      </span>
                    </h3>
                  </div>
                  <p 
                    className="text-[#767676] font-medium mt-4"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    View wills where you are named as a beneficiary. Track status and initiate inheritance processes.
                  </p>
                </div>
                <button
                  onClick={handleBeneficiaryClick}
                  className="text-[#146397] font-semibold flex items-center mt-4 hover:underline"
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: 'clamp(18px, 1.6vw, 24px)',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  View Inheritances →
                </button>
              </motion.div>
            </main>

            {/* Why Choose Us Section */}
            <section className="text-center pb-8">
              <motion.h3
                className="text-[#25292A] font-semibold"
                style={{
                  fontSize: 'clamp(32px, 3vw, 40px)',
                  fontFamily: "'Clash Display', sans-serif"
                }}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.0, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Why Choose InheritChain?
              </motion.h3>
              
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-150px" }}
              >
                {/* Feature 1 */}
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 120 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.4, ease: "easeOut" }}}
                >
                  <div className="w-[62px] h-[62px] bg-[#0167AF] rounded-full flex items-center justify-center mb-3 flex-shrink-0">
                    <img src="secure and immutable.png" alt="Secure Icon" className="w-10 h-10" />
                  </div>
                  <h4 
                    className="text-[#25292A] font-medium mb-3"
                    style={{
                      fontSize: 'clamp(20px, 1.8vw, 26px)',
                      fontFamily: "'Clash Display', sans-serif"
                    }}
                  >
                    Secure & Immutable
                  </h4>
                  <p 
                    className="text-[#767676] font-medium max-w-xs mx-auto"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    Your will is stored on blockchain, making it tamper-proof and permanently accessible.
                  </p>
                </motion.div>
                
                {/* Feature 2 */}
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 140 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -18, scale: 1.05, transition: { duration: 0.4, ease: "easeOut" }}}
                >
                  <div className="w-[62px] h-[62px] bg-[#0167AF] rounded-full flex items-center justify-center mb-3 flex-shrink-0">
                    <img src="easy management.png" alt="Management Icon" className="w-10 h-10" />
                  </div>
                  <h4 
                    className="text-[#25292A] font-medium mb-3"
                    style={{
                      fontSize: 'clamp(20px, 1.8vw, 26px)',
                      fontFamily: "'Clash Display', sans-serif"
                    }}
                  >
                    Easy Management
                  </h4>
                  <p 
                    className="text-[#767676] font-medium max-w-xs mx-auto"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    Simple interface to create, edit, and manage your digital inheritance plans.
                  </p>
                </motion.div>
                
                {/* Feature 3 */}
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 160 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1.0, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.4, ease: "easeOut" }}}
                >
                  <div className="w-[62px] h-[62px] bg-[#0167AF] rounded-full flex items-center justify-center mb-3 flex-shrink-0">
                    <img src="automated transfer.png" alt="Transfer Icon" className="w-10 h-10" />
                  </div>
                  <h4 
                    className="text-[#25292A] font-medium mb-3"
                    style={{
                      fontSize: 'clamp(20px, 1.8vw, 26px)',
                      fontFamily: "'Clash Display', sans-serif"
                    }}
                  >
                    Automated Transfer
                  </h4>
                  <p 
                    className="text-[#767676] font-medium max-w-xs mx-auto"
                    style={{
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    Assets are automatically transferred to beneficiaries when conditions are met.
                  </p>
                </motion.div>
              </motion.div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;