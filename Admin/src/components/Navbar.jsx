import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };
  return (
    <nav className="bg-green-100 shadow-sm w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Logo (left) */}
        <Link
          to={"/"}
          className="flex-shrink-0 text-blue-600 text-2xl font-bold"
        >
          CureNow{" "}
          <span className="text-xs text-gray-500 font-medium">
            {aToken ? "Admin" : "Doctor"} Panel
          </span>
        </Link>
        {aToken ? (
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-12">
            <Link
              to="/admin-dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/all-appointments"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Appointments
            </Link>
            <Link
              to="/doctor-list"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Doctors-List
            </Link>
            <Link
              to="/add-doctor"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Add-Doctors
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-12">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/appointments"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Appointments
            </Link>
          </div>
        )}
        {/* Centered Links */}

        {/* Logout (right) */}
        <div className="hidden md:block">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {aToken ? (
              <>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/appointments"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Appointments
                </Link>
                <Link
                  to="/doctor-list"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Doctors-List
                </Link>
                <Link
                  to="/add-doctor"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Doctor
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/appointments"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Appointments
                </Link>
              </>
            )}

            <button
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
