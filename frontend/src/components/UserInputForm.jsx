import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import navigate and useLocation

const UserInputForm = () => {
  const location = useLocation(); // Get the user info from previous page (SignUp)
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [gender, setGender] = useState(""); // New state for gender

  // Destructure the name and email from the previous page's state
  const { name, email } = location.state || {};

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!age || !weight || !height || !activityLevel || !gender) {
      alert("Please fill out all fields!");
      return;
    }

    // Store the form data in an object
    const formData = {
      name,
      email,
      age,
      weight,
      height,
      activityLevel,
      gender, // Include gender in the form data
    };

    // Redirect to the summary page and pass the form data
    navigate("/summary", { state: formData });
  };

  return (
    <div className="UserInputForm">
      <h2>Tell us about yourself</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Enter your age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            placeholder="Enter your weight"
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            placeholder="Enter your height in cm"
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>

        <div className="form-group">
          <label>How active are you?</label>
          <div>
            <input
              type="radio"
              id="sedentary"
              name="activityLevel"
              value="Sedentary"
              onChange={(e) => setActivityLevel(e.target.value)}
              required
            />
            <label htmlFor="sedentary">Sedentary (little to no exercise)</label>
          </div>
          <div>
            <input
              type="radio"
              id="light"
              name="activityLevel"
              value="Lightly Active"
              onChange={(e) => setActivityLevel(e.target.value)}
            />
            <label htmlFor="light">
              Lightly Active (light exercise 1-3 days/week)
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="moderate"
              name="activityLevel"
              value="Moderately Active"
              onChange={(e) => setActivityLevel(e.target.value)}
            />
            <label htmlFor="moderate">
              Moderately Active (moderate exercise 3-5 days/week)
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="veryActive"
              name="activityLevel"
              value="Very Active"
              onChange={(e) => setActivityLevel(e.target.value)}
            />
            <label htmlFor="veryActive">
              Very Active (hard exercise 6-7 days/week)
            </label>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInputForm;
