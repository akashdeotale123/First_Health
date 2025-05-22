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
import axios from "axios";

export default function Batch({ handleClose, formData, onUpdate }) {
  const navigate = useNavigate();
  const [status_Close, setStatus_Close] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [creditBatchNumber, SetCreditBatchNumber] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    shouldUseNativeValidation: true,
  });
console.log("formData",formData);

  const onSubmit = async (data) => {
    const isEdit = !!formData?._id;

    try {
      let response;
      if (isEdit) {
        response = await axios.patch(
          `http://localhost:5000/api/batch/${formData._id}`,
          data
        );
        onUpdate();
      } else {
        response = await axios.post("http://localhost:5000/api/batch", data);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response?.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/mcpsweb/searchbatch");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error?.response?.data?.msg || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const client_id = formData?.client_id;

  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    const formattedInput = formatcreditBatchNumber(input);
    SetCreditBatchNumber(formattedInput);
    if (input == "") {
      setStatus_Close(true);
    } else {
      if (!errors.batchnumber) {
        setStatus_Close(false);
        return true;
      }
    }
  };

  const formatcreditBatchNumber = (input) => {
    const numericInput = input.replace(/[^0-9]/g, "");
    let formattedInput = "";
    for (let i = 0; i < numericInput.length; i++) {
      if (i === 3 || i === 6 || i === 7) {
        formattedInput += "-";
      } else if (i === 6) {
        formattedInput += "-H";
      }
      if (i >= 10 && i !== 13) {
        formattedInput += numericInput[i];
      } else {
        formattedInput += numericInput[i];
      }
    }
    return formattedInput;
  };

  const showAlert = () => {
    Swal.fire({
      // title: "Are you sure you want to delete this batch?",
      text: "Are you sure you want to delete this batch?",
      heder: "AAAAA",
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

  return (
    <>
      <div>
        <Container className="edit-main-page p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={6}>
                <Form.Floating>
                  <Form.Control
                    id="batchnumber"
                    // type="number"
                    placeholder=" Batch No "
                    type="text"
                    value={creditBatchNumber || formData?.batchnumber}
                    maxLength={16}
                    {...register("batchnumber", {
                      // validate: validatefield,
                      required: "Batch Number is required",
                      minLength: {
                        value: 7,
                        message:
                          "Batch Number must be at least 6 characters long.",
                      },
                      required: true,
                    })}
                    // {...register("batchnumber", {
                    //   required: "Batch Number is required",
                    // })}

                    onChange={handleCardNumberChange}
                  />
                  <label htmlFor="batchnumber">Batch No </label>
                  {errors.batchnumber && (
                    <div className="text-danger">
                      {errors.batchnumber.message}
                    </div>
                  )}
                </Form.Floating>
              </Col>

              <Col>
                <Form.Floating>
                  <Form.Control
                    id="acro"
                    type="number"
                    placeholder="Acro"
                    className="icon-remove"
                    value={formData?.acro}
                    // {...register("acro")}
                    // disabled
                    {...register("acro", {
                      required: "Please enter your acro.",
                    })}
                  />
                  <label htmlFor="floatingPasswordCustom">Acro</label>
                  {errors.acro && (
                    <div className="text-danger">{errors.acro.message}</div>
                  )}
                </Form.Floating>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <FloatingLabel controlId="status" label="Status">
                  <Form.Select
                    {...register("status", { required: "Status is required" })}
                    defaultValue={formData?.status || ""}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="01">01 Assigned, No Entry</option>
                    <option value="02">02 In Process</option>
                    <option value="03">03 Claims Entered</option>
                    <option value="05">05 Uploading Processed Claims</option>
                    <option value="10">10 Close</option>
                  </Form.Select>
                  {errors.status && (
                    <div className="text-danger">{errors.status.message}</div>
                  )}
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <Form.Floating>
                  <Form.Control
                    id="claims"
                    type="number"
                    placeholder="No of Claims"
                    className="icon-remove"
                    value={formData?.claims}
                    {...register("claims", {
                      required: "Number of claims is required",
                    })}
                  />
                  <label htmlFor="floatingPasswordCustom">No of Claims</label>
                  {errors.claims && (
                    <div className="text-danger">{errors.claims.message}</div>
                  )}
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
                    {...register("receipt_date", {
                      required: "Receipt date is required",
                    })}
                  />
                  <label>Receipt Date</label>
                  {errors.receipt_date && (
                    <div className="text-danger">
                      {errors.receipt_date.message}
                    </div>
                  )}
                </Form.Floating>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="subClient"
                  label="Sub-Client"
                  value={formData?.subClient}
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    {...register("subClient", {
                      required: "Sub-client is required",
                    })}
                    defaultValue={formData?.subClient || ""}
                  >
                    <option value="" disabled>
                      {" "}
                      Select Client
                    </option>
                    <option value="1">AUTO DEMO CLIENT 2-ACL</option>
                    <option value="2">GH DEMO CLIENT 2- U7A</option>
                    <option value="2">WC DEMO CLIENT 2- WMO</option>
                    <option value="3">WEB REEMOTE TRAINING QPA-4RY</option>
                  </Form.Select>
                  {errors.subClient && (
                    <div className="text-danger">
                      {errors.subClient.message}
                    </div>
                  )}
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <FloatingLabel
                  controlId="submit"
                  label="Submit"
                  value={formData?.submit}
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    {...register("submit", {
                      required: "Submit type is required",
                    })}
                    defaultValue={formData?.submit || ""}
                  >
                    <option value="" disabled>
                      {" "}
                      Select Submit Type
                    </option>
                    <option value="P" selected={formData?.submit === "P"}>
                      Provider
                    </option>
                    <option value="R" selected={formData?.submit === "R"}>
                      Client
                    </option>
                  </Form.Select>
                  {errors.submit && (
                    <div className="text-danger">{errors.submit.message}</div>
                  )}
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel
                  controlId="form_type"
                  label="Form Type"
                  value={formData?.entered}
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    {...register("form_type", {
                      required: "Form type is required",
                    })}
                    defaultValue={formData?.status || ""}
                  >
                    <option value="" disabled>
                      {" "}
                      Select Form Type
                    </option>
                    <option value="CMS">CMS</option>
                    <option value="UB04">UB04</option>
                  </Form.Select>
                  {errors.form_type && (
                    <div className="text-danger">
                      {errors.form_type.message}
                    </div>
                  )}
                </FloatingLabel>
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
                  {formData?._id ? "Update" : "Submit"}
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
