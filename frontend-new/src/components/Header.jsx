import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import PropTypes from "prop-types";

const Header = ({ showDisconnect = false, onDisconnect }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-deep-ocean rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              InheritChain
            </span>
          </div>

          {showDisconnect && (
            <Button
              variant="outline"
              onClick={onDisconnect}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  showDisconnect: PropTypes.bool,
  onDisconnect: PropTypes.func,
};

export default Header;
