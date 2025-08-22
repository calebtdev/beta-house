import React from "react";
import HeaderHero from "../components/HeaderHero";
import Discoverproperties from "../components/Discoverproperties";
import Footer from "../components/Footer";
import PropertyFilter from "../components/PropertyFilter";

const Dashboard = () => {
  return (
    <main className=" w-full max-w-[1450px] mx-auto ">
      <HeaderHero />
      <PropertyFilter />
      <Discoverproperties />
      <Footer />
    </main>
  );
};

export default Dashboard;
