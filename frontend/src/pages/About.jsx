import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const About = () => {
  const { AboutUsImg } = useContext(AppContext);
  return (
    <div className="mt-20 w-full flex justify-center px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          About Us
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={AboutUsImg}
              alt="About Us"
              className="w-full max-w-sm h-auto object-contain rounded-lg border"
            />
          </div>
          <div className="w-full lg:w-1/2 text-gray-700 space-y-4">
            <p>
              Welcome to our CureNow! We are dedicated to providing exceptional
              healthcare services tailored for your family's well-being. With a
              team of experienced specialists and modern facilities, we ensure
              comfort and care every step of the way.
            </p>
            <p>
              Our goal is to foster a supportive and compassionate environment
              where patients of all ages feel respected and valued. We combine
              medical expertise with a personal touch to deliver quality
              outcomes.
            </p>
            <p>
              Trust, transparency, and treatment excellence are the pillars that
              guide our work every day.
            </p>
            <h3 className="text-xl text-blue-600 font-semibold mt-6">
              Our Vision
            </h3>
            <p>
              To be a community-first healthcare provider where every patient
              receives timely, respectful, and personalized medical attention —
              ensuring lifelong health and trust.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-800">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Experienced Professionals
            </h3>
            <p>
              Our team consists of highly qualified doctors with years of
              experience in various specialties, ensuring expert diagnosis and
              care.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Patient-Centered Approach
            </h3>
            <p>
              We listen to our patients, involve them in every decision, and
              offer care that fits their unique needs, lifestyles, and values.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Advanced Facilities
            </h3>
            <p>
              Equipped with state-of-the-art medical tools and a modern,
              comfortable environment to support both urgent care and routine
              visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
