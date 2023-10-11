import React, { useState } from "react";
import "../../Assets/Css/comman.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import Offcanvas from "react-bootstrap/Offcanvas";


export default function SearchClaim() {
  const [formatValue, setFormatValue] = useState("");
  const [status_Close, setStatus_Close] = useState(true);
  const [creditBatchNumber, SetCreditBatchNumber] = useState("");
  const [show, setShow] = useState(false);

  console.log("status_Close", status_Close);
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = form;

  // const {
  //   mutate: searchBatchMutate,
  //   data: searchResponse,
  //   isLoading,
  //   isError,
  // } = useMutation({
  //   mutationFn: (request) => batchSearchApi(request),
  //   onSuccess: (data) => {
  //     console.log("onsuccess->", data);
  //   },
  //   onError: (error) => {
  //     console.log("OnError ->", error);
  //   },
  // });

  // clientSelectIteamValue = client.getId() + "~" + cliName + "~" + cmmnName + "~" + client.getAcronym();

  const extractSubClientField = (data, field) => {
    let cliId;
    let cliName;
    let commonName;
    let cliAcro;

    if (data.subclient && !data.subclient.includes("Select")) {
      const cliArray = data.subclient.split("~");

      cliId = cliArray[0] ? cliArray[0] : "0";
      cliName = cliArray[1];
      commonName = cliArray[2];
      cliAcro = cliArray[3];

      switch (field) {
        case "clientId":
          return +cliId;
        case "clientName":
          return cliName;
        case "commonName":
          return commonName;
        case "clientAcro":
          return cliAcro;

        default:
          return "";
      }
    } else {
      return "";
    }
  };

  const onSubmit = async (data) => {
    const request_old = {
      ServiceInfo: {
        usrNm: "JSONTEST",
        clientAppEnv: "FHINT",
        enableVerboseLog: 1,
      },
      Batch: {
        julnYr: data.batchnumber && data.batchnumber.split("-")[0],
        julnDay: data.batchnumber && data.batchnumber.split("-")[1],
        submitTyp: data.batchnumber && data.batchnumber.split("-")[2],
        batchNum: data.batchnumber && data.batchnumber.split("-")[3],
        statusCd: data.status,
        recptDt: data.receiptdate,
        creatDt: data.createdate,
        cliId: extractSubClientField(data, "clientId"),
      },
    };

    const request = {
      batchNumber: data?.batchnumber,
      status: data?.status,
      clientId:
        extractSubClientField(data, "clientId") === ""
          ? 0
          : extractSubClientField(data, "clientId"),
      recieptDate: data?.receiptdate,
      createDate: data?.createdate,
      createdBy: data?.createdby,
    };
    console.log("Search form Submit - request -> ", request);
    // console.log("form Submitted - data", data);
    // searchBatchMutate(request);
  };

  // const handleCardNumberChange = (e) => {
  //   let value = e.target.value;
  //   const formatted = value.replace(/[^0-9A-Z]/g, "");
  //   const formattedWithDashes = formatted.replace(
  //     /(\d{3})(\d{3})(\d{1})(\d{6})/,
  //     "$1-$2-$3-$4"
  //   );
  //   const limitedValue = formattedWithDashes.slice(0, 16);
  //   setFormatValue(limitedValue);
  //   if (value == ""){
  //     console.log("valur",value);
  //     setStatus_Close(true);
  //   }
  //   else  {
  //     if (!errors.batchnumber){
  //       console.log("kanda")
  //       setStatus_Close(false);
  //       return true;
  //     }

  //   }
  // };

  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    const formattedInput = formatcreditBatchNumber(input);
    SetCreditBatchNumber(formattedInput);
    if (input == "") {
      console.log("valur", input);
      setStatus_Close(true);
    } else {
      if (!errors.batchnumber) {
        console.log("kanda");
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

  const validatefield = (e) => {
    const batchnumber = getValues("batchnumber");
    const status = getValues("status");
    const receiptdate = getValues("receiptdate");

    if (batchnumber || status || receiptdate) {
      setStatus_Close(false);
      return true;
    } else {
      return "This field is required.";
    }
  };

  const handleOnChange = (e) => {
    if (!errors.batchnumber || !errors.receiptdate || !errors.status) {
      setStatus_Close(false);
      return true;
    } else {
      return "This field is required.";
    }
  };

  const handleClose = () => {
    var body = document.body;
    body.classList.remove("removeScroll");
    setShow(false);
  };

  const handleShow = () => {
    var body = document.body;
    body.classList.add("removeScroll");
    setShow(true);
  };

  return (
    <div>
      <Container className="main-page p-3">
        <Stack direction="horizontal" gap={3}>
          {/* <h1 className="main-text">Search Batch</h1> */}
          <div className="bt-button ms-auto">
            <Link onClick={() => handleShow()}>
              <Button variant="light" size="lg" className="bt-button">
                <BiPlusMedical /> Create Claim
              </Button>
            </Link>
            {/* <Link to={"/createbatch"}>
              <Button variant="light" size="lg" className="bt-button">
                <BiPlusMedical /> Create Batch
              </Button>
            </Link> */}
          </div>
        </Stack>

        <Accordion defaultActiveKey="0" className="mt-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h3 className="main-text">Search Claim</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  {(errors.batchnumber ||
                    errors.receiptdate ||
                    errors.status) && (
                    <span style={{ color: "red" }}>
                      <span>
                        The first two 3 character parts of the Batch Number 'OR'
                      </span>
                      <br />
                      <span>A Status Code (other than '10') 'Or'</span>
                      <br />
                      <span>A Receipt Date must be included in query.</span>
                      <br />
                    </span>
                  )}
                </div>
                <Row className="mt-4">
                  <Col xs={4}>
                    <Form.Floating>
                      <Form.Control
                        id="batchnumber"
                        // type="number"
                        placeholder=" Batch No "
                        type="text"
                        value={creditBatchNumber}
                        maxLength={16}
                        {...register("batchnumber", {
                          // validate: validatefield,
                          minLength: {
                            value: 7,
                            message:
                              "Batch Number must be at least 6 characters long.",
                          },
                          required: false,
                        })}
                        onChange={handleCardNumberChange}
                      />
                      {errors.batchnumber && (
                        <div className="text-danger">
                          {errors.batchnumber.message}
                        </div>
                      )}
                      <label htmlFor="batchnumber">Batch No </label>
                    </Form.Floating>
                  </Col>

                  <Col md={4}>
                    <FloatingLabel controlId="status" label="Status ">
                      <Form.Select
                        aria-label="Status"
                        {...register("status", { validate: validatefield })}
                        onChange={handleOnChange}
                      >
                        <option defaultValue value="">
                          Select Status{" "}
                        </option>
                        <option value="01">01 Assigned, No Entry</option>
                        <option value="02">02 In Process</option>
                        <option value="03">03 Claims Entered</option>
                        <option value="05">
                          05 Uploading Processed Claims
                        </option>
                        <option value="10" disabled={status_Close}>
                          10 Close
                        </option>
                      </Form.Select>
                      <div style={{ color: "red" }}>
                        {" "}
                        {/* {errors.status && <span>This field is required.</span>} */}
                      </div>
                    </FloatingLabel>
                  </Col>

                  <Col md={4}>
                    <Form.Floating>
                      <Form.Control
                        id="receiptdate"
                        type="date"
                        {...register("receiptdate", {
                          validate: validatefield,
                        })}
                        placeholder="Receipt Date "
                        max={new Date().toISOString().split("T")[0]}
                        onChange={handleOnChange}
                      />
                      <label htmlFor="receiptdate">Receipt Date </label>
                    </Form.Floating>
                    {/* <div style={{ color: 'red' }}> <ErrorMessage errors={errors.receiptdate} name="receiptdate" /></div> */}
                    {/* {errors.receiptdate && <span style={{ color: "red" }}>This field is required.</span>} */}
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={4}>
                    <Form.Floating>
                      <Form.Control
                        id="createdate"
                        {...register("createdate")}
                        type="date"
                        placeholder="Create Date"
                        max={new Date().toISOString().split("T")[0]}
                      />
                      <label htmlFor="createdate">Create Date</label>
                    </Form.Floating>
                    <div style={{ color: "red" }}>
                      {" "}
                      {/* <ErrorMessage errors={errors} name="createdate" /> */}
                    </div>
                  </Col>

                  <Col md={4}>
                    <Form.Floating>
                      <Form.Control
                        id="createdby"
                        type="text"
                        {...register("createdby")}
                        placeholder="Created by"
                      />
                      <label htmlFor="createdby">Created by</label>
                    </Form.Floating>
                  </Col>

                  <Col md={4}>
                    <FloatingLabel controlId="subclient" label="Sub Client">
                      <Form.Select
                        aria-label="Sub Client dropdown"
                        {...register("subclient")}
                      >
                        <option>Select Sub Client</option>
                        <option value="AUTO DEMO CLIENT 2-ACL">
                          AUTO DEMO CLIENT 2-ACL
                        </option>
                        <option value="1276~GH DEMO CLIENT 2~AA~U7A">
                          GH DEMO CLIENT 2- U7A
                        </option>
                        <option value="1456~WC DEMO CLIENT 2~AA~WMO">
                          WC DEMO CLIENT 2- WMO
                        </option>
                        <option value="4967~WEB REEMOTE TRAINING QPA~AA~4RY">
                          WEB REEMOTE TRAINING QPA-4RY
                        </option>
                      </Form.Select>
                    </FloatingLabel>
                    <div style={{ color: "red" }}>
                      {" "}
                      {/* <ErrorMessage errors={errors} name="subclient" /> */}
                    </div>
                  </Col>
                </Row>

                <div className="bt-button mt-5">
                  <Button
                    type="submit"
                    variant="light"
                    size="lg"
                    className="mx-2"
                  >
                    Search
                  </Button>
                  <Button
                    variant="light"
                    size="lg"
                    type="button"
                    // onClick={validationReset()}
                    onClick={() => {
                      reset({
                        batchnumber: "",
                        status: "",
                        receiptdate: "",
                        createdate: "",
                        createdby: "",
                        subclient: "",
                      });
                      setStatus_Close(true);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="mt-5">
          {/* <SearchTable data={searchResponse} /> */}
          {/* <SearchTableO /> */}
        </div>

        <Offcanvas
          id="sidebar_form"
          show={show}
          onHide={handleClose}
          placement="end"
          scroll
        >
          <Offcanvas.Header >
            <Offcanvas.Title className="sidebar_header">
              <h1 className="text-center">Create New Batch</h1>
              {/* <div className="sidebar_header">
            <h1>Edit / View Batch</h1>
          </div> */}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <Batch handleClose={handleClose} /> */}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
}
