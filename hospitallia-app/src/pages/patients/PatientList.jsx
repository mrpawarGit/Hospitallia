import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "users")).then((snap) =>
      setPatients(
        snap.docs
          .filter((d) => d.data().role === "patient")
          .map((d) => ({ id: d.id, ...d.data() }))
      )
    );
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">
                <Link
                  to={`/patients/details/${p.id}`}
                  className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
