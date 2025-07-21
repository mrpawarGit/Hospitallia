import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function EditMedicalRecord() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    notes: "",
    prescription: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const ref = doc(db, "medicalRecords", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        if (data.doctorId !== currentUser.uid) {
          alert("Unauthorized");
          navigate("/medical-records");
        } else {
          setForm({ notes: data.notes, prescription: data.prescription || "" });
        }
      } else {
        alert("Not found");
        navigate("/medical-records");
      }
      setLoading(false);
    }
    fetch();
  }, [id, currentUser, navigate]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "medicalRecords", id), {
        ...form,
        updatedAt: new Date().toISOString(),
      });
      navigate(`/medical-records/${id}`);
    } catch {
      alert("Failed to update record");
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <br />
      <br />
      <h2 className="text-2xl font-bold mb-4 text-center">
        Edit Medical Record
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          required
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
          Update Record
        </button>
      </form>
    </div>
  );
}
