import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import "../assets/css/dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="contact-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
