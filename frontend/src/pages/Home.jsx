import React from "react";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import TopDoctors from "../components/TopDoctors";

const Home = () => {
  scrollTo(0, 0);
  return (
    <div>
      <HeroSection />
      <TopDoctors />
    </div>
  );
};

export default Home;
