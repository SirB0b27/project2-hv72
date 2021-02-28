# Flask and create-react-app
### by Hemanth Velan

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


## Known Problem(s) / Future Ideas (minimum 2)
1. A known problem is that there is no user history for this implementation of Tic-Tac-Toe. To solve this problem in the future milestone, I plan on using postgresql as a database server to store the data involving user history. Which will in turn allow me to create a leaderboard about each use based on the number of wins they have.
2. Another future idea that I plan on implementing is using images instead of Xs and Os to make my Tic-Tac-Toe more unique compared to other Tic-Tac-Toe games out there. For this I plan on looking for two images of characters who are considered enemies such as: Aang and Zuko(I know that Zuko isnt his final enemy, but Zuko is more popular, and thus the better option compared to Firelord Ozai)

## Technical Issues and How I Solved Them (minimum 2)
1. hello
2. hello

