import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi"; // Arrow icon

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ Added state for dropdown

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
      setUser(null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    readUserFromStorage();
  }, [location.pathname]);

  useEffect(() => {
    const onAuthChange = () => readUserFromStorage();
    const onStorage = (e) => {
      if (!e.key || ["user"].includes(e.key)) {
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

  const isLoggedIn = !!user;

  const Signin = () => navigate("/signin");

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="py-6 px-10 flex flex-row items-center justify-between w-full bg-black/30 fixed max-w-[1450px] z-50">
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

      {/* User / Sign In */}
      {isLoggedIn ? (
        <div className="relative">
          <button
            className="flex items-center gap-1 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white hover:text-[#3D9970] transition"
            onClick={toggleDropdown}
          >
            {`${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() || "Guest"}
            <FiChevronDown
              className={`ml-1 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
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
            className="px-4 py-2 bg-[#3D9970] text-white rounded-lg hover:bg-[#2E7D57] transition cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
