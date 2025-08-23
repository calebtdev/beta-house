import React, { useState } from "react";
import signup from "../assets/images/signupimage.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

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
  const signInRoute = () => navigate("/signin");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 7) {
      setFormData({
        ...formData,
        passwordError: "Password length must be at least 7",
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

      localStorage.setItem("token", data.data.token);
      alert("Registered successfully!");
      navigate("/signin");
    } catch (error) {
      setFormData({ ...formData, passwordError: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1450px] mx-auto min-h-screen">
      {/* Form Section */}
      <div className="flex flex-col items-start justify-center px-6 sm:px-12 py-12 md:py-24 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Join our community of home seekers and explore the possibilities
        </h1>
        <h3 className="text-gray-200">
          Let's get started by filling out the information below
        </h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label>First Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3D9970]"
                placeholder="Enter Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label>Last Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3D9970]"
                placeholder="Enter Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3D9970]"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between">
              <label>Password</label>
              <span className="text-red-500 text-sm">
                {formData.passwordError}
              </span>
            </div>
            <input
              type="password"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3D9970]"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>Confirm Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3D9970]"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex flex-row gap-2 items-center">
            <input
              type="checkbox"
              className="accent-green-700"
              checked={formData.checkbox}
              onChange={(e) =>
                setFormData({ ...formData, checkbox: e.target.checked })
              }
            />
            <h6 className="text-sm">
              I agree to{" "}
              <span className="text-[#3D9970] cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#3D9970] cursor-pointer">
                Privacy Policies
              </span>
            </h6>
          </div>

          <button
            className="text-white bg-[#3D9970] py-3 rounded-xl w-full cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>

          <div className="flex items-center w-full gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="text-black bg-white border py-3 rounded-xl flex items-center justify-center gap-2 w-full cursor-pointer">
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <h6 className="text-center text-sm mt-2">
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

      {/* Image Section */}
      <div className="w-full h-64 md:h-auto">
        <img src={signup} alt="signup" className="object-cover w-full h-full" />
      </div>
    </section>
  );
};

export default Signup;
