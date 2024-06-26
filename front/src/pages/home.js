import React from "react";
import Navbar from "../components/navbar";
import "../assets/css/home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1 className="home-title">CONTACT MANAGEMENT SYSTEM</h1>
        <p className="home-description">
          Start collecting your contacts better
        </p>
      </div>
    </>
  );
}

export default Home;
