import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import maleImage from "../assets/images/2bodytype.png";
import femaleImage from "../assets/images/1bodytype.png";
import "../styles/SummaryPage.css";

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, age, weight, height, activityLevel, gender } = location.state || {};

  // Normalize and select image
  const normalizedGender = gender?.trim().toLowerCase();
  console.log("Gender:", normalizedGender); // Debugging log
  const profileImage = normalizedGender === "male" ? maleImage : femaleImage;

  const handleGoToWorkout = () => {
    navigate("/workout-goals", {
      state: { name, age, weight, height, activityLevel, gender },
    });
  };

  return (
    <div className="summary-container">
      <div className="left-column">
        <h2>Hi, {name}!</h2>
        <p>We have generated your basic profile:</p>

        <div className="profile-details">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Weight:</strong> {weight} kg
          </p>
          <p>
            <strong>Height:</strong> {height} cm
          </p>
          <p>
            <strong>Activity Level:</strong> {activityLevel}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
        </div>

        <div className="continue-section">
          <p className="highlight-text">
            We'd like to know more about your workout goals!
          </p>
          <button onClick={handleGoToWorkout}>Continue</button>
        </div>
      </div>

      <div className="right-column">
        <img src={profileImage} alt="Profile" />
      </div>
    </div>
  );
};

export default SummaryPage;
