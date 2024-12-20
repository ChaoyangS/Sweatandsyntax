import os
class Config:
    """
    configuration class.
    """
    SECRET_KEY = "secret_key"
    DEBUG = True  # Enable debugging for development
    # DATABASE_URI = "instance/db.sqlite"  # Path to your SQLite database
    DATABASE_URI = os.path.join("instance", "db.sqlite")