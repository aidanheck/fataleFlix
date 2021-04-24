/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const path = require('path');

const cors = require('cors');
const { check, validationResult } = require('express-validator');

require('./client/passport');

const Models = require('./client/models.js');

const Films = Models.Film;
const Users = Models.User;

// MongoDB Atlas and Heroku connection
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors());
const auth = require('./client/auth')(app);

const allowedOrigins = [
  'http://127.0.0.0.1:8080',
  'https://fataleflix.herokuapp.com/',
  'http://localhost:1234',
];
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const message = `The CORS policy for this application does not allow access from origin ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
}));

app.use('/client', express.static(path.join(__dirname, 'client', 'dist')));
app.get('/client/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(express.static('public'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());

// Get the main page
app.get('/', (req, res) => {
  res.send(
    '<em>Welcome to fataleFlix, a resource for unsettling films that center women.</em>',
  );
});

// ---FILM ENDPOINTS---
/** get a list of ALL films in the API
 @description retrieves list of films from database
 @example
 axios({
     method: 'get',
     url: 'https://fataleflix.herokuapp.com/client/films',
     {
       headers: { Authorization: `Bearer ${token}` }
     }
   })
  @param {string} '/films' endpoint for the films list, requsted by the client
  @param {object} jwt bearer JSON web token passed with each HTTP request from client
  @returns {JSON} JSON object containing full list of films, including title, description, director, genre, image url, and featured status * */

app.get(
  '/films',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Films.find()
      .then((film) => {
        res.status(201).json(film);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error ${err}`);
      });
  },
);

/**
 * @function Get a specific film by title
 * @description retrieves information about a specific film based on the title
 * @example
 *  axios({
 *    method: 'get',
 *    url: 'https://fataleflix.herokuapp.com/client/films/Midsommar,
 *    {
 *      headers: { Authorization: `Bearer ${token}` }
 *    }
 *  })
 * @param {string} '/films/:Title' endpoint for a specific film requested by the client
 * @param {object} jwt bearer JSON web token passed with each HTTP request from client
 * @returns {JSON} JSON object containing information about a specific film and its title, description, director, genre, image url, and featured status
 */
app.get(
  '/films/:Title',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Films.findOne({ Title: req.params.Title })
      .then((film) => {
        res.status(201).json(film);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/**
@function get a genre by name
@description retrieves information about a genre based on the name
@example
 axios({
   method: 'get',
   url: 'https://fataleflix.herokuapp.com/client/genres/Comedy,
   {
     headers: { Authorization: `Bearer ${token}`
   }
})
*@param {string} '/genres/:Name' endpoint for a specific genre, by name, requested by the client
*@param {object} jwt The bearer json web token passed into the HTTP request from the client
@returns {JSON} JSON object containing information about a specific genre including the name and description
*/
app.get(
  '/films/:genres/:Name',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Films.findOne({ Title: req.params.Title })
      .then((film) => {
        res
          .status(201)
          .json(
            `Genre ${film.Genre.Name} Description: ${film.Genre.Description}`,
          );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/**
 @function get a director by name
 @description retrieves information about a director based on the name
 @example
  axios({
    method: 'get',
    url: 'https://fataleflix.herokuapp.com/client/directors/Karyn%20Kusama,
    {
      headers: { Authorization: `Bearer ${token}`
    }
})
 *@param {string} '/directors/:Name' endpoint for a specific director requested by the client
 *@param {object} jwt The bearer json web token passed into the HTTP request from the client
 @returns {JSON} JSON object containing information about a specific director and their name and bio
 */

app.get(
  '/films/directors/:Name',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Films.findOne({ 'Director.Name': req.params.Name })
      .then((director) => {
        res.status(201).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

//   ---USER ENDPOINTS---

/**
@function get all users
@description retrieves list of users from the database
@example
 axios({
   method: 'get',
   url: 'https://fataleflix.herokuapp.com/client/users,
   {
     headers: { Authorization: `Bearer ${token}`
   }
})
*@param {string} '/users' endpoint for the users list
*@param {object} jwt The bearer json web token passed into the HTTP request from the client
@returns {JSON} JSON object containing full list of users, including name, username, hashed password, email, birthdate, and queued films
*/

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
        res.status(500).send(`Error ${err}`);
      });
  },
);

/**
@function get an account by username
@description retrieves information about a specific user
 axios({
   method: 'get',
   url: 'https://fataleflix.herokuapp.com/client/users/matilda,
   {
     headers: { Authorization: `Bearer ${token}`
   }
})
*@param {string} '/users/:Username' endpoint for a specific user
*@param {object} jwt The bearer json web token passed into the HTTP request from the client
@returns {JSON} JSON object containing information about a specific user, including name, username, hashed password, email, birthdate, and queued films
*/
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/**
@function add a new user
@description creates a new user in the database
@example
 axios({
   method: 'post',
   url: 'https://fataleflix.herokuapp.com/client/users',
   {
     "name": "membrane",
     "username": "membrane",
     "password": "visc0us1!"",
     "email": "membranehex@gmail.com",
     "birth_date": "10-23-1996"
   }
})
*@param {string} '/users' endpoint for users requested by the client
*@param {JSON} user JSON object containing name, username, password, email, and birthdate
@returns {JSON} JSON object containing information about the new user, including name, username, hashed password, email, and birthdate.
*/
app.post(
  '/users',
  [
    check('Username', 'username is required').isLength({
      min: 3,
    }),
    check(
      'Username',
      'username contains non alphanumeric characters - not allowed.',
    ).isAlphanumeric(),
    check('Password', 'password is required').not().isEmpty(),
    check('Email', 'email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    // check the validation object for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({
      Username: req.body.Username,
    }) // search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          // if the user is found, send a response that it already exists
          return res.status(400).send(`${req.body.Username} already exists`);
        }
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthdate: req.body.Birthdate,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send(`Error: ${error}`);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
      });
  },
);

/**
 @function delete a user from the database
 @description removes a user from the database
 @example
  axios({
      method: 'delete',
      url: 'https:/fataleflix.herokuapp.com/client/users/membrane',
      headers: { 'Authorization': `Bearer ${token}` }
})
 *@param {string} '/users/:Username' endpoint for a specific user
 *@param {object} jwt the bearer json web token passed into the HTTP request from the client
 @returns {string} string message confirming that the user has been deleted
 */

app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(`${req.params.Username} was not found`);
        } else {
          res.status(201).send(`${req.params.Username} was deleted`);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
      });
  },
);

