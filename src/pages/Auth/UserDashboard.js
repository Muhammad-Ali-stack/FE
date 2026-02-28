import React from "react";
import Layout from "../../components/Layout";
import UserSidebar from "../../components/UserSidebar";

const UserDashboard = () => {
  return (
    <Layout title="Confizio - User Space">
      <div className="relative flex min-h-screen bg-gray-50">
        <UserSidebar />
        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 shadow-2xl min-h-[400px] flex items-center">
              <img
                src="/user.jpg"
                alt="User Dashboard"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/20 to-transparent"></div>
              <div className="relative z-10 p-12 lg:p-20 max-w-2xl">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-white/20">
                  Welcome Back
                </span>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
                  Personal <span className="text-red-500">Workspace</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-medium leading-relaxed mb-10">
                  Access your conference submissions, manage assignments, and coordinate with the global research community from your unified dashboard.
                </p>
                <div className="flex space-x-4">
                  <div className="h-1 w-12 bg-red-600 rounded-full"></div>
                  <div className="h-1 w-12 bg-white/20 rounded-full"></div>
                  <div className="h-1 w-12 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
