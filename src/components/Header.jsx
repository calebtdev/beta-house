import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  const readUserFromStorage = () => {
    try {
      const raw = sessionStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.firstname || parsed?.lastname) {
          setUser(parsed);
          return;
        }
      }

      // fallback for separate keys if ever used
      const firstname = sessionStorage.getItem("firstname") || "";
      const lastname = sessionStorage.getItem("lastname") || "";
      setUser(firstname || lastname ? { firstname, lastname } : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    readUserFromStorage();
  }, [location.pathname]);

  // Listen for auth changes across tabs
  useEffect(() => {
    const onAuthChange = () => readUserFromStorage();
    const onStorage = (e) => {
      if (!e.key || ["user", "firstname", "lastname"].includes(e.key)) {
        readUserFromStorage();
      }
    };
    window.addEventListener("auth-change", onAuthChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("auth-change", onAuthChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const Signin = () => navigate("/signin");
  const isLoggedIn = !!user;

  return (
    <header className="py-6 px-10 flex flex-row items-center justify-between w-full bg-black/30 fixed max-w-[1450px]">
      {/* Logo */}
      <div className="flex flex-row gap-2 items-center">
        <span className="p-2 text-2xl bg-[#3D9970] font-bold text-white rounded-full">
          BH
        </span>
        <span className="text-xl font-semibold text-white">BetaHouse</span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex flex-row gap-8 items-center text-white font-medium">
        <li className="cursor-pointer hover:text-[#3D9970] transition">Home</li>
        <li className="cursor-pointer hover:text-[#3D9970] transition">
          Properties
        </li>
        <li className="cursor-pointer hover:text-[#3D9970] transition">
          About us
        </li>
        <li className="cursor-pointer hover:text-[#3D9970] transition">Blog</li>
        <li className="cursor-pointer hover:text-[#3D9970] transition">
          Contact Us
        </li>
      </ul>

      {location.pathname !== "/dashboard" ? (
        isLoggedIn ? (
          <div className="text-lg font-semibold text-white">
            {`${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() || "Guest"}
          </div>
        ) : (
          <div className="flex flex-row gap-4 items-center">
            <button
              className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#3D9970] transition cursor-pointer"
              onClick={Signin}
            >
              Sign in
            </button>
            <button
              className="px-4 py-2 bg-[#3D9970] text-white rounded-lg hover:bg-[#2E7D57] transition"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )
      ) : (
        <div className="text-lg font-semibold text-white">
          {isLoggedIn
            ? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() || "Guest"
            : "Guest"}
        </div>
      )}
    </header>
  );
};

export default Header;
