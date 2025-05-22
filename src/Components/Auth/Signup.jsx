import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    mobile: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    mobile: "",
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {
      fullname: formData.fullname ? "" : "Full name is required",
      email: validateEmail(formData.email) ? "" : "Enter a valid email",
      password: validatePassword(formData.password)
        ? ""
        : "Password must be 8+ characters, include uppercase, lowercase, number & special character",
      confirmPassword:
        formData.password === formData.confirmPassword
          ? ""
          : "Passwords do not match",
      gender: formData.gender ? "" : "Please select a gender",
      mobile: /^\d{10}$/.test(formData.mobile)
        ? ""
        : "Enter a valid 10-digit mobile number",
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      try {
        const response = await axios.post("http://localhost:5000/api/signup", {
          fullName: formData.fullname,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          gender: formData.gender,
          mobile: formData.mobile,
        });

        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response?.data?.msg ,
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/login");
        } else {
          alert("Error: Could not register user.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error?.response.data.msg ,
          showConfirmButton: false,
          timer: 1500
        });
      }
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
                    <h2 class="fw-bold mb-2 text-center mb-4">Register</h2>
                    
                  <Form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <Col md={12}>
                        <FloatingLabel controlId="fullname" label="Full name ">
                          <Form.Control
                            type="text"
                            placeholder="Enter Full name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            isInvalid={!!errors.fullname}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fullname}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </div>

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

                    <div className="form-outline mb-4">
                      <Col md={12}>
                        <FloatingLabel
                          controlId="confirmPassword"
                          label="Confirm Password"
                        >
                          <Form.Control
                            type="password"
                            placeholder="Enter confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </div>

                    <div className="form-outline mb-4">
                      <Col md={12}>
                        <FloatingLabel controlId="gender" label="Gender">
                          <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            isInvalid={!!errors.gender}
                          >
                            <option value="" disabled= "true">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.gender}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </div>

                    <div className="form-outline mb-4">
                      <Col md={12}>
                        <FloatingLabel
                          controlId="mobile"
                          label="Phone Number"
                        >
                          <Form.Control
                            type="mobile"
                            placeholder="Enter mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            isInvalid={!!errors.mobile}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.mobile}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </div>


                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div >                      
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                         Have an Account? <a href="/login">Login Here</a>
                        </label>
                      </div>
                      
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-100"
                    >
                      Sign Up
                    </Button>
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

export default Signup;
