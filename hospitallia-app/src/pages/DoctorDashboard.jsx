import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function DoctorDashboard() {
  const { currentUser } = useAuth(); // get doctor's UID
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchDoctorAppointments() {
      if (!currentUser) return;
      const q = query(
        collection(db, "appointments"),
        where("doctorId", "==", currentUser.uid)
      );
      const aptsSnap = await getDocs(q);
      setAppointments(
        aptsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
    fetchDoctorAppointments();
  }, [currentUser]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2">Patient</th>
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
                <td className="p-2">{a.patientName || a.patientId}</td>
                <td className="p-2">{a.date}</td>
                <td className="p-2">{a.time}</td>
                <td className="p-2">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* You can add more cards/sections: e.g. link to view all, quick stats, etc. */}
    </div>
  );
}
