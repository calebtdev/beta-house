import React, { useState } from "react";
import signup from "../assets/images/signupimage.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [wrongPassword, setwrongPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const Signuproute = () => {
    navigate("/signup");
    setwrongPassword("Kindly type in your correct password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clearEmail = email.trim();
    const clearPassword = password.trim();

    if (!clearEmail || !clearPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 7) {
      alert("Password must be at least 7 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://beta-house-backend-xcox.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: clearEmail, password: clearPassword }),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.msg || "Invalid credentials");

      const { firstName, lastName, ...rest } = data.user;
      const normalizedUser = {
        firstname: firstName ?? data.user.firstname ?? "",
        lastname: lastName ?? data.user.lastname ?? "",
        ...rest,
      };

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(normalizedUser));

      window.dispatchEvent(new Event("auth-change"));
      navigate("/dashboard");
    } catch (error) {
      setwrongPassword(error.message);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1450px] mx-auto min-h-screen">
      {/* Form Section */}
      <div className="flex flex-col items-start justify-center px-6 sm:px-12 py-12 md:py-24 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome Back to BetaHouse
        </h1>
        <h3 className="text-gray-200">
          Let's get started by filling out the information below
        </h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 w-full"
        >
          <div className="flex flex-col gap-2 w-full">
            <label>Email</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D9970]"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between">
              <label>Password</label>
              <span className="text-red-500 text-sm">{wrongPassword}</span>
            </div>
            <input
              type="password"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3D9970]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <input type="checkbox" className="accent-green-600" />
              <h6 className="text-sm">Remember me</h6>
            </div>
            <span className="text-red-500 text-sm cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            className="text-white bg-[#3D9970] py-3 rounded-xl w-full cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
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
            New User?{" "}
            <span
              className="text-[#3D9970] cursor-pointer"
              onClick={Signuproute}
            >
              Sign up
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

export default Signin;
