import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { toast } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully", { duration: 3000 });
    navigate("/login");
  };

  return (
    <nav style={{ backgroundColor: "#9B0020" }} className="p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-2xl font-bold mb-4 md:mb-0">
          ConfForum
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center mb-4 md:mb-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navbar Links */}
        <div className={`md:flex items-center space-x-8 ${menuOpen ? "block" : "hidden"} md:block mb-4 md:mb-0`}>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
            <NavLink to="/" className="relative text-white font-bold text-sm uppercase tracking-widest group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
            <a href="#about" className="relative text-white font-bold text-sm uppercase tracking-widest group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            {auth?.user && (
              <>
                <NavLink to="/all-conferences" className="relative text-white font-bold text-sm uppercase tracking-widest group">
                  Conferences
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
                <NavLink to="/userdashboard/create-conference" className="relative text-white font-bold text-sm uppercase tracking-widest group">
                  Create
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* User Dropdown */}
        {!auth?.user ? (
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <NavLink
              to="/login"
              className="text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all duration-300 hover:bg-white hover:text-red-700"
              style={{ border: "2px solid rgba(255,255,255,0.3)" }}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-white text-red-700 text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:bg-red-50 transform hover:scale-105"
            >
              Join Free
            </NavLink>
          </div>
        ) : (
          <div className="relative inline-block text-left mb-4 md:mb-0">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all border border-white/20"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 text-[10px] font-bold">
                {auth.user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-bold tracking-tight">{auth.user.name}</span>
              <svg className="ml-2 h-4 w-4 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.293l3.71-3.08a.75.75 0 111.04 1.08l-4.25 3.5a.75.75 0 01-.98 0l-4.25-3.5a.75.75 0 010-1.08z" clipRule="evenodd" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-3 w-56 rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  <NavLink
                    to={`/${auth?.user?.role === 1 ? "admindashboard/admin-dashboard" : "userdashboard/user-dashboard"}`}
                    className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4 mr-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Control Panel
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all mt-1"
                  >
                    <svg className="w-4 h-4 mr-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;