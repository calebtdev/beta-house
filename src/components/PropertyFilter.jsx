import React, { useEffect, useState } from "react";
import { MdTune } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";
import headerbg from "../assets/images/headerbg.jpg";
import { FiVideo, FiImage, FiLink } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";

const PropertyFilter = () => {
  const [sortBy, setSortBy] = useState("default");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const propertiesPerPage = 9; // show 9 per page

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          "https://beta-house-backend-xcox.onrender.com//api/v1/properties?featured=false"
        );
        const data = await res.json();
        console.log("API response:", data);
        setProperties(data?.properties || data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="px-12">
      {/* Top Section */}
      <div className="px-12 flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-4">
        <div className="flex flex-row gap-5 items-center">
          <div className="flex flex-row items-center gap-3">
            <MdTune />
            <span>More Filter</span>
          </div>
          <div className="text-gray-700">
            Showing{" "}
            <span className="font-semibold">
              {startIndex + 1}-{Math.min(endIndex, properties.length)}
            </span>{" "}
            of <span className="font-semibold">{properties.length}</span>{" "}
            results
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="py-2 hover:bg-gray-100">Sort by:</button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 rounded-lg"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-3 px-12 gap-[5rem]">
        {currentProperties.map((property, index) => (
          <div
            className="flex flex-col border border-gray-200 overflow-hidden rounded-lg"
            key={index}
          >
            <div
              className="flex flex-col h-[15rem] p-4 justify-between bg-cover bg-center"
              style={{
                backgroundImage: `url(${property.image_url || headerbg})`,
              }}
            >
              <div className="flex flex-row items-center w-full justify-between">
                <span className="px-4 py-2 rounded bg-[#035A33] text-white">
                  Featured
                </span>
                <span className="px-4 py-2 rounded bg-[#D3D3D3B2] text-white">
                  For Sale
                </span>
              </div>
              <div className="flex flex-row items-center justify-end gap-6 text-2xl text-white">
                <FiLink className="bg-gray-400 p-2 rounded" size={30} />
                <FiVideo className="bg-gray-400 p-2 rounded" size={30} />
                <FiImage className="bg-gray-400 p-2 rounded" size={30} />
              </div>
            </div>
            <div className="flex flex-col px-4 py-6 gap-[1rem]">
              <h1>{property.title}</h1>
              <div className="flex flex-row items-center gap-2">
                <FaMapMarkerAlt />
                <span className="text-[13px] text-gray-500">
                  {property.location}
                </span>
              </div>
              <div className="border-b border-gray-300 pb-[1rem]">
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row items-center gap-2 text-gray-500">
                    <FaBed size={15} />
                    <span>{property.rooms} Bedrooms</span>
                  </div>
                  <div className="flex flex-row items-center gap-2 text-gray-500">
                    <FaBath size={15} />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <h1>₦ {property.amount.toLocaleString()}</h1>
                <div className="flex flex-row gap-5">
                  <LuArrowUpDown />
                  <FaShareAlt />
                  <FaHeart className="text-black" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-[#035A33] text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default PropertyFilter;
