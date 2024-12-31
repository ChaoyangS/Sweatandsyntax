import os

class Config:
    """
    Configuration class.
    """
    # Flask secret key for session management
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')

    # Debug mode - Set to False in production
    DEBUG = os.getenv('DEBUG', True)

    # Database URI - Defaults to SQLite database in the instance folder
    DATABASE_URI = os.getenv('DATABASE_URI', os.path.join("instance", "db.sqlite"))

    # Session configuration
    SESSION_FILE_DIR = os.path.join(os.getcwd(), 'flask_session')  # Explicit path
    SESSION_FILE_THRESHOLD = 500  # Max files before cleaning
    SESSION_FILE_MODE = 0o600  # File permissions
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'None'  # Allow cross-site cookies
    SESSION_COOKIE_SECURE = False    # Set to True in HTTPS
    SESSION_COOKIE_PATH = '/'

    # CORS support
    CORS_HEADERS = 'Content-Type'