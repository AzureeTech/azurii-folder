import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p>Phone: 0794446838/0758306691</p>
          <p>Email: azurii.cyber@gmail.com</p>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Location</h3>
          <p>Githurai 45, Nairobi</p>
          <p>Kenya, East Africa</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/feedback" className="hover:underline">Feedback</Link></li>
            <li><Link to="/paybill" className="hover:underline">Paybill</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Azurii World. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
