import { useState } from "react";
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState(""); // ← new
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name, // ← new
        email,
        role,
        createdAt: new Date().toISOString(),
      });
      alert("Account created. You can now sign in.");
      setName(""); // ← new
      setEmail("");
      setPassword("");
      setRole("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {error && <div className="text-red-600">{error}</div>}
      <input
        className="border px-2 py-1 rounded w-full"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        className="border px-2 py-1 rounded w-full"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="border px-2 py-1 rounded w-full"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select
        className="border px-2 py-1 rounded w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="">Select Role</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="staff">Staff</option>
        {/* Optionally allow admin creation only from a protected area */}
      </select>
      <button
        className={`bg-blue-500 text-white py-1 px-4 rounded ${
          loading ? "opacity-50" : ""
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;
