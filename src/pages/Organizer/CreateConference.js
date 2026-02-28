import React from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import UserSidebar from "../../components/UserSidebar";
import { useAuth } from "../../context/Auth";

function ConferenceCreationForm() {
  const [auth] = useAuth();

  // Initial form state
  const initialFormData = {
    conferenceName: "",
    acronym: "",
    webPage: "",
    mode: "",
    venue: "",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    abstractDeadline: "",
    submissionDeadline: "",
    primaryArea: "",
    secondaryArea: "",
    topics: ["", "", "", ""],
    expertise: [],
  };

  // State to manage form inputs
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "expertise"
          ? value.split(",").map((item) => item.trim())
          : value,
    }));
  };

  const validateRequiredFields = () => {
    const { conferenceName, acronym, startDate, endDate, mode, expertise } =
      formData;

    if (!conferenceName.trim()) {
      toast.error("Conference Name is required.");
      return false;
    }

    if (!acronym.trim()) {
      toast.error("Acronym is required.");
      return false;
    }

    if (!startDate || !endDate) {
      toast.error("Start and End dates are required.");
      return false;
    }

    if (!mode) {
      toast.error("Please select a Review Mode.");
      return false;
    }

    // FIX: Validate expertise field
    if (
      !expertise ||
      expertise.length === 0 ||
      expertise.every((e) => e.trim() === "")
    ) {
      toast.error("At least one expertise is required.");
      return false;
    }

    return true;
  };

  // Handle topics array
  const handleTopicChange = (index, value) => {
    const updatedTopics = [...formData.topics];
    updatedTopics[index] = value;
    setFormData({
      ...formData,
      topics: updatedTopics,
    });
  };

  // Validate date ranges
  const validateDates = () => {
    const { startDate, endDate, abstractDeadline, submissionDeadline } =
      formData;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const abstract = new Date(abstractDeadline);
    const submission = new Date(submissionDeadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!startDate || !endDate || !abstractDeadline || !submissionDeadline) {
      toast.error("All date fields must be filled.");
      return false;
    }

    if (
      start < today ||
      end < today ||
      abstract < today ||
      submission < today
    ) {
      toast.error("Dates must not be in the past.");
      return false;
    }

    if (end < start) {
      toast.error("End date must be greater than start date.");
      return false;
    }

    if (abstract > end) {
      toast.error(
        "Abstract registration deadline must be before conference end date."
      );
      return false;
    }

    if (submission < start || submission > end) {
      toast.error("Submission deadline must lie between start and end date.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateRequiredFields()) {
      return;
    }

    if (!validateDates()) {
      return;
    }

    try {
      const response = await axios.post("/api/conference/create-conference", {
        ...formData,
        userId: auth?.user?._id,
      });
      const { submissionLink } = response.data;
      toast.success(`Conference created Successfully`);

      // Reset form data to initial state
      setFormData(initialFormData);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Layout title={"Confizio - Create Conference"}>
      <div className="flex min-h-screen bg-gray-50">
        <UserSidebar />
        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-red-900 to-red-700 p-8 text-white" style={{ backgroundColor: "#9B0020" }}>
              <h2 className="text-3xl font-extrabold tracking-tight">Register New Conference</h2>
              <p className="mt-2 text-red-100 font-medium">Provide the official details to list your conference on Confizio.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
              {/* Core Details Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-600 pl-4">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Conference Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="conferenceName"
                      value={formData.conferenceName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="e.g. Int. Conference on Machine Learning"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Acronym <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="acronym"
                      value={formData.acronym}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="e.g. ICML 2026"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Official Website</label>
                    <input
                      type="url"
                      name="webPage"
                      value={formData.webPage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="https://conference.example.org"
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-600 pl-4">Venue & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="Convention Center"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="USA"
                    />
                  </div>
                </div>
              </div>

              {/* Dates Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-600 pl-4">Key Deadlines & Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Start Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">End Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Abstract Deadline</label>
                    <input
                      type="date"
                      name="abstractDeadline"
                      value={formData.abstractDeadline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Submission Deadline</label>
                    <input
                      type="date"
                      name="submissionDeadline"
                      value={formData.submissionDeadline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Review Mode */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-600 pl-4">Review Strategy</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {['single-blind', 'double-blind', 'no-blind'].map((mode) => (
                    <label key={mode} className={`relative flex p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${formData.mode === mode ? 'border-red-600 bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <input
                        type="radio"
                        name="mode"
                        value={mode}
                        checked={formData.mode === mode}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold uppercase tracking-wider ${formData.mode === mode ? 'text-red-700' : 'text-gray-900'}`}>{mode.replace('-', ' ')}</span>
                        <span className="text-xs text-gray-500 mt-1">
                          {mode === 'single-blind' && "Reviewers know authors, but not vice-versa."}
                          {mode === 'double-blind' && "Both parties remain anonymous during review."}
                          {mode === 'no-blind' && "Both parties know each other's identities."}
                        </span>
                      </div>
                      {formData.mode === mode && (
                        <div className="absolute top-4 right-4 text-red-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Research Areas */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-red-600 pl-4">Research Scope</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Primary Area</label>
                    <input
                      type="text"
                      name="primaryArea"
                      value={formData.primaryArea}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="e.g. Artificial Intelligence"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Expertise Required (comma-separated) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="expertise"
                      value={formData.expertise.join(", ")}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                      placeholder="e.g. AI, ML, NLP"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {formData.topics.map((topic, index) => (
                    <div key={index} className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Topic {index + 1}</label>
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => handleTopicChange(index, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all duration-200 shadow-sm"
                        placeholder={`Topic ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-4 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-900/20"
                  style={{ backgroundColor: "#9B0020" }}
                >
                  Submit Conference for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ConferenceCreationForm;