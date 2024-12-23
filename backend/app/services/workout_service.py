from flask import session
from ..dal.workout_dao import WorkoutDAO
from ..models.workout_plan import WorkoutPlan
from ..models.workout_plan_details import WorkoutPlanDetails

class WorkoutService:

    @staticmethod
    def create_user_workout_plan(user_id):
        """
        Creates a new user and user details
        :param user_id: user_id of the user.
        :return: Success or error message as a dictionary.
        """
        workout_dao = WorkoutDAO()

        #Retrieve a matching workout plan for the user
        workout_plan = workout_dao.create_user_workout_plan(user_id)

        #check
        if workout_plan:
            workout_dao.update_workout_plan_in_user_workout_goal(user_id, workout_plan["workout_plan_id"])
            return {"success": "Workout plan successfully generated for user", "user_id": user_id}, 201

        return{"error": "No workout plan found for user"}, 404

    @staticmethod
    def get_workout_plan(workout_plan_id):
        """
        Retrieves the workout plan for the user to send to the frontend.
        :param workout_plan_id: The ID of the workout_plan.
        :return: JSON containing workout details or an error message.
        """
        workout_dao = WorkoutDAO()

        # Retrieve the workout plan details
        workout_plan = workout_dao.get_workout_plan(workout_plan_id)

        if workout_plan:
            # Use the Workout Plan model to format the details
            workout_plan = WorkoutPlan(
                workout_plan_id=workout_plan["workout_plan_id"],
                workout_name=workout_plan["workout_name"],
                days=workout_plan["days"],
                goal=workout_plan["goal"],
                muscle=workout_plan["muscle"],
                equipment=workout_plan["equipment"],
                level=workout_plan["level"]
            )
            return {"workout_plan": workout_plan.to_dict()}, 200

        return {"error": "No workout details found for user"}, 404

    @staticmethod
    def get_workout_plan_details(workout_plan_id):
        """
        Retrieves the workout details for the user to send to the frontend.
        :param workout_plan_id: The ID of the workout_plan_details.
        :return: JSON containing workout details or an error message.
        """
        workout_dao = WorkoutDAO()

        # Retrieve the workout plan details
        workout_plans = workout_dao.get_workout_plan_details(workout_plan_id)

        if workout_plans:
            # Use the Workout Details model to format the details
            workout_lst = []
            for workout_plan in workout_plans:
                workout_plan_details = WorkoutPlanDetails(
                    workout_plan_detail_id=workout_plan["workout_plan_detail_id"],
                    workout_plan_id=workout_plan["workout_plan_id"],
                    day_of_week=workout_plan["day_of_week"],
                    exercise_name=workout_plan["exercise_name"],
                    sets=workout_plan["sets"],
                    reps=workout_plan["reps"],
                    interval=workout_plan["interval"],
                    rest_time=workout_plan["rest_time"]
                    )
                workout_lst.append(workout_plan_details.to_dict())
            return {"workout_details": workout_lst}, 200


        return {"error": "No workout details found for user"}, 404






