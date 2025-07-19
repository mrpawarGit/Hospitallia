import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddBill() {
  const [form, setForm] = useState({
    patientId: "",
    amount: "",
    date: "",
    status: "unpaid",
  });
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "patients")).then((snap) =>
      setPatients(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "bills"), {
      ...form,
      createdAt: serverTimestamp(),
    });
    navigate("/billing");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Bill
        </button>
      </form>
    </div>
  );
}
