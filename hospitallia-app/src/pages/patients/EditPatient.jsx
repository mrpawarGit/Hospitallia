import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPatient() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "patients", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      } else {
        alert("Patient not found");
        navigate("/patients");
      }
      setLoading(false);
    }
    fetch();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "patients", id), {
        ...form,
        updatedAt: new Date().toISOString(),
      });
      navigate("/patients");
    } catch (error) {
      alert("Failed to update patient");
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <br /><br />
      <h2 className="text-2xl font-bold mb-4">Edit Patient</h2>
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
          {loading ? "Updating..." : "Update Patient"}
        </button>
      </form>
    </div>
  );
}
