import React, { useState, useEffect } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkoutPlan = () => {
  const [workoutDays, setWorkoutDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutPlanDetails = async () => {
      try {
        // Fetch workout plan details from the API
        const response = await fetch(
          "http://127.0.0.1:5000/api/workout/workout_plan_details/1"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const workoutDetails = data.workout_details;

        // Group exercises by day_of_week
        const groupedByDay = workoutDetails.reduce((acc, exercise) => {
          const day = exercise.day_of_week;
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push({
            gesture: exercise.exercise_name,
            sets: `${exercise.sets} sets`,
            reps: `Reps: ${exercise.reps}`,
            restTime: `Rest Time: ${exercise.rest_time}`,
            interval: `Interval: ${exercise.interval}`,
          });
          return acc;
        }, {});

        const formattedWorkoutDays = Object.keys(groupedByDay).map((day) => ({
          day,
          exercises: groupedByDay[day],
        }));

        setWorkoutDays(formattedWorkoutDays);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkoutPlanDetails();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Weekly Workout Plan</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
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
                      <h5>{exercise.gesture}</h5>
                      <p>
                        <strong>Sets:</strong> {exercise.sets}
                      </p>
                      <p>
                        <strong>{exercise.reps}</strong>
                      </p>
                      <p>
                        <strong>{exercise.restTime}</strong>
                      </p>
                      <p>
                        <strong>{exercise.interval}</strong>
                      </p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default WorkoutPlan;
