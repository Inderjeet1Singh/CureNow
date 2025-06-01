import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-gray-400">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          {["Home", "About", "Contact", "Terms"].map((item) => (
            <div className="px-5 py-2" key={item}>
              <Link
                to={item === "Home" || item === "Terms" ? "/" : `/${item}`}
                className="text-base leading-6 text-black hover:text-gray-900"
              >
                {item}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex justify-center mt-8 space-x-6 text-black">
          <Link to="#" className="hover:text-gray-500" aria-label="Facebook">
            <FaFacebook className="w-6 h-6" />
          </Link>
          <Link to="/" className="hover:text-gray-500" aria-label="Instagram">
            <FaInstagram className="w-6 h-6" />
          </Link>
          <Link to="/" className="hover:text-gray-500" aria-label="Twitter">
            <FaTwitter className="w-6 h-6" />
          </Link>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-black">
          © 2025 CureNow, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
