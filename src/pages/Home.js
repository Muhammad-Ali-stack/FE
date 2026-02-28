import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ServiceCard from "./ServiceCard";
import AboutUs from "./AboutUs";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const slides = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop",
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout title="Confizio - Global Conference Management">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center text-white px-4 overflow-hidden">
        {/* Slideshow */}
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Conference ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover -z-10 transition-opacity duration-1000"
            style={{ opacity: index === current ? 1 : 0 }}
          />
        ))}

        <div className="bg-black bg-opacity-60 absolute inset-0 -z-5"></div>

        {/* Slide Dots */}
        <div className="absolute bottom-8 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === current ? "white" : "rgba(255,255,255,0.4)",
                transform: index === current ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-4 max-w-4xl">
          <h1
            className="text-1xl md:text-6xl font-extrabold mb-4 text-white tracking-tight"
            data-aos="fade-up"
          >
            Managing Conferences Made
          </h1>
          <h1
            className="text-5xl md:text-7xl font-extrabold mb-8"
            style={{
              color: "#9B0020",
              textShadow: "2px 2px 0px rgba(255,255,255,1), -1px -1px 0px rgba(255,255,255,1), 1px -1px 0px rgba(255,255,255,1), -1px 1px 0px rgba(255,255,255,1)",
            }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Effortless!
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="500">
            The all-in-one platform for researchers, organizers, and reviewers to connect and collaborate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="700">
            <Link
              to="/register"
              className="px-8 py-4 text-lg font-bold rounded-2xl text-white transition-all transform hover:scale-105 shadow-2xl shadow-red-900/40"
              style={{ backgroundColor: "#9B0020" }}
            >
              Get Started Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 text-lg font-bold rounded-2xl bg-white text-gray-900 hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Services/Features Section */}
      <section className="py-24 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-extrabold text-red-700 uppercase tracking-widest mb-3" data-aos="fade-up">Platform Services</h2>
            <p className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight" data-aos="fade-up" data-aos-delay="200">
              Tailored for every role
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div data-aos="fade-up" data-aos-delay="100">
              <ServiceCard 
                title="Organizers" 
                description="Streamline workflows, manage tracks, and handle registrations with ease." 
                image="/organizer.jpg"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <ServiceCard 
                title="Authors" 
                description="Efficient paper submission and real-time status tracking for researchers." 
                image="/author.jpg"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <ServiceCard 
                title="Reviewers" 
                description="High-quality feedback tools for evaluations and program discussions." 
                image="/reviewer.jpg"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <ServiceCard 
                title="Administrators" 
                description="Global oversight and platform management at your fingertips." 
                image="/admin.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-4 bg-gray-50 overflow-hidden" data-aos="fade-up">
        <AboutUs />
      </section>
    </Layout>
  );
};

export default Home;