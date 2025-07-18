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
      className="text-red-600 font-semibold ml-2 cursor-pointer"
    >
      Logout
    </button>
  );
};
export default LogoutButton;
