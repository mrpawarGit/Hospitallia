import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "users", id)).then((snap) => {
      if (snap.exists()) setUser({ id: snap.id, ...snap.data() });
    });
  }, [id]);

  if (!user)
    return <div className="p-6 text-center">Loading or not found...</div>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Contact:</strong> {user.contact}
        </div>
        <div>
          <strong>Address:</strong> {user.address}
        </div>
        <div>
          <strong>Blood Group:</strong> {user.bloodGroup}
        </div>
        <div>
          <strong>Height:</strong> {user.height ? `${user.height} cm` : ""}
        </div>
        <div>
          <strong>Weight:</strong> {user.weight ? `${user.weight} kg` : ""}
        </div>
        <div>
          <strong>Date of Birth:</strong> {user.dob}
        </div>
        <div>
          <strong>Gender:</strong> {user.gender}
        </div>
        <div>
          <strong>Emergency Contact:</strong> {user.emergencyContact}
        </div>
        <div>
          <strong>Insurance Number:</strong> {user.insuranceNumber}
        </div>
        <div>
          <strong>Allergies:</strong> {user.allergies}
        </div>
        <div>
          <strong>Role:</strong> <span className="capitalize">{user.role}</span>
        </div>
        <div>
          <strong>User ID:</strong> {user.id}
        </div>
      </div>
    </div>
  );
}
