'''
python application using socket to send data across different tabs
'''
# pylint: disable=E1101, C0413, W1508, R0903, W0603

import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
import models
DB.create_all()
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
# from models import Person
CORS_VALUE = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

# global variable to keep track of how many times we update the database
COUNTER = 0


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''
    building the index file
    '''
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@SOCKETIO.on('connect')
def on_connect():
    '''
    socket function to execute upon connection
    '''
    everything = DB.session.query(models.Person).all()
    # print(everything)
    temp_dict = add_to_dict(everything)
    SOCKETIO.emit("from_db", temp_dict, broadcast=True, include_self=True)
    # print('User connected!')

def add_to_dict(everything):
    '''
    adding to a temporary dictionary and returing that dictionary
    '''
    temp_dict = {}
    for person in everything:
        temp_dict[person.username] = person.userscore
    return temp_dict

# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    '''
    socket function to execute upon disconnect
    '''
    print('User disconnected!')


@SOCKETIO.on("tiktaktoe")
def on_tictak(data):
    '''
    socket function to transer board data across multiple instances
    '''
    global COUNTER
    COUNTER = reset_counter(data, COUNTER)[0]
    print(data)
    SOCKETIO.emit("tiktaktoe", data, broadcast=True, include_self=False)

def reset_counter(data, count):
    '''
    reset the counter if the board is empty
    '''
    if (data["arr"] == ['', '', '', '', '', '', '', '', '']):
        count = 0
    return [count, data["arr"]];

@SOCKETIO.on("login_info")
def on_login_info(data):
    '''
    socket function to transfer logged in user into across multiple instances
    '''
    print(data)
    SOCKETIO.emit("login_info", data, broadcast=True, include_self=False)


@SOCKETIO.on("add_user")
def add_user_to_db(data):
    '''
    socket function to add the logged in user to the database
    '''
    everything = write_to_db(data)
    temp_dict = add_to_dict(everything)
    SOCKETIO.emit("from_db", temp_dict, broadcast=True, include_self=True)
    print(data)

def write_to_db(data):
    DB.session.add(models.Person(username=data, userscore=100))
    DB.session.commit()
    everything = models.Person.query.all()
    return everything


@SOCKETIO.on("on_win")
def update_winner(data):
    '''
    socket function to update the current winner info to other instances and the database
    '''
    global COUNTER
    COUNTER += 1
    if COUNTER == 1:
        everything = update_score(data)
        # print(everything)
        temp_dict = add_to_dict(everything)
        SOCKETIO.emit("from_db", temp_dict, broadcast=True, include_self=True)
    print(data)

def update_score(data):
    winner = DB.session.query(
        models.Person).filter_by(username=data[0]).first()
    winner.userscore = winner.userscore + 1
    loser = DB.session.query(
        models.Person).filter_by(username=data[1]).first()
    loser.userscore = loser.userscore - 1
    DB.session.commit()
    everything = DB.session.query(models.Person).all()
    return everything


# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@SOCKETIO.on('chat')
def on_chat(data):  # data is whatever arg you pass in your emit call on client
    '''
    socket function from the professor to use for chatting
    '''
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('chat', data, broadcast=True, include_self=False)


# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
