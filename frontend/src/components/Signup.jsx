import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import signupImage from "../assets/images/signuppageimage.jpg"; // Import the image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Header2 from "./Header2"; // Assuming this is the header component

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all fields correctly!");
      return;
    }

    try {
      const formData = { username: name, password, email };
      const response = await signup(formData, { withCredentials: true });

      setMessage(response.data.message || "Sign-up successful!");
      navigate("/user-input");
    } catch (error) {
      setMessage(error.response?.data.error || "Please try again");
    }
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Header2 />
      <Row className="flex-grow-1 g-0">
        {/* Left side with image */}
        <Col
          md={6}
          className="position-relative p-0"
          style={{
            height: "100vh", // Ensure it stretches the full height
          }}
        >
          <img
            src={signupImage}
            alt="Sign Up"
            className="img-fluid"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%", // Ensure the image fills the column height
            }}
          />
          {/* Text overlay */}
          <div
            className="text-overlay"
            style={{
              position: "absolute",
              top: "45%",
              left: "5%",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "2.5rem", // Larger text size
            }}
          >
            Explore your personalized fitness plan
          </div>
        </Col>

        {/* Right side with form */}
        <Col
          md={6}
          lg={6} // Adjust the column size for consistency
          className="d-flex align-items-center justify-content-center px-5"
          style={{
            minHeight: "100vh", // Ensure the form section also stretches to full height
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="signup-form-container" style={{ width: "70%" }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Display success/error message */}
              {message && (
                <div className="alert alert-info text-center mb-3">
                  {message}
                </div>
              )}

              <Button
                className="custom-button w-100"
                type="submit"
                disabled={!validateForm()}
              >
                Sign Up <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
