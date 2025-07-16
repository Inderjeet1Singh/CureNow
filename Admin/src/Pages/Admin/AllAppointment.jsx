import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const AllAppointment = () => {
  const navigate = useNavigate();
  const {
    aToken,
    appointments,
    getAllAppointments,
    calculateAge,
    cancelAppointment,
  } = useContext(AdminContext);
  const months = [
    "",
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
    if (aToken) {
      getAllAppointments();
    } else {
      navigate("/admin/login");
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        All Appointments
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Patient</th>
              <th className="py-3 px-4 border-b text-left">Age</th>
              <th className="py-3 px-4 border-b text-left">Date & Time</th>
              <th className="py-3 px-4 border-b text-left">Doctor</th>
              <th className="py-3 px-4 border-b text-left">Fees</th>
              <th className="py-3 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appt, index) => {
                const patientName = appt?.userData?.name || "N/A";
                const patientImg = appt?.userData?.image || "";
                const dob = new Date(appt?.userData?.dob);
                const age = calculateAge(dob);
                const docName = appt?.docData?.name || "N/A";
                const docImg = appt?.docData?.image || "";
                const date = `${appt.slotDate.split("_")[0]} ${
                  months[parseInt(appt.slotDate.split("_")[1])]
                } ${appt.slotDate.split("_")[2]}`;
                const time = appt?.slotTime || "--";
                const fees = appt?.amount || "--";
                const cancelled = appt?.cancelled;

                return (
                  <tr
                    key={appt._id}
                    className="hover:bg-gray-100 transition-all"
                  >
                    <td className="py-3 px-4 border-b">{index + 1}</td>

                    <td className="py-3 px-4 border-b">
                      <div className="flex items-center gap-2">
                        {patientImg && (
                          <img
                            src={patientImg}
                            alt="Patient"
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                        )}
                        <span>{patientName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 border-b">
                      {age ? age : "Not Mentioned"}
                    </td>

                    <td className="py-3 px-4 border-b">
                      {date} at {time}
                    </td>

                    <td className="py-3 px-4 border-b">
                      <div className="flex items-center gap-2">
                        {docImg && (
                          <img
                            src={docImg}
                            alt="Doctor"
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                        )}
                        <span>{docName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 border-b">₹{fees}</td>

                    <td className="py-3 px-4 border-b">
                      {cancelled ? (
                        <span className="text-red-500 font-semibold">
                          Cancelled
                        </span>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                          onClick={() => {
                            cancelAppointment(appt._id);
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointment;
