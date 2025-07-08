import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.succes) {
          console.log("Token is:", data.token);
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login Success");
        } else {
          console.log("Login failed");
          toast.error(data.message);
        }
      } else {
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/2 bg-blue-100 p-12 flex flex-col justify-center">
        {state === "Doctor" ? (
          <>
            <h1 className="text-5xl font-bold text-blue-800 mb-6 leading-tight">
              Doctor's Portal
            </h1>
            <p className="text-gray-800 text-lg font-medium leading-relaxed">
              Log in to view your scheduled appointments, patient details, and
              manage your availability with ease.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-green-800 mb-6 leading-tight">
              Admin Dashboard Access
            </h1>
            <p className="text-gray-800 text-lg font-medium leading-relaxed">
              Log in to control user management, monitor analytics, and
              configure system settings from a single place.
            </p>
          </>
        )}
      </div>
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center mb-8">
          {state} Login
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            {state === "Admin" ? (
              <>
                Doctor Login?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setState("Doctor")}
                >
                  Click here
                </span>
              </>
            ) : (
              <>
                Admin Login?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setState("Admin")}
                >
                  Click here
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
