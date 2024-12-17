-- Drop tables
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_details;
DROP TABLE IF EXISTS workout_plan;
DROP TABLE IF EXISTS workout_plan_details;
DROP TABLE IF EXISTS user_exercise_progress;
DROP TABLE IF EXISTS meal_plan;
DROP TABLE IF EXISTS meal_plan_details;

-- User table: stores basic user authentication information
CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User details table: stores personal details about the user
CREATE TABLE user_details (
    user_details_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    weight REAL NOT NULL,
    height REAL NOT NULL,
    age INTEGER,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    muscle TEXT,
    activity_level TEXT, -- e.g., 'Low', 'Moderate', 'High'
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

-- Workout plan table: stores workout plans
CREATE TABLE workout_plan (
    workout_plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_name TEXT NOT NULL UNIQUE,         -- Name of the workout plan
    days INT NOT NULL,                         -- Days of the plan
    goal TEXT NOT NULL,                        -- Goal of the plan (e.g., 'Build Muscle', 'Lose Weight')
    muscle TEXT NOT NULL,                      -- Targeted muscle group (e.g., 'Full Body', 'Upper Body')
    equipment TEXT NOT NULL,                   -- Required equipment (e.g., 'Dumbbell', 'Barbell', 'None')
    level TEXT NOT NULL,                       -- Difficulty level (e.g., 'Beginner', 'Intermediate', 'Advanced')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Workout plan details table: stores detail workout plans associated workout plan
CREATE TABLE workout_plan_details (
    workout_plan_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_plan_id INTEGER NOT NULL,
    day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')),
    exercise_name TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    interval INTEGER NOT NULL,
    rest_time INTEGER NOT NULL,
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plan (workout_plan_id) ON DELETE CASCADE
);

-- Progress tracking table to record user progress over time
CREATE TABLE user_exercise_progress (
    progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    weight REAL, -- Weight at the time of recording
    date_logged DATE DEFAULT CURRENT_DATE,
    notes TEXT, -- Optional: allows users to add notes about their progress
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);


-- Meal plan table: stores meal plans
CREATE TABLE meal_plan (
    meal_plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_plan_name TEXT NOT NULL UNIQUE,        -- Name of the meal plan (e.g., 'High Protein Plan')
    goal TEXT NOT NULL,                        -- Goal of the meal plan (e.g., 'Weight Loss', 'Muscle Gain')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Meal plan details table: stores meal plans details associated to meal plan
CREATE TABLE meal_plan_details (
    meal_plan_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_plan_id INTEGER NOT NULL,            -- Foreign key linking to meal_plan
    meal_type TEXT NOT NULL CHECK (
        meal_type IN ('Breakfast', 'Lunch', 'Dinner', 'Snack')
    ),                                        -- Type of meal (e.g., 'Breakfast', 'Lunch')
    meal_name TEXT NOT NULL,                  -- Name of the meal (e.g., 'Oatmeal with Berries')
    prep_time INTEGER NOT NULL,                -- Time taken to prepare in minutes
    ingredients TEXT NOT NULL,                -- Ingredients list (e.g., 'Oats, Berries, Almond Milk')
    protein REAL NOT NULL,                    -- Protein content in grams
    carbs REAL NOT NULL,                      -- Carbohydrate content in grams
    fats REAL NOT NULL,                       -- Fat content in grams
    calories REAL NOT NULL,                   -- Total calories
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plan (meal_plan_id) ON DELETE CASCADE
);













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
INSERT INTO workout_plan (workout_name, days, goal, muscle, equipment, level)
VALUES
('5 Day Muscle Mass Split', 5, 'Bulking', 'Back', 'Barbell', 'Intermediate');

-- -- Insert workout plan details
INSERT INTO workout_plan_details (workout_plan_id, day_of_week, exercise_name, sets, reps, interval, rest_time)
VALUES
-- Monday: Chest and Back
(1, 'Mon', 'Barbell Bench Press', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Mon', 'Barbell Incline Bench Press', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Mon', 'Dumbbell Bench Press', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Mon', 'Dumbbell Incline Bench Press', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Mon', 'Pull-Up', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Mon', 'Cable Lat Pulldown (Wide Grip)', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Mon', 'Dumbbell One-Arm Row', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Mon', 'Barbell Deadlift', 4, '12,10,8,6', '00:00', '01:00'),

-- Tuesday: Legs and Abs
(1, 'Tue', 'Machine Leg Press (Narrow Stance)', 4, 10, '00:00', '01:00'),
(1, 'Tue', 'Machine Single-Leg Press', 4, 10, '00:00', '01:00'),
(1, 'Tue', 'Machine Leg Curl (Prone)', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Tue', 'Machine Leg Extension', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Tue', 'Barbell Lunge', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Tue', 'Calf Press Machine', 4, 20, '00:00', '01:00'),
(1, 'Tue', 'Barbell Standing Calf Raise', 4, 10, '00:00', '01:00'),
(1, 'Tue', 'Cable Kneeling Crunch', 4, 10, '00:00', '01:00'),
(1, 'Tue', 'Dumbbell Side Bend', 4, 10, '00:00', '01:00'),
(1, 'Tue', 'Parallel Bar Leg Raise', 4, 8, '00:00', '01:00'),

-- Wednesday: Arms
(1, 'Wed', 'Barbell Curl', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Wed', 'Dumbbell Hammer Curl', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Wed', 'Triceps Pushdown', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Wed', 'Dumbbell Triceps Extension', 4, '12,10,8,6', '00:00', '01:00'),

-- Friday: Back and Shoulders
(1, 'Fri', 'Barbell Shoulder Press', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Fri', 'Dumbbell Lateral Raise', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Fri', 'Barbell Bent-Over Row', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Fri', 'Cable Seated Row', 4, '12,10,8,6', '00:00', '01:00'),

-- Saturday: Chest and Legs
(1, 'Sat', 'Barbell Bench Press', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Sat', 'Dumbbell Flyes', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Sat', 'Squat', 4, '12,10,8,6', '00:00', '01:00'),
(1, 'Sat', 'Leg Press', 4, '12,10,8,6', '00:00', '01:00');

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
INSERT INTO meal_plan_details (meal_plan_id, meal_type, meal_name, ingredients, protein, carbs, fats, calories, prep_time)
VALUES
-- Breakfast: Protein-Packed Oatmeal
(1, 'Breakfast', 'Protein-Packed Oatmeal',
 '1 cup rolled oats, 1 scoop whey protein powder (or plant-based protein), 1 tbsp chia seeds, ½ cup berries (blueberries or strawberries), 1 tbsp almond butter',
 30.0, 45.0, 12.0, 400, 10),

-- Mid-Morning Snack: Greek Yogurt with Nuts and Honey
(1, 'Snack', 'Greek Yogurt with Nuts and Honey',
 '1 cup Greek yogurt (unsweetened), 1 tbsp honey, ¼ cup mixed nuts (almonds, walnuts)',
 15.0, 20.0, 12.0, 250, 5),

-- Lunch: Grilled Chicken Salad with Quinoa
(1, 'Lunch', 'Grilled Chicken Salad with Quinoa',
 '4 oz grilled chicken breast, 1 cup mixed greens (spinach, arugula, and kale), ½ cup quinoa, ¼ avocado (sliced), 1 tbsp olive oil (for dressing), ½ cup cherry tomatoes, 1 tbsp sunflower seeds',
 35.0, 45.0, 15.0, 500, 15),

-- Afternoon Snack: Cottage Cheese with Pineapple and Almonds
(1, 'Snack', 'Cottage Cheese with Pineapple and Almonds',
 '1 cup cottage cheese (low-fat), ½ cup pineapple chunks, 1 tbsp almonds',
 20.0, 20.0, 6.0, 200, 5);
