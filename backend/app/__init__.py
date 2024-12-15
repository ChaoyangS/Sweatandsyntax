import os
from .db import init_app as db_init_app
from flask import Flask


"""
The __init__.py serves double duty:
it will contain the application factory,
and it tells Python that the directory should be treated as a package.
"""

def create_app(test_config=None):

    #Create and configure the app
    #insatnce_relative_config is ued to specify whether the flask app
    #shoudl use configuration files
    app = Flask(__name__, instance_relative_config=True)

    #sets some default configuration that the app will use
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        DATABASE=os.path.join(app.instance_path, "db.sqlite"),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return "Hello, World!"

    db_init_app(app)

    # # apply the blueprints to the app
    # from . import auth
    # from . import blog

    # app.register_blueprint(auth.bp)
    # app.register_blueprint(blog.bp)

    # make url_for('index') == url_for('blog.index')
    # in another app, you might define a separate main index here with
    # app.route, while giving the blog blueprint a url_prefix, but for
    # the tutorial the blog will be the main index
    app.add_url_rule("/", endpoint="index")

    return app