import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState(false);
  const [dashBoardData, setDashBoardData] = useState(false);
  const [docProfileData, setDocProfileData] = useState(false);
  const getAllAppoinments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.appoinments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // complete appointment
  const completeAppointment = async (appoinmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointment-complete",
        { appoinmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppoinments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // cancel appointment
  const cancelAppointment = async (appoinmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointment-cancel",
        { appoinmentId },
        { headers: { dToken } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        getAllAppoinments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // dashboard data

  const getDashBoardData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-dashboard",
        { headers: { dToken } }
      );
      if (data.success) {
        setDashBoardData(data.Dashdata);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // get doctor profile data

  const getDocProfile = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-profile",
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        setDocProfileData(data.docProfileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAllAppoinments,
    completeAppointment,
    cancelAppointment,
    getDashBoardData,
    dashBoardData,
    setDashBoardData,
    setDocProfileData,
    docProfileData,
    getDocProfile,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
