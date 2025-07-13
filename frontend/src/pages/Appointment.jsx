import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { Id } = useParams();
  const { doctors, backendUrl, token, getDoctorData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === Id);
    setDocInfo(doc || null);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        currentDate.setHours(Math.max(now.getHours() + 1, 10));
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const isBooked =
          docInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Please log in to book an appointment.");
      return navigate("/login");
    }

    const selectedSlot = docSlots[slotIndex]?.find((s) => s.time === slotTime);
    if (!selectedSlot) {
      toast.error("Invalid slot selection.");
      return;
    }

    const date = selectedSlot.datetime;
    const slotDate = `${date.getDate()}_${
      date.getMonth() + 1
    }_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId: Id, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo();
  }, [doctors, Id]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return docInfo ? (
    <div className="w-full mt-14 flex flex-col items-center">
      {/* Doctor Info Card */}
      <div className="flex flex-col md:flex-row bg-blue-100 shadow-md rounded-xl p-6 w-[90vw] max-w-6xl mt-2">
        <img
          src={docInfo.image}
          alt="docImage"
          className="w-full md:w-1/3 h-56 md:h-64 object-scale-down object-center rounded-lg"
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
              <p className="text-gray-600">
                {docInfo.degree}, {docInfo.speciality}
              </p>
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                {docInfo.experience} years
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">About</h3>
            <p className="text-blue-700 mt-2">
              <span className="text-lg text-gray-500">Specialization: </span>
              {docInfo.speciality}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="text-lg text-gray-500">Description: </span>
              {docInfo.about}
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <p className="font-medium">Appointment Fee:</p>
            <p className="text-green-600 font-bold">{docInfo.fees} Rs</p>
          </div>
        </div>
      </div>

      {/* Booking Card */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-8 w-[90vw] max-w-6xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Booking Slots
        </h2>

        {/* Date Buttons */}
        <div className="flex gap-3 overflow-x-auto mb-6">
          {docSlots.map((slots, index) => {
            if (!slots || slots.length === 0 || !slots[0].datetime) return null;
            const day = slots[0].datetime;
            return (
              <button
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime("");
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                  slotIndex === index
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-blue-200 text-blue-900 border-blue-300"
                } hover:bg-blue-300`}
              >
                <div>{daysOfWeek[day.getDay()]}</div>
                <div>
                  {day.getDate()}/{day.getMonth() + 1}
                </div>
              </button>
            );
          })}
        </div>

        {/* Time Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {docSlots[slotIndex]?.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setSlotTime(slot.time)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                slot.time === slotTime
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-green-200 text-green-900 border-green-300"
              } hover:bg-green-300`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {slotTime && (
          <p className="text-sm text-gray-700 mb-4">
            Selected: <strong>{slotTime}</strong> on{" "}
            <strong>
              {docSlots[slotIndex]?.[0]?.datetime?.getDate()}/
              {docSlots[slotIndex]?.[0]?.datetime?.getMonth() + 1}
            </strong>
          </p>
        )}

        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={` mt-4 px-6 py-3 rounded-full text-sm font-semibold transition ${
            slotTime
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Book Appointment
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full mt-14 flex justify-center items-center min-h-[60vh]">
      <p className="text-gray-600 text-lg font-semibold">
        Loading doctor details...
      </p>
    </div>
  );
};

export default Appointment;
