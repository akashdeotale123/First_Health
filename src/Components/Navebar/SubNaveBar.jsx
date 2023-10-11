import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {  IoNotificationsCircle } from "react-icons/io5";
import Form from "react-bootstrap/Form";
import "./navebar.css";

import {
  AiTwotoneHome,
  AiFillDatabase,
  AiFillFile,
} from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import {
  BiUniversalAccess,
  BiCuboid,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Icon } from "@iconify/react";

export default function SubNaveBar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={isSmallScreen === false ? "d-sm-block" : "d-none"}
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/"} id="nav-text">
                <Nav.Link href="#features" id="nav-text-nav">
                  <AiTwotoneHome id="nav-icon" />
                  Home
                </Nav.Link>
              </Link>

              <NavDropdown
                title={
                  <div>
                    <AiFillDatabase id="nav-icon-drop" />
                    Activity
                  </div>
                }
                id="nav-text"
              >
                <NavDropdown.Item  id="dropdown-back">
                  <Link to={"/mcpsweb/searchbatch"} className="nav-link">
                    <span className="dropdown-text"><Icon icon="carbon:batch-job" id="nav-icon-drop" /> Batch</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item id="dropdown-back">
                  <Link to={"/mcpsweb/searchclaim"} className="nav-link">
                    {" "}
                    <span className="dropdown-text"> <Icon icon="akar-icons:reciept" id="nav-icon-drop" /> Claim</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item id="dropdown-back">
                  <Link to={"/mcpsweb/searchpatient"} className="nav-link">
                    {" "}
                    <span className="dropdown-text"><Icon icon="material-symbols:patient-list-outline"id="nav-icon-drop"/>{" "} Patient</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item id="dropdown-back">
                  <Link to={"/mcpsweb/searchprovider"} className="nav-link">
                  <span className="dropdown-text"><Icon icon="maki:doctor" id="nav-icon-drop" />Provider</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={
                  <div>
                    <AiFillFile id="nav-icon-drop" />
                    Reports
                  </div>
                }
                id="nav-text"
              >
                <NavDropdown.Item href="#action/3.1" id="dropdown-back">
                  <BiUniversalAccess id="nav-icon-drop" />
                  Exception
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1" id="dropdown-back">
                  <BiCuboid id="nav-icon-drop" />
                  Productivity
                </NavDropdown.Item>
              </NavDropdown>

              <Link to={"/mcpsweb/helpandsoupport"} id="nav-text">
                <Nav.Link href="#features" id="nav-text-nav">
                  <MdOutlineHelp id="nav-icon" />
                  Help
                </Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <FloatingLabel controlId="floatingSelectGrid" label="Client">
                <Form.Select aria-label="Floating label select example">
                  <option value="1">
                    VINTEGRA HEALTH CARE INC MEC [30917]
                  </option>
                  <option value="2">CLAIRE NOEL ENTERPRISES INC [29655]</option>
                  <option value="2">PATRIOT HOME CARE INC MEC [29717]</option>
                  <option value="3">TOWNSEND AND ASSOCIATES [27825]</option>
                  <option value="3">DAVE AND BUSTERS INC [27614]</option>
                </Form.Select>
              </FloatingLabel>

              <Nav.Link href="#deets">
                <IoNotificationsCircle className="symbole-size-bel-icon" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
