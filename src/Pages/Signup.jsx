import React from "react";
import signup from "../assets/images/signupimage.png";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  const signInRoute = () => {
    Navigate("/signin");
  };
  return (
    <section className="grid grid-cols-2 w-full max-w-[1450px] mx-auto">
      <div className="flex flex-col items-start justify-center px-[5rem] gap-2">
        <h1 className="text-xl font-bold">
          Join our community of home seekers and explore he possibilities that
          await
        </h1>
        <h3>Lets get started by filling out the information below</h3>
        <form
          action=""
          className="flex flex-col gap-[1rem] py-[1rem] bg-red-00 w-full"
        >
          <div className="flex flex-row gap-[3rem] w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                className="border border-2 border-gray-300 rounded px-2 py-2"
                placeholder="Enter Name"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                className="border border-2 border-gray-300 rounded px-2 py-2"
                placeholder="Enter Name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="border border-2 border-gray-300 rounded px-2 py-2"
              placeholder="Enter your Email"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Password</label>
            <input
              type="text"
              className="border border-2 border-gray-300 rounded px-2 py-2"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Confirm password</label>
            <input
              type="text"
              className="border border-2 border-gray-300 rounded px-2 py-2"
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              className="focus:bg-[#3D9970] focus:text-red-100"
            />
            <h6>
              I agree to{" "}
              <span className="text-[#3D9970] cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#3D9970] cursor-pointer">
                Privacy Policies
              </span>{" "}
            </h6>
          </div>
          <button className="text-white bg-[#3D9970] py-3 rounded-xl cursor-pointer">
            Sign Up
          </button>
          <div className="flex items-center w-full gap-2">
            {/* Left HR */}
            <div className="flex-1 h-px bg-gradient-to-l from-gray-300 to-transparent"></div>

            {/* OR Text */}
            <span className="text-gray-500">or</span>

            {/* Right HR */}

            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>

          <button className="text-black bg-white border py-3 rounded-xl flex items-center justify-center gap-1 cursor-pointer">
            <FcGoogle size={24} />
            Continue with Google
          </button>
          <h6 className="text-center">
            Already have an account?{" "}
            <span
              className="text-[#3D9970] cursor-pointer"
              onClick={signInRoute}
            >
              Sign in
            </span>
          </h6>
        </form>
      </div>
      <div className="bg-green-400 h-screen w-full">
        <img
          src={signup}
          alt="signup"
          className="object-center h-screen w-full"
        />
      </div>
    </section>
  );
};

export default Signup;
