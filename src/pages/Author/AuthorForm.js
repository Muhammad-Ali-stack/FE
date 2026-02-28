import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/Auth";

function AuthorForm({ conferenceName }) {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [paper, setPaper] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmittingMessage, setShowSubmittingMessage] = useState(false);
  const { acronym, id } = useParams();
  const [fetchedConferenceName, setFetchedConferenceName] = useState("");
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const fileInputRef = useRef(null);
  const [complianceReport, setComplianceReport] = useState(null);
  const [complianceLoading, setComplianceLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [abstractWordCount, setAbstractWordCount] = useState(0);

  const removeFile = () => {
    setSelectedFile(null);
    setPaper(null);
    setComplianceReport(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [authors, setAuthors] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      affiliation: "",
      webPage: "",
      corresponding: false,
    },
  ]);

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const response = await axios.get(
          `/api/conference/get-conference/${id}`
        );
        setFetchedConferenceName(response.data.conferenceName);
      } catch (error) {
        console.error("Error fetching conference:", error);
      }
    };

    fetchConference();
  }, [id]);

  useEffect(() => {
    if (auth?.user) {
      setAuthors([
        {
          firstName: "",
          lastName: "",
          email: auth?.user?.email || "",
          country: "",
          affiliation: "",
          webPage: "",
          corresponding: true,
        },
      ]);
      setLoading(false);
    }
  }, [auth]);

  const addAuthor = () => {
    if (authors.length >= 3) {
      toast.error("You can add up to 2 authors only.");
      return;
    }
    const newAuthors = [
      ...authors,
      {
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        affiliation: "",
        webPage: "",
        corresponding: false,
      },
    ];
    setAuthors(newAuthors);
    console.log("Updated authors:", newAuthors); // Debugging
  };
  const removeAuthor = (index) => {
    if (index === 0) return; // Prevent removing the first author
    const updatedAuthors = authors.filter((_, i) => i !== index);
    setAuthors(updatedAuthors);
  };

  const handleInputChange = (index, event) => {
    const { name, value, checked } = event.target;
    const newAuthors = [...authors];
    newAuthors[index][name] = name === "corresponding" ? checked : value;
    setAuthors(newAuthors);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "application/pdf") {
      setPaper(null);
      setSelectedFile(null);
      setComplianceReport(null);
      toast.error("Please upload a PDF file only.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setSelectedFile(file);
    setPaper(file);
    setComplianceReport(null);
    setComplianceLoading(true);

    try {
      const formData = new FormData();
      formData.append("paper", file);

      const response = await axios.post(
        "/api/author/check-compliance",
        formData
      );
      setComplianceReport(response.data.complianceReport);
      toast.success("Compliance check completed.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error performing compliance check."
      );
    } finally {
      setComplianceLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const abstractWordCount = abstract.trim().split(/\s+/).length;
    if (abstractWordCount < 100 || abstractWordCount > 300) {
      toast.error("Abstract must be between 100 and 300 words.");
      return;
    }

    const titleWordCount = title.trim().split(/\s+/).length;
    if (titleWordCount < 3) {
      toast.error("Title must be at least 3 words.");
      return;
    }

    const keywordsArray = keywords.split(",").map((kw) => kw.trim());
    if (keywordsArray.length > 8) {
      toast.error("Keywords should not be more than 8.");
      return;
    }

    const validAuthor = authors.find(
      (author) => author.firstName && author.email
    );
    if (!validAuthor) {
      toast.error("At least one author must have mandatory details filled.");
      return;
    }

    const isInvalidRoleForSubmission = auth?.roles?.some(
      (role) =>
        ["organizer", "reviewer"].includes(role.role) &&
        role.conferenceId?.toString() === id?.toString()
    );
    if (isInvalidRoleForSubmission) {
      toast.error(
        "Paper submission is not allowed for organizers or reviewers"
      );
      return;
    }

    if (complianceReport && complianceReport.percentage < 60) {
      setShowModal(true);
      return;
    }

    await submitForm();
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmissionStatus("Submitting...");
    setShowSubmittingMessage(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("abstract", abstract);
      formData.append("keywords", keywords);
      formData.append("paper", paper);
      formData.append("authors", JSON.stringify(authors));
      formData.append("conferenceId", id);
      formData.append("conferenceAcronym", acronym);
      formData.append("conferenceName", fetchedConferenceName);
      formData.append("userId", auth?.user?._id);

      const response = await axios.post("/api/author/submit-paper", formData);

      setSubmissionStatus("Submission successful!");
      toast.success(response.data.message);

      // Reset form fields
      setTitle("");
      setAbstract("");
      setKeywords("");
      setPaper(null);
      setSelectedFile(null);
      setAuthors([
        {
          firstName: "",
          lastName: "",
          email: auth?.user?.email || "",
          country: "",
          affiliation: "",
          webPage: "",
          corresponding: true,
        },
      ]);
      setComplianceReport(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setSubmissionStatus("Submission failed due to an error.");
      toast.error(
        error.response?.data?.message || "Error while submitting your paper"
      );
    }
  };

  const handleModalConfirm = async () => {
    setShowModal(false);
    await submitForm();
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <Layout title={"Confizio - Submit paper"}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader">Loading....</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={"Confizio - Submit paper"}>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Submit Your Research
            </h1>
            <p className="mt-4 text-lg text-gray-600 font-medium">
              to <span className="text-red-700 font-bold">{conferenceName || fetchedConferenceName}</span>
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Authors Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Author Information</h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 1 of 3</span>
              </div>
              <div className="p-8 space-y-8">
                {authors.map((author, index) => (
                  <div key={index} className="relative p-6 bg-gray-50 rounded-2xl border border-gray-100 group transition-all hover:shadow-md">
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => removeAuthor(index)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="h-8 w-8 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg shadow-red-900/20">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Author Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">First Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="firstName"
                          value={author.firstName}
                          onChange={(e) => handleInputChange(index, e)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:outline-none transition-all shadow-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Last Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="lastName"
                          value={author.lastName}
                          onChange={(e) => handleInputChange(index, e)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:outline-none transition-all shadow-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={author.email}
                          onChange={(e) => handleInputChange(index, e)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:outline-none transition-all shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                          required
                          disabled={index === 0}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Country <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="country"
                          value={author.country}
                          onChange={(e) => handleInputChange(index, e)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:outline-none transition-all shadow-sm"
                          required
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Affiliation <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="affiliation"
                          value={author.affiliation}
                          onChange={(e) => handleInputChange(index, e)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:outline-none transition-all shadow-sm"
                          placeholder="University or Institution Name"
                          required
                        />
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="mt-4 flex items-center space-x-2 px-1">
                        <div className="h-5 w-5 rounded bg-red-50 flex items-center justify-center border border-red-200">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Primary Corresponding Author</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {authors.length < 3 && (
                  <button
                    type="button"
                    onClick={addAuthor}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold uppercase tracking-widest hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    + Add Co-Author
                  </button>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Paper Details</h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 2 of 3</span>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Paper Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all shadow-sm font-medium"
                    placeholder="Enter the full title of your research paper"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end ml-1">
                    <label className="text-sm font-bold text-gray-700">Abstract <span className="text-red-500">*</span></label>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${abstractWordCount < 100 || abstractWordCount > 300 ? 'text-red-500' : 'text-green-600'}`}>
                      {abstractWordCount} / 300 Words
                    </span>
                  </div>
                  <textarea
                    rows="8"
                    value={abstract}
                    onChange={(e) => {
                      setAbstract(e.target.value);
                      const words = e.target.value.trim().split(/\s+/).filter(Boolean);
                      setAbstractWordCount(words.length);
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all shadow-sm leading-relaxed"
                    placeholder="Provide a concise summary of your research (100-300 words)"
                    required
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Keywords <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:bg-white focus:outline-none transition-all shadow-sm"
                    placeholder="Comma separated (e.g. AI, Deep Learning, Cloud Computing)"
                    required
                  />
                </div>
              </div>
            </div>

            {/* File Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Manuscript Upload</h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 3 of 3</span>
              </div>
              <div className="p-8">
                <div className={`relative group border-2 border-dashed rounded-2xl p-12 text-center transition-all ${selectedFile ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-red-200 hover:bg-red-50'}`}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    ref={fileInputRef}
                  />
                  <div className="space-y-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors ${selectedFile ? 'bg-green-600' : 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'}`}>
                      {selectedFile ? (
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      )}
                    </div>
                    {selectedFile ? (
                      <div>
                        <p className="text-lg font-bold text-green-900 truncate max-w-xs mx-auto">{selectedFile.name}</p>
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(); }} className="mt-2 text-xs font-bold text-red-600 uppercase tracking-widest hover:underline">Remove & Replace</button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-bold text-gray-900">Click to upload PDF</p>
                        <p className="text-sm text-gray-500 font-medium">IEEE Format preferred (Max 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {complianceLoading && (
                  <div className="mt-6 flex items-center justify-center space-x-3 text-red-700 font-bold">
                    <div className="w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs uppercase tracking-widest">Validating IEEE Compliance...</span>
                  </div>
                )}

                {complianceReport && (
                  <div className={`mt-8 rounded-2xl p-6 border ${complianceReport.percentage >= 60 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900">Compliance Audit</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${complianceReport.percentage >= 60 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {complianceReport.percentage}% Score
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {complianceReport.details.map((detail, index) => (
                        <li key={index} className="flex space-x-3">
                          <div className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${detail.suggestion ? 'bg-red-400' : 'bg-green-400'}`}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{detail.rule}</p>
                            <p className="text-xs text-gray-500 font-medium">{detail.message}</p>
                            {detail.suggestion && <p className="text-xs text-red-600 font-bold mt-1 italic">Suggest: {detail.suggestion}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className={`w-full py-5 text-white font-extrabold text-lg rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-2xl ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'hover:scale-[1.01] shadow-red-900/40'}`}
                style={{ backgroundColor: isSubmitting ? undefined : "#9B0020" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>SUBMITTING MANUSCRIPT...</span>
                  </div>
                ) : "SUBMIT RESEARCH PAPER"}
              </button>
              {showSubmittingMessage && <p className="text-center text-xs font-bold text-red-700 mt-4 uppercase tracking-widest animate-pulse">Your submission is being processed. Please don't refresh.</p>}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AuthorForm;
