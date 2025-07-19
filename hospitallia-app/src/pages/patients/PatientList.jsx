import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "patients"));
    setPatients(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
    // Optionally set up onSnapshot for real-time updates
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this patient?")) {
      await deleteDoc(doc(db, "patients", id));
      fetchPatients();
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-gray-700">Loading...</span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <Link
        to="/patients/add"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Patient
      </Link>
      <table className="w-full mt-2 table-auto border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-8">
                No patients found.
              </td>
            </tr>
          )}
          {patients.map((p) => (
            <tr key={p.id} className="border-b dark:border-gray-700">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.dob}</td>
              <td className="p-2">{p.gender}</td>
              <td className="p-2">{p.contact}</td>
              <td className="p-2 flex gap-2">
                <Link
                  to={`/patients/edit/${p.id}`}
                  className="bg-yellow-400 text-xs px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
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
