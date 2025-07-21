import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

  const handleDelete = async (id, email, role) => {
    if (role === "admin") return;
    if (window.confirm(`Delete user ${email}? This cannot be undone.`)) {
      await deleteDoc(doc(db, "users", id));
      setUsers((users) => users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name / Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {u.name ? `${u.name} (${u.email})` : u.email}
                </th>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="border px-2 py-1 rounded bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
                  >
                    <option>admin</option>
                    <option>doctor</option>
                    <option>staff</option>
                    <option>patient</option>
                  </select>
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <Link
                    to={`/users/${u.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Details
                  </Link>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(u.id, u.email, u.role)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
