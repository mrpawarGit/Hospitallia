import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBill() {
  const { id } = useParams();
  const [form, setForm] = useState({
    patientId: "",
    amount: "",
    date: "",
    status: "",
  });
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const snap = await getDocs(collection(db, "users"));
      setPatients(
        snap.docs
          .filter((doc) => doc.data().role === "patient")
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      const billSnap = await getDoc(doc(db, "bills", id));
      if (billSnap.exists()) setForm(billSnap.data());
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateDoc(doc(db, "bills", id), form);
    navigate("/billing");
  };

  const label = (u) => (u.name ? `${u.name} (${u.email})` : u.email);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  return (
    <div className="max-w-xl mx-auto p-6">
      <br />
      <br />
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Bill</h2>
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
              {label(p)}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
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
          Update Bill
        </button>
      </form>
    </div>
  );
}
