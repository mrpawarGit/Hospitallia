import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // make sure this path is correct!
import LogoutButton from "./LogoutButton"; // Optional, if you added the Logout component

const Navbar = () => {
  const { currentUser, role } = useAuth();

  // Determine dashboard link based on role
  let dashboardPath = "/";
  if (role === "admin") dashboardPath = "/admin";
  else if (role === "doctor") dashboardPath = "/doctor";
  else if (role === "staff") dashboardPath = "/staff";
  else if (role === "patient") dashboardPath = "/patient";

  return (
    <nav className="bg-white shadow-md mb-4">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand/logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Hospitallia
        </Link>
        {/* Navigation links */}
        <div className="space-x-6 flex items-center">
          {!currentUser ? (
            // Not logged in: Show Login/Signup
            <>
              <Link className="text-gray-600 hover:text-blue-700" to="/login">
                Login
              </Link>
              <Link className="text-gray-600 hover:text-blue-700" to="/signup">
                Sign Up
              </Link>
            </>
          ) : (
            // Logged in: Show Dashboard/Profile/Logout
            <>
              <Link
                className="text-gray-600 hover:text-blue-700"
                to={dashboardPath}
              >
                Dashboard
              </Link>
              {/* You can add a profile/settings link here if you want */}
              <span className="text-sm text-gray-400">
                {role && `(${role.charAt(0).toUpperCase() + role.slice(1)})`}
              </span>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
