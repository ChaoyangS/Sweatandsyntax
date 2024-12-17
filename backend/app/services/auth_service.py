from flask import session
from ..models.user import User
from ..models.user_details import UserDetails
from werkzeug.security import check_password_hash, generate_password_hash
from ..db import get_db


class AuthService:
    """
    Service class to handle authentication relation logic using SQLAlchemy ORM
    """
    
    @staticmethod
    def create_user(username, password, email, weight, height, age, gender):
        """
        Creates a new user and user details
        :param username: Username of the user.
        :param password: Plain text password (hashed before saving).
        :param email: Email of the user.
        :param weight: User's weight.
        :param height: User's height.
        :param age: User's age.
        :param gender: User's gender.
        :return: Success or error message as a dictionary.
        """
        db = get_db()
        hashed_password = generate_password_hash(password)
        cursor = db.cursor()
        try:
            # check if the username or email already exists
            cursor.execute(
                "SELECT * FROM user WHERE username = ? OR email = ?",
                (username, email)
            )
            existing_user = cursor.fetchone()
            if existing_user:
                return {"error": "Username or email already exists"}, 400
            #Insert the new user into the database
            cursor.execute(
                "INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
                (username, hashed_password, email)
            )
            user_id = cursor.lastrowid

            # Insert the new user details into the database
            cursor.execute(
                """
                INSERT INTO user_details (user_id, weight, height, age, gender)
                VALUES (?, ?, ?, ?, ?)
                """,
                (user_id, weight, height, age, gender)
            )
            db.commit()
            return {"message": "User created successfully", "user_id": user_id},
        except db.IntegrityError as e:
            db.rollback()
            return  {"error": "Failed to create user: Username or email already exists"}, 400
        except Exception as e:
            db.rollback()
            return {"error": f"Unexpected error: {str(e)}"}, 500
        finally:
            cursor.close()

    @staticmethod
    def login_user(username, password):
        """
        Logs in a user by verifying their credentials and starting a session
        :param username: Username of the user.
        :param password: Plain text password for verification.
        :return: Success or error message as a dictionary.
        """
        db = get_db()
        cursor = db.cursor()

        try:
            # Retrieve the user
            cursor.execute(
                "SELECT * FROM user WHERE username = ?", (username,)
            )
            user_row = cursor.fetchone()

            if not user_row:
                return {"error": "User not found"}, 404

            # Create a User instance
            user = User(
                user_id=user_row["user_id"],
                username=user_row["username"],
                password=user_row["password"],
                email=user_row["email"]
            )

            # Verify the password
            if not check_password_hash(user.password, password):
                return {"error": "Invalid password"}, 401

            # Start user session
            session['user_id'] = user.user_id
            session['username'] = user.username
            return {"message": "Login successful"}, 200

        finally:
            cursor.close()

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

        db = get_db()
        cursor = db.cursor()

        try:
            # Fetch user data
            cursor.execute(
                "SELECT * FROM user WHERE user_id = ?", (session['user_id'],)
            )
            user_row = cursor.fetchone()

            if not user_row:
                return None

            # Create a User instance
            user = User(
                user_id=user_row["user_id"],
                username=user_row["username"],
                password=user_row["password"],
                email=user_row["email"]
            )

            # Fetch user details
            cursor.execute(
                "SELECT * FROM user_details WHERE user_id = ?", (user.user_id,)
            )
            user_details_row = cursor.fetchone()

            if not user_details_row:
                return user.user_dict()

            # Create a UserDetails instance
            user_details = UserDetails(
                user_details_id=user_details_row["id"],
                user_id=user_details_row["user_id"],
                weight=user_details_row["weight"],
                height=user_details_row["height"],
                age=user_details_row["age"],
                gender=user_details_row["gender"],
                muscle=user_details_row["muscle"],
                activity_level=user_details_row["activity_level"]
            )

            # Combine user and user_details data
            user_dict = user.user_dict()
            user_dict.update(user_details.user_dict())
            return user_dict

        finally:
            cursor.close()
