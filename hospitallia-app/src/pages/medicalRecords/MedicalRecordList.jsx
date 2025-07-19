import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function MedicalRecordList() {
  const [records, setRecords] = useState([]);
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
    }
    fetchData();
  }, [currentUser, role]);

  if (!records.length)
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
        <p>No records found.</p>
        {role === "doctor" && (
          <Link
            to="/medical-records/add"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded inline-block"
          >
            + Add Medical Record
          </Link>
        )}
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
      <table className="w-full mt-2 table-auto border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2">Patient ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Doctor ID</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b dark:border-gray-700">
              <td className="p-2">{r.patientId}</td>
              <td className="p-2">{r.date}</td>
              <td className="p-2">{r.doctorId}</td>
              <td className="p-2 flex gap-2">
                <Link
                  to={`/medical-records/${r.id}`}
                  className="bg-blue-400 text-xs px-2 py-1 rounded text-white"
                >
                  View
                </Link>
                {role === "doctor" && r.doctorId === currentUser.uid && (
                  <Link
                    to={`/medical-records/edit/${r.id}`}
                    className="bg-yellow-400 text-xs px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {role === "doctor" && (
        <Link
          to="/medical-records/add"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Medical Record
        </Link>
      )}
    </div>
  );
}
