import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import AllAppointment from "./Pages/Admin/AllAppointment";
import AddDoctor from "./Pages/Admin/AddDoctor";
import DoctorList from "./Pages/Admin/DoctorList";
const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/all-appointments" element={<AllAppointment />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctor-list" element={<DoctorList />} />
      </Routes>
    </>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};
export default App;
