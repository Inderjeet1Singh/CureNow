import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const DocDashboard = () => {
  const navigate = useNavigate();
  const { dashBoardData, getDashBoardData, dToken } = useContext(DoctorContext);

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
      getDashBoardData();
    } else {
      navigate("/login");
    }
  }, [dToken]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Doctor Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Total Appointments</h2>
            <p className="text-2xl font-semibold text-blue-700">
              {dashBoardData?.appointments || 0}
            </p>
          </div>
          <img
            src="https://images.icon-icons.com/1690/PNG/512/3943417-appointment-calendar-christmas-date-day-time-xmas_111609.png"
            alt="Appointments"
            className="w-12 h-12"
          />
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-green-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Total Patients</h2>
            <p className="text-2xl font-semibold text-green-700">
              {dashBoardData?.numberOfPatient || 0}
            </p>
          </div>
          <img
            src="https://images.icon-icons.com/2266/PNG/512/patient_icon_140481.png"
            alt="Patients"
            className="w-12 h-12"
          />
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-purple-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Total Earnings</h2>
            <p className="text-2xl font-semibold text-purple-700">
              ₹{dashBoardData?.earning || 0}
            </p>
          </div>
          <img
            src="https://images.icon-icons.com/2355/PNG/512/pay_cash_payment_money_dollar_bill_icon_143267.png"
            alt="Earning"
            className="w-12 h-12"
          />
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-indigo-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Latest Appointments</h2>
            <p className="text-2xl font-semibold text-indigo-700">
              {dashBoardData?.latestAppointments?.length || 0}
            </p>
          </div>
          <img
            src="https://images.icon-icons.com/4216/PNG/512/marketing_event_finance_appointment_management_business_icon_263069.png"
            alt="Recent Appointments"
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Appointments
        </h3>

        {dashBoardData?.latestAppointments?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {dashBoardData.latestAppointments.map((appointment, index) => {
              const [day, monthNum, year] = appointment.slotDate.split("_");
              const formattedDate = `${day} ${
                month[parseInt(monthNum) - 1]
              } ${year}`;

              return (
                <li
                  key={appointment._id}
                  className="py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {appointment.userData?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formattedDate} at {appointment.slotTime}
                    </p>
                  </div>

                  {appointment.cancelled ? (
                    <span className="text-sm font-semibold text-red-600">
                      Cancelled
                    </span>
                  ) : appointment.isCompleted ? (
                    <span className="text-sm font-semibold text-green-600">
                      Completed
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-green-600">
                      Active
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No appointments yet.</p>
        )}
      </div>
    </div>
  );
};

export default DocDashboard;
