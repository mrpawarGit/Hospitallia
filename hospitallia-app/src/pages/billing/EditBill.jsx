import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBill() {
  const { id } = useParams();
  const [form, setForm] = useState({
    patientId: "",
    amount: "",
    date: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "bills", id)).then((snap) => {
      if (snap.exists()) setForm(snap.data());
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateDoc(doc(db, "bills", id), form);
    navigate("/billing");
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
