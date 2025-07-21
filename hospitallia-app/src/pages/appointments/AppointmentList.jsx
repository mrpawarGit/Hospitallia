import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const label = (u) =>
    u ? (u.name ? `${u.name} (${u.email})` : u.email) : "Unknown";

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [aptSnap, userSnap] = await Promise.all([
        getDocs(collection(db, "appointments")),
        getDocs(collection(db, "users")),
      ]);
      setAppointments(aptSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      const allUsers = userSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(allUsers.filter((u) => u.role === "patient"));
      setDoctors(allUsers.filter((u) => u.role === "doctor"));
      setLoading(false);
    }
    fetchAll();
  }, []);

  const getPatient = (id) => patients.find((u) => u.id === id);
  const getDoctor = (id) => doctors.find((u) => u.id === id);

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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient
              </th>
              <th scope="col" className="px-6 py-3">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
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
              <tr
                key={a.id}
                className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {label(getPatient(a.patientId))}
                </td>
                <td className="px-6 py-4">{label(getDoctor(a.doctorId))}</td>
                <td className="px-6 py-4">{a.date}</td>
                <td className="px-6 py-4">{a.time}</td>
                <td className="px-6 py-4">{a.status}</td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <Link
                    to={`/appointments/edit/${a.id}`}
                    className="font-medium text-yellow-600 dark:text-yellow-400 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
