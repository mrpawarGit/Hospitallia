import React from "react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <br /><br /><br />
      <h1 className="text-3xl font-bold mb-4">🏥 About Hospitallia</h1>

      <p className="mb-4">
        <strong>Hospitallia</strong> is a modern and responsive Clinic
        Management System built to streamline the everyday operations of
        hospitals and clinics. From appointments and billing to inventory and
        electronic medical records, Hospitallia offers an all-in-one solution
        with role-based access for Admins, Doctors, and Receptionists.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🚀 Features</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>🔐 Role-Based Dashboards for Admin, Doctor, and Receptionist</li>
        <li>📅 Easy Appointment Scheduling with live availability</li>
        <li>🧾 Automated Billing and Invoicing</li>
        <li>💊 Inventory Management for Medicines and Supplies</li>
        <li>📝 Electronic Patient Records with editing/viewing access</li>
        <li>📊 Analytics and Reports with visual insights</li>
        <li>🌙 Dark Mode toggle for night use</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">💻 Tech Stack</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Frontend:</strong> React.js, Tailwind CSS, React Router
        </li>
        <li>
          <strong>Backend:</strong> Firebase (Auth + Firestore)
        </li>
        <li>
          <strong>Tools:</strong> Vite, GitHub, Netlify
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">👨‍💻 Developer</h2>
      <p>
        Built with ❤️ by{" "}
        <a
          href="https://github.com/mrpawarGit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline hover:text-red-400"
        >
          Mayur Pawar
        </a>
        . Open-source for learning and personal project demonstration.
      </p>

      <p className="text-sm mt-6 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Hospitallia - Clinic Management System. All
        rights reserved.
      </p>
    </div>
  );
}
