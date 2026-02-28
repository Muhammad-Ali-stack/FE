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
      <div className="relative flex min-h-screen">
        {auth?.user?.role === 1 && <Sidebar />}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Conferences</h1>

          {loading ? (
            <p>Loading...</p>
          ) : conferences.length === 0 ? (
            <p>No conferences found.</p>
          ) : (
            <div className="overflow-x-auto my-6 mx-2">
              <table className="min-w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-secondaryAlt-dark text-light">
                    <th className="py-2 px-6 border-b text-left">Acronym</th>
                    <th className="py-2 px-6 border-b text-left">Name</th>
                    <th className="py-2 px-6 border-b text-left">Location</th>
                    <th className="py-2 px-6 border-b text-left">Start Date</th>
                    <th className="py-2 px-6 border-b text-left">Submission Deadline</th>
                    <th className="py-2 px-6 border-b text-left">Status</th>
                    <th className="py-2 px-6 border-b text-left">Topics</th>
                    <th className="py-2 px-6 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* FIX 2: Removed the "if (endDate < now) return null" filter */}
                  {conferences.map((conference, index) => {
                    const now = new Date();
                    const submissionDeadline = new Date(conference.submissionDeadline);
                    const isSubmissionClosed = submissionDeadline < now;

                    return (
                      <tr
                        key={index}
                        className="hover:bg-secondary hover:bg-opacity-20 transition-colors duration-300"
                      >
                        <td className="py-3 px-6 border-b">{conference.acronym}</td>
                        <td className="py-3 px-6 border-b">{conference.conferenceName}</td>
                        <td className="py-3 px-6 border-b">
                          {conference.city}, {conference.country}
                        </td>
                        <td className="py-3 px-6 border-b">
                          {conference.startDate?.slice(0, 10) || "-"}
                        </td>
                        <td className="py-3 px-6 border-b">
                          {conference.submissionDeadline?.slice(0, 10) || "-"}
                        </td>
                        <td className="py-3 px-6 border-b">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${
                              conference.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : conference.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {conference.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 border-b">
                          {conference.topics?.filter((t) => t && t.trim()).join(", ")}
                        </td>
                        <td className="py-3 px-6 border-b">
                          {auth?.user?.role === 1 ? (
                            <button
                              onClick={() =>
                                (window.location.href = "/admindashboard/update-conference")
                              }
                              className="bg-accent hover:bg-primaryAlt-light text-light px-2 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                              Edit
                            </button>
                          ) : conference.status !== "approved" ? (
                            <button
                              disabled
                              className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed shadow-md"
                              title="This conference is pending approval"
                            >
                              Pending
                            </button>
                          ) : isSubmissionClosed ? (
                            <button
                              disabled
                              className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed shadow-md"
                              title="This conference is no longer accepting papers"
                            >
                              Apply (Closed)
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (!auth?.user)
                                  return (window.location.href = "/login");
                                window.location.href = `/conference/${conference.acronym}/submit-paper/${conference._id}`;
                              }}
                              className="bg-accent hover:bg-primaryAlt-light text-light px-2 py-1 rounded transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                              Apply
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllConferences;