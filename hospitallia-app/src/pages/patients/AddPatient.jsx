import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "patients"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      navigate("/patients");
    } catch (error) {
      alert("Failed to add patient");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Patient Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          required
          placeholder="Date of Birth"
          className="w-full border p-2 rounded"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          required
          placeholder="Contact"
          className="w-full border p-2 rounded"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {loading ? "Saving..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
}
