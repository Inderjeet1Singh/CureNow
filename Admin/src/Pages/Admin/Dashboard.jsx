import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { aToken, cancelAppointment, getDashboardData, dashboardData } =
    useContext(AdminContext);

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
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Doctors */}
        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-blue-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Total Doctors</h2>
            <p className="text-2xl font-semibold text-blue-700">
              {dashboardData.NumberOfDoc}
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor"
            className="w-12 h-12"
          />
        </div>

        {/* Users */}
        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-green-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Total Users</h2>
            <p className="text-2xl font-semibold text-green-700">
              {dashboardData.NumberOfUser}
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="w-12 h-12"
          />
        </div>

        {/* Appointments */}
        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-purple-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Appointments</h2>
            <p className="text-2xl font-semibold text-purple-700">
              {dashboardData.NumberOfappointments}
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
            alt="Appointment"
            className="w-12 h-12"
          />
        </div>

        {/* Active Appointments */}
        <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-indigo-500 flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 text-sm">Active Appointments</h2>
            <p className="text-2xl font-semibold text-indigo-700">
              {dashboardData.activeAppointments}
            </p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
            alt="Active"
            className="w-12 h-12"
          />
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Latest Appointments
        </h3>
        <ul className="divide-y divide-gray-200">
          {dashboardData.latestAppointmenst.map((appointment) => (
            <li
              key={appointment._id}
              className="py-3 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {appointment.userData.name}
                </p>
                <p className="text-sm text-gray-500">
                  {`${appointment.slotDate.split("_")[0]} ${
                    month[parseInt(appointment.slotDate.split("_")[1]) - 1]
                  } ${appointment.slotDate.split("_")[2]} at ${
                    appointment.slotTime
                  }`}
                </p>
              </div>
              {appointment.cancelled ? (
                <span className="text-sm text-red-600 font-semibold">
                  Cancelled
                </span>
              ) : (
                <span className="text-sm text-green-600 font-semibold">
                  Active
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
