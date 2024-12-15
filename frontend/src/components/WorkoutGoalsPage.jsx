import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/WorkoutGoalsPage.css";

// Import the images for the body parts
import legsImage from "../assets/images/legs.png";
import chestImage from "../assets/images/chest.png";
import absImage from "../assets/images/abs.png";
import armsImage from "../assets/images/arms.png";
import backImage from "../assets/images/back.png";
import shoulderImage from "../assets/images/shoulder.png";

const WorkoutGoalsPage = () => {
  const location = useLocation(); // Get the passed data
  const navigate = useNavigate(); // To navigate to the next page

  const { name, age, weight, height, activityLevel } = location.state || {}; // Extract the state passed from SummaryPage

  // Define the state for the user's input
  const [focusPart, setFocusPart] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState(null);
  const [workoutGoal, setWorkoutGoal] = useState("");
  const [equipment, setEquipment] = useState(""); // New state for equipment

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the next page, passing the answers as state
    navigate("/summary", {
      state: {
        name,
        age,
        weight,
        height,
        activityLevel,
        focusPart,
        workoutFrequency,
        workoutGoal,
        equipment, // Include equipment in the passed state
      },
    });
  };

  return (
    <div className="workout-goals-page">
      <h2>Hello, {name}! Let's get to know your workout goals.</h2>
      <form onSubmit={handleSubmit}>
        {/* Question 1: Which body part do you mostly want to focus on? */}
        <div>
          <label>Which body part do you mostly want to focus on?</label>
          <div className="focus-part-buttons">
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
                className={`image-option ${
                  focusPart === part.id ? "selected" : ""
                }`}
                onClick={() => setFocusPart(part.id)}
              >
                <img src={part.image} alt={part.label} />
                <p>{part.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: How often can you work out a week? */}
        <div>
          <label>How often can you work out a week?</label>
          <div className="workout-frequency-buttons">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                type="button"
                key={day}
                className={`frequency-option ${
                  workoutFrequency === day ? "selected" : ""
                }`}
                onClick={() => setWorkoutFrequency(day)}
              >
                {day} day{day > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Question 3: What is your general workout goal? */}
        <div>
          <label>What is your general workout goal?</label>
          <div className="workout-goal-buttons">
            {["Cutting", "Bulking", "Maintaining"].map((goal) => (
              <button
                type="button"
                key={goal}
                className={`goal-button ${
                  workoutGoal === goal ? "selected" : ""
                }`}
                onClick={() => setWorkoutGoal(goal)}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Question 4: What equipment do you usually use? */}
        <div>
          <label>What equipment do you usually use?</label>
          <div className="equipment-buttons">
            {["Body Weight", "Gym Equipment"].map((option) => (
              <button
                type="button"
                key={option}
                className={`equipment-option ${
                  equipment === option ? "selected" : ""
                }`}
                onClick={() => setEquipment(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={
            !focusPart ||
            workoutFrequency === null ||
            !workoutGoal ||
            !equipment
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default WorkoutGoalsPage;
