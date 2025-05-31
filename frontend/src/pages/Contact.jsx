import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Contact = () => {
  const { ContactUsImg } = useContext(AppContext);

  return (
    <div className="mt-20 w-full flex justify-center px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Contact Us
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={ContactUsImg}
              alt="Contact Us"
              className="w-full max-w-sm h-auto object-contain rounded-lg border"
            />
          </div>
          <div className="w-full lg:w-1/2 text-gray-700 space-y-4">
            <p>
              Have questions or need help? We’re here to support you with the
              care and information you need. Reach out to us anytime through the
              channels below.
            </p>

            <div className="mt-4">
              <h3 className="text-xl text-blue-600 font-semibold mb-2 flex items-center gap-2">
                <CiMail size={20} />
                Email Us
              </h3>
              <ul className="list-disc list-inside text-gray-800 ml-2">
                <li>support@curenow.com</li>
                <li>helpdesk@curenow.com</li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-xl text-blue-600 font-semibold mb-2 flex items-center gap-2">
                <FaPhoneAlt size={16} />
                Customer Care
              </h3>
              <ul className="list-disc list-inside text-gray-800 ml-2">
                <li>+91 98765 43210</li>
                <li>+91 91234 56789</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              We aim to respond within 24 hours on business days.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Visit Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          CureNow Health Center, 123 Wellness Street, New Delhi, India – 110001
        </p>
      </div>
    </div>
  );
};

export default Contact;
