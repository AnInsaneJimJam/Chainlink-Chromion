import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Header = ({ showDisconnect = false, onDisconnect, walletAddress, showBackToDashboard = false }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-transparent fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-8 lg:px-10 py-6">
        <button
          className="flex items-center gap-4 hover:bg-transparent bg-transparent border-0 p-0"
          onClick={() => navigate("/")}
          type="button"
          aria-label="Go to homepage"
        >
          <img src="/logo.png" alt="InheritChain Logo" className="w-12 h-12 rounded-full bg-white border border-gray-200" />
          <span className="header-text font-clash text-2xl font-semibold text-[#25292A]">InheritChain</span>
        </button>
        <div className="flex items-center gap-4">
          {walletAddress && (
            <span className="font-inter font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-full text-sm border border-gray-200">
              {walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4)}
            </span>
          )}
          {showBackToDashboard && (
            <button
              onClick={() => navigate('/dashboard')}
              className="header-btn border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A] bg-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Back to Dashboard
            </button>
          )}
          {showDisconnect && (
            <button
              onClick={onDisconnect}
              className="header-btn  mb-2 border border-[#0469AB] text-[#0469AB] font-semibold rounded-[25px] px-6 py-2 transition-all hover:bg-[#0469AB1A] bg-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  showDisconnect: PropTypes.bool,
  onDisconnect: PropTypes.func,
  walletAddress: PropTypes.string,
  showBackToDashboard: PropTypes.bool,
};

export default Header;
