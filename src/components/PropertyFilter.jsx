import React, { useState } from "react";
import { MdTune } from "react-icons/md"; // voice tuner/filter style
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import headerbg from "../assets/images/headerbg.jpg";
import { FiVideo, FiImage, FiLink } from "react-icons/fi";

const PropertyFilter = ({
  totalResults = 15,
  showingStart = 1,
  showingEnd = 10,
}) => {
  const [sortBy, setSortBy] = useState("default");

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "newest", label: "Default" },
  ];

  return (
    <section className="px-12 ">
      <div className="px-12 flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-4">
        {/* Results Info */}
        <div className="flex flex-row gap-5 items-center">
          <div className="flex flex-row items-center  gap-3">
            <MdTune />
            <span>More Filter</span>
          </div>
          <div className="text-gray-700">
            Showing{" "}
            <span className="font-semibold">
              {showingStart}-{showingEnd}
            </span>{" "}
            of <span className="font-semibold">{totalResults}</span> results
          </div>
        </div>

        {/* Filter + Sort Controls */}
        <div className="flex items-center gap-1">
          {/* Filter Button */}
          <button className=" py-2 hover:bg-gray-100">Sort by:</button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className=" py-2  rounded-lg"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 px-12 gap-[5rem]">
        <div className="flex flex-col border rounded-lg">
          <div
            className="flex flex-col h-[15rem] p-4 justify-between bg-cover bg-center"
            style={{ backgroundImage: `url(${headerbg})` }}
          >
            <div className="flex flex-row items-center w-full justify-between">
              <span className="px-4 py-2 rounded bg-[#035A33] text-white">
                Featured
              </span>
              <span className="px-4 py-2 rounded bg-[#035A33] text-white">
                For Sale
              </span>
            </div>
            <div className="flex flex-row items-center justify-end gap-6 text-gray-700 text-2xl text-white">
              <FiLink
                title="Link"
                className="bg-gray-400 p-2 rounded"
                size={30}
              />
              <FiVideo
                title="Video"
                className="bg-gray-400 p-2 rounded"
                size={30}
              />

              <FiImage
                title="Image"
                className="bg-gray-400 p-2 rounded"
                size={30}
              />
            </div>
          </div>
          <div className="flex flex-col px-4 py-6 gap-[1rem]">
            <h1>Real House Luxury Villa</h1>
            <div className="flex flex-row items-center gap-2">
              <FaMapMarkerAlt />
              <span className="text-[13px] text-gray-500">
                Victoria Island, Lagos
              </span>
            </div>
            <div className="border-b border-gray-300 pb-[1rem]">
              <div className="flex flex-row gap-5">
                <div className="flex flex-row gap-1 items-center gap-2 text-gray-500">
                  <FaBed size={15} />
                  <span>6 Bedrooms</span>
                </div>
                <div className="flex flex-row gap-1 items-center gap-2 text-gray-500 ">
                  <FaBath size={15} />
                  <span>3 Bathrooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFilter;
