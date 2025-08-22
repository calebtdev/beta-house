import React, { useState } from "react";
import signup from "../assets/images/signupimage.png";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordError: "",
    checkbox: false,
  });

  const navigate = useNavigate();
  const signInRoute = () => {
    navigate("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 7) {
      setFormData({
        ...formData,
        passwordError: "Password legth must be at least 7",
      });
      return;
    } else {
      setFormData({ ...formData, passwordError: "" });
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.checkbox
    ) {
      alert("Kindly fill all fields appropriately");
      return;
    }

    try {
      setLoading(true);
      console.log(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      const response = await fetch(
        "https://beta-house-backend-xcox.onrender.com/api/v1/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.msg || "Something went wrong");
      console.log("User registered:", data);
      localStorage.setItem("token", data.data.token); // Redirect to dashboard or home
      alert("registered successfully");
      navigate("/signin");
    } catch (error) {
      setFormData({ ...formData, passwordError: error.message });
    } finally {
      setLoading(false); // re-enable button after request
    }
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
          onSubmit={handleSubmit}
          className="flex flex-col gap-[1rem] py-[1rem] bg-red-00 w-full"
        >
          <div className="flex flex-row gap-[1rem] w-full">
            <div className="flex flex-col gap-1 w-full">
              <label>First Name</label>
              <input
                type="text"
                className="border border-2 border-gray-300 rounded px-2 py-1"
                placeholder="Enter Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label>Last Name</label>
              <input
                type="text"
                className="border border-2 border-gray-300 rounded px-2 py-1"
                placeholder="Enter Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="border border-2 border-gray-300 rounded px-2 py-1"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between">
              <label htmlFor="">Password</label>
              <span className="text-red-500">{formData.passwordError}</span>
            </div>

            <input
              type="password"
              className="border border-2 border-gray-300 rounded px-2 py-1"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Confirm password</label>
            <input
              type="password"
              className="border border-2 border-gray-300 rounded px-2 py-1"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              className="accent-green-700 text-white"
              value={formData.checkbox}
              onChange={(e) =>
                setFormData({ ...formData, checkbox: e.target.checked })
              }
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
          <button
            className="text-white bg-[#3D9970] py-2 rounded-xl cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
          <div className="flex items-center w-full gap-1">
            {/* Left HR */}
            <div className="flex-1 h-px bg-gradient-to-l from-gray-300 to-transparent"></div>

            {/* OR Text */}
            <span className="text-gray-500">or</span>

            {/* Right HR */}

            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>

          <button className="text-black bg-white border py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer">
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
