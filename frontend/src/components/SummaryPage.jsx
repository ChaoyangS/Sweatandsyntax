import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // We use useLocation to access passed data
import profileImage from "../assets/images/1bodytype.png"; // Import your image
import "../styles/SummaryPage.css"; // Make sure this path is correct

const SummaryPage = () => {
  const location = useLocation(); // Get passed state
  const navigate = useNavigate();

  // Destructure the passed data from the state
  const { name, age, weight, height, activityLevel, gender } =
    location.state || {};

  const handleGoToWorkout = () => {
    // Navigate to WorkoutGoalsPage with current user data
    navigate("/workout-goals", {
      state: { name, age, weight, height, activityLevel, gender },
    });
  };

  return (
    <div className="summary-container">
      {/* Left column for text */}
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

      {/* Right column for the image */}
      <div className="right-column">
        <img src={profileImage} alt="Profile" />
      </div>
    </div>
  );
};

export default SummaryPage;
