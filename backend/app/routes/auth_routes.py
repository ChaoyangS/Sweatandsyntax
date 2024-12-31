from flask import Blueprint, request, jsonify
from ..services.auth_service import AuthService
from flask import session
from app.models import user 

auth_bp = Blueprint("auth", __name__) # Create a blueprint for auth routes

@auth_bp.route('/')
def home():
    # Debugging session
    if 'username' in session:
        return "Welcome {session['username']}!"
    return "Welcome to SweatandSyntax!"

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
    required_fields = ["weight", "height", "age", "gender", "activity_level"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    weight = data["weight"]
    height = data["height"]
    age = data["age"]
    gender = data["gender"]
    activity_level = data["activity_level"]

    # Call AuthService to add user details
    response, status_code = AuthService.create_user_details(user_id, weight, height, age, gender, activity_level)

    print("Session Data:", dict(session))
    print("Headers:", request.headers)

    return jsonify(response), status_code


@auth_bp.route('/login', methods=['POST'])
def login():
    # Get input data
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Validate input
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Query the database for the user
    user = user.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    # Compare plain text password
    if user.password != password:  # No hashing, plain text check
        return jsonify({"error": "Invalid username or password"}), 401

    # Save session
    session['username'] = user.username
    session['email'] = user.email
    return jsonify({"message": "Login successful!", "user": user.username})


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

@auth_bp.route('/debug_session', methods=['GET'])
def debug_session():
    import os
    print("Session Data:", session)
    print("Headers:", request.headers)
    print("Session Files:", os.listdir('flask_session/'))  # Logs all session files
    print("Current Session Key:", session.sid if hasattr(session, 'sid') else 'No SID')
    return jsonify(dict(session)), 200
