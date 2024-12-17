from models import WorkoutPlan, User, UserExerciseProgress #UserExcerciseProgress TBD
from app.db import db

class WorkoutService:
    @staticmethod
    def get_all_workout_plans():
        """
        Retrieves all workout plans from the database.
        
        Returns:
        - list: A list of all workout plans.
        """
        return WorkoutPlan.query.all()

    @staticmethod
    def get_workout_plans_by_goal(goal, level=None, muscle=None):
        """
        Retrieves workout plans based on the user's goal, level, and muscle group.
        
        Parameters:
        - goal 
        - level : (Optional) 
        - muscle : (Optional) 
        
        Returns:
        - list: A list of filtered workout plans.
        """
        query = WorkoutPlan.query.filter_by(goal=goal)

        if level:
            query = query.filter_by(level=level)
        if muscle:
            query = query.filter_by(muscle=muscle)

        return query.all()

    @staticmethod
    def assign_workout_to_user(user_id, workout_id):
        """
        Assigns a workout plan to a user.
        
        Parameters:
        - user_id 
        - workout_id 
        
        Returns:
        - dict: A success message or error.
        """
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        workout = WorkoutPlan.query.get(workout_id)
        if not workout:
            return {"error": "Workout plan not found"}, 404

        # Logic to associate the workout with the user (custom table required if needed)
        # Example: Create a UserWorkout table if assignments need to be recorded.
        
        return {"message": f"Workout '{workout.workout_name}' assigned to user '{user.username}'"}, 200

    @staticmethod
    def get_user_assigned_workout(user_id):
        """
        Retrieves the workout plan assigned to a user.
        
        Parameters:
        - user_id 
        
        Returns:
        - dict: The assigned workout plan details or an error.
        """
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        # Logic to fetch assigned workout plan (adjust if using a custom table).
        # Assuming a single assignment for simplicity.
        # Example:
        # assigned_workout = UserWorkout.query.filter_by(user_id=user_id).first()

        # Return dummy data for now
        return {
            "workout_name": "Sample Workout",
            "goal": "Build Muscle",
            "muscle": "Full Body",
            "level": "Intermediate"
        }, 200

    @staticmethod
    def track_user_progress(user_id, notes, weight):
        """
        Tracks user progress by recording their weight and notes.
        
        Parameters:
        - user_id 
        - notes 
        - weight 
        
        Returns:
        - dict: A success message or error.
        """
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        # Insert progress into the user_exercise_progress table
        progress = UserExerciseProgress(
            user_id=user_id,
            weight=weight,
            notes=notes
        )
        db.session.add(progress)
        db.session.commit()

        return {"message": "Progress recorded successfully"}, 201
