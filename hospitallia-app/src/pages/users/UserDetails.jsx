import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "users", id)).then((snap) => {
      if (snap.exists()) setUser({ id: snap.id, ...snap.data() });
    });
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;
  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="mb-2">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-2">
          <strong>Role:</strong> {user.role}
        </div>
        <div className="mb-2">
          <strong>UID:</strong> {user.userId || user.id}
        </div>
      </div>
    </div>
  );
}
