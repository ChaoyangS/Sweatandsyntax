import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addUserDetails } from "../services/api"; // Import API function
import userInputImage from '../assets/images/userinputform-image.png'; // Import image
import { Col } from 'react-bootstrap'; // Import Col from react-bootstrap

const UserInputForm = () => {
  const location = useLocation(); // Get user info from the previous page (SignUp)
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  // Destructure the name and email from the previous page's state
  const { name = "User", email = "" } = location.state || {};

  // Helper function to capitalize the first letter
  const capitalize = (str) => str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!age || !weight || !height || !activityLevel || !gender) {
      alert("Please fill out all fields!");
      return;
    }

    const formData = {
      name,
      email,
      age,
      weight,
      height,
      activityLevel,
      gender,
    };

    try {
      const response = await addUserDetails(formData);
      console.log("API Response:", response); // Debug response
      setMessage(response.data.message || "Details submitted successfully!");
      navigate("/workout-goals", { state: formData }); // Ensure correct path
    } catch (error) {
      console.error("Submission Error:", error);
      setMessage(error.response?.data.error || "Error submitting details.");
    }
  };

  return (
    <div className="UserInputForm container my-5 d-flex">
      <div className="col-md-6" style={{ padding: "20px" }}>
        <h2 className="text-center mb-4" style={{ fontSize: "35px", marginTop: "120px" }}>
          Hi, {capitalize(name)}! We'd like to get to know you
        </h2>
        <h3 className="text-center mb-4" style={{ color: "grey", fontSize: "22px", fontWeight: "300" }}>
          Based on your answers, we will suggest features that work best for you.
        </h3>
        <img
          src={userInputImage}
          alt="User Input Form"
          className="img-fluid"
          style={{
            maxWidth: "80%",
            margin: "0 auto",
            display: "block",
            borderRadius: "8px",
          }}
        />
      </div>

      <Col
        md={7}
        lg={7}
        className="d-flex align-items-center justify-content-center px-5"
        style={{ padding: "20px" }}
      >
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <fieldset className="mb-3">
            <legend className="form-label">Age:</legend>
            <input
              type="number"
              id="age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              placeholder="Enter your age"
            />
          </fieldset>

          <fieldset className="mb-3">
            <legend className="form-label">Weight (kg):</legend>
            <input
              type="number"
              id="weight"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              placeholder="Enter your weight"
            />
          </fieldset>

          <fieldset className="mb-3">
            <legend className="form-label">Height (cm):</legend>
            <input
              type="number"
              id="height"
              className="form-control"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              placeholder="Enter your height in cm"
            />
          </fieldset>

          <fieldset className="mb-3">
            <legend className="form-label">Gender:</legend>
            <div className="form-check">
              <input
                type="radio"
                id="male"
                name="gender"
                className="form-check-input"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="female"
                name="gender"
                className="form-check-input"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="other"
                name="gender"
                className="form-check-input"
                value="Other"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="other" className="form-check-label">
                Other
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-3">
            <legend className="form-label">How active are you?</legend>
            <div className="form-check">
              <input
                type="radio"
                id="sedentary"
                name="activityLevel"
                className="form-check-input"
                value="Sedentary"
                onChange={(e) => setActivityLevel(e.target.value)}
                required
              />
              <label htmlFor="sedentary" className="form-check-label">
                Sedentary (little to no exercise)
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="light"
                name="activityLevel"
                className="form-check-input"
                value="Lightly Active"
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              <label htmlFor="light" className="form-check-label">
                Lightly Active (light exercise 1-3 days/week)
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="moderate"
                name="activityLevel"
                className="form-check-input"
                value="Moderately Active"
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              <label htmlFor="moderate" className="form-check-label">
                Moderately Active (moderate exercise 3-5 days/week)
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="veryActive"
                name="activityLevel"
                className="form-check-input"
                value="Very Active"
                onChange={(e) => setActivityLevel(e.target.value)}
              />
              <label htmlFor="veryActive" className="form-check-label">
                Very Active (hard exercise 6-7 days/week)
              </label>
            </div>
          </fieldset>

          <button type="submit" className="custom-button">
            Submit
          </button>
        </form>
      </Col>
    </div>
  );
};

export default UserInputForm;
