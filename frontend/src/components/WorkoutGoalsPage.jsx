import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/WorkoutGoalsPage.css"; // If you still want to keep custom styles, you can override Bootstrap styles here

// Import the images for the body parts
import legsImage from "../assets/images/legs.png";
import chestImage from "../assets/images/chest.png";
import absImage from "../assets/images/abs.png";
import armsImage from "../assets/images/arms.png";
import backImage from "../assets/images/back.png";
import shoulderImage from "../assets/images/shoulder.png";
import workoutGoalImage from "../assets/images/workoutgoal-image.jpg"; // The image for the left side

const WorkoutGoalsPage = () => {
  const location = useLocation(); // Get the passed data
  const navigate = useNavigate(); // To navigate to the next page

  const { name, age, weight, height, activityLevel } = location.state || {}; // Extract the state passed from SummaryPage

  // Define the state for the user's input
  const [focusPart, setFocusPart] = useState(null); // Now a single selection (not an array)
  const [workoutFrequency, setWorkoutFrequency] = useState(null);
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [equipment, setEquipment] = useState(""); // New state for equipment

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the next page, passing the answers as state
    navigate("/personal", {
      state: {
        name,
        age,
        weight,
        height,
        activityLevel,
        focusPart, // Pass the selected focus part
        workoutFrequency,
        workoutGoal,
        equipment, // Include equipment in the passed state
      },
    });
  };

  // Handle focus part selection (single selection logic)
  const handleFocusPartClick = (part) => {
    setFocusPart(part); // Set the clicked part as the only selected one
  };

  return (
    <div className="WorkoutGoalsPage container-fluid vh-100">
      <div className="row h-100 g-0">
        {/* Left side with image and overlay */}
        <div className="col-md-6 position-relative p-0">
          <img
            src={workoutGoalImage}
            alt="Workout Goal"
            className="img-fluid h-100"
            style={{ objectFit: "cover", width: "100%" }}
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
            Let's get to know your workout goals
          </div>
        </div>

        {/* Right side with form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center px-5" style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            {/* Question 1: Which body part do you mostly want to focus on? (Single select with button style) */}
            <fieldset className="mb-4">
              <legend className="form-label mb-3" style={{ fontWeight: "bold" }}>Which body part do you mostly want to focus on?</legend>
              <div className="d-flex flex-wrap justify-content-between">
                {[ 
                  { id: "legs", image: legsImage, label: "Legs" },
                  { id: "chest", image: chestImage, label: "Chest" },
                  { id: "abs", image: absImage, label: "Abs" },
                  { id: "arms", image: armsImage, label: "Arms" },
                  { id: "back", image: backImage, label: "Back" },
                  { id: "shoulder", image: shoulderImage, label: "Shoulders" },
                ].map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    className={`btn btn-outline-primary m-2 ${focusPart === part.id ? "active" : ""}`}
                    onClick={() => handleFocusPartClick(part.id)}
                    style={{ width: "25%", marginBottom: "5px" }} // Button width set to 30% for 3 in a row
                  >
                    <img
                      src={part.image}
                      alt={part.label}
                      className="img-fluid"
                      style={{ width: '80px', height: '80px', marginTop: "8px" }}
                    />
                    <p>{part.label}</p>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Question 2: How often can you work out a week? */}
            <fieldset className="mb-4">
              <legend className="form-label mb-3" style={{ fontWeight: "bold" }}>How often can you work out a week?</legend>
              <div className="btn-group d-flex justify-content-between flex-wrap" role="group">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <button
                    type="button"
                    key={day}
                    className={`btn btn-outline-primary ${workoutFrequency === day ? "active" : ""}`}
                    onClick={() => setWorkoutFrequency(day)}
                    style={{ width: "14%", marginBottom: "10px" }} // Set button width for multiple options
                  >
                    {day} day{day > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Question 3: What is your general workout goal? */}
            <fieldset className="mb-4">
              <legend className="form-label mb-3" style={{ fontWeight: "bold" }}>What is your general workout goal?</legend>
              <div className="btn-group d-flex justify-content-between flex-wrap" role="group">
                {["Cutting", "Bulking", "Maintaining"].map((goal) => (
                  <button
                    type="button"
                    key={goal}
                    className={`btn btn-outline-primary ${workoutGoal === goal ? "active" : ""}`}
                    onClick={() => setWorkoutGoal(goal)}
                    style={{ width: "30%", marginBottom: "10px" }} // Set width for goal options
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Question 4: What equipment do you usually use? */}
            <fieldset className="mb-4">
              <legend className="form-label mb-3" style={{ fontWeight: "bold" }}>What equipment do you usually use?</legend>
              <div className="btn-group d-flex justify-content-between flex-wrap" role="group">
                {["Body Weight", "Gym Equipment"].map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`btn btn-outline-primary ${equipment === option ? "active" : ""}`}
                    onClick={() => setEquipment(option)}
                    style={{ width: "45%", marginBottom: "10px" }} // Set width for equipment options
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Submit button */}
            <button
              type="submit"
              className="custom-button w-100"
              disabled={ 
                !focusPart || 
                workoutFrequency === null || 
                !workoutGoal || 
                !equipment
              }
              style={{ width: '100%', padding: '10px', fontSize: '18px' }} // Style for the continue button
            >
              Suggest customized fitness plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutGoalsPage;
