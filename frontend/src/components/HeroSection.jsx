import React from "react";
import heroImage from "../assets/HeroImages/HeroImage4.png";
const HeroSection = () => {
  return (
    <div className=" pt-10 h-auto w-full">
      <div class="bg-blue-400">
        <div class="relative mx-auto mt-4 md:mt-8">
          <div class="lg:max-w-4xl lg:mx-auto">
            <img class="px-4 md:mpx-8 w-full object-cover " src={heroImage} />
          </div>
        </div>
      </div>
      <section class="pt-12 bg-gray-100 sm:pt-16">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="text-center">
            <p class="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
              🩺 Instant Doctor Appointment Booking
            </p>
            <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
              Book appointments with trusted doctors anytime, anywhere. CureNow
              makes healthcare access simple, fast, and stress-free — right when
              you need it.
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
