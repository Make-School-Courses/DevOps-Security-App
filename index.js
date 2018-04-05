var express = require('express');
var hbs = require('express-hbs');
var db = require('sqlite');
var Promise = require('bluebird');


var app = express();

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/public/partials'
}));
app.set('views', __dirname + '/public');
app.set('view engine', 'hbs');

app.use(express.static('images'));
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.get('/', function (req, res) {
  res.render('index', { username: null, bg_color: req.query.bg });
});

app.post('/', async (req, res, next) => {
  // console.log(req.body);
  try {
    // const users = await db.all('SELECT * FROM User');
    // console.log(users);

    let login = req.body.inputEmail;
    let password = req.body.inputPassword;
    let result = null;

    if (login && password) {
      // console.log(login);
      // console.log(password);
      result = await db.get("SELECT name FROM User WHERE login = '"+login+"' AND password = '"+password+"'");
    }
    console.log(result);

    res.render('index', {
      username: result && result.name,
    });

  } catch (err) {
    next(err);
  }
});

Promise.resolve()
  // First, try to open the database
  .then(() => db.open('./database.sqlite', { Promise }))
  // Update db schema to the latest version using SQL-based migrations
  .then(() => db.migrate({ force: 'last' }))
  // Display error message if something went wrong
  .catch((err) => console.error(err.stack))
  // Finally, launch the Node.js app
  .finally(() => app.listen(3000));
