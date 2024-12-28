// import React from "react";
// import { Card, Col, Row, Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import legs from "../assets/legs.jpg";
// import plank from "../assets/plank.jpg";
// import pushups from "../assets/pushups.jpg";
// import squats from "../assets/squats.jpg";
// import lunge from "../assets/lunge.jpg";

// const WorkoutPlan = () => {
//   const workoutDays = [
//     {
//       day: "Monday",
//       exercises: [
//         {
//           gesture: "Push-Ups",
//           image: pushups,
//           time: "10 minutes",
//           sets: "3 sets of 15 reps",
//           area: "Chest, Shoulders, Triceps",
//         },
//         {
//           gesture: "Plank",
//           image: plank,
//           time: "5 minutes",
//           sets: "3 sets of 1 minute each",
//           area: "Core",
//         },
//       ],
//     },
//     {
//       day: "Tuesday",
//       exercises: [
//         {
//           gesture: "Squats",
//           image: squats,
//           time: "15 minutes",
//           sets: "4 sets of 20 reps",
//           area: "Legs, Glutes",
//         },
//         {
//           gesture: "Lunges",
//           image: lunge,
//           time: "10 minutes",
//           sets: "3 sets of 15 reps per leg",
//           area: "Legs, Glutes",
//         },
//       ],
//     },
//     {
//       day: "Wednesday",
//       exercises: [
//         {
//           gesture: "Squats",
//           image: squats,
//           time: "15 minutes",
//           sets: "4 sets of 20 reps",
//           area: "Legs, Glutes",
//         },
//         {
//           gesture: "Lunges",
//           image: lunge,
//           time: "10 minutes",
//           sets: "3 sets of 15 reps per leg",
//           area: "Legs, Glutes",
//         },
//       ],
//     },
//     {
//       day: "Thursday",
//       exercises: [
//         {
//           gesture: "Squats",
//           image: squats,
//           time: "15 minutes",
//           sets: "4 sets of 20 reps",
//           area: "Legs, Glutes",
//         },
//         {
//           gesture: "Lunges",
//           image: lunge,
//           time: "10 minutes",
//           sets: "3 sets of 15 reps per leg",
//           area: "Legs, Glutes",
//         },
//       ],
//     },
//     {
//       day: "Friday",
//       exercises: [
//         {
//           gesture: "Squats",
//           image: squats,
//           time: "15 minutes",
//           sets: "4 sets of 20 reps",
//           area: "Legs, Glutes",
//         },
//         {
//           gesture: "Lunges",
//           image: lunge,
//           time: "10 minutes",
//           sets: "3 sets of 15 reps per leg",
//           area: "Legs, Glutes",
//         },
//       ],
//     },
//     {
//       day: "Saturday",
//       exercises: [
//         {
//           gesture: "Squats",
//           image: squats,
//           time: "15 minutes",
//           sets: "4 sets of 20 reps",
//           area: "Legs, Glutes",
//         },
//         {
//           gesture: "Lunges",
//           image: lunge,
//           time: "10 minutes",
//           sets: "3 sets of 15 reps per leg",
//           area: "Legs, Glutes",
//         },
//       ],
//     },
//     {
//       day: "Sunday",
//       exercises: [
//         {
//           gesture: "Squats",
//           image: squats,
//           time: "15 minutes",
//           sets: "4 sets of 20 reps",
//           area: "Legs, Glutes",
//         },
//         {
//           gesture: "Lunges",
//           image: lunge,
//           time: "10 minutes",
//           sets: "3 sets of 15 reps per leg",
//           area: "Legs, Glutes",
//         },
//       ],
//     },
//   ];

