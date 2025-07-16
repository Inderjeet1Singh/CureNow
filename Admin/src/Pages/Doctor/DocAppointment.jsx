import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { GiMoneyStack } from "react-icons/gi";
const DocAppointment = () => {
  const navigate = useNavigate();
  const {
    dToken,
    getAllAppoinments,
    appointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

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

  useEffect(() => {
    if (dToken) {
      getAllAppoinments();
    } else {
      navigate("/login");
    }
  }, [dToken]);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const currYear = new Date().getFullYear();
    const birthYear = dob.split("-")[0];
    return currYear - birthYear;
  };

  return appointments ? (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Appointments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Patient</th>
              <th className="py-3 px-4 border-b text-left">Payment</th>
              <th className="py-3 px-4 border-b text-left">Age</th>
              <th className="py-3 px-4 border-b text-left">Date & Time</th>
              <th className="py-3 px-4 border-b text-left">Fee</th>
              <th className="py-3 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => {
              const user = appt.userData;
              const isPaid = appt.payment;
              const age = calculateAge(user.dob);
              const [day, monthIndex, year] = appt.slotDate?.split("_") || [];
              const dateStr = `${day} ${
                month[parseInt(monthIndex) - 1]
              } ${year}`;
              const timeStr = appt.slotTime;
              const patientImg = user?.image || "";
              const patientName = user?.name || "N/A";

              return (
                <tr
                  key={appt._id}
                  className="hover:bg-gray-200 transition-all duration-400"
                >
                  <td className="py-3 px-4 border-b">{index + 1}</td>

                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center gap-3">
                      {patientImg && (
                        <img
                          src={patientImg}
                          alt="patient"
                          className="w-8 h-8 rounded-full border object-cover"
                        />
                      )}
                      <span>{patientName}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 border-b">
                    {isPaid ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-gray-500 font-medium flex items-center">
                        <GiMoneyStack />
                        Cash
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 border-b">
                    {age ? age : "Not Mentioned"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {dateStr} at {timeStr}
                  </td>
                  <td className="py-3 px-4 border-b">₹{appt.amount}</td>

                  <td className="py-3 px-4 border-b">
                    {!appt.isCompleted && !appt.cancelled ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => cancelAppointment(appt._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded transition-all duration-200 w-24 text-center"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => completeAppointment(appt._id)}
                          className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded transition-all duration-200 w-24 text-center"
                        >
                          Complete
                        </button>
                      </div>
                    ) : appt.isCompleted ? (
                      <span className="text-green-700 font-semibold">
                        Completed
                      </span>
                    ) : (
                      <span className="text-red-700 font-semibold">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-600 py-10">
      Loading appointments...
    </div>
  );
};

export default DocAppointment;
