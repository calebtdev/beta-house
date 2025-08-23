import React, { useState } from "react";

const Hero = () => {
  const [roomnumber, setroomnumber] = useState(0);

  const increaseNumber = () => {
    setroomnumber(roomnumber + 1);
  };

  const decreaseNumber = () => {
    if (roomnumber > 0) {
      setroomnumber(roomnumber - 1);
    }
  };
  return (
    <section className="pt-[15rem] py-[5rem] gap-[2rem] flex flex-col items-center">
      <div className="flex flex-col text-white text-center gap-[2rem] px-[10rem]">
        <h1 className="text-[3rem] font-bold "> Browse Our Properties</h1>
        <p className="text-[1rem] px-[20rem]">
          Find your perfect home among our curated peroperties. Start browsing
          now!
        </p>
      </div>
      <div className="flex flex-row items-center py-[2rem] px-[2rem] bg-black/50">
        <div className="flex flex-row items-center rounded-xl bg-white overflow-hidden uppercase">
          <div className="px-[2rem] py-[1rem] font-bold">
            <h3>Location</h3>
            <input
              type="text"
              placeholder="e.g Gbagada"
              className="py-1 focus:outline-none"
            />
          </div>
          <div className=" border-l px-[2rem] my-[1rem] flex flex-col items-center">
            <h3 className="font-bold">property type</h3>
            <input
              type="text"
              placeholder="e.g Duplex, BedroomFlat"
              className="py-1 focus:outline-none"
            />
          </div>
          <div className="px-[2rem] my-[1rem] border-l flex flex-col gap-1 items-center">
            <h3 className="font-bold">bedroom</h3>
            <div className="flex flex-row items-center gap-5">
              <button
                className="w-5 h-5 flex items-center justify-center border rounded-full cursor-pointer"
                onClick={decreaseNumber}
              >
                -
              </button>
              <span>{roomnumber}</span>
              <button
                className="w-5 h-5 flex items-center justify-center border rounded-full cursor-pointer"
                onClick={increaseNumber}
              >
                +
              </button>
            </div>
          </div>
          <button className="px-[2rem] bg-[#3D9970] flex self-stretch flex-col justify-center items-center cursor-pointer text-white">
            Find property
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
