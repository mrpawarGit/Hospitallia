import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function DoctorDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;
      const qApt = query(
        collection(db, "appointments"),
        where("doctorId", "==", currentUser.uid)
      );
      const aptsSnap = await getDocs(qApt);
      setAppointments(
        aptsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200">
          Doctor Dashboard
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Patient</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Time</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 px-6 py-4">
                  No Appointments Found
                </td>
              </tr>
            ) : (
              appointments.map((a, index) => (
                <tr
                  key={a.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } border-b border-gray-200 dark:border-gray-700`}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {getUserName(a.patientId)}
                  </th>
                  <td className="px-6 py-4">{a.date}</td>
                  <td className="px-6 py-4">{a.time}</td>
                  <td className="px-6 py-4">{a.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/medical-records/add"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
          + Add Medical Record
        </Link>
      </div>
    </div>
  );
}
