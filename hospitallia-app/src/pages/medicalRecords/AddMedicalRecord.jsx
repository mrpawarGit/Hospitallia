import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AddMedicalRecord() {
  const [form, setForm] = useState({
    patientId: "",
    date: "",
    notes: "",
    prescription: "",
  });
  const [patients, setPatients] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const label = (u) => (u.name ? `${u.name} (${u.email})` : u.email);
  useEffect(() => {
    getDocs(collection(db, "users")).then((snap) =>
      setPatients(
        snap.docs
          .filter((d) => d.data().role === "patient")
          .map((d) => ({ id: d.id, ...d.data() }))
      )
    );
  }, []);

  useEffect(() => {
    getDocs(collection(db, "users")).then((snap) =>
      setPatients(
        snap.docs
          .filter((doc) => doc.data().role === "patient")
          .map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "medicalRecords"), {
      ...form,
      doctorId: currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    navigate("/medical-records");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Medical Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="patientId"
          required
          value={form.patientId}
          onChange={handleChange}
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
          type="date"
          name="date"
          required
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="notes"
          required
          value={form.notes}
          onChange={handleChange}
          placeholder="Clinical notes and findings"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="prescription"
          value={form.prescription}
          onChange={handleChange}
          placeholder="Prescription (medications, dosages)"
          className="w-full border p-2 rounded"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Record
        </button>
      </form>
    </div>
  );
}
