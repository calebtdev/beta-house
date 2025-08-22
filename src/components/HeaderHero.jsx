import React from "react";
import Header from "./Header";
import headerbg from "../assets/images/headerbg.jpg";
import Hero from "./Hero";

const HeaderHero = () => {
  return (
    <main
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${headerbg})`,
      }}
    >
      <Header />
      <Hero />
    </main>
  );
};

export default HeaderHero;
