import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            Join CureNow Today
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            Create your account in just a few steps and unlock personalized
            healthcare services tailored to you. Your path to better health
            starts here.
          </p>
          <p className="text-sm mt-12 text-slate-500">
            If You have an account{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </div>

        <form className="max-w-md md:ml-auto w-full">
          <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
            Sign in
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                Gender
              </label>
              <select
                name="gender"
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Email"
              >
                <option value="Not Selected" selected>
                  Not Selected
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Password"
              />
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="button"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              <Link to="/">Create account</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
