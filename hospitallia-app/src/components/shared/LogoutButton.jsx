// src/components/shared/LogoutButton.jsx
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="text-sm px-3 py-1 cursor-pointer rounded-md transition-colors
                 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white
                 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-600"
    >
      Logout
    </button>
  );
};
export default LogoutButton;
