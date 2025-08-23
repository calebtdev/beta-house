import React, { useState } from "react";

const Hero = () => {
  const [roomnumber, setroomnumber] = useState(0);

  const increaseNumber = () => setroomnumber(roomnumber + 1);
  const decreaseNumber = () => roomnumber > 0 && setroomnumber(roomnumber - 1);

  return (
    <section className="pt-36 md:pt-60 pb-20 flex flex-col items-center gap-8">
      {/* Hero Text */}
      <div className="flex flex-col text-white text-center gap-6 px-6 sm:px-10 md:px-40">
        <h1 className="text-3xl md:text-5xl font-bold">
          Browse Our Properties
        </h1>
        <p className="text-sm md:text-base px-4 sm:px-20 md:px-0">
          Find your perfect home among our curated properties. Start browsing
          now!
        </p>
      </div>

      {/* Search Box */}
      <div className="flex flex-col w-full px-4 sm:px-10 md:px-20 py-6 bg-black/50">
        <div className="flex flex-col md:flex-row items-stretch bg-white rounded-xl overflow-hidden uppercase">
          {/* Location */}
          <div className="flex-1 flex flex-col px-4 py-3 md:px-6 md:py-4 font-bold border-b md:border-b-0 md:border-r border-gray-300">
            <h3>Location</h3>
            <input
              type="text"
              placeholder="e.g Gbagada"
              className="py-1 focus:outline-none border-b md:border-b-0 border-gray-300"
            />
          </div>

          {/* Property Type */}
          <div className="flex-1 flex flex-col px-4 py-3 md:px-6 md:py-4 font-bold border-b md:border-b-0 md:border-r border-gray-300 items-center">
            <h3>Property Type</h3>
            <input
              type="text"
              placeholder="e.g Duplex, Bedroom Flat"
              className="py-1 focus:outline-none border-b md:border-b-0 border-gray-300"
            />
          </div>

          {/* Bedroom */}
          <div className="flex-1 flex flex-col px-4 py-3 md:px-6 md:py-4 font-bold border-b md:border-b-0 md:border-r border-gray-300 items-center gap-2">
            <h3>Bedroom</h3>
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
                onClick={decreaseNumber}
              >
                -
              </button>
              <span>{roomnumber}</span>
              <button
                className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
                onClick={increaseNumber}
              >
                +
              </button>
            </div>
          </div>

          {/* Find Property Button */}
          <div className="flex-1">
            <button className="w-full h-full bg-[#3D9970] text-white flex justify-center items-center cursor-pointer px-4 py-4">
              Find Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
