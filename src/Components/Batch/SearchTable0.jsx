import React, { useEffect, useState } from "react";
import "../../Assets/Css/comman.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import NavDropdown from "react-bootstrap/NavDropdown";
import { AiFillEye, AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";
import PaginationComponent from "../../CommonComponents/Pagination";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Batch from "./Batch";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function SearchTableO() {
  const [batchData, setBatchData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [show, setShow] = useState(false);
console.log("show",show);
console.log("showEditForm",showEditForm);

  const fetchBatchData = () => {
    axios
      .get("http://localhost:5000/api/batch")
      .then((response) => {
        setBatchData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching batch data:", error);
      });
  };
  // console.log("batchData",batchData);

  useEffect(() => {
    fetchBatchData();
  }, []);

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:5000/api/batch/${id}`);
            setBatchData(batchData.filter((batch) => batch._id !== id));
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Batch has been deleted.",
              "success"
            );
          } catch (error) {
            console.error("Error deleting batch:", error);
            Swal.fire("Error", "Failed to delete batch.", "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your batch is safe :)",
            "error"
          );
        }
      });
  };

  const handleClose = () => {
    var body = document.body;
    body.classList.remove("removeScroll");
    setShow(false);
  };

  const handleShow = () => {
    var body = document.body;
    body.classList.add("removeScroll");
    setShowEditForm(true);
    setShow(true);
  };

  return (
    <>
      <section>
        <Container className="mt-4 mb-4">
          <Table responsive striped hover size="md" className="table-table">
            <thead style={{ borderRadius: "5px" }}>
              <tr>
                <th>Batch</th>
                <th>Acro</th>
                <th>Status</th>
                <th>subClient</th>
                <th>Claims</th>
                <th>Form Type</th>
                <th>submit</th>
                <th>Reciept Dt</th>
                <th>Create Dt</th>
                <th>Create By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {batchData.map((item, i) => (
                <tr key={i}>
                  <td>{item.batchnumber}</td>
                  <td>{item.acro}</td>
                  <td>{item.status}</td>
                  <td>{item.subClient}</td>
                  <td>{item.claims}</td>
                  <td>{item.form_type}</td>
                  <td>{item.submit}</td>
                  <td>{item.receipt_date}</td>
                  <td>{item.receipt_date}</td>
                  <td>{item.receipt_date}</td>
                  <td>
                    <MdDelete
                      title="Delete"
                      style={{
                        fontSize: "22px",
                        color: "#0067A6",
                        marginRight: "10px",
                      }}
                      onClick={() => handleDelete(item._id)}
                    />
                    <FaEdit
                      title="Edit"
                      style={{ fontSize: "22px", color: "#0067A6" }}
                      // onClick={() => {
                      //   setSelectedBatch(item);
                      //   setShowEditForm(true);
                      // }}
                      onClick={() => handleShow(setSelectedBatch(item))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <PaginationComponent />
        {showEditForm && (       
          <Offcanvas
            id="sidebar_form"
            show={show}
            onHide={handleClose}
            placement="end"
            scroll
          >
            <Offcanvas.Header>
              <Offcanvas.Title className="sidebar_header">
                <lable className="text-center">Update Batch</lable>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Batch
                handleClose={handleClose}
                formData={selectedBatch}
                onUpdate={fetchBatchData}
              />
            </Offcanvas.Body>
          </Offcanvas>
        )}
      </section>
    </>
  );
}
