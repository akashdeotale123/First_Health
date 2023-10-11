import React, { useState } from "react";
// import "./batch.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import { HttpStatusCode } from "axios";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import PaginationComponent from "../../CommonComponents/Pagination";
import Batch from "./Batch";

export default function SearchTable({ data, isLoading }) {
  const [formData, setFormData] = useState({
    batch_no: "",
    entered: "",
    exceptions: "",
    status: "",
    priced: "",
    misdirect: "",
    receipt_date: "",
    client: "",
    submit: "",
    claims: "",
  });
  const handleClose = () => {
    var body = document.body;
    body.classList.remove("removeScroll");
    setShow(false);
  };

  const handleShow = (item,i) => {
    console.log("1111111111111111111111111111111111111", item);
    setFormData({
      batch_no: `${item.julnYr}-${item.julnDay}-${item.submitTyp}-${item.batchNum}`,
      entered: item.enterClmCnt,
      exceptions: item.excClmCnt,
      status: item.statusCd,
      priced: item.priceClmCnt,
      misdirect: item.misClmCnt,
      receipt_date: item.recptDt,
      client: `${item.cliId}-${item.cliAcronym}`,
      submit: item.submitTyp,
      claims: item.assignClmCnt,

      create_by :item.creatUsrNm,
      change_date : item.chngDt,
      team_name : item.teamNm,
      client_id : i,
    });

    var body = document.body;
    body.classList.add("removeScroll");
    setShow(true);
  };
  const [show, setShow] = useState(false);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const sortData = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  const sortedData = data?.data?.Batch?.sort((a, b) => {
    const aValue = a[sortColumn]?.toString()?.toLowerCase();
    const bValue = b[sortColumn]?.toString()?.toLowerCase();

    if (sortOrder === "asc") {
      if (sortColumn === "recptDt" || sortColumn === "creatDt") {
        return new Date(aValue) - new Date(bValue);
      } else {
        return aValue?.localeCompare(bValue);
      }
    } else {
      if (sortColumn === "recptDt" || sortColumn === "creatDt") {
        return new Date(bValue) - new Date(aValue);
      } else {
        return bValue?.localeCompare(aValue);
      }
    }
  });

  const getSortSymbol = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? " ▲" : " ▼";
    }
    return "";
  };

  const pageSize = 12;
  const totalPages = Math.ceil((sortedData?.length ?? 0) / pageSize);

  return (
    <>
      <section className="table-container">
        <Container className="mt-4 mb-4 ">
          <Table responsive striped hover size="md" className="table-table">
            <thead style={{ borderRadius: "5px" }}>
              <tr style={{}}>
                <th onClick={() => sortData("julnYr")}>
                  Batch{getSortSymbol("julnYr")}
                </th>
                <th onClick={() => sortData("statusCd")}>
                  Status{getSortSymbol("statusCd")}
                </th>
                <th onClick={() => sortData("cliAcronym")}>
                  Acro{getSortSymbol("cliAcronym")}
                </th>
                <th onClick={() => sortData("cliId")}>
                  Client{getSortSymbol("cliId")}
                </th>
                <th onClick={() => sortData("hspOcnFlg")}>
                  F{getSortSymbol("hspOcnFlg")}
                </th>
                <th onClick={() => sortData("assignClmCnt")}>
                  Claims{getSortSymbol("assignClmCnt")}
                </th>
                <th onClick={() => sortData("recptDt")}>
                  Receipt Dt{getSortSymbol("recptDt")}
                </th>
                <th onClick={() => sortData("creatDt")}>
                  Create Dt{getSortSymbol("creatDt")}
                </th>
                <th onClick={() => sortData("creatUsrNm")}>
                  Create By{getSortSymbol("creatUsrNm")}
                </th>
              </tr>
            </thead>
            <tr className="">
              <td colSpan={10} style={{ textAlign: "center", padding: "4" }}>
                {isLoading && <p>Loading...</p>}
                {!isLoading &&
                  data?.data?.Batch == null &&
                  !data?.data?.ServiceInfo?.message.includes(
                    "Expired Token"
                  ) && <p>No Data</p>}
                {!isLoading &&
                  data?.data?.ServiceInfo?.message.includes(
                    "Expired Token"
                  ) && <h5> Token Expired </h5>}
                {/* {!isLoading && !data?.httpStatus === HttpStatusCode.Ok && (
                  <h5> Error while retrieveing Data </h5>
                )} */}
              </td>
            </tr>
            <tbody>
              {sortedData
                ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item, i) => (
                  <tr key={i}>
                    <td>
                      <Link onClick={() => handleShow(item,i)}>
                        {`${item.julnYr}-${item.julnDay}-${item.submitTyp}-${item.batchNum}`}
                      </Link>
                    </td>
                    <td>{item.statusCd}</td>
                    <td>{item.cliAcronym}</td>
                    {/* <td>{item.Claim_Number.substring(0, 20)}</td> */}
                    {/* <td>{item.Claim_Number.length > 20 ? item.Claim_Number.substring(0, 20) + "..." : item.Claim_Number}</td> */}
                    <td className="text-start">
                      <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                          <Tooltip {...props}>
                            {/* {item.Claim_Number.length > 20 ? item.Claim_Number : null} */}
                            {item.cliId}
                          </Tooltip>
                        )}
                        placement="top"
                      >
                        <span>
                          {/* {item.cliId.length > 20
                            ? item.cliId.substring(0, 20) + "..."
                            : item.cliId} */}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>{item.hspOcnFlg}</td>
                    <td>{item.assignClmCnt}</td>
                    <td>{item.recptDt}</td>
                    <td>{item.creatDt}</td>
                    <td>{item.creatUsrNm}</td>
                    {/* <td>
                      <div className="d-flex list-unstyled">
                        <li>
                          <NavDropdown
                            className="hide-arrow"
                            title={<LuEdit className="table-icon" />}
                          >
                            <NavDropdown.Item href="#action/3.1">
                              {" "}
                              <AiFillEye className="table-icon" />
                              &nbsp;&nbsp;&nbsp; View{" "}
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">
                              {" "}
                              <AiTwotoneEdit className="table-icon" />
                              &nbsp;&nbsp;&nbsp; Edit{" "}
                            </NavDropdown.Item>
                          </NavDropdown>
                        </li>
                        <li>
                          &nbsp;&nbsp;&nbsp;
                          <AiOutlineDelete className="table-icon" />
                        </li>
                      </div>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end pagination">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Container>
      </section>

      <Offcanvas
        id="sidebar_form"
        show={show}
        onHide={handleClose}
        placement="end"
        scroll
      >
        <Offcanvas.Header >
          <Offcanvas.Title className="sidebar_header">
            <h1 className="text-center">Edit / View Batch</h1>
            {/* <div className="sidebar_header">
            <h1>Edit / View Batch</h1>
          </div> */}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
          
          <Batch handleClose={handleClose} formData={formData} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
