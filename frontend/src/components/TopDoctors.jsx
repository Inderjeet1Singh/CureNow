import React from "react";
import DocM1 from "../assets/doctors/DocM1.jpg";
import DocM2 from "../assets/doctors/DocM2.jpg";
import DocM3 from "../assets/doctors/DocM3.jpg";
import DocF1 from "../assets/doctors/DocF1.jpg";
import DocF2 from "../assets/doctors/DocF2.jpg";
import DocF3 from "../assets/doctors/DocF3.jpg";
const doctors = [
  {
    name: "Dr. Seema Patel",
    specialty: "Cardiologist",
    description:
      "Expert in treating heart conditions and promoting cardiovascular health.",
    image: DocF1,
  },
  {
    name: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    description:
      "Specializes in treating diseases of the brain and nervous system.",
    image: DocM1,
  },
  {
    name: "Dr. Anjali Verma",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocF2,
  },
  {
    name: "Dr.Priya Sharma",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocF3,
  },
  {
    name: "Dr. Aarav Singh",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocM2,
  },
  {
    name: "Dr. Naveen Gupta",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocM3,
  },
];

const TopDoctors = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex items-center justify-center h-24 bg-gray-100 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Top Doctors</h1>
      </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Meet Our Experts</h2>
          <a
            href="/doctor-list"
            className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition"
          >
            View All Doctors
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-600 mb-3">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.description}</p>
                </div>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block text-blue-600 font-bold uppercase text-sm hover:underline"
                  >
                    View Profile
                  </a>
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
