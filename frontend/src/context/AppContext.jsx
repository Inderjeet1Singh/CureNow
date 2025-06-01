import { createContext, useState } from "react";
export const AppContext = createContext();
import DocM1 from "../assets/doctors/DocM1.jpg";
import DocM2 from "../assets/doctors/DocM2.jpg";
import DocM3 from "../assets/doctors/DocM3.jpg";
import DocM4 from "../assets/doctors/DocM4.jpg";
import DocM5 from "../assets/doctors/DocM5.jpg";
import DocM6 from "../assets/doctors/DocM6.jpg";
import DocF1 from "../assets/doctors/DocF1.jpg";
import DocF2 from "../assets/doctors/DocF2.jpg";
import DocF3 from "../assets/doctors/DocF3.jpg";
import DocF4 from "../assets/doctors/DocF4.jpg";
import DocF5 from "../assets/doctors/DocF5.jpg";
import DocF6 from "../assets/doctors/DocF6.jpg";
import AboutUsImg from "../assets/AboutUs.jpg";
import ContactUsImg from "../assets/ContactUs.jpg";
import ProfilePic from "../assets/ProfilePic.jpg";
const doctors = [
  {
    id: 1,
    name: "Dr. Seema Patel",
    specialty: "Cardiologist",
    description:
      "Expert in treating heart conditions and promoting cardiovascular health.",
    image: DocF1,
    experience: 15,
    available: true,
    view: 20,
    fee: 50,
    address: {
      line1: "123 Heart Care Blvd",
      line2: "Mumbai, Maharashtra",
    },
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    description:
      "Specializes in treating diseases of the brain and nervous system.",
    image: DocM1,
    experience: 12,
    available: true,
    view: 30,
    fee: 70,
    address: {
      line1: "45 Neuro Street",
      line2: "Delhi, India",
    },
  },
  {
    id: 3,
    name: "Dr. Anjali Verma",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocF2,
    experience: 17,
    available: false,
    view: 10,
    fee: 100,
    address: {
      line1: "22 Kids Clinic Road",
      line2: "Bangalore, Karnataka",
    },
  },
  {
    id: 4,
    name: "Dr.Priya Sharma",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocF3,
    experience: 5,
    available: true,
    view: 23,
    fee: 40,
    address: {
      line1: "9 Child Wellness Ave",
      line2: "Hyderabad, Telangana",
    },
  },
  {
    id: 5,
    name: "Dr. Aarav Singh",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocM2,
    experience: 10,
    available: false,
    view: 30,
    fee: 80,
    address: {
      line1: "67 Baby Health Ln",
      line2: "Ahmedabad, Gujarat",
    },
  },
  {
    id: 6,
    name: "Dr. Naveen Gupta",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocM3,
    experience: 3,
    available: true,
    view: 14,
    fee: 90,
    address: {
      line1: "78 Child First St",
      line2: "Pune, Maharashtra",
    },
  },
  {
    id: 7,
    name: "Dr. Renu Patel",
    specialty: "Cardiologist",
    description:
      "Expert in treating heart conditions and promoting cardiovascular health.",
    image: DocF4,
    experience: 12,
    available: true,
    view: 40,
    fee: 100,
    address: {
      line1: "101 Heartline Tower",
      line2: "Jaipur, Rajasthan",
    },
  },
  {
    id: 8,
    name: "Dr. Deepak Kumar",
    specialty: "Neurologist",
    description:
      "Specializes in treating diseases of the brain and nervous system.",
    image: DocM4,
    experience: 8,
    available: false,
    view: 24,
    fee: 200,
    address: {
      line1: "33 Brainwave Crescent",
      line2: "Lucknow, Uttar Pradesh",
    },
  },
  {
    id: 9,
    name: "Dr. Setal Verma",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocF5,
    experience: 2,
    available: true,
    view: 26,
    fee: 150,
    address: {
      line1: "11 Young Care Rd",
      line2: "Chandigarh",
    },
  },
  {
    id: 10,
    name: "Dr. Shifali Sharma",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocF6,
    experience: 6,
    available: true,
    view: 28,
    fee: 120,
    address: {
      line1: "88 Pediatric Circle",
      line2: "Bhopal, Madhya Pradesh",
    },
  },
  {
    id: 11,
    name: "Dr. Arvind Singh",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocM5,
    experience: 3,
    available: false,
    view: 27,
    fee: 180,
    address: {
      line1: "66 Toddler Trail",
      line2: "Patna, Bihar",
    },
  },
  {
    id: 12,
    name: "Dr. Navneet Gupta",
    specialty: "Pediatrician",
    description:
      "Dedicated to the medical care of infants, children, and adolescents.",
    image: DocM6,
    experience: 7,
    available: true,
    view: 20,
    fee: 130,
    address: {
      line1: "44 Growth Path",
      line2: "Indore, Madhya Pradesh",
    },
  },
];

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
