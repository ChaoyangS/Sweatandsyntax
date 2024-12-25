import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/LoginPage.css";
import loginImage from "../assets/images/loginpageimage.jpg"; // Import the login image
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await login({ email, password });

      if (response.data.success) {
        navigate("/user-input");
      } else {
        setError(response.data.message || "Invalid login credentials");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  }

  return (
    <Container fluid className="vh-100">
      <Row className="h-100 g-0">
        {/* Left side with image */}
        <Col md={6} className="position-relative p-0">
          <img
            src={loginImage}
            alt="Login"
            className="img-fluid h-100"
            style={{ objectFit: "cover", width: "100%" }}
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
            Start your workout today <br /> with us
          </div>
        </Col>

        {/* Right side with form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center px-5"
        >
          <div className="login-form-container" style={{ width: "70%" }}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              {error && <div className="error-message text-danger mb-3">{error}</div>}

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button className="custom-button" type="submit" disabled={!validateForm()}>
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