/**
@function update a user's account
@description update a user's account information in the database. if the user doesn't exist a validation error is thrown
@example
 axios({
      method: 'put',
      url: 'https://fataleflix.herokuapp.com/client/users/membrane',headers: { 'Authorization': `Bearer ${token}` },
   {
     "name": "membrane",
     "username": "membrane",
     "password": "visc0us1!"",
     "email": "membranehex@gmail.com",
     "birth_date": "10-23-1996"
   }
})
*@param {string} '/users/:Username' endpoint for a specific user, by username, requested by the client
*@param {object} jwt The bearer json web token passed into the HTTP request from the client
*@param {JSON} user JSON object containing user's updated name, username, password, email, and/or birthdate
@returns {JSON} JSON object containing the user's updated name, username, hashed password, email, and/or birthdate
*/
app.put(
  '/users/:Username',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    const hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      {
        Username: req.params.Username,
      },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          BirthDate: req.body.BirthDate,
        },
      },
      {
        new: true,
      },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send(`Error: ${err}`);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

/**
@function add a film to the user's queue
@description adds a film in the database to the user's queue
@example
 axios({
   method: 'post',
   url: 'https://fataleflix.herokuapp.com/client/users/membrane/Films/18293050',
   {
     "name": "membrane",
     "username": "membrane",
     "password": "visc0us1!"",
     "email": "membranehex@gmail.com",
     "birth_date": "10-23-1996"
   }
})
*@param {string} '/users/:Username/Films/:FilmID' endpoint for specific user and film ID requested by the client
*@param {object} jwt The bearer json web token passed into the HTTP request from the client
@returns {object} user object containing information about the user, including name, username, hashed password, email, birthdate, and new queued films
*/

app.post(
  '/users/:Username/films/:FilmID',
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
          res.status(500).send(`Error: ${err}`);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

/**
 @function delete a film from the user's queue
 @description removes a film from a user's queued films
 @example
  axios({
      method: 'delete',
      url: 'https://fataleflix.herokuapp.com/client/users/membrane/Films/16582495',
      headers: { 'Authorization': `Bearer ${token}` }
})
 *@param {string} '/users/:Username/Films/:FilmID' endpoint for a specific user and filmID
 *@param {object} jwt the bearer json web token passed into the HTTP request from the client
 @returns {object} user object containing user's name, username, hashed password, email, birthdate, and new queued films
 */

app.delete(
  '/users/:Username/films/:FilmID',
  passport.authenticate('jwt', { sesson: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { Queue: req.params.FilmID },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send(`Error: ${err}`);
        } else {
          res.json(updatedUser);
        }
      },
    );
  },
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

// listen for requests
const host = '0.0.0.0';
const port = process.env.PORT || 8080;
app.listen(port, host, () => {
  console.log(`listening on port ${port}`);
});
