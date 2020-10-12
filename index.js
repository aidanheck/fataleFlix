const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  Models = require("./models.js");
  const app = express();

//imports passport into index.js
const passport = require("passport");
require("./passport");

const { check, validationResult } = require("express-validator");

const Films = Models.Film
const Users = Models.User

  //imports auth.js into index.js
  let auth = require("./auth")(app);
  let allowedOrigins = [
  "http://127.0.0.0.1:8080",
  "https://fataleflix.herokuapp.com/*"];

//MongoDB Atlas and Heroku connection
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Middleware
app.use(bodyParser.json());
app.use(morgan("common"));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "the CORS policy for this application doesn't allow access from origin" +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("oops! something broke!" + "<p>" + "error: " + err);
});


// Get the main page
app.get("/", (req, res) => {
  res.send(
    "Welcome to FataleFlix, a resource for unsettling films mostly about women."
  );
});

// Get a list of ALL films in the API
app.get(
  "/films",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Films.find()
      .then((films) => {
        res.status(201).json(films);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error " + err);
      });
  }
);

// Get a film based on its title
app.get(
  "/films/:title",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Films.findOne({ Title: req.params.Title })
      .then((film) => {
        res.json(film);
      })
      .catch((error) => {
        console.error(err);
        res.status(500).send("Error: " + error);
      });
  }
);

// Get a director by name
app.get(
  "/films/director/:name",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Films.findOne({ "Director.Name": req.params.Name })
      .then((films) => {
        res.json(
          "Name: " + films.Director.Name + " Bio: " + films.Director.Bio
        );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Get a genre by name and description based on film title
app.get(
  "films/:genre/:name",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Films.findOne({ Title: req.params.Title })
      .then((film) => {
        res
          .status(201)
          .json(
            "Genre " +
              film.Genre.Name +
              "Description: " +
              film.Genre.Description
          );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//get all users
app.get(
  "/users",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error " + err);
      });
  }
);

// Get a user account by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
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
  "/users",
  passport.authenticate("jwt", { sesson: false }),
  [
    check("Username", "Username is required").isLength({ min: 3 }),
    check(
      "Username",
      "Username containse non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + " already exists");
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
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Delete a user account
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(201).send(req.params.Username + " was deleted");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Update a user account by username
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { sesson: false }),
  [
    check("Username", "Username is required").isLength({ min: 3 }),
    check(
      "Username",
      "Username containse non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Add a film to "watch" list by film ID
app.post(
  "/users/:Username/Films/:FilmID",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { WatchList: req.params.FilmID },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Remove a film from "watch" list by film ID
app.delete(
  "/users/:Username/Films/:FilmID",
  passport.authenticate("jwt", { sesson: false }),
  (req, res) => {
    Users.findOneAndRemove(
      { Username: req.params.Username },
      {
        $pull: { WatchList: req.params.FilmID },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);
const host = '0.0.0.0';
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
