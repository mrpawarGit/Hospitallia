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
          setForm((f) => ({
            ...f,
            ...user,
          }));
        }
      });
    }
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
      setStatus("Profile updated successfully.");
      setEdit(false);
    } catch (err) {
      setStatus("Failed to update: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Your Profile
      </h2>

      {status && (
        <div
          className={`mb-4 text-sm font-medium ${
            status.startsWith("Failed")
              ? "text-red-600 dark:text-red-400"
              : "text-green-600 dark:text-green-400"
          }`}
        >
          {status}
        </div>
      )}

      {edit ? (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            { name: "name", placeholder: "Full Name", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "contact", placeholder: "Contact Number", type: "text" },
            { name: "address", placeholder: "Address", type: "text" },
            { name: "bloodGroup", placeholder: "Blood Group", type: "text" },
            { name: "height", placeholder: "Height (cm)", type: "number" },
            { name: "weight", placeholder: "Weight (kg)", type: "number" },
            { name: "dob", placeholder: "Date of Birth", type: "date" },
            { name: "gender", placeholder: "Gender", type: "text" },
            {
              name: "emergencyContact",
              placeholder: "Emergency Contact",
              type: "text",
            },
            {
              name: "insuranceNumber",
              placeholder: "Insurance Number",
              type: "text",
            },
            { name: "allergies", placeholder: "Allergies", type: "text" },
          ].map(({ name, placeholder, type }) => (
            <input
              key={name}
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-500"
            />
          ))}

          <div className="sm:col-span-2 text-sm text-gray-600 dark:text-gray-400">
            Role: <span className="capitalize">{form.role}</span>
          </div>

          <div className="sm:col-span-2 flex gap-3 mt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-gray-700 dark:text-gray-200">
          {[
            ["Name", form.name],
            ["Email", form.email],
            ["Contact", form.contact],
            ["Address", form.address],
            ["Blood Group", form.bloodGroup],
            ["Height", form.height ? `${form.height} cm` : ""],
            ["Weight", form.weight ? `${form.weight} kg` : ""],
            ["Date of Birth", form.dob],
            ["Gender", form.gender],
            ["Emergency Contact", form.emergencyContact],
            ["Insurance Number", form.insuranceNumber],
            ["Allergies", form.allergies],
            ["Role", form.role],
          ].map(([label, value]) => (
            <div key={label}>
              <strong>{label}:</strong>{" "}
              <span className="capitalize">{value || "—"}</span>
            </div>
          ))}
          <button
            onClick={() => setEdit(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
