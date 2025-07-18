import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { currentUser, role } = useAuth();

  let dashboardPath = "/";
  if (role === "admin") dashboardPath = "/admin";
  else if (role === "doctor") dashboardPath = "/doctor";
  else if (role === "staff") dashboardPath = "/staff";
  else if (role === "patient") dashboardPath = "/patient";

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md mb-4 transition-colors">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-gray-100"
        >
          Hospitallia
        </Link>
        <div className="space-x-6 flex items-center">
          <Link
            className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
            to="/"
          >
            Home
          </Link>
          {!currentUser ? (
            <>
              <Link
                className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                to={dashboardPath}
              >
                Dashboard
              </Link>
              <span className="text-sm text-gray-400 dark:text-gray-300">
                {role && `(${role.charAt(0).toUpperCase() + role.slice(1)})`}
              </span>
              <LogoutButton />
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
