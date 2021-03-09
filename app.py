import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
import models
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')
    everything = models.Person.query.all()
    tempDict = {}
    for person in everything:
        # print(str(person.userName) + "\tScore: " + str(person.userScore))
        tempDict[person.userName] = person.userScore
    print(tempDict)
    socketio.emit("leaderboard", tempDict, broadcast=True, include_self=False)

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

@socketio.on("tiktaktoe")
def on_tictak(data):
    print(data)
    socketio.emit("tiktaktoe", data, broadcast=True, include_self=False)

@socketio.on("login_info")
def on_loginInfo(data):
    print(data) 
    socketio.emit("login_info", data, broadcast=True, include_self=False)
    
@socketio.on("leaderboard")
def on_leaderboard(data):
    print(data["board"])
    
    # update db here
    for person in data["board"]:
        print(str(person) + "\t" + str(data["board"][person]))
        # persons = models.Person(userName=person, userScore=data["board"][person])
        # db.session.add(persons)
        # db.session.commit()
    
    socketio.emit("leaderboard", data, broadcast=True, include_self=False)
    

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)


if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )