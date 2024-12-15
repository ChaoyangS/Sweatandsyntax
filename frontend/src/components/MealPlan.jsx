import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import mondayMeal from "../assets/monday-meal.jpg";
import tuesdayMeal from "../assets/tuesday-meal.jpg";
import wednesdayMeal from "../assets/wednesday-meal.jpg";
import thursdayMeal from "../assets/thursday-meal.jpg";
import fridayMeal from "../assets/friday-meal.jpg";

const MealPlan = () => {
  const days = [
    {
      day: "Monday",
      image: mondayMeal,
      description: "Grilled chicken with vegetables",
    },
    {
      day: "Tuesday",
      image: tuesdayMeal,
      description: "Banana walnut muffin",
    },
    {
      day: "Wednesday",
      image: wednesdayMeal,
      description: "Strawberry Acai protein smoothie",
    },
    {
      day: "Thursday",
      image: thursdayMeal,
      description: "Steak pesto pasta",
    },
    {
      day: "Friday",
      image: fridayMeal,
      description: "Salmon broccoli rice",
    },
  ];

  return (
    <Carousel>
      {days.map((day, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={day.image}
            alt={`${day.day} meal`}
          />
          <Carousel.Caption>
            <h3>{day.day}</h3>
            <p>{day.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MealPlan;
