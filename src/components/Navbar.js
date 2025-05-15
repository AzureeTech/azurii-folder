import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Azurii Logo.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Azurii Logo" className="w-18 h-12 rounded-full" />
          <span className="font-semibold text-xl">Azurii World</span>
        </Link>

        {/* Mobile menu button - Hidden on desktop */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/services" className="hover:text-gray-300">Services</Link>
          <Link to="/paybill" className="hover:text-gray-300">Paybill</Link>
          <Link to="/contact" className="hover:text-gray-300">Contacts</Link>
          <Link to="/admin-login" className="hover:text-gray-300">Admin</Link>
        </div>
      </div>

      {/* Mobile Navigation - Only shows when menu is open */}
      {isOpen && (
        <div className="lg:hidden mt-4 pb-0 space-y-4">
          <Link to="/" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/paybill" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Paybill</Link>
          <Link to="/contact" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Contacts</Link>
          <Link to="/admin-login" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;