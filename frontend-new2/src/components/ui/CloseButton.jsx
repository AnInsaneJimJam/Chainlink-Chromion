import React from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const CloseButton = ({ onClick, className = "", size = 20, color = "#333", ...props }) => (
    <button
        type="button"
        aria-label="Close"
        onClick={onClick}
        className={`p-1 bg-transparent hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
        {...props}
    >
        <X size={size} color={color} />
    </button>
);

CloseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
};

export default CloseButton; 