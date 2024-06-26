import React, { useState } from "react";
import "../assets/css/form.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
  FaUserPlus,
} from "react-icons/fa6";

function AddContact() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://contact-ms-api.vercel.app/contactMS/addContact", values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Contact Added Successfully!", {
            position: "top-right",
            autoClose: 500,
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        toast.error("Error Adding Contact!", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Create Contact</h2>
        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
          <FaAt />
          <input
            type="email"
            className="form-control"
            name="email"
            autoComplete="off"
            placeholder="E-mail Address"
            onChange={handleChange}
          />
          <FaPhoneFlip />
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter phone number"
            onChange={handleChange}
          />
          <FaRegAddressCard />
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Enter physical address"
            onChange={handleChange}
          />
        </div>
        <button className="form-btn">Add Contact</button>
      </form>
    </div>
  );
}

export default AddContact;
