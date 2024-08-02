import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-blue-950 p-4 shadow-md text-blueDark mt-8 border-t border-gray-200">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Logo" className="object-contain w-6" />
          <span className="text-sm font-bold">ConnectGuides</span>
        </Link>
      </div>
      <div className="mt-4 md:mt-0">
        <ul className="flex space-x-4 gap-6">
          <li><Link to="/about" className="text-base text-blueDark hover:text-gray-400">About Us</Link></li>
          <li><Link to="/contact" className="text-base text-blueDark hover:text-gray-400">Contact</Link></li>
          <li><Link to="/privacy" className="text-base text-blueDark hover:text-gray-200">Privacy Policy</Link></li>
          <li><Link to="/privacyAgreement" className="text-base text-blueDark hover:text-gray-200">Privacy Consent Agreement</Link></li>
        </ul>
      </div>
      <div className="mt-4 md:mt-0 text-sm">
        &copy; {new Date().getFullYear()} ConnectGuides. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
