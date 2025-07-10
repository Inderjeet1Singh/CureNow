import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();
import AboutUsImg from "../assets/AboutUs.jpg";
import ContactUsImg from "../assets/ContactUs.jpg";
import ProfilePic from "../assets/ProfilePic.jpg";
const slots = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const timeSlots = [
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "01:00",
  "01:15",
];
const AppContextProvider = (props) => {
  const [token, setToken] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/doctor-list");
      console.log(data);
      if (data.succes) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);
  const value = {
    doctors,
    slots,
    timeSlots,
    AboutUsImg,
    ContactUsImg,
    ProfilePic,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
