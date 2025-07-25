import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAppointment() {
  const { id } = useParams();
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    status: "",
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAll() {
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
      const aptDoc = await getDoc(doc(db, "appointments", id));
      if (aptDoc.exists()) {
        setForm({
          ...aptDoc.data(),
          status: aptDoc.data().status || "scheduled",
        });
      } else {
        alert("Appointment not found");
        navigate("/appointments");
      }
      setLoading(false);
    }
    fetchAll();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "appointments", id), {
        ...form,
        updatedAt: new Date().toISOString(),
      });
      navigate("/appointments");
    } catch {
      alert("Failed to update appointment");
    }
    setLoading(false);
  };

  const label = (u) => (u.name ? `${u.name} (${u.email})` : u.email);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6"><br /><br />
      <h2 className="text-2xl font-bold text-center mb-4">Edit Appointment</h2>
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
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {loading ? "Updating..." : "Update Appointment"}
        </button>
      </form>
    </div>
  );
}
