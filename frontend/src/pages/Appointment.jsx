import React, { useContext, useState } from "react";
import DocM1 from "../assets/doctors/DocM1.jpg";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Appointment = () => {
  scrollTo(0, 0);
  const navigate = useNavigate();
  const { doctors, slots, timeSlots } = useContext(AppContext);
  const { Id } = useParams();
  const docId = parseInt(Id);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const docInfo = doctors.find((doc) => doc.id === docId);
  // console.log(docInfo);
  // console.log("Id param:", Id);
  // console.log("Parsed docId:", docId);
  // console.log("Doctors array:", doctors);
  const relatedDocSpec = docInfo.specialty;
  const relatedDoctor = doctors
    .filter((doc) => doc.specialty === relatedDocSpec && doc.id !== docId)
    .slice(0, 4);

  return (
    <div className="w-full mt-14 flex flex-col items-center">
      <div className="flex flex-col md:flex-row bg-blue-100 shadow-md rounded-xl p-6 w-[90vw] max-w-6xl mt-2">
        <img
          src={docInfo.image}
          alt="docImage"
          className="w-full md:w-1/3 h-56 md:h-64 object-contain object-center rounded-lg"
        />
        <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              {docInfo.name}
              {docInfo.available ? (
                <span className="text-xs text-green-500 ml-3">(Available)</span>
              ) : (
                <span className="text-xs text-red-500 ml-3">
                  (Not Available)
                </span>
              )}
            </h1>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <p className="text-gray-600">MBBS, MPhil</p>
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                {docInfo.experience} Years of experience
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">About</h3>
            <p className="text-blue-700 mt-2">
              <span className="text-lg text-gray-500">Specialization : </span>
              {docInfo.specialty}
            </p>
            <p className="text-gray-700 mt-2">
              {" "}
              <span className="text-lg text-gray-500">Discription : </span>
              {docInfo.description}
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <p className="font-medium">Appointment Fee:</p>
            <p className="text-green-600 font-bold">{docInfo.fee} Rs</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 mt-8 w-[90vw] max-w-6xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Booking Slots
        </h2>

        <div className="flex flex-wrap gap-3 mb-4">
          {slots.map((value, index) => (
            <span
              key={index}
              onClick={() => setSelectedSlot(value)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium 
                ${
                  selectedSlot === value
                    ? "bg-blue-600 text-white"
                    : "bg-blue-200 text-blue-900"
                } 
                hover:bg-blue-300`}
            >
              {value}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          {timeSlots.map((value, index) => (
            <span
              key={index}
              onClick={() => setSelectedTimeSlot(value)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium 
                ${
                  selectedTimeSlot === value
                    ? "bg-green-600 text-white"
                    : "bg-green-200 text-green-900"
                } 
                hover:bg-green-300`}
            >
              {value}
            </span>
          ))}
        </div>

        {selectedSlot && selectedTimeSlot && (
          <p className="text-sm text-gray-700 mb-4">
            Selected: <strong>{selectedSlot}</strong> at{" "}
            <strong>{selectedTimeSlot}</strong>
          </p>
        )}

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Book Appointment
        </button>
      </div>

      <div className="mt-12 w-[90vw] max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Related Doctors
        </h2>
        <p className="text-gray-600 mb-6">
          You may also be interested in these Pediatricians.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedDoctor.map((doctor, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer mb-4"
              onClick={() => {
                navigate(`/appointment/${doctor.id}`);
              }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {doctor.name}{" "}
                  <span
                    className={`text-sm ${
                      doctor.available ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {doctor.available ? "(Available)" : "(Not Available)"}
                  </span>
                </h3>
                <p className="text-sm text-blue-600 mt-1">{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
