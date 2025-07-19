import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function BillingList() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    async function fetchAll() {
      const [billSnap, userSnap] = await Promise.all([
        getDocs(collection(db, "bills")),
        getDocs(collection(db, "users")),
      ]);
      setBills(billSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setPatients(
        userSnap.docs
          .filter((doc) => doc.data().role === "patient")
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
    fetchAll();
  }, []);

  const getPatientName = (pid) =>
    patients.find((p) => p.id === pid)?.name ||
    patients.find((p) => p.id === pid)?.email ||
    pid;

  const handleDelete = async (id) => {
    if (window.confirm("Delete this bill?")) {
      await deleteDoc(doc(db, "bills", id));
      setBills((bills) => bills.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Billing / Invoices</h2>
      <Link
        to="/billing/add"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Bill
      </Link>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2">Patient</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((b) => (
            <tr key={b.id} className="border-b dark:border-gray-700">
              <td className="p-2">{getPatientName(b.patientId)}</td>
              <td className="p-2">{b.amount}</td>
              <td className="p-2 capitalize">{b.status}</td>
              <td className="p-2">{b.date}</td>
              <td className="p-2 flex gap-2">
                <Link
                  to={`/billing/edit/${b.id}`}
                  className="bg-yellow-400 text-xs px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {bills.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 py-8">
                No bills yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
