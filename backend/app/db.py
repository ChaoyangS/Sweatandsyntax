"""
The db.py is used to create database connection
"""
import sqlite3
from datetime import datetime
import click
from flask import current_app, g


def get_db():
    """
    setups database connection and ensures the connection is used within the same request
    :return: The SQLite3 database connection for the current request stores in g
    """
    # check if there's already a db attribute in g
    if 'db' not in g:
        g.db = sqlite3.connect(
            #current_app is a special flask proxy used to access application object
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        #g is a special object provided by flask
        # used for storing db during handling a request
        g.db.row_factory = sqlite3.Row

    # each request uses teh same database connection
    return g.db


def close_db(e=None):
    """
    Closes the database connection if it exists.
    :return: None
    """
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    """
    Initializes the database for the application.
    :return: None
    """
    db = get_db()

    with current_app.open_resource('db/schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    """Clear the existing db and create new tables."""
    init_db()
    click.echo('Initialized the database.')


sqlite3.register_converter(
    """
    tells Python how to interpret timestamp values in the database.
    """
    "timestamp", lambda v: datetime.fromisoformat(v.decode())
)

def init_app(app):
    """Register database functions with the Flask app. This is called by
    the application factory.
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


