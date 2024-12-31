import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addUserDetails } from "../services/api";
import userinputimage from "../assets/images/userinputimage.jpg";
import { Col } from "react-bootstrap";
import Header2 from "./Header2";

const UserInputForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [activity_level, setactivity_level] = useState("");
  const [message, setMessage] = useState("");

  const { name = "User", email = "" } = location.state || {};

  const capitalize = (str) =>
    str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!age || !weight || !height || !gender || !activity_level) {
      alert("Please fill out all fields!");
      return;
    }

    const formData = {
      name,
      age,
      weight,
      height,
      gender,
      activity_level,
    };

    try {
      const response = await addUserDetails(formData);
      console.log("API Response:", response);
      setMessage(response.message || "Details submitted successfully!");
      navigate("/workout-goals", { state: formData });
    } catch (error) {
      console.error("Submission Error:", error);
      setMessage(error.response?.data.error || "Error submitting details.");
    }
  };

  return (
    <div
      className="UserInputForm container-fluid d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <Header2 />
      <div className="row flex-grow-1 g-0">
        {/* Left side with image and overlay */}
        <div className="col-md-6 position-relative p-0">
          <img
            src={userinputimage}
            alt="User Input"
            className="img-fluid"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <div
            className="text-overlay"
            style={{
              position: "absolute",
              top: "45%",
              left: "5%",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "2.5rem",
            }}
          >
            We'd like to know more about you
          </div>
        </div>

        {/* Right side with form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center px-5"
          style={{ padding: "20px" }}
        >
          <form onSubmit={handleSubmit} style={{ width: "80%" }}>
            <fieldset className="mb-3">
              <legend className="form-label mb-3">
                <strong>Age:</strong>
              </legend>
              <input
                type="number"
                id="age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                placeholder="Enter your age"
                min="1"
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="form-label mb-3">
                <strong>Weight (kg):</strong>
              </legend>
              <input
                type="number"
                id="weight"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                placeholder="Enter your weight"
                min="1"
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="form-label mb-3">
                <strong>Height (cm):</strong>
              </legend>
              <input
                type="number"
                id="height"
                className="form-control"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                placeholder="Enter your height in cm"
                min="1"
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="form-label mb-3">
                <strong>Gender:</strong>
              </legend>
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
              <legend className="form-label mb-3">
                <strong>Activity Level:</strong>
              </legend>
              <div className="form-check">
                <input
                  type="radio"
                  id="beginner"
                  name="activity_level"
                  className="form-check-input"
                  value="Beginner"
                  onChange={(e) => setactivity_level(e.target.value)}
                  required
                />
                <label htmlFor="beginner" className="form-check-label">
                  Beginner
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="intermediate"
                  name="activity_level"
                  className="form-check-input"
                  value="Intermediate"
                  onChange={(e) => setactivity_level(e.target.value)}
                />
                <label htmlFor="intermediate" className="form-check-label">
                  Intermediate
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="advanced"
                  name="activity_level"
                  className="form-check-input"
                  value="Advanced"
                  onChange={(e) => setactivity_level(e.target.value)}
                />
                <label htmlFor="advanced" className="form-check-label">
                  Advanced
                </label>
              </div>
            </fieldset>

            <button type="submit" className="custom-button">
              Submit
            </button>
          </form>
        </Col>
      </div>
    </div>
  );
};

export default UserInputForm;
