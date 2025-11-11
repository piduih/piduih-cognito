import React from 'react';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';

interface SidebarToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <XIcon /> : <MenuIcon />}
    </button>
  );
};

export default SidebarToggle;
