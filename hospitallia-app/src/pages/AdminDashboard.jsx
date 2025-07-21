import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [patientCount, setPatientCount] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [medRecords, setMedRecords] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        setLoading(true);

        // Fetch users and filter patients
        const userSnap = await getDocs(collection(db, "users"));
        const patients = userSnap.docs.filter(
          (doc) => doc.data().role === "patient"
        );
        setPatientCount(patients.length);

        // Fetch appointments
        const aptsSnap = await getDocs(collection(db, "appointments"));
        setAppointments(aptsSnap.size);

        // Fetch medical records
        const medsSnap = await getDocs(collection(db, "medicalRecords"));
        setMedRecords(medsSnap.size);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Something went wrong while loading data.");
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <br />
      <br />
      <div className="p-4 rounded mb-8">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200 text-center">
          Admin Dashboard
        </h1>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <SummaryCard
          title="Total Patients"
          value={patientCount}
          loading={loading}
          link="/patients"
        />
        <SummaryCard
          title="Total Appointments"
          value={appointments}
          loading={loading}
          link="/appointments"
        />
        <SummaryCard
          title="Medical Records"
          value={medRecords}
          loading={loading}
          link="/medical-records"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/patients/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          + Add Patient
        </Link>
        <Link
          to="/appointments/add"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          + Add Appointment
        </Link>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, link, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      {loading ? (
        <div className="animate-pulse h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      ) : (
        <p className="text-3xl font-bold mb-2">{value}</p>
      )}

      <Link
        to={link}
        className="text-blue-600 dark:text-blue-300 underline text-sm mt-auto"
      >
        View
      </Link>
    </div>
  );
}
