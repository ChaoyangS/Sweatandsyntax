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
    <div className="summary-container container my-5 d-flex">
      {/* Left side container for profile details */}
      <div className="col-md-6" style={{ padding: "20px" }}>
        <h2 className="summary-header mb-4" style={{ fontSize: '35px' }}>
          Hi, {name}!
        </h2>
        <p className="summary-subheader mb-4" style={{ color: 'grey', fontSize: '22px', fontWeight: '300' }}>
          We have generated your basic profile:
        </p>

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
          <button onClick={handleGoToWorkout} className="custom-button w-100">
            Continue
          </button>
        </div>
      </div>

      {/* Right side container for the profile image */}
      <div className="col-md-6 d-flex align-items-center justify-content-center px-5" style={{ padding: "20px" }}>
        <img
          src={profileImage}
          alt="Profile"
          className="img-fluid"
          style={{
            maxWidth: "70%",
            display: "block",
            borderRadius: "8px",
            marginTop: "120px",
          }}
        />
      </div>
    </div>
  );
};

export default SummaryPage;
