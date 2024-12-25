import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import "./styles/Global.css"; // Ensure the correct path based on your folder structure

import SignUp from "./components/Signup"; // Import SignUp component
import Login from "./components/Login"; // Import Login component
import UserInputForm from "./components/UserInputForm"; // Import UserInputForm component
import SummaryPage from "./components/SummaryPage"; // Import SummaryPage component
import WorkoutGoalsPage from "./components/WorkoutGoalsPage"; // Import WorkoutGoalsPage
import PersonalPage from "./pages/PersonalPage/PersonalPage"; // Import PersonalPage

import Header from "./components/Header"; // Import the Header component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap's CSS globally

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Include Header in the App component */}
        {/* Define Routes */}
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-input" element={<UserInputForm />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/workout-goals" element={<WorkoutGoalsPage />} />
          <Route path="/personal" element={<PersonalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
