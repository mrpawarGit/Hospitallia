import { Link } from "react-router-dom";

export default function LandingPage() {
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
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Learn More
          </Link>
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

      {/* Call to Action */}
    </div>
  );
}
