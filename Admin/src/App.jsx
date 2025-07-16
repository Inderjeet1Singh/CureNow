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
import { DoctorContext } from "./context/DoctorContext";
import DocDashboard from "./Pages/Doctor/DocDashboard";
import DocAppointment from "./Pages/Doctor/DocAppointment";
import DocProfile from "./Pages/Doctor/DocProfile";
const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/all-appointments" element={<AllAppointment />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctor-list" element={<DoctorList />} />
        {/* Doctor Routes*/}
        <Route path="/doctor-dashboard" element={<DocDashboard />} />
        <Route path="/doctor-appointments" element={<DocAppointment />} />
        <Route path="/doctor-profile" element={<DocProfile />} />
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
