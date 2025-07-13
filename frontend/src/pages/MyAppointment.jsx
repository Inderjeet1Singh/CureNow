import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaCreditCard, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MyAppointment = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [myAppointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDate = (slotDate) => {
    const date = slotDate.split("_");
    return date[0] + " " + month[parseInt(date[1]) - 1] + " " + date[2];
  };
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/my-appointment",
        { headers: { token } }
      );
      if (data.success) {
        // console.log("MyAppointments:", data.myAppointments);
        const appointmentsWithNotCancelled = data.myAppointments.filter(
          (appointment) => !appointment.cancelled
        );
        setAppointments(appointmentsWithNotCancelled.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch myAppointments.");
      console.error(error);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      // console.log("Cancel response:", data);
      if (data.success) {
        console.log("Appointment cancelled:", appointmentId);
        toast.success(data.message);
        getAppointments();
      } else {
        console.error("Cancellation error:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      getAppointments();
    } else {
      toast.warning("Please log in to view your myAppointments.");
      navigate("/login");
    }
  }, [token]);
  if (!myAppointments || myAppointments.length === 0) {
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
        Booked myAppointments
      </h1>

      {myAppointments.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full max-w-3xl bg-white shadow-lg border border-gray-200 rounded-xl p-5 sm:p-6 mb-8 
            hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          <img
            src={item.docData.image}
            alt={item.docData.name}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-300 flex-shrink-0"
          />

          <div className="flex flex-col gap-2 text-gray-800 w-full">
            <p className="text-xl sm:text-2xl font-semibold">
              {item.docData.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              {item.docData.speciality}
            </p>

            <div className="text-xs sm:text-sm text-gray-700 mt-2 leading-tight">
              <p className="font-medium mb-1">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
            </div>

            <p className="text-xs sm:text-sm mt-3">
              <span className="font-medium">Date & Time:</span>{" "}
              <span className="text-blue-700 font-semibold">
                {formatDate(item.slotDate)}
              </span>{" "}
              at{" "}
              <span className="text-blue-700 font-semibold">
                {item.slotTime}
              </span>
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                className="flex justify-center items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                aria-label="Pay Online"
              >
                <FaCreditCard /> Pay Online
              </button>
              <button
                onClick={() => cancelAppointment(item._id)}
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
