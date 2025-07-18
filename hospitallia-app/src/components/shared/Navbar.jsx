import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/signup" },
    // Add more links like Dashboard, Patients, etc. as you build more pages
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand/logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Hospitallia
        </Link>
        {/* Navigation links */}
        <div className="space-x-6">
          {navLinks.map((link) => (
            <Link
              className={`text-gray-600 hover:text-blue-600 font-medium transition ${
                pathname === link.path ? "text-blue-700 font-semibold" : ""
              }`}
              to={link.path}
              key={link.path}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
