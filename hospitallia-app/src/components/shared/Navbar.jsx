import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const Navbar = () => {
  const { currentUser, role } = useAuth();
  const location = useLocation();

  let dashboardPath = "/";
  if (role === "admin") dashboardPath = "/admin";
  else if (role === "doctor") dashboardPath = "/doctor";
  else if (role === "staff") dashboardPath = "/staff";
  else if (role === "patient") dashboardPath = "/patient";

  const canSeeBilling = role === "admin" || role === "staff";
  const canSeePatients = role === "admin" || role === "staff";
  const canSeeAppointments =
    role === "admin" || role === "staff" || role === "doctor";
  const canSeeMedicalRecords = !!role;
  const canSeeUserManagement = role === "admin";
  const showProfile = !!currentUser;

  // Prepare tab items based on role
  const tabs = [{ label: "Home", path: "/" }];

  if (currentUser) {
    tabs.push({ label: "Dashboard", path: dashboardPath });
    if (canSeePatients) tabs.push({ label: "Patients", path: "/patients" });
    if (canSeeAppointments)
      tabs.push({ label: "Appointments", path: "/appointments" });
    if (canSeeMedicalRecords)
      tabs.push({ label: "Medical Records", path: "/medical-records" });
    if (canSeeBilling) tabs.push({ label: "Billing", path: "/billing" });
    if (canSeeUserManagement) tabs.push({ label: "Users", path: "/users" });
    if (showProfile) tabs.push({ label: "Profile", path: "/profile" });
  } else {
    tabs.push({ label: "Login", path: "/login" });
    tabs.push({ label: "Sign Up", path: "/signup" });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Hospitallia
        </Link>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Chip-style nav tabs */}
          <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-900 px-2 py-1 rounded-xl">
            {tabs.map((tab) => {
              const selected = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`relative text-sm px-3 py-1 rounded-md transition-colors ${
                    selected
                      ? "text-white"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {selected && (
                    <motion.span
                      layoutId="pill-nav"
                      transition={{ type: "spring", duration: 0.4 }}
                      className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Role badge + Logout + Theme toggle */}
          {currentUser && (
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({role?.charAt(0).toUpperCase() + role?.slice(1)})
            </span>
          )}
          {currentUser && <LogoutButton />}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
