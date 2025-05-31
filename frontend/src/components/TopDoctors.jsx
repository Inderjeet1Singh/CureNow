import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContextProvider, { AppContext } from "../context/AppContext";
const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const topDoctors = doctors.sort((a, b) => b.view - a.view).slice(0, 6);
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex items-center justify-center h-24 bg-gray-100 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Top Doctors</h1>
      </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Meet Our Experts</h2>
          <Link
            to="/doctor-list"
            className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition"
          >
            View All Doctors
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topDoctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
              onClick={() => {
                navigate(`/appointment/${doctor.id}`);
              }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {doctor.name}{" "}
                    <span
                      className={`text-xs ${
                        doctor.available ? "text-green-500" : "text-red-500"
                      } `}
                    >
                      {doctor.available ? "(Available)" : "(Not Available)"}
                    </span>
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-3">
                    {doctor.specialty}
                    <span className="ml-6 text-gray-400 text-xs">
                      {doctor.view} view
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopDoctors;
