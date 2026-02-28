import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    originality: 1,
    technicalQuality: 1,
    significance: 1,
    clarity: 1,
    relevance: 1,
    overallRecommendation: "",
    commentsForAuthors: "",
    commentsForOrganizers: "",
  });

  const [paper, setPaper] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [title, setTitle] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reviewer = queryParams.get("reviewerId") || "";
    const paper = queryParams.get("paperId") || "";
    const title = queryParams.get("title") || "";

    setPaper(paper);
    setReviewer(reviewer);
    setTitle(title);
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderRadioButtons = (name) => (
    <div className="flex justify-between gap-1">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((score) => (
        <div key={score} className="flex flex-col items-center">
          <label className="text-xs text-gray-500">{score}</label>
          <input
            type="radio"
            name={name}
            value={score}
            checked={Number(formData[name]) === score}
            onChange={handleChange}
            className="w-4 h-4 secondaryAlt-light"
          />
        </div>
      ))}
    </div>
  );

  const validateForm = () => {
    if (!formData.overallRecommendation) {
      toast.error("Please select an overall recommendation.");
      return false;
    }
    if (!formData.commentsForAuthors.trim()) {
      toast.error("Comments for authors are required.");
      return false;
    }
    if (!formData.commentsForOrganizers.trim()) {
      toast.error("Comments for organizers are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/reviewer/submit-reviewform", {
        ...formData,
        paperId: paper,
        reviewerId: reviewer,
      });
      toast.success(response.data.message || "Review submitted successfully!");

      setFormData({
        originality: 1,
        technicalQuality: 1,
        significance: 1,
        clarity: 1,
        relevance: 1,
        overallRecommendation: "",
        commentsForAuthors: "",
        commentsForOrganizers: "",
      });

      navigate("/userdashboard/all-assigned-papers");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <Layout title={"Confizio - Review Form"}>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <form
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-10"
            onSubmit={handleSubmit}
          >
            <div className="text-center border-b border-gray-100 pb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manuscript Evaluation</h2>
              <p className="mt-2 text-gray-500 font-medium italic">Title: {title}</p>
            </div>

            <div className="space-y-8">
              {[
                { name: "originality", label: "Originality", desc: "Is the work novel and unique?" },
                { name: "technicalQuality", label: "Technical Quality", desc: "Is the methodology sound and robust?" },
                { name: "significance", label: "Significance", desc: "Does this contribute to the field?" },
                { name: "clarity", label: "Clarity", desc: "Is the presentation clear and professional?" },
                { name: "relevance", label: "Relevance", desc: "Does it align with the conference scope?" },
              ].map(({ name, label, desc }) => (
                <div key={name} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">{label}</label>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{desc}</span>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    {renderRadioButtons(name)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                Overall Recommendation
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Accept", "Accept with minor correction", "Reject"].map((option) => (
                  <label key={option} className={`relative flex items-center justify-center p-4 cursor-pointer rounded-xl border-2 transition-all ${formData.overallRecommendation === option ? 'border-red-600 bg-red-50 text-red-700 shadow-md shadow-red-900/10' : 'border-gray-100 text-gray-500 hover:border-gray-200 bg-white'}`}>
                    <input
                      type="radio"
                      name="overallRecommendation"
                      value={option}
                      checked={formData.overallRecommendation === option}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Comments for Authors</label>
                <textarea
                  name="commentsForAuthors"
                  value={formData.commentsForAuthors}
                  onChange={handleChange}
                  rows="6"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all text-sm leading-relaxed"
                  placeholder="Provide constructive feedback for the research team..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Comments for Organizers</label>
                <textarea
                  name="commentsForOrganizers"
                  value={formData.commentsForOrganizers}
                  onChange={handleChange}
                  rows="6"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all text-sm leading-relaxed"
                  placeholder="Confidential notes for the conference committee..."
                />
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <button
                type="submit"
                className="w-full py-5 text-white font-extrabold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-2xl shadow-red-900/30"
                style={{ backgroundColor: "#9B0020" }}
              >
                SUBMIT FINAL EVALUATION
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewForm;
