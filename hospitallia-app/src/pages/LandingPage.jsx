import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const { currentUser } = useAuth();
  const carouselRef = useRef();
  const [index, setIndex] = useState(0);

  // Image assets and overlay text for each slide
  const slides = [
    {
      src: "https://docpulse.com/wp-content/uploads/2024/02/slider-5.jpg",
      heading: "Digital Healthcare, Effortless Care",
      desc: "Switch to 100% paperless appointments, billing, and patient records — secure, compliant, and fast.",
    },
    {
      src: "https://docpulse.com/wp-content/uploads/2024/02/slider-01.jpg",
      heading: "Seamless Clinic Workflows",
      desc: "All-in-one platform for doctors, patients, and staff. Appointments, EMR, reminders, and reporting built-in!",
    },
    {
      src: "https://docpulse.com/wp-content/uploads/2024/02/slider-3.jpg",
      heading: "Empowering Practice Management",
      desc: "Modern dashboards, analytics, and notifications — accessible anywhere, on any device.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${index * 100}vw)`;
    }
  }, [index]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-16 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Hospitallia
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Simplify your hospital operations with our secure, efficient, and
          modern Hospital Management System. Built for doctors, nurses, admins,
          and patients.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          {!currentUser && (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          )}
          <Link
            to="/about"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Full-Width Carousel Section with Text Overlays */}
      <section className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ width: `${slides.length * 100}vw` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="relative w-screen h-[40vw] max-h-[60vh] flex-shrink-0"
              style={{ minWidth: "100vw" }}
            >
              <img
                src={slide.src}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
                style={{ minWidth: "100vw" }}
              />
              {/* Overlay Text Content */}
              <div
                className="absolute inset-0 flex flex-col justify-center items-start px-8"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.01) 100%)",
                }}
              >
                <h2 className="ml-6 text-2xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
                  {slide.heading}
                </h2>
                <p className="ml-6 text-md md:text-xl max-w-xl mb-4 text-white/90 drop-shadow-md">
                  {slide.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Carousel Controls */}
        <button
          onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full z-10"
        >
          &#10094;
        </button>
        <button
          onClick={() => setIndex((index + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full z-10"
        >
          &#10095;
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-3 h-3 rounded-full border ${
                index === i
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white dark:bg-gray-800 border-gray-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white dark:bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Features That Power Your Hospital
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Patient Management",
              desc: "Easily manage patient records, medical history, appointments, and billing with a unified interface.",
            },
            {
              title: "Doctor Dashboard",
              desc: "Doctors can manage their schedule, appointments, view patient data, and write prescriptions.",
            },
            {
              title: "Billing & Invoicing",
              desc: "Accurate and transparent billing system for patients and the finance department.",
            },
            {
              title: "Inventory Management",
              desc: "Keep track of medicines, supplies, and equipment usage with real-time updates.",
            },
            {
              title: "Role-Based Access",
              desc: "Admins, nurses, and patients have different dashboards with appropriate permissions.",
            },
            {
              title: "Secure & Scalable",
              desc: "Built using Firebase and React, ensuring high performance, security, and scalability.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Dr. Priya Sharma",
              text: "This system has streamlined my entire workflow. I can now focus more on patients than paperwork.",
            },
            {
              name: "Hospital Admin - Zenith Care",
              text: "Managing inventory and appointments is a breeze. The role-based dashboard is a game changer!",
            },
            {
              name: "Dr. Anika Sharma - General Physician",
              text: "The appointment scheduling system has made my workflow so much smoother. I can focus more on my patients and less on paperwork.",
            },
            {
              name: "Receptionist - Lifeline Multispeciality",
              text: "Patient check-ins and record updates are now super fast. The user-friendly interface has reduced our front desk chaos significantly!",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-md p-6 shadow border-l-4 border-blue-500"
            >
              <p className="mb-4 italic">"{testimonial.text}"</p>
              <h4 className="font-bold">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
