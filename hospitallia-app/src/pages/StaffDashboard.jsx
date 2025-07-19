import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function StaffDashboard() {
  const [patients, setPatients] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [medRecords, setMedRecords] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const pats = await getDocs(collection(db, "patients"));
      setPatients(pats.size);
      const apts = await getDocs(collection(db, "appointments"));
      setAppointments(apts.size);
      const meds = await getDocs(collection(db, "medicalRecords"));
      setMedRecords(meds.size);
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        <SummaryCard title="Total Patients" value={patients} link="/patients" />
        <SummaryCard
          title="Total Appointments"
          value={appointments}
          link="/appointments"
        />
        <SummaryCard
          title="Medical Records"
          value={medRecords}
          link="/medical-records"
        />
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

function SummaryCard({ title, value, link }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow flex flex-col">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
      <Link
        to={link}
        className="mt-4 text-blue-600 dark:text-blue-200 underline text-sm"
      >
        View
      </Link>
    </div>
  );
}
