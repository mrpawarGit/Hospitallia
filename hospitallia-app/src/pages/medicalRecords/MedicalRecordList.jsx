import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function MedicalRecordList() {
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const { currentUser, role } = useAuth();

  useEffect(() => {
    async function fetchData() {
      let q = collection(db, "medicalRecords");
      if (role === "doctor") {
        q = query(q, where("doctorId", "==", currentUser.uid));
      } else if (role === "patient") {
        q = query(q, where("patientId", "==", currentUser.uid));
      }
      const recSnap = await getDocs(q);
      setRecords(recSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      const userSnap = await getDocs(collection(db, "users"));
      setUsers(userSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchData();
  }, [currentUser, role]);

  const getUserName = (id) => {
    const u = users.find((u) => u.id === id);
    return u ? (u.name ? `${u.name} (${u.email})` : u.email) : id;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Medical Records</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Doctor</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-gray-400 dark:text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
            {records.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b dark:border-gray-700 ${
                  i % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {getUserName(r.patientId)}
                </td>
                <td className="px-6 py-4">{r.date}</td>
                <td className="px-6 py-4">{getUserName(r.doctorId)}</td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <Link
                    to={`/medical-records/${r.id}`}
                    className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
                  >
                    View
                  </Link>
                  {role === "doctor" && r.doctorId === currentUser.uid && (
                    <Link
                      to={`/medical-records/edit/${r.id}`}
                      className="text-yellow-600 dark:text-yellow-400 font-medium hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {role === "doctor" && (
        <Link
          to="/medical-records/add"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Medical Record
        </Link>
      )}
    </div>
  );
}
