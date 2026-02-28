import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const AllPapersToReview = () => {
  const [assignedPapers, setAssignedPapers] = useState([]);
  const [error, setError] = useState("");
  const [auth] = useAuth();
  const reviewerId = auth?.user?._id; // Replace with the actual reviewer ID.
  useEffect(() => {
    const fetchAssignedPapers = async () => {
      try {
        const response = await axios.get(
          `/api/reviewer/assigned-papers/reviewer/${reviewerId}`
        );
        if (response.data.success) {
          setAssignedPapers(response.data.data);
        } else {
          setError("Failed to fetch assigned papers.");
        }
        console.log("sjsjsh", response.data.data);
        // response.data.data[0].isReviewedBy
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching assigned papers.");
      }
    };

    fetchAssignedPapers();
  }, [reviewerId]);

  return (
    <Layout title={"Confizio - Assigned Papers"}>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Review Assignments</h1>
              <p className="mt-2 text-gray-500 font-medium">Evaluate and provide feedback on submitted manuscripts.</p>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-4 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-bold border border-red-100 uppercase tracking-widest">
                {assignedPapers.length} Papers Assigned
              </span>
            </div>
          </div>

          {assignedPapers.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Queue Clear!</h3>
              <p className="text-gray-500 font-medium max-w-sm mx-auto">You have no pending papers to review at this time. Check back later for new assignments.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {assignedPapers.map((paper) => {
                const isReviewed = paper.isReviewedBy?.includes(reviewerId);
                return (
                  <div
                    key={paper.paperId}
                    className="group bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border border-red-100">
                              {paper.conferenceAcronym}
                            </span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                              Assigned {new Date(paper.assignedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-red-700 transition-colors mb-4 leading-tight">
                            {paper.title}
                          </h2>
                          <p className="text-gray-600 font-medium leading-relaxed mb-6 line-clamp-3">
                            {paper.abstract}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div>
                              <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Key Concepts</h4>
                              <div className="flex flex-wrap gap-2">
                                {paper.keywords.map((keyword, index) => (
                                  <span key={index} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-bold">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Conference Info</h4>
                              <p className="text-sm font-bold text-gray-800">{paper.conferenceName}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-3 w-full md:w-48 pt-2">
                          <a
                            href={paper.paperFilePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 w-full py-3 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-xl hover:border-red-200 hover:text-red-700 transition-all text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download PDF</span>
                          </a>
                          
                          {isReviewed ? (
                            <div className="flex items-center justify-center space-x-2 w-full py-3 bg-green-50 text-green-700 font-bold rounded-xl border border-green-100 text-sm">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Completed</span>
                            </div>
                          ) : (
                            <Link
                              to={`/userdashboard/review-form?reviewerId=${reviewerId}&paperId=${paper.paperId}&title=${paper.title}`}
                              className="flex items-center justify-center w-full py-3 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 text-sm transform hover:scale-[1.05]"
                              style={{ backgroundColor: "#9B0020" }}
                            >
                              Evaluate Manuscript
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllPapersToReview;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/Auth";
// import Layout from "../../components/Layout";
// import { Link } from "react-router-dom";

// const AllPapersToReview = () => {
//   const [assignedPapers, setAssignedPapers] = useState([]);
//   const [auth] = useAuth();
//   const reviewerId = auth?.user?._id;

//   useEffect(() => {
//     const fetchAssignedPapers = async () => {
//       try {
//         const response = await axios.get(
//           `/api/reviewer/assigned-papers/reviewer/${reviewerId}`
//         );
//         console.log(response.data);
//         if (response.data.success) {
//           setAssignedPapers(response.data.data);
//         } else {
//           // Handle if there are no assigned papers or fetch fails.
//         }
//       } catch (err) {
//         console.error(err);
//         // Handle any error that occurs during the fetch.
//       }
//     };

//     fetchAssignedPapers();
//   }, [reviewerId]);

//   return (
//     <Layout title={"confizio - Assigned Papers"}>
//       <div className="min-h-screen bg-gray-100 py-8 px-4">
//         <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">
//             Assigned Papers
//           </h1>
//           {assignedPapers.length === 0 && (
//             <p className="text-gray-600">No assigned papers found.</p>
//           )}
//           <div className="grid gap-6">
//             {assignedPapers.map((paper) => (
//               <div key={paper._id} className="bg-gray-50 p-6 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {paper.title}
//                 </h2>
//                 <p className="text-gray-600 mt-2">
//                   <strong>Abstract:</strong> {paper.abstract}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   <strong>Conference:</strong> {paper.conferenceName} (
//                   {paper.conferenceAcronym})
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   <strong>Assigned At:</strong>{" "}
//                   {new Date(paper.assignedAt).toLocaleString()}
//                 </p>
//                 <div className="mt-4">
//                   <strong className="text-gray-800">Keywords:</strong>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {paper.keywords.map((keyword, index) => (
//                       <span
//                         key={index}
//                         className="bg-secondaryAlt-light text-primary px-3 py-1 rounded-full text-sm"
//                       >
//                         {keyword}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <strong className="text-gray-800">Authors:</strong>
//                   <ul className="list-disc list-inside mt-2">
//                     {paper.authors.map((author, index) => (
//                       <li key={index} className="text-gray-600">
//                         {author.firstName} {author.lastName} - {author.email}{" "}
//                         {author.affiliation && `(${author.affiliation})`}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="flex space-x-3">
//                   <a
//                     href={paper.paperFilePath}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-4 inline-block bg-accent text-white px-4 py-2 rounded shadow hover:bg-accentAlt-dark transition"
//                   >
//                     View Paper
//                   </a>
//                   {/* Check if the reviewer has already reviewed the paper */}
//                   {paper.hasReviewed ? (
//                     // If the reviewer has already reviewed, show 'Reviewed' button
//                     <button
//                       disabled
//                       className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded shadow cursor-default"
//                     >
//                       Reviewed
//                     </button>
//                   ) : (
//                     // If the reviewer hasn't reviewed, show 'Review Paper' button
//                     <Link
//                       to={`/userdashboard/review-form?reviewerId=${reviewerId}&paperId=${paper._id}&title=${paper.title}`}
//                       className="mt-4 inline-block bg-secondary text-white px-4 py-2 rounded shadow hover:bg-secondaryAlt-dark transition"
//                     >
//                       Review Paper
//                     </Link>
//                   )}
//                 </div>
//                 <div>
//                   state:
//                   {paper.hasReviewed}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AllPapersToReview;
