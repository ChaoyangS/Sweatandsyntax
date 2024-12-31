from flask import session
from ..models.user import User
from ..models.user_details import UserDetails
from ..dal.user_dao import UserDAO
from werkzeug.security import check_password_hash, generate_password_hash
from app.db import get_db


class AuthService:
    """
    Service class to handle authentication relation logic using SQLAlchemy ORM
    """
    
    @staticmethod
    def create_user(username, password, email):
        """
        Creates a new user and user details
        :param username: Username of the user.
        :param password: Plain text password (hashed before saving).
        :param email: Email of the user.
        :return: Success or error message as a dictionary.
        """

        hashed_password = generate_password_hash(password)
        if UserDAO().get_user_by_username_or_email(username, email):
            return {"error": "Username or email already exists"}, 400
        user_id = UserDAO().create_user(username, hashed_password, email)
        return {"message": "User created successfully", "user_id": user_id}, 201

    @staticmethod
    def create_user_details (user_id, weight, height, age, gender, activity_level):
        """
        Creates user details with user_id
        :param user_id: user_id of the user.
        :param weight: weight of the user.
        :param height: height of the user.
        :param age: age of the user
        :param gender: gender of the user
        :param level: activity_level of the user
        :return: Success or error message as a dictionary.
        """
        UserDAO().create_user_details(user_id, weight, height, age, gender, activity_level)
        return {"message": "User details added successfully"}, 201



    @staticmethod
    def login_user(username, password):
        """
        Logs in a user by verifying their credentials and starting a session
        :param username: Username of the user.
        :param password: Plain text password for verification.
        :return: Success or error message as a dictionary.
        """
        user_row = UserDAO().get_user_by_username(username)

        if not user_row:
            return {"error": "User not found"}, 404

        # Verify the password
        if not check_password_hash(user_row['password'], password):
            return {"error": "Invalid password"}, 401

        # Start user session
        session['user_id'] = user_row['user_id']
        session['username'] = user_row['username']
        return {"message": "Login successful"}, 200

    @staticmethod
    def logout_user():
        """
        Logs out the current user by clearing the session data.
        :return: Success message as a dictionary.
        """
        session.clear()
        return {"message": "Logout successful"}, 200

    @staticmethod
    def is_logged_in():
        """
        Checks if the user is currently logged in.
        :return: True if logged in, False otherwise.
        """
        return 'user_id' in session

    @staticmethod
    def get_current_user():
        """
        Retrieves the currently logged-in user's information, including their details.
        :return: Dictionary with user and user_details information, or None if not logged in.
        """
        if 'user_id' not in session:
            return None

        user_row = UserDAO().get_user_by_id(session['user_id'])
        if not user_row:
            return None

        user_details_row = UserDAO().get_user_by_id(session['user_id'])

        if not user_details_row:
            return user_row

        # Combine user and user_details data
        user_row.update(user_details_row)
        return user_row
