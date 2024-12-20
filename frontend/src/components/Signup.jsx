import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import signupImage from "../assets/images/signuppageimage.jpg"; // Import the image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
      const response = await signup(formData);

      setMessage(response.data.message || "Sign-up successful!");
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data.error || "Please try again");
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100 g-0">
        {/* Left side with image */}
        <Col md={5} className="d-none d-md-block p-0">
          <img
            src={signupImage}
            alt="Sign Up"
            className="img-fluid h-100"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Col>

        {/* Right side with form */}
        <Col
          md={7} lg={7}  // Adjust to give more width on larger screens
          className="d-flex align-items-center justify-content-center px-5"
        >
          <div className="signup-form-container" style={{ width: "60%" }}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: "100%" }}
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

              <Button className="custom-button" type="submit" disabled={!validateForm()}>
                Sign Up  <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
