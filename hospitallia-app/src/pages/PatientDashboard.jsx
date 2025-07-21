import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;

      // Appointments
      const qApt = query(
        collection(db, "appointments"),
        where("patientId", "==", currentUser.uid)
      );
      const aptsSnap = await getDocs(qApt);
      setAppointments(aptsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // Users
      const userSnap = await getDocs(collection(db, "users"));
      setUsers(userSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // Bills
      const qBills = query(
        collection(db, "bills"),
        where("patientId", "==", currentUser.uid)
      );
      const billsSnap = await getDocs(qBills);
      setBills(billsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200">
          Patient Dashboard
        </h1>
      </div>

      {/* Appointments */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
        <h2 className="text-lg font-semibold px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          Your Appointments
        </h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Doctor</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center px-6 py-4 text-gray-500">
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
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {getUserName(a.doctorId)}
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

      {/* Bills */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className="text-lg font-semibold px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          Your Bills
        </h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center px-6 py-4 text-gray-500">
                  No Bills Found
                </td>
              </tr>
            ) : (
              bills.map((b, index) => (
                <tr
                  key={b.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } border-b border-gray-200 dark:border-gray-700`}
                >
                  <td className="px-6 py-4">{b.amount}</td>
                  <td className="px-6 py-4">{b.status}</td>
                  <td className="px-6 py-4">{b.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
