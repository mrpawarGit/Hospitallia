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

  // Helper: only show these links for staff/admin
  const canSeeBilling = role === "admin" || role === "staff";
  const canSeePatients = role === "admin" || role === "staff";
  const canSeeAppointments =
    role === "admin" || role === "staff" || role === "doctor";
  const canSeeMedicalRecords = !!role; // all logged-in roles
  const canSeeUserManagement = role === "admin";

  // Only show "Profile" for logged in user
  const showProfile = !!currentUser;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md mb-4 transition-colors">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-gray-100"
        >
          Hospitallia
        </Link>
        <div className="space-x-4 flex items-center flex-wrap">
          <Link
            className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
            to="/"
          >
            Home
          </Link>
          {currentUser ? (
            <>
              <Link
                className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                to={dashboardPath}
              >
                Dashboard
              </Link>
              {canSeePatients && (
                <Link
                  className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                  to="/patients"
                >
                  Patients
                </Link>
              )}
              {canSeeAppointments && (
                <Link
                  className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                  to="/appointments"
                >
                  Appointments
                </Link>
              )}
              {canSeeMedicalRecords && (
                <Link
                  className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                  to="/medical-records"
                >
                  Medical Records
                </Link>
              )}
              {canSeeBilling && (
                <Link
                  className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                  to="/billing"
                >
                  Billing
                </Link>
              )}
              {canSeeUserManagement && (
                <Link
                  className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                  to="/users"
                >
                  Users
                </Link>
              )}
              {showProfile && (
                <Link
                  className="text-gray-600 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300"
                  to="/profile"
                >
                  Profile
                </Link>
              )}
              <span className="text-sm text-gray-400 dark:text-gray-300">
                {role && `(${role.charAt(0).toUpperCase() + role.slice(1)})`}
              </span>
              <LogoutButton />
            </>
          ) : (
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
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
