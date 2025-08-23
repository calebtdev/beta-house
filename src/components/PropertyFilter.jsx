import React, { useEffect, useState } from "react";
import { MdTune } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";
import { FiVideo, FiImage, FiLink } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import headerbg from "../assets/images/headerbg.jpg";

const PropertyFilter = () => {
  const [sortBy, setSortBy] = useState("default");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const propertiesPerPage = 9;

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://beta-house-backend-xcox.onrender.com/api/v1/properties?featured=false"
        );
        const data = await res.json();
        setProperties(data?.properties || data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <section className="px-4 sm:px-6 md:px-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-3">
          <div className="flex items-center gap-3 text-gray-700">
            <MdTune size={20} />
            <span>More Filter</span>
          </div>
          <div className="text-gray-700 text-sm sm:text-base mt-2 sm:mt-0">
            Showing{" "}
            <span className="font-semibold">
              {startIndex + 1}-{Math.min(endIndex, properties.length)}
            </span>{" "}
            of <span className="font-semibold">{properties.length}</span>{" "}
            results
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-2 rounded-lg text-sm"
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
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {currentProperties.map((property, index) => (
            <div
              className="flex flex-col border border-gray-200 overflow-hidden rounded-lg"
              key={index}
            >
              {/* Property Image */}
              <div
                className="flex flex-col h-64 sm:h-60 md:h-72 p-4 justify-between bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${property.image_url || headerbg})`,
                }}
              >
                <div className="flex justify-between w-full">
                  <span className="px-2 py-1 rounded bg-[#035A33] text-white text-xs sm:text-sm">
                    Featured
                  </span>
                  <span className="px-2 py-1 rounded bg-[#D3D3D3B2] text-white text-xs sm:text-sm">
                    For Sale
                  </span>
                </div>
                <div className="flex gap-2 sm:gap-3 text-white text-lg sm:text-xl">
                  <FiLink
                    className="bg-gray-400 p-1 sm:p-2 rounded"
                    size={24}
                  />
                  <FiVideo
                    className="bg-gray-400 p-1 sm:p-2 rounded"
                    size={24}
                  />
                  <FiImage
                    className="bg-gray-400 p-1 sm:p-2 rounded"
                    size={24}
                  />
                </div>
              </div>

              {/* Property Info */}
              <div className="flex flex-col px-4 py-4 gap-2">
                <h2 className="font-semibold text-lg sm:text-xl">
                  {property.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
                  <FaMapMarkerAlt />
                  <span>{property.location}</span>
                </div>
                <div className="border-b border-gray-300 pb-2 sm:pb-3">
                  <div className="flex flex-row gap-4 sm:gap-6 text-gray-500 text-sm sm:text-base">
                    <div className="flex items-center gap-1">
                      <FaBed />
                      <span>{property.rooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBath />
                      <span>{property.bathrooms} Bathrooms</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 sm:mt-3 text-sm sm:text-base">
                  <h3 className="font-semibold">
                    ₦ {property.amount.toLocaleString()}
                  </h3>
                  <div className="flex gap-3 text-lg sm:text-xl">
                    <LuArrowUpDown />
                    <FaShareAlt />
                    <FaHeart />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded ${
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
              className={`px-3 py-2 rounded ${
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
            className={`px-3 py-2 rounded ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </section>
  );
};

export default PropertyFilter;
