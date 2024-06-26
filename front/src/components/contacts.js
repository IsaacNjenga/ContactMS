import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const customStyles = {
  headCells: { style: { fontSize: 15 + "px", fontWeight: 600 } },
  cells: { style: { fontSize: 13 + "px", fontWeight: 500 } },
};

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be a ble to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`contact/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setContacts(res.data.contacts);
            MySwal.fire({
              title: "Deleted!",
              text: "Deleted successfully",
              icon: "success",
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "An error occured",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "E-mail", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Address", selector: (row) => row.address },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FaPenToSquare className="table-icon1" />
          </Link>
          <FaRegTrashCan
            className="table-icon2"
            onClick={() => deleteRecord(row._id)}
          />
        </>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("contacts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          setContacts(response.data.contacts);
          setLoading(false);
        } else {
          toast.error("No contacts found", {
            position: "top-right",
            autoClose: 5000,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Error Fetching Contacts", {
          position: "top-right",
          autoClose: 5000,
        });
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader">
          <CircleLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="contact-list">
          <DataTable
            columns={columns}
            data={contacts}
            customStyles={customStyles}
            pagination
          />
          {contacts.length === 0 ? <h1>Add a contact</h1> : <></>}
        </div>
      )}
    </>
  );
}

export default Contacts;
