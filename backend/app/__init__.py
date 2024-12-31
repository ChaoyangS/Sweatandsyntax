import os
from flask import Flask, session, jsonify, request
from flask_session import Session
from .routes.auth_routes import auth_bp
from .routes.workout_routes import workout_bp
from config import Config
from flask_cors import CORS

def create_app(test_config=None):
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # Enable CORS with credentials
    CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5173"], allow_headers=["Content-Type", "Authorization"])

    # Load configuration from Config class
    app.config.from_object(Config)

    # Ensure the instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)

    # Configure session settings
    app.config['SECRET_KEY'] = 'supersecretkey'
    app.config['SESSION_TYPE'] = 'filesystem'  # Store session on the filesystem
    app.config['SESSION_PERMANENT'] = False    # Session should not persist indefinitely
    app.config['SESSION_USE_SIGNER'] = True    # Prevent session tampering
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Required for cross-origin cookies
    app.config['SESSION_COOKIE_SECURE'] = True      # Use Secure cookies (HTTPS only in production)

    # Initialize Flask-Session
    Session(app)

    # Debugging session
    print("Session Config:", app.config['SESSION_FILE_DIR'])  # Debugging

    # CORS middleware for headers
    @app.after_request
    def apply_cors(response):
        response.headers["Access-Control-Allow-Origin"] = "http://127.0.0.1:5173"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
        return response

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(workout_bp, url_prefix="/api/workout")

    # Return app instance
    return app





# from flask import Flask
# from flask_session import Session
# from .routes.auth_routes import auth_bp
# from .routes.meal_routes import meal_bp
# from .routes.workout_routes import workout_bp

# app = Flask(__name__)

# # Session configuration
# app.config['SECRET_KEY'] = 'supersecretkey'
# app.config['SESSION_TYPE'] = 'filesystem'
# app.config['SESSION_PERMANENT'] = False
# app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_COOKIE_PATH'] = '/'
# Session(app)

# # Initialize session
# Session(app)

# # Register blueprints
# app.register_blueprint(auth_bp, url_prefix='/auth')
# app.register_blueprint(meal_bp, url_prefix='/meals')
# app.register_blueprint(workout_bp, url_prefix='/workouts')
