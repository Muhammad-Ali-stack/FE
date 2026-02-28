// UserSidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";

const UserSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [auth] = useAuth(); // Get the current auth state with roles

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  // Check if the user has specific roles
  const hasRole = (role) => {
    return auth?.roles?.some((r) => r.role === role);
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
          USER DASH
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
        <NavLink
          to="/userdashboard/user-profile"
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          {isExpanded && <span className="ml-4 font-semibold text-sm tracking-wide">My Profile</span>}
        </NavLink>

        <NavLink
          to="/userdashboard/roles"
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          {isExpanded && <span className="ml-4 font-semibold text-sm tracking-wide">Active Roles</span>}
        </NavLink>

        {hasRole("organizer") && (
          <NavLink
            to="/userdashboard/organizer-dashboard"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {isExpanded && <span className="ml-4 font-semibold text-sm tracking-wide">Organizer Panel</span>}
          </NavLink>
        )}

        {hasRole("reviewer") && (
          <NavLink
            to="/userdashboard/reviewer-dashboard"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197" />
            </svg>
            {isExpanded && <span className="ml-4 font-semibold text-sm tracking-wide">Reviewer Panel</span>}
          </NavLink>
        )}

        {hasRole("author") && (
          <NavLink
            to="/userdashboard/author-dashboard"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            {isExpanded && <span className="ml-4 font-semibold text-sm tracking-wide">Author Panel</span>}
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default UserSidebar;
