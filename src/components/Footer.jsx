import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#035A33] w-full py-10  text-white items-center">
      <div className="flex flex-row justify-center gap-10 px-[5%]">
        {/* Logo & About */}
        <div className="flex flex-col gap-5 w-[30%]">
          <div className="flex items-center gap-2">
            <span className="p-2 text-2xl bg-[#3D9970] font-bold text-white rounded-full">
              BH
            </span>
            <span className="text-xl font-semibold">BetaHouse</span>
          </div>
          <p className="text-sm leading-relaxed">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://maps.google.com/?q=95 Tinubu Estate, Lekki, Lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaMapMarkerAlt /> 95 Tinubu Estate, Lekki, Lagos
            </a>

            <a
              href="tel:+2346758935675"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaPhoneAlt /> +234 675 8935675
            </a>

            <a
              href="mailto:support@rentbetahouse.com"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaEnvelope /> support@rentbetahouse.com
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-[20%]">
          <h1 className="font-semibold text-lg mb-3">Quick Links</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">Properties</li>
            <li className="hover:text-gray-300 cursor-pointer">About</li>
            <li className="hover:text-gray-300 cursor-pointer">Contact Us</li>
            <li className="hover:text-gray-300 cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* More */}
        <div className="w-[20%]">
          <h1 className="font-semibold text-lg mb-3">More</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-gray-300 cursor-pointer">Agents</li>
            <li className="hover:text-gray-300 cursor-pointer">
              Affordable houses
            </li>
            <li className="hover:text-gray-300 cursor-pointer">FAQ's</li>
          </ul>
        </div>

        {/* Popular Searches */}
        <div className="w-[20%]">
          <h1 className="font-semibold text-lg mb-3">Popular Searches</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-gray-300 cursor-pointer">
              Apartment for sale
            </li>
            <li className="hover:text-gray-300 cursor-pointer">
              Apartment for rent
            </li>
            <li className="hover:text-gray-300 cursor-pointer">
              3 bedroom flat
            </li>
            <li className="hover:text-gray-300 cursor-pointer">Bungalow</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-row justify-between mt-10 border-t border-gray-500 pt-4 px-[5%] text-xs text-gray-300">
        <span>
          © {new Date().getFullYear()} BetaHouse | Designed by Caleb.dev
        </span>
        <span className="text-white">Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
