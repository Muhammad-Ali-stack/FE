import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import Sidebar from "../../components/AdminSidebar";
import { useAuth } from "../../context/Auth";

const AllConferences = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        // FIX 1: Use all-reg-conferences to get ALL conferences regardless of status
        const response = await axios.get("/api/conference/all-reg-conferences");
        console.log("Conferences from API:", response.data);
        setConferences(response.data);
      } catch (error) {
        console.error("Error fetching conferences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  return (
    <Layout title={"Confizio - All Conferences"}>
      <div className="relative flex min-h-screen bg-gray-50">
        {auth?.user?.role === 1 && <Sidebar />}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Registered Conferences
            </h1>
            <p className="mt-2 text-gray-500 font-medium">
              Browse and apply to the latest academic gatherings worldwide.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 animate-spin rounded-full"></div>
            </div>
          ) : conferences.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <p className="text-gray-500 font-medium text-lg">No conferences found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Conference</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Deadlines</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {conferences.map((conference, index) => {
                      const now = new Date();
                      const submissionDeadline = new Date(conference.submissionDeadline);
                      const isSubmissionClosed = submissionDeadline < now;

                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-gray-900">{conference.acronym}</div>
                            <div className="text-sm text-gray-500">{conference.conferenceName}</div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {conference.topics?.filter(t => t && t.trim()).slice(0, 2).map((topic, i) => (
                                <span key={i} className="px-2 py-0.5 bg-red-50 text-red-700 rounded-md text-[10px] font-bold uppercase">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                            {conference.city}, {conference.country}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs font-bold text-gray-400 uppercase">Submission</div>
                            <div className={`text-sm font-semibold ${isSubmissionClosed ? 'text-red-500' : 'text-gray-900'}`}>
                              {conference.submissionDeadline?.slice(0, 10) || "-"}
                            </div>
                            <div className="text-xs font-bold text-gray-400 uppercase mt-1">Starts</div>
                            <div className="text-sm text-gray-600">{conference.startDate?.slice(0, 10) || "-"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              conference.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : conference.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {conference.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            {auth?.user?.role === 1 ? (
                              <button
                                onClick={() => (window.location.href = "/admindashboard/update-conference")}
                                className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 text-xs font-bold rounded-lg hover:bg-red-100 transition-all"
                              >
                                Edit
                              </button>
                            ) : conference.status !== "approved" ? (
                              <button
                                disabled
                                className="px-4 py-2 bg-gray-100 text-gray-400 text-xs font-bold rounded-lg cursor-not-allowed uppercase"
                              >
                                Pending
                              </button>
                            ) : isSubmissionClosed ? (
                              <button
                                disabled
                                className="px-4 py-2 bg-gray-100 text-gray-400 text-xs font-bold rounded-lg cursor-not-allowed uppercase"
                              >
                                Closed
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  if (!auth?.user) return (window.location.href = "/login");
                                  window.location.href = `/conference/${conference.acronym}/submit-paper/${conference._id}`;
                                }}
                                className="inline-flex items-center px-6 py-2 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-red-900/20"
                                style={{ backgroundColor: "#9B0020" }}
                              >
                                Apply Now
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllConferences;