require('dotenv').config({ debug: process.env.DEBUG })
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const { check, validationResult } = require('express-validator');

const Films = Models.Film;
const Users = Models.User;

let allowedOrigins = [
    'http://127.0.0.0.1:8080',
    'https://fataleflix.herokuapp.com/',
    'http://localhost:1234'];

//MongoDB Atlas and Heroku connection
console.log(process.env);
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          'the CORS policy for this application does not allow access from origin' +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

 //imports auth.js into index.js
let auth = require('./auth')(app);

 //imports passport into index.js
const passport = require('passport');
require('./passport');

// Get the main page
app.get('/', (req, res) => {
  res.send(
    '<em>Welcome to fataleFlix, a resource for unsettling films that center women.</em>'
  );
});

// Get a list of ALL films in the API
app.get(
  '/films', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Films.find()
      .then((films) => {
        res.status(201).json(films);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
      });
    });

// Get a film based on its title
app.get(
  '/films/:title',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Films.find({ Title: req.params.Title })
      .then((film) => {
        res.json(film);
      })
      .catch((error) => {
        console.error(err);
        res.status(500).send('Error: ' + error);
      });
  }
);

// Get a genre by name and description based on film title
app.get(
  '/films/:genres/:name',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Films.find({ Title: req.params.Title })
      .then((film) => {
        res
          .status(201)
          .json(
            'Genre ' +
              film.Genre.Name +
              'Description: ' +
              film.Genre.Description
          );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Get a director by name
app.get(
  '/films/directors/:Name',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Films.findOne({ 'Director.Name': req.params.Name })
      .then((films) => {
        res.json(
          'Name: ' + films.Director.Name + ' Bio: ' + films.Director.Bio
        );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//add a user
/* we'll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date,
}
*/
app.post(
  '/users',
  // passport.authenticate('jwt', { sesson: false }),
  // [
  //   check('Username', 'Username is required').isLength({ min: 3 }),
  //   check(
  //     'Username',
  //     'Username containse non alphanumeric characters - not allowed.'
  //   ).isAlphanumeric(),
  //   check('Password', 'Password is required').not().isEmpty(),
  //   check('Email', 'Email does not appear to be valid').isEmail(),
  // ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).json(user);
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

//get all users
app.get(
  '/users',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
      });
  }
);

// Get a user account by username
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.find({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Delete a user account
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(201).send(req.params.Username + ' was deleted');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Update a user account by username
app.put(
  '/users/:Username',
  [
    check('Username', 'Username is required').isLength({ min: 3 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ], passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Add a film to 'watch' list by film ID
app.post(
  '/users/:Username/Films/:FilmID',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { Queue: req.params.FilmID },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Remove a film from 'watch' list by film ID
app.delete(
  '/users/:Username/Films/:FilmID',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.findOneAndRemove(
      { Username: req.params.Username },
      {
        $pull: { Queue: req.params.FilmID },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//returns error message
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('oops! something broke!' + '<p>' + 'error: ' + err);
});

// listen for requests
const host = '0.0.0.0';
const port = process.env.PORT || 8080;
app.listen(port, host, function() {
  console.log('listening on port ' + port);
});