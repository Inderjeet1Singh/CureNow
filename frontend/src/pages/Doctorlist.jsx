import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContextProvider, { AppContext } from "../context/AppContext";
const Doctorlist = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState("All");
  const [whichFilterClicked, setWhichFilterClicked] = useState("All");
  const filterDoctorsList =
    filter === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.specialty === filter);

  const handleClicked = (value) => {
    if (whichFilterClicked === value) {
      setFilter("All");
      setWhichFilterClicked("All");
    } else {
      setFilter(value);
      setWhichFilterClicked(value);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen pt-14">
      <header className="bg-gray-100 border-b-2 border-gray-200 px-4 py-4">
        <div className="flex md:hidden justify-between items-center pt-2">
          <p className="text-gray-700 px-4 py-2 font-semibold">Filter</p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-700 border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2 hover:bg-blue-200 transition"
          >
            {showFilters ? "Hide" : "Show"}
          </button>
        </div>

        <div className="hidden md:flex flex-row justify-around flex-wrap gap-4 mt-4">
          <p className="text-gray-700 px-4 py-2 font-semibold">Filter</p>
          <p
            onClick={() => handleClicked("All")}
            className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
              whichFilterClicked === "All" && filter === "All"
                ? "bg-blue-500"
                : ""
            }`}
          >
            All
          </p>
          <p
            onClick={() => handleClicked("Neurologist")}
            className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
              whichFilterClicked === "Neurologist" && filter === "Neurologist"
                ? "bg-blue-500"
                : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() => handleClicked("Cardiologist")}
            className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
              whichFilterClicked === "Cardiologist" && filter === "Cardiologist"
                ? "bg-blue-500"
                : ""
            }`}
          >
            Cardiologist
          </p>
          <p
            onClick={() => handleClicked("Dermatology")}
            className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
              whichFilterClicked === "Dermatology" && filter === "Dermatology"
                ? "bg-blue-500"
                : ""
            }`}
          >
            Dermatology
          </p>
          <p
            onClick={() => handleClicked("Gastroenterology")}
            className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
              whichFilterClicked === "Gastroenterology" &&
              filter === "Gastroenterology"
                ? "bg-blue-500"
                : ""
            }`}
          >
            Gastroenterology
          </p>
          <p
            onClick={() => handleClicked("Neurology")}
            className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
              whichFilterClicked === "Neurology" && filter === "Neurology"
                ? "bg-blue-500"
                : ""
            }`}
          >
            Neurology
          </p>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-2 mt-4 md:hidden">
            <p
              onClick={() => handleClicked("All")}
              cclassName={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2 ${
                whichFilterClicked === "All" && filter === "All"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              All
            </p>
            <p
              onClick={() => handleClicked("Neurologist")}
              className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
                whichFilterClicked === "Neurologist" && filter === "Neurologist"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              Neurologist
            </p>
            <p
              onClick={() => handleClicked("Cardiologist")}
              className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
                whichFilterClicked === "Cardiologist" &&
                filter === "Cardiologist"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              Cardiologist
            </p>
            <p
              onClick={() => handleClicked("Dermatology")}
              className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
                whichFilterClicked === "Dermatology" && filter === "Dermatology"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              Dermatology
            </p>
            <p
              onClick={() => handleClicked("Gastroenterology")}
              className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2  ${
                whichFilterClicked === "Gastroenterology" &&
                filter === "Gastroenterology"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              Gastroenterology
            </p>
            <p
              onClick={() => handleClicked("Neurology")}
              className={`text-gray-700 cursor-pointer border-2 border-blue-300 rounded-md bg-blue-100 px-4 py-2 ${
                whichFilterClicked === "Neurology" && filter === "Neurology"
                  ? "bg-blue-500"
                  : ""
              }`}
            >
              Neurology
            </p>
          </div>
        )}
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filterDoctorsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {filterDoctorsList.map((doctor, index) => (
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
                  className="w-full h-56 object-contain"
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
                      {doctor.specialty}{" "}
                      <span className="ml-6 text-gray-400 text-xs">
                        {doctor.view} view
                      </span>
                    </p>
                    <p className="text-gray-600 text-sm">
                      {doctor.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh] text-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                No Doctors Found
              </h2>
              <p className="text-lg text-gray-600">
                Try selecting a different specialty or check back later.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Doctorlist;
