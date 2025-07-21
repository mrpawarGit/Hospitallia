import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function PatientDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const patSnap = await getDoc(doc(db, "users", id));
      if (patSnap.exists()) setUser({ id: patSnap.id, ...patSnap.data() });
      const billSnap = await getDocs(
        query(collection(db, "bills"), where("patientId", "==", id))
      );
      setBills(billSnap.docs.map((b) => ({ id: b.id, ...b.data() })));
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!user)
    return (
      <div className="text-center p-8 text-red-600">Patient not found.</div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <br /><br />
      <h1 className="text-2xl text-center font-bold mb-4">Patient Details</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
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
          <strong>User Role:</strong>{" "}
          <span className="capitalize">{user.role}</span>
        </div>
        <div>
          <strong>User ID:</strong> {user.id}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Bills</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 py-4">
                  No Bills Found
                </td>
              </tr>
            )}
            {bills.map((b) => (
              <tr key={b.id}>
                <td className="p-2">{b.amount}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
