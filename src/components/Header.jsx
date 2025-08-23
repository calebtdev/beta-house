import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi"; // Hamburger & close icons

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // User dropdown
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu

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

  useEffect(() => readUserFromStorage(), [location.pathname]);

  useEffect(() => {
    const onAuthChange = () => readUserFromStorage();
    const onStorage = (e) => {
      if (!e.key || ["user"].includes(e.key)) readUserFromStorage();
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
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="py-4 px-6 md:px-10 flex items-center justify-between w-full bg-black/30 fixed z-50 max-w-[1450px]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="p-2 text-2xl bg-[#3D9970] font-bold text-white rounded-full">
          BH
        </span>
        <span className="text-xl font-semibold text-white">BetaHouse</span>
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-8 items-center text-white font-medium">
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

      {/* User / Sign In (Desktop) */}
      {isLoggedIn ? (
        <div className="hidden md:flex relative items-center gap-2">
          <div className="w-7 h-7 bg-[#3D9970] border-white border rounded-full"></div>
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
            <div className="absolute right-0 mt-12 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50">
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
        <div className="hidden md:flex gap-4 items-center">
          <button
            className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#3D9970] transition"
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
      )}

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={toggleMenu}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full list-none items-center left-0 w-full bg-black/90 text-white flex flex-col gap-4 py-6 px-6 md:hidden z-40">
          {/* Nav Links */}
          <li className="cursor-pointer hover:text-[#3D9970] decoration-none transition">
            Home
          </li>
          <li className="cursor-pointer hover:text-[#3D9970] transition">
            Properties
          </li>
          <li className="cursor-pointer hover:text-[#3D9970] transition">
            About us
          </li>
          <li className="cursor-pointer hover:text-[#3D9970] transition">
            Blog
          </li>
          <li className="cursor-pointer hover:text-[#3D9970] transition">
            Contact Us
          </li>

          {/* User Section for Mobile */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-2 mt-4 border-t border-white pt-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#3D9970] border-white border rounded-full"></div>
                <span className="font-semibold">
                  {`${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() ||
                    "Guest"}
                </span>
              </div>
              <button
                className="px-4 py-2 text-left hover:text-[#3D9970]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <button
                className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#3D9970] transition"
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
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
