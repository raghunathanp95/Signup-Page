# Sign-up landing page

Sing-up landing page for a company using [Mailchimp](https://mailchimp.com/developer/) APIs and [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
deployed in [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

Link to the site - [here](https://mysterious-woodland-49851.herokuapp.com/)

## Node Dependencies

`npm install` - installs npm and the project dependencies mentioned package jason file

## Deploying to heroku:

Commands in the current project folder

Changing the port from `local: 3000` to `process.env.PORT || 3000` at `app.listen()` in `app.js` file works in both local and heroku

Create a `Procfile` file using `touch Procfile` command without any extension is necessary to run the app with the format `web: node app.js`

`heroku create` - creates the container

`git push heroku master` - pushes all the files in heroku servers

`heroku logs` - spits all logs
