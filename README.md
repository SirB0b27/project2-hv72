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
9. `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`
10. `pip install psycopg2-binary`
11. `pip install Flask-SQLAlchemy==2.1`
12. `npm install --save-dev --save-exact prettier`
13. `npm install --save-dev eslint-config-prettier`
14. `pip install yapf`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
2. Initialize PSQL database: `sudo service postgresql initdb`
3. Start PSQL: `sudo service postgresql start`
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` If you get an error saying "could not change directory", that's okay! It worked!
5. Make a new database: `sudo -u postgres createdb $USER` If you get an error saying "could not change directory", that's okay! It worked!
6. Run `npx prettier --write .` to use prettier for formatting all .js files

## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku

1. Login and fill creds: `heroku login -i`
2. `git remote rm heroku` (get rid of the existing remote repo from M1)
3. `heroku create` (create a new Heroku app for M2)
4. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
5. `heroku addons:create heroku-postgresql:hobby-dev` (add a DB)
6. `heroku config` (check your env vars)
7. `export DATABASE_URL='set the URL what we got from heroku config'`
8. Push to Heroku: `git push -f heroku milestone_2:main`

## Heroku Deployed Website:

https://enigmatic-ocean-14230.herokuapp.com/

## Known Problem(s) / Future Ideas

1. One future idea that I plan on implementing is using images instead of Xs and Os to make my Tic-Tac-Toe more unique compared to other Tic-Tac-Toe games out there. For this I plan on looking for two images of characters who are considered enemies such as: Aang and Zuko(I know that Zuko isnt his final enemy, but Zuko is more popular, and thus the better option compared to Firelord Ozai)
2. Another future idea is to add a chat box for players to interact, this should be as easy as creating a state that contians the username and the message in a dictionary, and just use html to render this dictionary out. I am not using a database for this becase this chat isn't required to be consistent accross different games. So if player 1 and player 2 are talking in the current game, and in the future players 3 and 4 are talking, there is no reason for them to see chat history between players 1 and 2. This could be a future future plan of having individual chat channels for each players, but with the time constraint, this might not be possible.

## Technical Issues and How I Solved Them (too many to remember them all)

1. Committing the changes to the user score to the database instead of keeping it local. So when I refreshed the website, the information from the previous game wouldnt persist. So to figure this out, I first went to Slack to check out the pinned messages, and you had made an announcement about how using models.Person might not be updating the database, so isntead use db.session, and this seemed to have fixed everything.
2. One of the requirements was to sort the leaderboard by descending order of score, and my initial thoughts from working with SQL in IT202 was to do an `ORDER BY` query in SQL, but I wasnt sure how I was going to do it, so I did some quick research on StackOverflow and on google, and found the first two links below. After using that to code the SQL query in SQLAlchemy, I tested it, and there seemed to have been no change in the order of the list. So then I thought maybe the query isn't working correctly or something, so I decided to sort the python dictionary by value, for which I found the code on StackOverFlow at link number 3 below. Using the sorting algorithm on python didn't seem to work, and upon doing some more research it seemed like JS takes in objects by random order. So the only way to fix this is to sort it in my App.js, which initially seemed difficult, but upon some quick research on Google, I found a StackOverFlow link to do exactly what I wanted, which is the fourth link, and tested it to make sure it worked exactly as I intended.
   - https://stackoverflow.com/questions/4186062/sqlalchemy-order-by-descending
   - https://www.kite.com/python/answers/how-to-order-by-desc-in-sqlalchemy-in-python
   - https://stackoverflow.com/questions/613183/how-do-i-sort-a-dictionary-by-value
   - https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
