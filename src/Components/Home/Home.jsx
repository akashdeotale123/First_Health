import React from "react";
import "./homecards.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Icon } from "@iconify/react";
// import HomeTable from './HomeTable';
import { Link } from "react-router-dom";
import MainNaveBar from "../Navebar/MainNaveBar";
import SubNaveBar from "../Navebar/SubNaveBar";

export default function HomeCards() {
  return (
    <>
      {/* <MainNaveBar />
            <SubNaveBar /> */}
      <div className="back-img">
        {/* <img src={img} alt="Your Image" style={{ "max-width": "100%" }}  className='back-img'/> */}
        <Container>
          <Row>
            <Col id="main-heading-grid" sm={7}>
              <span className="main-heading ">
                Welcome to the Web Remote Pricing tool
              </span>
              <br />
              <span className="sub-heading ">
                The Web Remote Pricing tool is a web-based applications that
                provides the ability for clients to remotely repricing claims.
              </span>
            </Col>
            <Col sm={5}></Col>
          </Row>

          <Row xs={1} sm={2} md={4}>
            <Col className="mb-1">
              <Card className="card-cst mt-5">
                <Card.Body>
                  <Icon icon="carbon:batch-job" className="card-icon" />
                  <Card.Title className="mt-4">
                    <span className="card-heading">
                      <Link className="link-text" to={"/mcpsweb/searchbatch"}>
                        Batch
                        <Icon icon="mingcute:right-line" />
                      </Link>
                    </span>
                  </Card.Title>
                  <Card.Text className="card-text">
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col className="mb-1">
              <Card className="card-cst mt-5">
                <Card.Body>
                  <Icon icon="akar-icons:reciept" className="card-icon" />
                  <Card.Title className="mt-4">
                    <span className="card-heading">
                      Claim <Icon icon="mingcute:right-line" />
                    </span>
                  </Card.Title>
                  <Card.Text className="card-text">
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col className="mb-1">
              <Card className="card-cst mt-5">
                <Card.Body>
                  <Icon
                    icon="material-symbols:patient-list-outline"
                    className="card-icon"
                  />
                  <Card.Title className="mt-4">
                    <span className="card-heading">
                      Patient <Icon icon="mingcute:right-line" />
                    </span>
                  </Card.Title>
                  <Card.Text className="card-text">
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col className="mb-1">
              <Card className="card-cst mt-5">
                <Card.Body>
                  <Icon icon="maki:doctor" className="card-icon" />
                  <Card.Title className="mt-4">
                    <span className="card-heading">
                      Provider <Icon icon="mingcute:right-line" />
                    </span>
                  </Card.Title>
                  <Card.Text className="card-text">
                    Some quick example text to .
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <HomeTable /> */}
    </>
  );
}
