import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";

export default function Profile() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    contact: "",
    address: "",
    bloodGroup: "",
    height: "",
    weight: "",
    dob: "",
    gender: "",
    emergencyContact: "",
    insuranceNumber: "",
    allergies: "",
  });
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (currentUser) {
      getDoc(doc(db, "users", currentUser.uid)).then((snap) => {
        if (snap.exists()) {
          const user = snap.data();
          setForm({
            ...form,
            ...user,
          });
        }
      });
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      if (currentUser.email !== form.email) {
        await updateEmail(currentUser, form.email);
      }
      await updateDoc(doc(db, "users", currentUser.uid), form);
      setStatus("Profile updated");
      setEdit(false);
    } catch (err) {
      setStatus("Failed to update: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {status && (
        <div
          className={
            status.includes("Failed")
              ? "text-red-600 mb-2"
              : "text-green-600 mb-2"
          }
        >
          {status}
        </div>
      )}
      {edit ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Contact Number"
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Address"
          />
          <input
            type="text"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Blood Group"
          />
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Height (cm)"
          />
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Weight (kg)"
          />
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Date of Birth"
          />
          <input
            type="text"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Gender"
          />
          <input
            type="text"
            name="emergencyContact"
            value={form.emergencyContact}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Emergency Contact"
          />
          <input
            type="text"
            name="insuranceNumber"
            value={form.insuranceNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Insurance Number"
          />
          <input
            type="text"
            name="allergies"
            value={form.allergies}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Allergies"
          />
          <div className="text-gray-500">
            Role: <span className="capitalize">{form.role}</span>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="ml-3 text-gray-500"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="mb-2">
            <strong>Name:</strong> {form.name}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {form.email}
          </div>
          <div className="mb-2">
            <strong>Contact:</strong> {form.contact}
          </div>
          <div className="mb-2">
            <strong>Address:</strong> {form.address}
          </div>
          <div className="mb-2">
            <strong>Blood Group:</strong> {form.bloodGroup}
          </div>
          <div className="mb-2">
            <strong>Height:</strong> {form.height ? `${form.height} cm` : ""}
          </div>
          <div className="mb-2">
            <strong>Weight:</strong> {form.weight ? `${form.weight} kg` : ""}
          </div>
          <div className="mb-2">
            <strong>Date of Birth:</strong> {form.dob}
          </div>
          <div className="mb-2">
            <strong>Gender:</strong> {form.gender}
          </div>
          <div className="mb-2">
            <strong>Emergency Contact:</strong> {form.emergencyContact}
          </div>
          <div className="mb-2">
            <strong>Insurance Number:</strong> {form.insuranceNumber}
          </div>
          <div className="mb-2">
            <strong>Allergies:</strong> {form.allergies}
          </div>
          <div className="mb-2">
            <strong>Role:</strong>{" "}
            <span className="capitalize">{form.role}</span>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            onClick={() => setEdit(true)}
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}
