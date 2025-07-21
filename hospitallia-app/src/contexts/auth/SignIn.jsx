import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userSnap = await getDoc(doc(db, "users", user.uid));

      if (userSnap.exists()) {
        const role = userSnap.data().role;
        if (role === "admin") navigate("/admin");
        else if (role === "doctor") navigate("/doctor");
        else if (role === "staff") navigate("/staff");
        else if (role === "patient") navigate("/patient");
        else navigate("/");
      } else {
        setError("User record not found. Please contact admin.");
      }
    } catch {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 dark:text-blue-400">
          Login
        </h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 border border-red-300 dark:border-red-700 p-2 rounded text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 cursor-pointer rounded-lg font-semibold transition-colors ${
            loading
              ? "bg-blue-400 dark:bg-blue-500 r"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 "
          } text-white`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 cursor-pointer dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
