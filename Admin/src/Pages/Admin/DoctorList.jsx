import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { doctors, getAllDoctors, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
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
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        checked={doctor.available}
                        className="w-4 h-4 accent-green-600 cursor-default"
                      />
                      <span
                        className={`text-sm font-medium ${
                          doctor.available ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {doctor.available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-3">
                    {doctor.speciality}{" "}
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
            <p className="text-lg text-gray-600">Try later.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorList;
