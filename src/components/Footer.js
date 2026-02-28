// components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-extrabold mb-6 tracking-tight">Confizio</h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              The premier platform for academic conference management and research collaboration worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors font-medium">Home</Link></li>
              <li><Link to="/all-conferences" className="text-gray-400 hover:text-white transition-colors font-medium">Conferences</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors font-medium">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-6">Resources</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors font-medium">Help Center</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors font-medium">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-6">Stay Connected</h3>
            <p className="text-gray-400 font-medium mb-4 text-sm">Subscribe to our newsletter for updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-gray-800 border-none rounded-l-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500 w-full"
              />
              <button className="bg-red-700 hover:bg-red-600 px-4 py-3 rounded-r-xl transition-colors" style={{ backgroundColor: "#9B0020" }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Confizio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
