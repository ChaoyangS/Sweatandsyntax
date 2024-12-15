from flask import session
from models.user import User, UserDetails
from werkzeug.security import check_password_hash, generate_password_hash
from app import db  

class AuthService:
    
    @staticmethod
    def create_user(username, password, email, weight, height, age, gender):
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password, email=email)
        db.session.add(new_user)
        db.session.commit()

        new_user_details = UserDetails(
            user_id=new_user.user_id,
            weight=weight,
            height=height,
            age=age,
            gender=gender,
        )
        db.session.add(new_user_details)
        db.session.commit()
        return {"message": "User created successfully"}, 201

    @staticmethod
    def login_user(username, password):
        """
        Logs in a user by verifying their credentials and starting a session
        """
        user  = User.query.filter_by(username=username).first()
        if not User:
            return {"error": "User not found"}, 404

        if not check_password_hash(user.password, password):
            return {"error": "Invalid credentials"}, 401

        # Store user information in session
        session['user_id'] = user.user_id
        session['username'] = user.username
        return {"message": "Login successful"}, 200

    @staticmethod
    def logout_user():
        """
        Logs out the current user by clearing the session data.
        """
        session.clear()
        return {"message": "Logout successful"}, 200

    @staticmethod
    def is_logged_in():
        """
        Checks if the user is currently logged in.
        """
        return 'user_id' in session

    @staticmethod
    def get_current_user():
        """
        Retrieves the currently logged-in user's information, including details.
        """
        if 'user_id' not in session:
            return None

        user = User.query.get(session['user_id'])
        if not user:
            return None

        # Retrieve additional user details
        user_details = UserDetails.query.filter_by(user_id=user.user_id).first()
        return {
            "username": user.username,
            "email": user.email,
            "weight": user_details.weight if user_details else None,
            "height": user_details.height if user_details else None,
            "age": user_details.age if user_details else None,
            "gender": user_details.gender if user_details else None
        }

    @staticmethod
    def create_user(username, password, email, weight, height, age, gender):
        """
        Creates a new user and their corresponding user details.
        """
        hashed_password = check_password_hash(password, password)
        new_user = User(username=username, password=hashed_password, email=email)
        db.session.add(new_user)
        db.session.commit()

        # Add additional user details
        new_user_details = UserDetails(
            user_id=new_user.user_id,
            weight=weight,
            height=height,
            age=age,
            gender=gender
        )
        db.session.add(new_user_details)
        db.session.commit()
        return {"message": "User created successfully"}, 201
