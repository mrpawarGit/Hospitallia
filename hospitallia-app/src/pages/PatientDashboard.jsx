import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
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
      // All users for doctor name lookup
      const userSnap = await getDocs(collection(db, "users"));
      setUsers(userSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchData();
  }, [currentUser]);

  const getUserName = (uid) => {
    const user = users.find((u) => u.id === uid);
    return user
      ? user.name
        ? `${user.name} (${user.email})`
        : user.email
      : uid;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
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
                <td className="p-2">{getUserName(a.doctorId)}</td>
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
