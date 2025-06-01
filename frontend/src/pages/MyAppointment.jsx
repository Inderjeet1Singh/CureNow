import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaCreditCard, FaTimesCircle } from "react-icons/fa";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  if (!doctors || doctors.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            No Appointment Found
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Book an appointment or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-8 sm:mb-10">
        Booked Appointments
      </h1>

      {doctors.slice(0, 3).map((doc, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full max-w-3xl bg-white shadow-lg border border-gray-200 rounded-xl p-5 sm:p-6 mb-8 
            hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          <img
            src={doc.image}
            alt={doc.name}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-300 flex-shrink-0"
          />

          <div className="flex flex-col gap-2 text-gray-800 w-full">
            <p className="text-xl sm:text-2xl font-semibold">{doc.name}</p>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              {doc.speciality}
            </p>

            <div className="text-xs sm:text-sm text-gray-700 mt-2 leading-tight">
              <p className="font-medium mb-1">Address:</p>
              <p>{doc.address.line1}</p>
              <p>{doc.address.line2}</p>
            </div>

            <p className="text-xs sm:text-sm mt-3">
              <span className="font-medium">Date & Time:</span>{" "}
              <span className="text-blue-700 font-semibold">12/12/25</span> at{" "}
              <span className="text-blue-700 font-semibold">09:30 AM</span>
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                className="flex justify-center items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                aria-label="Pay Online"
              >
                <FaCreditCard /> Pay Online
              </button>
              <button
                className="flex justify-center items-center gap-2 px-5 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                aria-label="Cancel Appointment"
              >
                <FaTimesCircle /> Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointment;
