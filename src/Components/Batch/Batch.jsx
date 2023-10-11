import React, { useState } from "react";
// import "./batch.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Batch({ handleClose, formData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
  });
  const [formatValue, setFormatValue] = useState("");

  const onSubmit = async (data) => {
    Swal.fire({
      // title: "Batch edited successfully do you want to enter claim?",
      text: "Batch edited successfully do you want to enter claim?",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#0067A6",
      cancelButtonColor: "#0067A6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/mcpsweb/searchclaim");
        handleClose();
      }
    });
    // handleClose();
  };

  const client_id = formData?.client_id;

  const handleCardNumberChange = (e) => {
    let value = e.target.value;
    const formatted = value.replace(/[^0-9]/g, "");
    const formattedWithDashes = formatted.replace(
      /(\d{3})(\d{3})(\d{1})(\d+)/,
      "$1-$2-$3-$4"
    );
    const limitedValue = formattedWithDashes.slice(0, 16);
    setFormatValue(limitedValue);
  };

  const handleKeyPress = (e) => {
    const value = e.target.value + e.key;
    if (value > 99) {
      e.preventDefault();
    }
  };

  const showAlert = () => {
    Swal.fire({
      // title: "Are you sure you want to delete this batch?",
        text: "Are you sure you want to delete this batch?",
        heder:"AAAAA",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#0067A6",
      cancelButtonColor: "#0067A6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClose();
      }
    });
  };

 
  console.log("convertedDateconvertedDate", formData);
  return (
    <>
      <div>
        <Container className="edit-main-page p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Floating>
                  <Form.Control
                    id="batch_no"
                    // type="number"
                    placeholder=" Batch No "
                    type="text"
                    value={formData?.batch_no || ""}
                    maxLength={19}
                    // onChange={handleCardNumberChange}
                    // {...register(
                    //   "batch"
                    //   // { required: "Please enter your batch_no." }
                    // )}
                    disabled
                  />
                  <label htmlFor="floatingPasswordCustom">Batch No </label>
                </Form.Floating>
              </Col>

              <Col>
                <Form.Floating>
                  <Form.Control
                    id="entered"
                    type="number"
                    placeholder="Entered"
                    className="icon-remove"
                    value={formData?.entered}
                    disabled
                    // {...register("entered", { required: "Please enter your Entered." })}
                  />
                  <label htmlFor="floatingPasswordCustom">Entered</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="mt-2">
             
              <Col>
                <FloatingLabel controlId="status" label="Status">
                  <Form.Select
                    id="status"
                    type="number"
                    placeholder="Status"
                    className="icon-remove"
                    value={formData?.status}
                    disabled
                  >
                    <option defaultValue value="">
                      Select Status{" "}
                    </option>
                    <option
                      value="01"
                      selected={formData?.formData?.status === "01"}
                    >
                      01 Assigned, No Entry
                    </option>
                    <option
                      value="02"
                      selected={formData?.formData?.status === "02"}
                    >
                      02 In Process
                    </option>
                    <option
                      value="03"
                      selected={formData?.formData?.status === "03"}
                    >
                      03 Claims Entered
                    </option>
                    <option
                      value="05"
                      selected={formData?.formData?.status === "05"}
                    >
                      05 Uploading Processed Claims
                    </option>
                    <option
                      value="10"
                      selected={formData?.formData?.status === "10"}
                    >
                      10 Close
                    </option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <Form.Floating>
                  <Form.Control
                    id="priced"
                    type="number"
                    placeholder="Priced"
                    className="icon-remove"
                    value={formData?.priced}
                    disabled
                    // {...register("priced", { required: "Please enter your priced." })}
                  />
                  <label htmlFor="floatingPasswordCustom">Priced</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="mt-2">
            <Col>
                <Form.Floating>
                  <Form.Control
                    id="exceptions"
                    type="number"
                    placeholder="Exceptions"
                    className="icon-remove"
                    value={formData?.exceptions}
                    disabled
                    // {...register("exceptions", {
                    //   required: "Please enter your Exceptions.",
                    // })}
                  />
                  <label htmlFor="floatingPasswordCustom">Exceptions</label>
                </Form.Floating>
              </Col>

              <Col>
                <Form.Floating>
                  <Form.Control
                    id="misdirect"
                    type="number"
                    placeholder="Misdirect"
                    className="icon-remove"
                    value={formData?.misdirect}
                    disabled
                    // {...register("misdirect", {
                    //   required: "Please enter your Misdirect.",
                    // })}
                  />
                  <label htmlFor="floatingPasswordCustom">Misdirect</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}>
                <Form.Floating>
                  <Form.Control
                    id="receipt_date"
                    type="date"
                    placeholder="Receipt Date"
                    // value={formData?.receipt_date}
                    defaultValue={moment(
                      formData?.receipt_date,
                      "DD-MMM-YYYY"
                    ).format("YYYY-MM-DD")}
                    {...register("receipt_date")}
                  />
                  {console.log("formData?.receipt_dateformData?.receipt_date")}
                  <label>Receipt Date</label>
                </Form.Floating>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="client"
                  label="Sub-Client"
                  value={formData?.client}
                  {...register("client")}
                >
                  <Form.Select aria-label="Floating label select example">
                    <option> Select Client</option>
                    <option value="1">AUTO DEMO CLIENT 2-ACL</option>
                    <option value="2">GH DEMO CLIENT 2- U7A</option>
                    <option value="2">WC DEMO CLIENT 2- WMO</option>
                    <option value="3">WEB REEMOTE TRAINING QPA-4RY</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <FloatingLabel
                  controlId="submit"
                  label="Submit"
                  {...register("submit")}
                  value={formData?.submit}
                >
                  <Form.Select aria-label="Floating label select example">
                    <option> Select Submit Type</option>
                    <option value="P" selected={formData?.submit === "P"}>
                      Provider
                    </option>
                    <option value="R" selected={formData?.submit === "R"}>
                      Client
                    </option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel
                  controlId="form_type"
                  label="Form Type"
                  value={formData?.entered}
                  {...register("form_type")}
                >
                  <Form.Select aria-label="Floating label select example">
                    <option> Select Form Type</option>
                    <option value="1">CMS</option>
                    <option value="2">UB04</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}>
                <Form.Floating>
                  <Form.Control
                    id="claims"
                    type="number"
                    placeholder="No of Claims"
                    className="icon-remove"
                    value={formData?.claims}
                    onKeyPress={handleKeyPress}
                    onChange={handleKeyPress}
                    {...register("claims")}
                  />
                  <label htmlFor="floatingPasswordCustom">No of Claims</label>
                </Form.Floating>
              </Col>
            </Row>
            <div className="bt-button mt-5 button_spacing">
              <div>
                <Button
                  type="submit"
                  variant="light"
                  size="lg"
                  className="mx-2"
                >
                  Save
                </Button>
                <Button
                  variant="light"
                  size="lg"
                  className="mx-2"
                  onClick={showAlert}
                >
                  Delete
                </Button>
              </div>

              <Button
                variant="light"
                size="lg"
                className="mx-2"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
            <div className=" mt-2">
              {client_id === undefined || null ? (
                <span>
                  Created {moment().format("MM/DD/YYYY")} by AJAKOLDEMO
                </span>
              ) : (
                <span>
                  Created {formData?.receipt_date} by {formData?.create_by}
                </span>
              )}
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
