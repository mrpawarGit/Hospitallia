import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [patients, setPatients] = useState(0);
  const [appointments, setAppointments] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const pats = await getDocs(collection(db, "patients"));
      setPatients(pats.size);
      const apts = await getDocs(collection(db, "appointments"));
      setAppointments(apts.size);
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Total Patients</h2>
          <p className="text-3xl font-bold">{patients}</p>
          <Link
            to="/patients"
            className="mt-4 text-blue-600 dark:text-blue-200 underline text-sm"
          >
            View Patients
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Total Appointments</h2>
          <p className="text-3xl font-bold">{appointments}</p>
          <Link
            to="/appointments"
            className="mt-4 text-blue-600 dark:text-blue-200 underline text-sm"
          >
            View Appointments
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/patients/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          + Add Patient
        </Link>
        <Link
          to="/appointments/add"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          + Add Appointment
        </Link>
      </div>
    </div>
  );
}
