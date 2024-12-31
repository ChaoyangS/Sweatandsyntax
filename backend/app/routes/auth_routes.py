from flask import Blueprint, request, jsonify
from ..services.auth_service import AuthService
from flask import session
from app.models import user 
from ..dal.user_dao import UserDAO  # Import UserDAO
from werkzeug.security import check_password_hash, generate_password_hash


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
        print("Session After Signup:", dict(session))  # Log session after signup

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
    # Debugging input
    data = request.get_json()
    print("Received JSON:", data)

    # Validate input
    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Email and password are required"}), 400

    email = data.get('email')
    password = data.get('password')

    # Instantiate DAO inside the route
    user_dao = UserDAO()

    # Query the user by email
    user = user_dao.get_user_by_username_or_email(None, email)

    # Debugging log
    print("Queried User:", user)
    print("Password from DB:", user['password'])

    # Check if user exists
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Check password using Werkzeug
    if not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Save session
    session['user_id'] = user['user_id']
    session['email'] = user['email']

    print("Session After Login:", dict(session))  # Debugging session state

    # Respond with success
    return jsonify({"success": True, "message": "Login successful!", "user": user['email']})



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
