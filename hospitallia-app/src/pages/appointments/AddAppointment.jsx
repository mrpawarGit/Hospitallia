import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddAppointment() {
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    status: "scheduled",
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLists() {
      const userSnap = await getDocs(collection(db, "users"));
      setPatients(
        userSnap.docs
          .filter((doc) => doc.data().role === "patient")
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setDoctors(
        userSnap.docs
          .filter((doc) => doc.data().role === "doctor")
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }
    fetchLists();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "appointments"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      navigate("/appointments");
    } catch {
      alert("Failed to add appointment");
    }
    setLoading(false);
  };

  const label = (u) => (u.name ? `${u.name} (${u.email})` : u.email);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
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
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {label(d)}
            </option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason/notes"
          className="w-full border p-2 rounded"
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {loading ? "Saving..." : "Add Appointment"}
        </button>
      </form>
    </div>
  );
}
