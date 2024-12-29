import os

class Config:
    """
    Configuration class.
    """
    # Flask secret key for session management
    SECRET_KEY = os.getenv('SECRET_KEY', 'secret_key')

    # Debug mode - Set to False in production
    DEBUG = os.getenv('DEBUG', True)

    # Database URI - Defaults to SQLite database in the instance folder
    DATABASE_URI = os.getenv('DATABASE_URI', os.path.join("instance", "db.sqlite"))

    # Session configuration
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'None'  # Allow cross-site cookies
    SESSION_COOKIE_SECURE = False    # Set to True in HTTPS
    SESSION_COOKIE_PATH = '/'

    # CORS support
    CORS_HEADERS = 'Content-Type'