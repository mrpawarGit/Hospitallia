import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";

export default function MedicalRecordDetails() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch the medical record
      const docSnap = await getDoc(doc(db, "medicalRecords", id));
      if (docSnap.exists()) setRecord({ id: docSnap.id, ...docSnap.data() });
      // Fetch all users (for name lookups)
      const userSnap = await getDocs(collection(db, "users"));
      setUsers(userSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    fetchData();
  }, [id]);

  const getUserLabel = (uid) => {
    const user = users.find((u) => u.id === uid);
    return user
      ? user.name
        ? `${user.name} (${user.email})`
        : user.email
      : uid;
  };

  if (!record) return <div className="p-8 text-center">Record not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Medical Record Details</h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <div className="mb-2">
          <strong>Patient:</strong> {getUserLabel(record.patientId)}
        </div>
        <div className="mb-2">
          <strong>Doctor:</strong> {getUserLabel(record.doctorId)}
        </div>
        <div className="mb-2">
          <strong>Date:</strong> {record.date}
        </div>
        <div className="mb-2">
          <strong>Notes:</strong>
          <pre>{record.notes}</pre>
        </div>
        <div className="mb-2">
          <strong>Prescription:</strong>
          <pre>{record.prescription || "-"}</pre>
        </div>
        <Link
          to="/medical-records"
          className="mt-4 inline-block text-blue-600 dark:text-blue-200 underline"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}
