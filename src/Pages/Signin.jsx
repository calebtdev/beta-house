import React, { useState } from "react";
import signup from "../assets/images/signupimage.png";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";

const Signin = () => {
  const [wrongPassword, setwrongPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Signuproute = () => {
    Navigate("/signup");
    setwrongPassword("Kindly type in your correct password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

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
          body: JSON.stringify({
            email: clearEmail,
            password: clearPassword,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.msg || "Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("User loggedIn:", data);
      navigate("/signup");
    } catch (error) {
      console.log(error.message);
      setwrongPassword(error.message);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-2 w-full max-w-[1450px] mx-auto">
      <div className="flex flex-col items-start justify-center px-[5rem] gap-2">
        <h1 className="text-xl font-bold">Welcome Back to BetaHouse</h1>
        <h3>Lets get started by filling out the information below</h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[1rem] py-[1rem] bg-red-00 w-full"
        >
          <div className="flex flex-col gap-1 w-full">
            <label>Email</label>
            <input
              type="text"
              className="border border-2 border-gray-300 rounded px-2 py-2"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between">
              <label>Password</label>
              <span className="text-red-500">{wrongPassword}</span>
            </div>
            <input
              type="password"
              className="border border-2 border-gray-300 rounded px-2 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <input type="checkbox" className="accent-green-600 text-white" />
              <h6>Remember me</h6>
            </div>
            <span className="text-red-500 cursor-pointer">Forgot Password</span>
          </div>
          <button
            className="text-white bg-[#3D9970] py-3 rounded-xl cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
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

export default Signin;
