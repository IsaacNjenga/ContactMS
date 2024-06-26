import React, { useEffect, useState } from "react";
import "../assets/css/form.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
  FaUserPlus,
} from "react-icons/fa6";

function EditContact() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("https://contact-ms-api.vercel.app/contactMS/update-contact/" + id, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success("Contact Updated Successfully!", {
            position: "top-right",
            autoClose: 500,
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        toast.error("Error Updating Contact!", {
          position: "top-right",
          autoClose: 1000,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://contact-ms-api.vercel.app/contactMS/contact/" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          setValues({
            name: response.data.contact.name,
            email: response.data.contact.email,
            phone: response.data.contact.phone,
            address: response.data.contact.address,
          });
        } else {
          toast.error("No contacts found", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Contacts", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(err);
      });
  }, [id]);

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit Contact</h2>
        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
            value={values.name || ""}
          />
          <FaAt />
          <input
            type="email"
            className="form-control"
            name="email"
            autoComplete="off"
            placeholder="E-mail Address"
            onChange={handleChange}
            value={values.email || ""}
          />
          <FaPhoneFlip />
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter phone number"
            onChange={handleChange}
            value={values.phone || ""}
          />
          <FaRegAddressCard />
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Enter physical address"
            onChange={handleChange}
            value={values.address || ""}
          />
        </div>
        <button className="form-btn">Update Contact</button>
      </form>
    </div>
  );
}

export default EditContact;
