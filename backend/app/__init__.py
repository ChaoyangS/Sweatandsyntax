import sys


print(sys.path)

import os
from app.db import init_app as db_init_app
from flask import Flask
from .routes.auth_routes import auth_bp
from .routes.workout_routes import workout_bp
from config import Config
from flask_cors import CORS

"""
The __init__.py serves double duty:
it will contain the application factory,
and it tells Python that the directory should be treated as a package.
"""

def create_app(test_config=None):

    #Create and configure the app
    #insatnce_relative_config is ued to specify whether the flask app
    #should use configuration files
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    #load configuration from Config class
    app.config.from_object(Config)

    # Ensure the instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)

    #Register blueprint
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(workout_bp, url_prefix="/api/workout")

    db_init_app(app)

    return app