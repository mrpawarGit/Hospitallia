import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [medRecords, setMedRecords] = useState(0);

  useEffect(() => {
    async function fetchPatientData() {
      if (!currentUser) return;
      // Appointments
      const qApt = query(
        collection(db, "appointments"),
        where("patientId", "==", currentUser.uid)
      );
      const aptsSnap = await getDocs(qApt);
      setAppointments(
        aptsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      // Medical records
      const qMed = query(
        collection(db, "medicalRecords"),
        where("patientId", "==", currentUser.uid)
      );
      const meds = await getDocs(qMed);
      setMedRecords(meds.size);
    }
    fetchPatientData();
  }, [currentUser]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <SummaryCard
          title="Appointments"
          value={appointments.length}
          link="/appointments"
        />
        <SummaryCard
          title="Medical Records"
          value={medRecords}
          link="/medical-records"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Appointments</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2">Doctor</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
                  No Appointments Found
                </td>
              </tr>
            )}
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="p-2">{a.doctorName || a.doctorId}</td>
                <td className="p-2">{a.date}</td>
                <td className="p-2">{a.time}</td>
                <td className="p-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
