import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getDoc(doc(db, "users", currentUser.uid)).then((snap) => {
        if (snap.exists()) setUser(snap.data());
      });
    }
  }, [currentUser]);

  if (!user) return <div className="p-6">Loading...</div>;
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="mb-2">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-2">
          <strong>Role:</strong> {user.role}
        </div>
        {/* Additional fields can go here */}
      </div>
    </div>
  );
}
