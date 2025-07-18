import { useState } from "react";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created. You can now sign in.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {error && <div className="text-red-600">{error}</div>}
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
      <button
        className="bg-blue-500 text-white py-1 px-4 rounded"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
