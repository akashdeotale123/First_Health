import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {
      email: validateEmail(formData.email) ? "" : "Enter a valid email",
      password: formData.password ? "" : "Password is required",
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData  
      );
      const { token, user } = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response?.data?.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error?.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section>
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          color: "hsl(217, 10%, 50.8%)",
          backgroundColor: "hsl(0, 0%, 96%)",
        }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <h2 class="fw-bold mb-2 text-center mb-4">Log in</h2>
                  <Form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <Col md={12}>
                        <FloatingLabel controlId="email" label="Email address">
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </div>

                    <div className="form-outline mb-4">
                      <Col md={12}>
                        <FloatingLabel controlId="password" label="Password">
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      <a href="#!">Forgot password?</a>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-100"
                    >
                      Sign in
                    </Button>
                    <div className="mt-4 text-center ">
                      <label className="form-check-label " htmlFor="rememberMe">
                        Don't have an account? <a href="/signup">Sign Up</a>
                      </label>
                    </div>
                    {/* <div className="divider d-flex align-items-center my-4">
                      <p className="text-center fw-bold mx-3 mb-0 text-muted">
                        OR
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100 mb-2"
                      style={{ backgroundColor: "#3b5998" }}
                    >
                      <i className="fab fa-facebook-f me-2"></i> Continue with
                      Facebook
                    </Button>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100"
                      style={{ backgroundColor: "#55acee" }}
                    >
                      <i className="fab fa-twitter me-2"></i> Continue with
                      Twitter
                    </Button> */}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
