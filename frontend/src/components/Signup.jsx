import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signup } from "../services/api";
import "../styles/SignUpPage.css"; // Import the CSS file

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate to another page

  // Capitalize first letter of name
  const handleNameChange = (e) => {
    let inputName = e.target.value;
    inputName =
      inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase(); // Capitalize first letter
    setName(inputName); // Update name state with the formatted name
  };

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
      alert ("Please fill in all fields correctly!");
      return;
    }

    try {
      //send sign-up request to the back-end
      const formData = { username: name, password, email };
      const response = await signup(formData);

      setMessage(response.data.message || "Sign-up successful!");
      // After successful sign-up, navigate to the UserInputForm page
      navigate("/user-input", {
      state: { name, email }, // Pass the name and email to the next page
    });
    } catch (error) {
      setMessage(error.response?.data.error || "Please try again");
    }
  };

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange} // Use the handleNameChange function
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={!validateForm()}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
