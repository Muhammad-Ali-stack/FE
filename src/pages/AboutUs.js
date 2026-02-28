import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24" id="about">
      {/* Section Heading */}
      <div className="text-center" data-aos="fade-up">
        <h2 className="text-base text-red-600 font-bold tracking-widest uppercase mb-3">Our Story</h2>
        <p className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          About ConfForum
        </p>
        <div className="mt-6 mx-auto w-24 h-1.5 rounded-full" style={{ backgroundColor: "#9B0020" }} />
      </div>

      {/* Grid Layout for Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Who We Are */}
        <div className="group bg-white rounded-3xl p-10 shadow-xl border border-gray-100 transition-all hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-900/10 transition-transform group-hover:scale-110" style={{ backgroundColor: "#9B0020" }}>
            <img src="/about.png" alt="Who We Are" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Who We Are</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            We are a team of dedicated developers and academics committed to redefining conference management through cutting-edge technology.
          </p>
        </div>

        {/* Our Mission */}
        <div className="group bg-white rounded-3xl p-10 shadow-xl border border-gray-100 transition-all hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-900/10 transition-transform group-hover:scale-110" style={{ backgroundColor: "#9B0020" }}>
            <img src="/mission.png" alt="Our Mission" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            To simplify and elevate global academic exchange by providing a robust, intuitive platform that meets the needs of modern workflows.
          </p>
        </div>

        {/* Our Vision */}
        <div className="group bg-white rounded-3xl p-10 shadow-xl border border-gray-100 transition-all hover:-translate-y-2" data-aos="fade-up" data-aos-delay="300">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-900/10 transition-transform group-hover:scale-110" style={{ backgroundColor: "#9B0020" }}>
            <img src="/vision.png" alt="Our Vision" className="w-8 h-8 object-contain brightness-0 invert" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-500 font-medium leading-relaxed">
            We envision a future where conference management is fully automated and collaborative, empowering innovation worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;