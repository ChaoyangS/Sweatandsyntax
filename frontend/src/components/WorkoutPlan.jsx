import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import legs from "../assets/legs.jpg";
import plank from "../assets/plank.jpg";
import pushups from "../assets/pushups.jpg";
import squats from "../assets/squats.jpg";
import lunge from "../assets/lunge.jpg";

const WorkoutPlan = () => {
  const workoutDays = [
    {
      day: "Monday",
      exercises: [
        {
          gesture: "Push-Ups",
          image: pushups,
          time: "10 minutes",
          sets: "3 sets of 15 reps",
          area: "Chest, Shoulders, Triceps",
        },
        {
          gesture: "Plank",
          image: plank,
          time: "5 minutes",
          sets: "3 sets of 1 minute each",
          area: "Core",
        },
      ],
    },
    {
      day: "Tuesday",
      exercises: [
        {
          gesture: "Squats",
          image: squats,
          time: "15 minutes",
          sets: "4 sets of 20 reps",
          area: "Legs, Glutes",
        },
        {
          gesture: "Lunges",
          image: lunge,
          time: "10 minutes",
          sets: "3 sets of 15 reps per leg",
          area: "Legs, Glutes",
        },
      ],
    },
    {
      day: "Wednesday",
      exercises: [
        {
          gesture: "Squats",
          image: squats,
          time: "15 minutes",
          sets: "4 sets of 20 reps",
          area: "Legs, Glutes",
        },
        {
          gesture: "Lunges",
          image: lunge,
          time: "10 minutes",
          sets: "3 sets of 15 reps per leg",
          area: "Legs, Glutes",
        },
      ],
    },
    {
      day: "Thursday",
      exercises: [
        {
          gesture: "Squats",
          image: squats,
          time: "15 minutes",
          sets: "4 sets of 20 reps",
          area: "Legs, Glutes",
        },
        {
          gesture: "Lunges",
          image: lunge,
          time: "10 minutes",
          sets: "3 sets of 15 reps per leg",
          area: "Legs, Glutes",
        },
      ],
    },
    {
      day: "Friday",
      exercises: [
        {
          gesture: "Squats",
          image: squats,
          time: "15 minutes",
          sets: "4 sets of 20 reps",
          area: "Legs, Glutes",
        },
        {
          gesture: "Lunges",
          image: lunge,
          time: "10 minutes",
          sets: "3 sets of 15 reps per leg",
          area: "Legs, Glutes",
        },
      ],
    },
    {
      day: "Saturday",
      exercises: [
        {
          gesture: "Squats",
          image: squats,
          time: "15 minutes",
          sets: "4 sets of 20 reps",
          area: "Legs, Glutes",
        },
        {
          gesture: "Lunges",
          image: lunge,
          time: "10 minutes",
          sets: "3 sets of 15 reps per leg",
          area: "Legs, Glutes",
        },
      ],
    },
    {
      day: "Sunday",
      exercises: [
        {
          gesture: "Squats",
          image: squats,
          time: "15 minutes",
          sets: "4 sets of 20 reps",
          area: "Legs, Glutes",
        },
        {
          gesture: "Lunges",
          image: lunge,
          time: "10 minutes",
          sets: "3 sets of 15 reps per leg",
          area: "Legs, Glutes",
        },
      ],
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Weekly Workout Plan</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {workoutDays.map((day, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Header
                className="text-center"
                style={{ backgroundColor: "black", color: "white" }}
              >
                <h4>{day.day}</h4>
              </Card.Header>
              <Card.Body>
                {day.exercises.map((exercise, idx) => (
                  <div key={idx} className="mb-3">
                    <img
                      src={exercise.image}
                      alt={exercise.gesture}
                      className="img-fluid rounded mb-2"
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <h5>{exercise.gesture}</h5>
                    <p>
                      <strong>Time:</strong> {exercise.time}
                    </p>
                    <p>
                      <strong>Sets:</strong> {exercise.sets}
                    </p>
                    <p>
                      <strong>Targeted Area:</strong> {exercise.area}
                    </p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WorkoutPlan;
