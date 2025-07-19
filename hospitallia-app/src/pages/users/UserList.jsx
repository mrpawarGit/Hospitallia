import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getDocs(collection(db, "users")).then((snap) =>
      setUsers(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  const handleRoleChange = async (id, role) => {
    if (window.confirm(`Change role of user to ${role}?`)) {
      await updateDoc(doc(db, "users", id), { role });
      setUsers((users) => users.map((u) => (u.id === id ? { ...u, role } : u)));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b dark:border-gray-700">
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="border px-2 rounded"
                >
                  <option>admin</option>
                  <option>doctor</option>
                  <option>staff</option>
                  <option>patient</option>
                </select>
              </td>
              <td className="p-2">
                <Link
                  to={`/users/${u.id}`}
                  className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
