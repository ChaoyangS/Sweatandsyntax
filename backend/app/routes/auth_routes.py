from flask import Blueprint, request, jsonify
from ..services.auth_service import AuthService
from flask import session

auth_bp = Blueprint("auth", __name__) # Create a blueprint for auth routes

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    required_fields = ["username", "password", "email"]

    # Ensure all required fields are present
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    username = data["username"]
    password = data["password"]
    email = data["email"]

    # Call AuthService to create a new user
    response, status_code = AuthService.create_user(username, password, email)

    #retrieve the userId
    if status_code == 201:
        session["user_id"] = response["user_id"] # Store user_id in session
    return jsonify(response), status_code


@auth_bp.route("/user-details", methods=["POST"])
def add_user_details():
    # Ensure user is logged in and user_id is available in session
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    # Get user details from the request body
    data = request.json
    required_fields = ["weight", "height", "age", "gender", "muscle", "activity_level"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    weight = data["weight"]
    height = data["height"]
    age = data["age"]
    gender = data["gender"]
    muscle = data["muscle"]
    activity_level = data["activity_level"]

    # Call AuthService to add user details
    response, status_code = AuthService.create_user_details(user_id, weight, height, age, gender, muscle, activity_level)
    return jsonify(response), status_code


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    if not data.get("username") or not data.get("password"):
        return jsonify({"error": "Username and password are required"}), 400

    username = data["username"]
    password = data["password"]

    # Call AuthService to log in the user
    response, status_code = AuthService.login_user(username, password)
    return jsonify(response), status_code

@auth_bp.route("/logout", methods=["POST"])
def logout():
    """
    Handles user logout by clearing the session data.
    """
    response, status = AuthService.logout_user()
    return jsonify(response), status

@auth_bp.route("/current-user", methods=["GET"])
def get_current_user():
    """
    Retrieves the currently logged-in user's details.
    """
    user = AuthService.get_current_user()
    if not user:
        return jsonify({"error": "Not logged in"}), 401

    return jsonify(user), 200
