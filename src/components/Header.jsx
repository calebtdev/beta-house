import React from "react";

const Header = () => {
  return (
    <header className="py-6 px-10 flex flex-row items-center justify-between w-full bg-black/30">
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

      {/* Buttons */}
      <div className="flex flex-row gap-4 items-center">
        <button className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#3D9970] transition">
          Sign in
        </button>
        <button className="px-4 py-2 bg-[#3D9970] text-white rounded-lg hover:bg-[#2E7D57] transition">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
