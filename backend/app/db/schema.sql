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
    activity_level TEXT, -- e.g., 'beginner', 'intermediate', 'advanced'
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

-- User details table: stores personal details about the user
CREATE TABLE user_workout_goal (
    user_workout_goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    workout_goal REAL NOT NULL,
    muscle REAL NOT NULL,
    equipment REAL NOT NULL,
    workout_plan_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plan (workout_plan_id) ON DELETE CASCADE
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
