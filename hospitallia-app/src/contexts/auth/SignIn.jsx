import { useState } from "react";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      // Fetch user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userRole = userData.role;

        alert(`Signed in as ${userRole}`);
        // Here, you can store userRole in your app state (Redux/Context) and redirect accordingly.
        // For example: setUser({ ...userData, uid: user.uid });
      } else {
        setError("User record not found. Please contact admin.");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
    setLoading(false);
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
        className={`bg-blue-600 text-white py-1 px-4 rounded ${
          loading ? "opacity-50" : ""
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignIn;
