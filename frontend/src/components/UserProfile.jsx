import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import Profile from "../components/Profile";
import MealPlan from "../components/MealPlan";
import WorkoutPlan from "../components/WorkoutPlan";

export default function UserProfile() {
  return (
    <>
      <Profile />
      <MealPlan />
      <WorkoutPlan />
    </>
  );
}
