import { useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully");
      // Redirect to dashboard or home here
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold">Sign In</h2>
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
        className="bg-blue-600 text-white py-1 px-4 rounded"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
