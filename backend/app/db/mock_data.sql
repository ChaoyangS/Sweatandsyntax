-- Insert mock users
INSERT INTO user (username, password, email)
VALUES
('john_doe', 'hashed_password_1', 'john@example.com'),
('jane_smith', 'hashed_password_2', 'jane@example.com');

-- Insert mock user details
INSERT INTO user_details (user_id, weight, height, age, gender, activity_level)
VALUES
(1, 70.5, 175, 30, 'Male', 'Moderate'),
(2, 65.0, 160, 28, 'Female', 'High');

-- Insert workout plans
INSERT INTO workout_plan (workout_name, goal, muscle, equipment, time_required, calories_burned)
VALUES
('5 Day Muscle Mass Split', 'Bulking', 'Back', 'Barbell', 5, NULL);

-- -- Insert workout plan details
INSERT INTO workout_plan_details (workout_id, day_of_week, exercise_name, sets, reps, interval, rest_time, intensity)
VALUES
-- Monday: Chest and Back
(1, 'Mon', 'Barbell Bench Press', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Mon', 'Barbell Incline Bench Press', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Mon', 'Dumbbell Bench Press', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Mon', 'Dumbbell Incline Bench Press', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Mon', 'Pull-Up', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Mon', 'Cable Lat Pulldown (Wide Grip)', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Mon', 'Dumbbell One-Arm Row', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Mon', 'Barbell Deadlift', 4, '12,10,8,6', NULL, '01:00', 'High'),

-- Tuesday: Legs and Abs
(1, 'Tue', 'Machine Leg Press (Narrow Stance)', 4, 10, NULL, '01:00', 'High'),
(1, 'Tue', 'Machine Single-Leg Press', 4, 10, NULL, '01:00', 'High'),
(1, 'Tue', 'Machine Leg Curl (Prone)', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Tue', 'Machine Leg Extension', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Tue', 'Barbell Lunge', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Tue', 'Calf Press Machine', 4, 20, NULL, '01:00', 'High'),
(1, 'Tue', 'Barbell Standing Calf Raise', 4, 10, NULL, '01:00', 'High'),
(1, 'Tue', 'Cable Kneeling Crunch', 4, 10, NULL, '01:00', 'High'),
(1, 'Tue', 'Dumbbell Side Bend', 4, 10, NULL, '01:00', 'High'),
(1, 'Tue', 'Parallel Bar Leg Raise', 4, 8, NULL, '01:00', 'High'),

-- Wednesday: Arms
(1, 'Wed', 'Barbell Curl', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Wed', 'Dumbbell Hammer Curl', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Wed', 'Triceps Pushdown', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Wed', 'Dumbbell Triceps Extension', 4, '12,10,8,6', NULL, '01:00', 'High'),

-- Friday: Back and Shoulders
(1, 'Fri', 'Barbell Shoulder Press', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Fri', 'Dumbbell Lateral Raise', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Fri', 'Barbell Bent-Over Row', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Fri', 'Cable Seated Row', 4, '12,10,8,6', NULL, '01:00', 'High'),

-- Saturday: Chest and Legs
(1, 'Sat', 'Barbell Bench Press', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Sat', 'Dumbbell Flyes', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Sat', 'Squat', 4, '12,10,8,6', NULL, '01:00', 'High'),
(1, 'Sat', 'Leg Press', 4, '12,10,8,6', NULL, '01:00', 'High'),

-- Sunday: Rest Day
-- No exercises scheduled;


-- Insert user exercise progress
INSERT INTO user_exercise_progress (user_id, weight, date_logged, notes)
VALUES
(1, 70.5, '2024-12-10', 'Progressing well, adding more weight to bench press'), -- John's progress log
(2, 65.0, '2024-12-11', 'Struggling with burpees but feeling stronger');        -- Jane's progress log

-- Insert the meal plan into the 'meal_plan' table
INSERT INTO meal_plan (meal_plan_name, goal)
VALUES
('Strength Training Meal Plan', 'Muscle Gain');

-- Insert detailed meals into the 'meal_plan_details' table
INSERT INTO meal_plan_details (meal_plan_id, meal_type, meal_name, ingredients, protein, carbs, fats, calories, prep_time, servings)
VALUES
-- Breakfast: Protein-Packed Oatmeal
(1, 'Breakfast', 'Protein-Packed Oatmeal',
 '1 cup rolled oats, 1 scoop whey protein powder (or plant-based protein), 1 tbsp chia seeds, ½ cup berries (blueberries or strawberries), 1 tbsp almond butter',
 30.0, 45.0, 12.0, 400, 10, 1),

-- Mid-Morning Snack: Greek Yogurt with Nuts and Honey
(1, 'Snack', 'Greek Yogurt with Nuts and Honey',
 '1 cup Greek yogurt (unsweetened), 1 tbsp honey, ¼ cup mixed nuts (almonds, walnuts)',
 15.0, 20.0, 12.0, 250, 5, 1),

-- Lunch: Grilled Chicken Salad with Quinoa
(1, 'Lunch', 'Grilled Chicken Salad with Quinoa',
 '4 oz grilled chicken breast, 1 cup mixed greens (spinach, arugula, and kale), ½ cup quinoa, ¼ avocado (sliced), 1 tbsp olive oil (for dressing), ½ cup cherry tomatoes, 1 tbsp sunflower seeds',
 35.0, 45.0, 15.0, 500, 15, 1),

-- Afternoon Snack: Cottage Cheese with Pineapple and Almonds
(1, 'Snack', 'Cottage Cheese with Pineapple and Almonds',
 '1 cup cottage cheese (low-fat), ½ cup pineapple chunks, 1 tbsp almonds',
 20.0, 20.0, 6.0, 200, 5, 1);
