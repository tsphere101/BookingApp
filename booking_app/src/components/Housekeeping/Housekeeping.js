import React from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Modebar from "./Modebar/Modebar";
import Collapsible from "react-collapsible";

const Housekeeping = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Modebar />
      <Collapsible trigger="click >> ความในใจของผมต่อวิชานี้ << click">
        <div>I</div>
        <div>Hate</div>
        <dic>Soft arch</dic>
      </Collapsible>
    </>
  );
};

export default Housekeeping;
