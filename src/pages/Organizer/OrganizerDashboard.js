import React from "react";
import OrganizerSidebar from "../../components/OrganizerSidebar";
import Layout from "../../components/Layout";

const OrganizerDashboard = () => {
  return (
    <Layout title={"Confizio - Organizer Dashboard"}>
      <div className="relative flex min-h-screen bg-gray-50">
        <OrganizerSidebar />
        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 shadow-2xl min-h-[400px] flex items-center">
              <img
                src="/organizer.webp"
                alt="Organizer Background"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900/40 to-transparent"></div>
              <div className="relative z-10 p-12 lg:p-20 max-w-2xl">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-lg shadow-red-900/40">
                  Event Manager
                </span>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
                  Organizer <span className="text-red-500">Portal</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 font-medium leading-relaxed mb-10">
                  Orchestrate world-class academic events. Manage registrations, review assignments, and published proceedings with ease.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="h-1 w-24 bg-red-600 rounded-full"></div>
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Event Orchestration Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizerDashboard;
