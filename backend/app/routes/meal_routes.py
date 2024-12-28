from flask import Blueprint, request, jsonify  # Import Flask modules for routing and JSON handling
from ..services.meal_service import MealService  # Import MealService for handling logic
from flask import session

# Create a Blueprint for meal-related routes
meal_bp = Blueprint("meal", __name__)

@meal_bp.route('/meals', methods=['GET'])
def get_meals():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized access"}), 401
    # Process meal data
    return jsonify({"meals": []})

# -------------------------------
# Route 1: Create Meal Plan
# -------------------------------
@meal_bp.route("/create_plan", methods=["POST"])
def create_meal_plan():
    """
    API Endpoint to create a meal plan for a user.
    Accepts user_id in the request body and generates a meal plan based on the user's details.
    :return: JSON response with success or error message.
    """
    # Parse incoming JSON data
    data = request.json
    user_id = data.get("user_id")  # Get user_id from request body

    # Call the service layer to generate a meal plan
    response, status_code = MealService.create_user_meal_plan(user_id)
    return jsonify(response), status_code


# -------------------------------
# Route 2: Get Meal Plan
# -------------------------------
@meal_bp.route("/meal_plan/<int:meal_plan_id>", methods=["GET"])
def get_meal_plan(meal_plan_id):
    """
    API Endpoint to retrieve a meal plan by its ID.
    :param meal_plan_id: ID of the meal plan to fetch.
    :return: JSON response with meal plan data or an error message.
    """
    response, status_code = MealService.get_meal_plan(meal_plan_id)
    return jsonify(response), status_code


# -------------------------------
# Route 3: Get Meal Plan Details
# -------------------------------
@meal_bp.route("/meal_plan_details/<int:meal_plan_id>", methods=["GET"])
def get_meal_plan_details(meal_plan_id):
    """
    API Endpoint to retrieve detailed meal information for a given meal plan ID.
    :param meal_plan_id: ID of the meal plan whose details are to be fetched.
    :return: JSON response with detailed meal information or an error message.
    """
    response, status_code = MealService.get_meal_plan_details(meal_plan_id)
    return jsonify(response), status_code
