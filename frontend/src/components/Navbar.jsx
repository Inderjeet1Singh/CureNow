import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { HiMenu } from "react-icons/hi";
import AppContextProvider, { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isClick, setIsClick] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setToken(!token);
    navigate("/login");
  };
  return (
    <div className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-9" alt="CureNow Logo" />
        </Link>

        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse items-center">
          {token ? (
            <button
              onClick={() => handleButtonClick()}
              className=" hidden md:inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleButtonClick()}
              className="hidden md:inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Started
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 text-gray-600 md:hidden hover:text-blue-700 focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <HiMenu className="w-6 h-6" />
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => {
                  setIsClick("Home");
                  setIsMenuOpen(false);
                }}
                className={`block py-2 px-3 ${
                  isClick === "Home" ? "text-blue-600" : "text-gray-600"
                } md:p-0`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/doctor-list"
                onClick={() => {
                  setIsClick("Doctor List");
                  setIsMenuOpen(false);
                }}
                className={`block py-2 px-3 ${
                  isClick === "Doctor List" ? "text-blue-600" : "text-gray-600"
                } md:p-0`}
              >
                Doctor List
              </Link>
            </li>
            {token ? (
              <>
                {" "}
                <li>
                  <Link
                    to="/my-profile"
                    onClick={() => {
                      setIsClick("My-Profile");
                      setIsMenuOpen(false);
                    }}
                    className={`block py-2 px-3 ${
                      isClick === "My-Profile"
                        ? "text-blue-600"
                        : "text-gray-600"
                    } md:p-0`}
                  >
                    My-Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-appointment"
                    onClick={() => {
                      setIsClick("My-Appointments");
                      setIsMenuOpen(false);
                    }}
                    className={`block py-2 px-3 ${
                      isClick === "My-Appointments"
                        ? "text-blue-600"
                        : "text-gray-600"
                    } md:p-0`}
                  >
                    My-Appointments
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}

            <li>
              <Link
                to="/about"
                onClick={() => {
                  setIsClick("About Us");
                  setIsMenuOpen(false);
                }}
                className={`block py-2 px-3 ${
                  isClick === "About Us" ? "text-blue-600" : "text-gray-600"
                } md:p-0`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => {
                  setIsClick("Contact");
                  setIsMenuOpen(false);
                }}
                className={`block py-2 px-3 ${
                  isClick === "Contact" ? "text-blue-600" : "text-gray-600"
                } md:p-0`}
              >
                Contact
              </Link>
            </li>

            <li className="block md:hidden mt-2 px-3">
              {/* {console.log(token)} */}
              {token ? (
                <button
                  onClick={() => handleButtonClick()}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => handleButtonClick()}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get Started
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
