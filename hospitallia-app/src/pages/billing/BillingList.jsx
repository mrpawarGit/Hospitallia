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

  const getPatientName = (pid) => {
    const p = patients.find((p) => p.id === pid);
    return p ? (p.name ? `${p.name} (${p.email})` : p.email) : pid;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this bill?")) {
      await deleteDoc(doc(db, "bills", id));
      setBills((bills) => bills.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="p-6">
      <br /><br />
      <h2 className="text-2xl text-center font-bold mb-4">Billing / Invoices</h2>
      <Link
        to="/billing/add"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Bill
      </Link>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b, i) => (
              <tr
                key={b.id}
                className={`border-b dark:border-gray-700 ${
                  i % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {getPatientName(b.patientId)}
                </th>
                <td className="px-6 py-4">${b.amount}</td>
                <td className="px-6 py-4 capitalize">{b.status}</td>
                <td className="px-6 py-4">{b.date}</td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <Link
                    to={`/billing/edit/${b.id}`}
                    className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-400 dark:text-gray-500"
                >
                  No bills yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
