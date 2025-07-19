import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper: Lookup by UID
  const getName = (arr, id) => arr.find((x) => x.id === id)?.name || "Unknown";

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [aptSnap, patSnap, docSnap] = await Promise.all([
        getDocs(collection(db, "appointments")),
        getDocs(collection(db, "patients")),
        getDocs(collection(db, "users")), // Assuming doctors are in users collection with role='doctor'
      ]);
      setAppointments(aptSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setPatients(patSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setDoctors(
        docSnap.docs
          .filter((d) => d.data().role === "doctor")
          .map((d) => ({ id: d.id, ...d.data() }))
      );
      setLoading(false);
    }
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this appointment?")) {
      await deleteDoc(doc(db, "appointments", id));
      setAppointments((apps) => apps.filter((a) => a.id !== id));
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <Link
        to="/appointments/add"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Appointment
      </Link>
      <table className="w-full mt-2 table-auto border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2">Patient</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-8">
                No appointments found.
              </td>
            </tr>
          )}
          {appointments.map((a) => (
            <tr key={a.id} className="border-b dark:border-gray-700">
              <td className="p-2">{getName(patients, a.patientId)}</td>
              <td className="p-2">{getName(doctors, a.doctorId)}</td>
              <td className="p-2">{a.date}</td>
              <td className="p-2">{a.time}</td>
              <td className="p-2">{a.status}</td>
              <td className="p-2 flex gap-2">
                <Link
                  to={`/appointments/edit/${a.id}`}
                  className="bg-yellow-400 text-xs px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
