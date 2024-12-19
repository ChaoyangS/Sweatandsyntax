import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/LoginPage.css";
import { login } from "../services/api"; // Import the login API function

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate(); // Hook for navigation

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Call the login API
      const response = await login({ email, password });

      if (response.data.success) {
        // On successful login, navigate to UserInputForm
        navigate("/user-input");
      } else {
        // Display an error message
        setError(response.data.message || "Invalid login credentials");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>} {/* Display error */}

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
