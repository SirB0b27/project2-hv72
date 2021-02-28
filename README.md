# Flask and create-react-app

## Requirements
1. `pip install python-dotenv`
2. `pip install requests`
3. `npm install -U flask`
4. `npm install -g heroku`
5. `npm install -U flask-cors`
6. `pip install flask-socketio`
7. `npm install`
8. `pip install -r requirements.txt`


## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push -f heroku milestone_1:main`

## Heroku Deployed Website:
https://murmuring-stream-85764.herokuapp.com/