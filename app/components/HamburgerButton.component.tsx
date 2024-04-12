import React from "react";

// add a prop type interface with a property called onClick that is a function that returns void
interface HamburgerButtonProps {
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  return (
    <button
      className="navbar-burger flex items-center p-3 text-black dark:text-white"
      onClick={onClick}
    >
      <svg
        className="block h-4 w-4 fill-current"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </button>
  );
};

export default HamburgerButton;
