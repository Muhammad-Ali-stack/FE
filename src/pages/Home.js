import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ServiceCard from "./ServiceCard";
import AboutUs from "./AboutUs";
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
    <Layout title="Confera Flow - Home">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center text-white px-4">

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

        <div className="bg-black bg-opacity-50 absolute inset-0 -z-5"></div>

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

        <div className="relative z-10 p-4 max-w-2xl">
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-2 text-light -mt-24"
            data-aos="fade-up"
          >
            Managing Conferences Made
          </h1>
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-6"
            style={{
              color: "#9B0020",
              textShadow:
                "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white",
            }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Effortless!
          </h1>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 px-4">
        <h2
          className="text-3xl md:text-4xl font-semibold text-center mb-8"
          data-aos="fade-up"
        >
          Features
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div data-aos="fade-right">
            <ServiceCard title="Conference Management" description="Streamline your conference workflows." />
          </div>
          <div data-aos="fade-left">
            <ServiceCard title="Registration" description="Customizable forms for attendee registration." />
          </div>
          <div data-aos="fade-right">
            <ServiceCard title="Paper Submission" description="Efficient and simple submission process." />
          </div>
          <div data-aos="fade-left">
            <ServiceCard title="Paper Review" description="Detailed feedback for submitted papers." />
          </div>
          <div data-aos="fade-right">
            <ServiceCard title="Communication Management" description="Automated notifications for stakeholders." />
          </div>
          <div data-aos="fade-left">
            <ServiceCard title="Plagiarism Detection" description="Quick and detailed plagiarism reports." />
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 px-4" data-aos="fade-up">
        <AboutUs />
      </section>
    </Layout>
  );
};

export default Home;