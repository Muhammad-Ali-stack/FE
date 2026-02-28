import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import Layout from "./Layout";

const OrganizerSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col ${
        isExpanded ? "w-72" : "w-24"
      } bg-white min-h-screen transition-all duration-500 border-r border-gray-100 shadow-xl overflow-hidden`}
    >
      <div className="flex items-center justify-between h-20 px-6" style={{ backgroundColor: "#9B0020" }}>
        <span
          className={`text-white font-extrabold text-lg tracking-wider transition-opacity duration-300 ${
            !isExpanded && "hidden opacity-0"
          }`}
        >
          ORGANIZER PANEL
        </span>
        <button onClick={toggleSidebar} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
          {isExpanded ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      <nav className="flex flex-col flex-1 p-4 space-y-2 overflow-y-auto">
        {[
          { to: "/userdashboard/conferences-organizer", label: "My Conferences", icon: "m4.5 12.75 6 6 9-13.5" }
        ].map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center p-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-red-50 text-red-700 shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-red-600"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`size-6 group-hover:scale-110 transition-transform ${!isExpanded && "mx-auto"}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {isExpanded && <span className="ml-4 font-semibold text-sm tracking-wide">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default OrganizerSidebar;
