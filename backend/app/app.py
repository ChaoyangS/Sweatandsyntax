# from flask import Flask
# from dotenv import load_dotenv
# import os
#
# # Load environment variables from .env file
# load_dotenv()
#
# app = Flask(__name__)
#
# # Access environment variables
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
# app.config['DEBUG'] = os.getenv('DEBUG', 'False').lower() == 'true'

from app import create_app

#create the Flask app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
