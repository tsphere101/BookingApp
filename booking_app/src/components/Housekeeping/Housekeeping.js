import React from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Modebar from "./Modebar/Modebar";
import FilterBar from "./Filter bar/FilterBar";

const Housekeeping = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Modebar />
      <FilterBar/>
    </>
  );
};

export default Housekeeping;
