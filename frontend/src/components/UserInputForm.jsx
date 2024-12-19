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
  const [focusPart, setFocusPart] = useState([]); // Change focusPart to an array
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
        focusPart, // Pass the array of selected focus parts
        workoutFrequency,
        workoutGoal,
        equipment, // Include equipment in the passed state
      },
    });
  };

  // Handle adding/removing focus parts
  const handleFocusPartClick = (part) => {
    if (focusPart.includes(part)) {
      // If part is already selected, remove it
      setFocusPart(focusPart.filter((item) => item !== part));
    } else {
      // Otherwise, add it to the selected parts
      setFocusPart([...focusPart, part]);
    }
  };

  return (
    <div className="WorkoutGoalsPage container my-5 d-flex">
      {/* Left side container for the image and text */}
      <div className="col-md-6" style={{ padding: "20px" }}>
        <h2 className="workout-goals-header mb-4">Hello, {name}! Let's get to know your workout goals.</h2>
        <h3 className="workout-goals-subheader mb-4">
          Based on your answers, we will suggest features that work best for you.
        </h3>
        <img
          src={workoutGoalImage}
          alt="Workout Goal"
          className="img-fluid"
          style={{
            maxWidth: "80%",
            margin: "0 auto",
            display: "block",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Right side container for the form */}
      <div className="col-md-6 d-flex align-items-center justify-content-center px-5" style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ width: '80%' }}>
          {/* Question 1: Which body part do you mostly want to focus on? */}
          <fieldset className="mb-4">
            <legend className="form-label">Which body part do you mostly want to focus on?</legend>
            <div className="d-flex justify-content-around flex-wrap">
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
                  className={`btn btn-outline-primary m-2 ${focusPart.includes(part.id) ? "active" : ""}`}
                  onClick={() => handleFocusPartClick(part.id)}
                >
                  <img
                    src={part.image}
                    alt={part.label}
                    className="img-fluid"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <p>{part.label}</p>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Question 2: How often can you work out a week? */}
          <fieldset className="mb-4">
            <legend className="form-label">How often can you work out a week?</legend>
            <div className="btn-group" role="group">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  type="button"
                  key={day}
                  className={`btn btn-outline-primary ${workoutFrequency === day ? "active" : ""}`}
                  onClick={() => setWorkoutFrequency(day)}
                >
                  {day} day{day > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Question 3: What is your general workout goal? */}
          <fieldset className="mb-4">
            <legend className="form-label">What is your general workout goal?</legend>
            <div className="btn-group" role="group">
              {["Cutting", "Bulking", "Maintaining"].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  className={`btn btn-outline-primary ${workoutGoal === goal ? "active" : ""}`}
                  onClick={() => setWorkoutGoal(goal)}
                >
                  {goal}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Question 4: What equipment do you usually use? */}
          <fieldset className="mb-4">
            <legend className="form-label">What equipment do you usually use?</legend>
            <div className="btn-group" role="group">
              {["Body Weight", "Gym Equipment"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`btn btn-outline-primary ${equipment === option ? "active" : ""}`}
                  onClick={() => setEquipment(option)}
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
              focusPart.length === 0 || 
              workoutFrequency === null ||
              !workoutGoal ||
              !equipment
            }
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutGoalsPage;
