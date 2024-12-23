from flask import Blueprint, request, jsonify
from ..services.workout_service import WorkoutService
from flask import session

workout_bp = Blueprint("workout", __name__) # Create a blueprint for workout routes

@workout_bp.route("/create_plan", methods=["POST"])
def create_user_workout_plan():
    """
    API endpoint to create customized user workout plan, and store in user_workout_goal table.
    """
    data = request.json
    user_id = data.get("user_id")

    # Call AuthService to add user details
    response, status_code = WorkoutService.create_user_workout_plan(user_id)
    return jsonify(response), status_code


@workout_bp.route('/workout_plan/<int:workout_plan_id>', methods=['GET'])
def get_workout_plan(workout_plan_id):
    """
    API endpoint to retrieve workout plan for a user.
    :param workout_plan_id: The ID of the workout_plan.
    """
    response, status_code = WorkoutService.get_workout_plan(workout_plan_id)
    return jsonify(response), status_code

@workout_bp.route('/workout_plan_details/<int:workout_plan_id>', methods=['GET'])
def get_workout_plan_details(workout_plan_id):
    """
    API endpoint to retrieve workout plan for a user.
    :param workout_plan_id: The ID of the workout_plan.
    """
    response, status_code = WorkoutService.get_workout_plan_details(workout_plan_id)
    return jsonify(response), status_code