//   return (
//     <Container className="my-5">
//       <h2 className="text-center mb-4">Weekly Workout Plan</h2>
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {workoutDays.map((day, index) => (
//           <Col key={index}>
//             <Card className="h-100">
//               <Card.Header
//                 className="text-center"
//                 style={{ backgroundColor: "black", color: "white" }}
//               >
//                 <h4>{day.day}</h4>
//               </Card.Header>
//               <Card.Body>
//                 {day.exercises.map((exercise, idx) => (
//                   <div key={idx} className="mb-3">
//                     <img
//                       src={exercise.image}
//                       alt={exercise.gesture}
//                       className="img-fluid rounded mb-2"
//                       style={{
//                         maxHeight: "200px",
//                         objectFit: "cover",
//                         width: "100%",
//                       }}
//                     />
//                     <h5>{exercise.gesture}</h5>
//                     <p>
//                       <strong>Time:</strong> {exercise.time}
//                     </p>
//                     <p>
//                       <strong>Sets:</strong> {exercise.sets}
//                     </p>
//                     <p>
//                       <strong>Targeted Area:</strong> {exercise.area}
//                     </p>
//                   </div>
//                 ))}
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default WorkoutPlan;

// import React, { useState, useEffect } from "react";
// import { Card, Col, Row, Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const WorkoutPlan = () => {
//   const [workoutDays, setWorkoutDays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await fetch(
//           "https://api.api-ninjas.com/v1/exercises?type=cardio",
//           {
//             headers: {
//               "X-Api-Key": "J3Z/89OdJsoytscP3oObUA==RUgzFc0yeKo31NOI",
//             }, //currently using the ninjas api, chaoyang's api key
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch exercises");
//         }
//         const data = await response.json();

//         const days = [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           //"Saturday",
//           // "Sunday",
//         ];
//         const workouts = days.map((day, index) => ({
//           day,
//           exercises: data.slice(index * 2, index * 2 + 2).map((exercise) => ({
//             gesture: exercise.name,
//             image: "https://via.placeholder.com/300", // need to Replace with actual images
//             time: "10 minutes", // Placeholder, need to replace with actual logic
//             instructions: exercise.instructions,
//             sets: "3 sets of 15 reps", // Placeholder, need to replace with actual logic
//             area: exercise.muscle, // Use actual muscle group from the API
//           })),
//         }));

//         setWorkoutDays(workouts);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchExercises();
//   }, []);

//   return (
//     <Container className="my-5">
//       <h2 className="text-center mb-4">Weekly Workout Plan</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-danger">Error: {error}</p>}
//       {!loading && !error && (
//         <Row xs={1} md={2} lg={3} className="g-4">
//           {workoutDays.map((day, index) => (
//             <Col key={index}>
//               <Card className="h-100">
//                 <Card.Header
//                   className="text-center"
//                   style={{ backgroundColor: "black", color: "white" }}
//                 >
//                   <h4>{day.day}</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   {day.exercises.map((exercise, idx) => (
//                     <div key={idx} className="mb-3">
//                       <img
//                         src={exercise.image}
//                         alt={exercise.gesture}
//                         className="img-fluid rounded mb-2"
//                         style={{
//                           maxHeight: "200px",
//                           objectFit: "cover",
//                           width: "100%",
//                         }}
//                       />
//                       <h5>{exercise.gesture}</h5>
//                       <p>
//                         <strong>Time:</strong> {exercise.time}
//                       </p>
//                       <p>
//                         <strong>Sets:</strong> {exercise.sets}
//                       </p>

//                       <p>
//                         <strong>Targeted Area:</strong> {exercise.area}
//                       </p>
//                       <p>
//                         <strong>Instructions:</strong> {exercise.instructions}
//                       </p>
//                     </div>
//                   ))}
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default WorkoutPlan;

// import React, { useState, useEffect } from "react";
// import { Card, Col, Row, Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const WorkoutPlan = () => {
//   const [workoutDays, setWorkoutDays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Replace these with actual workout_plan_id as needed
//   const workoutPlanId = 1;

//   useEffect(() => {
//     const fetchWorkoutPlan = async () => {
//       try {
//         // Fetch workout plan summary
//         const workoutPlanResponse = await fetch(
//           `http://127.0.0.1:5000/api/workout/workout_plan_details/1`
//         );
//         if (!workoutPlanResponse.ok) {
//           throw new Error("Failed to fetch workout plan");
//         }
//         const workoutPlan = await workoutPlanResponse.json();

//         // Fetch workout plan details for each day
//         const workoutDetailsPromises = workoutPlan.days.map((day) =>
//           fetch(`/workout_plan_details/${day.id}`).then((res) => {
//             if (!res.ok) {
//               throw new Error(
//                 "Failed to fetch workout details for day " + day.id
//               );
//             }
//             return res.json();
//           })
//         );

//         const workoutDetails = await Promise.all(workoutDetailsPromises);

//         // Transform data into a structure suitable for the component
//         const workouts = workoutPlan.days.map((day, index) => ({
//           day: day.name,
//           exercises: workoutDetails[index].exercises.map((exercise) => ({
//             gesture: exercise.name,
//             image: exercise.image || "https://via.placeholder.com/300", // Use actual image or placeholder
//             time: exercise.time || "10 minutes", // Replace with actual data
//             sets: exercise.sets || "3 sets of 15 reps", // Replace with actual data
//             area: exercise.area || "Full Body", // Replace with actual data
//             instructions: exercise.instructions || "No instructions provided", // Replace with actual data
//           })),
//         }));

//         setWorkoutDays(workouts);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchWorkoutPlan();
//   }, [workoutPlanId]);

//   return (
//     <Container className="my-5">
//       <h2 className="text-center mb-4">Weekly Workout Plan</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-danger">Error: {error}</p>}
//       {!loading && !error && (
//         <Row xs={1} md={2} lg={3} className="g-4">
//           {workoutDays.map((day, index) => (
//             <Col key={index}>
//               <Card className="h-100">
//                 <Card.Header
//                   className="text-center"
//                   style={{ backgroundColor: "black", color: "white" }}
//                 >
//                   <h4>{day.day}</h4>
//                 </Card.Header>
//                 <Card.Body>
//                   {day.exercises.map((exercise, idx) => (
//                     <div key={idx} className="mb-3">
//                       <img
//                         src={exercise.image}
//                         alt={exercise.gesture}
//                         className="img-fluid rounded mb-2"
//                         style={{
//                           maxHeight: "200px",
//                           objectFit: "cover",
//                           width: "100%",
//                         }}
//                       />
//                       <h5>{exercise.gesture}</h5>
//                       <p>
//                         <strong>Time:</strong> {exercise.time}
//                       </p>
//                       <p>
//                         <strong>Sets:</strong> {exercise.sets}
//                       </p>
//                       <p>
//                         <strong>Targeted Area:</strong> {exercise.area}
//                       </p>
//                       <p>
//                         <strong>Instructions:</strong> {exercise.instructions}
//                       </p>
//                     </div>
//                   ))}
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default WorkoutPlan;

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
