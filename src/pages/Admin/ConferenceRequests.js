import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/AdminSidebar";
import Spinner from "../../components/Spinner";

const ConferenceRequests = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending conferences from the backend
  useEffect(() => {
    const fetchPendingConferences = async () => {
      try {
        const response = await axios.get("/api/conference/pending");
        setConferences(response.data);
      } catch (error) {
        console.error("Error fetching pending conferences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingConferences();
  }, []);
  // Handle Approve and Reject actions
  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/conference/approve/${id}`);
      setConferences(conferences.filter((conf) => conf._id !== id));
      toast.success("Conference approved successfully!"); // Success toast
    } catch (error) {
      console.error("Error approving conference:", error);
      toast.error("Error approving conference."); // Error toast
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/api/conference/reject/${id}`);
      setConferences(conferences.filter((conf) => conf._id !== id));
      toast.success("Conference rejected successfully!"); // Success toast
    } catch (error) {
      console.error("Error rejecting conference:", error);
      toast.error("Error rejecting conference."); // Error toast
    }
  };

  return (
    <Layout title={"Confizio - Conference Requests"}>
      <div className="relative flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Conference Requests
            </h1>
            <p className="mt-2 text-gray-500 font-medium">
              Review and manage pending conference registration requests.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 animate-spin rounded-full"></div>
            </div>
          ) : conferences.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium text-lg">No pending conference requests found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Conference</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Topics</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {conferences.map((conference, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">{conference.acronym}</div>
                          <div className="text-sm text-gray-500">{conference.conferenceName}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                          {conference.city}, {conference.country}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-bold text-gray-400 uppercase">Deadline</div>
                          <div className="text-sm text-gray-900 font-semibold">{conference.submissionDeadline?.slice(0, 10) || "-"}</div>
                          <div className="text-xs font-bold text-gray-400 uppercase mt-1">Start</div>
                          <div className="text-sm text-gray-600">{conference.startDate?.slice(0, 10) || "-"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {conference.topics?.slice(0, 2).map((topic, i) => (
                              <span key={i} className="px-2 py-0.5 bg-red-50 text-red-700 rounded-md text-xs font-bold uppercase">
                                {topic}
                              </span>
                            ))}
                            {conference.topics?.length > 2 && <span className="text-xs text-gray-400 font-bold">+{conference.topics.length - 2}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleApprove(conference._id)}
                            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-green-900/10"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(conference._id)}
                            className="inline-flex items-center px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg transition-all"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default ConferenceRequests;
