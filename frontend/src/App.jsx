import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import "./styles/Global.css"; // Ensure the correct path based on your folder structure

import SignUp from "./components/Signup"; // Import SignUp component
import Login from "./components/Login"; // Import Login component
import UserInputForm from "./components/UserInputForm"; // Import UserInputForm component
import SummaryPage from "./components/SummaryPage"; // Import SummaryPage component
import WorkoutGoalsPage from "./components/WorkoutGoalsPage"; // Import WorkoutGoalsPage
import PersonalPage from "./pages/PersonalPage/PersonalPage"; // Import PersonalPage

import Header2 from "./components/Header2";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap's CSS globally

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header2 /> Include Header in the App component */}
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-input" element={<UserInputForm />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/workout-goals" element={<WorkoutGoalsPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
