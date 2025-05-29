import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import logo from "./assets/Logo.png";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Doctorlist from "./pages/Doctorlist";
import TopDoctors from "./pages/TopDoctors";
import HeroSection from "./components/HeroSection";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/doctor-list" element={<Doctorlist />}></Route>
        <Route path="/top-doctors" element={<TopDoctors />}></Route>
      </Routes>

    </>
  );
}
export default App;
