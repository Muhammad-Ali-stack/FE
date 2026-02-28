import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16" id="about">
      {/* Section Heading */}
      <div className="text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          About Us
        </h2>
        <div className="mt-3 mx-auto w-16 h-1 rounded-full" style={{ backgroundColor: "#9B0020" }} />
      </div>

      {/* About Us */}
      <div className="flex flex-col md:flex-row items-center md:space-x-12" data-aos="fade-right">
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <div className="w-36 h-36 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: "#f5f5f5" }}>
            <img src="/about.png" alt="About Us" className="w-24 h-24 object-contain" />
          </div>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#9B0020" }}>Who We Are</h3>
          <p className="text-gray-600 leading-relaxed">
            We are committed to redefining conference management through technology. Our platform streamlines tasks for organizers, authors, and reviewers, making collaboration seamless and effective.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="flex flex-col md:flex-row-reverse items-center md:space-x-12 md:space-x-reverse" data-aos="fade-left">
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <div className="w-36 h-36 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: "#f5f5f5" }}>
            <img src="/mission.png" alt="Our Mission" className="w-24 h-24 object-contain" />
          </div>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#9B0020" }}>Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To simplify and elevate the way conferences are organized and managed. We aim to provide a robust, intuitive platform that meets the needs of modern conference workflows.
          </p>
        </div>
      </div>

      {/* Our Vision */}
      <div className="flex flex-col md:flex-row items-center md:space-x-12" data-aos="fade-right">
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <div className="w-36 h-36 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: "#f5f5f5" }}>
            <img src="/vision.png" alt="Our Vision" className="w-24 h-24 object-contain" />
          </div>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#9B0020" }}>Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            We envision a world where conference management is fully automated, accessible, and collaborative. By leveraging technology, we empower users to focus on impactful research and innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;