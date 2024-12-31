import sys
print(sys.path)

import os
from app.db import init_app as db_init_app
from flask import Flask, session
from flask_session import Session  # Ensure Session is imported
from .routes.auth_routes import auth_bp
from .routes.workout_routes import workout_bp
from config import Config
from flask_cors import CORS

def create_app(test_config=None):
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # Enable CORS
    CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5173"], allow_headers=["Content-Type"])

    # Load configuration from Config class
    app.config.from_object(Config)

    # Print session configuration for debugging
    print("Session Config:", app.config['SESSION_FILE_DIR'])  # <-- Debugging line
    
    # Ensure the instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)

    # Initialize Flask-Session
    Session(app)  # <-- Session initialized here

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(workout_bp, url_prefix="/api/workout")

    # Initialize database
    db_init_app(app)

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
