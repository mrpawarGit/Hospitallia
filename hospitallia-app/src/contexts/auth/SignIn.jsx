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
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userRole = userSnap.data().role;
        // Redirect based on user role
        if (userRole === "admin") navigate("/admin");
        else if (userRole === "doctor") navigate("/doctor");
        else if (userRole === "staff") navigate("/staff");
        else if (userRole === "patient") navigate("/patient");
        else navigate("/");
      } else {
        setError("User record not found. Please contact admin.");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignIn}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Login
        </h2>
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 text-center text-sm">
            {error}
          </div>
        )}
        <input
          className="border px-3 py-2 rounded w-full focus:outline-blue-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="border px-3 py-2 rounded w-full focus:outline-blue-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          className={`w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        <div className="text-center text-gray-500 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
