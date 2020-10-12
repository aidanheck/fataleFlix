const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const { check, validationResult } = require("express-validator");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Films = Models.Film;
const Users = Models.User;

// mongoose.connect('mongodb://localhost:27017/fataleflix', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect(
//   "mongodb+srv://fataleFlixUser:GoblinLetMeInPlease@fataleflixdb.7g43t.gcp.mongodb.net/fataleflix?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(morgan("common"));
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

//imports auth.js into index.js
let auth = require("./auth")(app);

//imports passport into index.js
const passport = require("passport");
require("./passport");

//CORS
const cors = require("cors");
let allowedOrigins = ["http://localhost:8080", "http://testsite.com"];

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
// Get the main page
app.get("/", (req, res) => {
  res.send(
    "Welcome to FataleFlix, a resource for unsettling films mostly about women."
  );
});
// let films = [
//   {
//     id: 1,
//     title: "Jennifer's Body",
//     description:
//       "When a demon takes possession of her, high-school hottie Jennifer (Megan Fox) turns a hungry eye on guys who never stood a chance with her before. While evil Jennifer satisfies her appetite for human flesh with the school's male population, her nerdy friend, Needy (Amanda Seyfried), learns what's happening and vows to put an end to the carnage.",
//     genre: "Comedy/Horror",
//     director: {
//       name: "Karyn Kusama",
//       birth_year: "1968",
//       biography:
//         "Karyn Kusama was born on March 21, 1968 in Brooklyn, New York, USA as Karyn K. Kusama. She is a director and producer, known for The Invitation (2015), Girlfight (2000) and Ã†on Flux (2005).",
//     },
//     released: "2009",
//     poster: "",
//   },
//   {
//     id: 2,
//     title: "The Love Witch",
//     description:
//       "Elaine (Samantha Robinson), a beautiful young witch, is determined to find a man to love her. In her gothic Victorian apartment she makes spells and potions, then picks up men and seduces them. However, her spells work too well, and she ends up with a string of hapless victims. When she at last meets the man of her dreams, her desperation to be loved drives her to the brink of insanity and murder.",
//     genre: "Comedy/Horror",
//     director: {
//       name: "Anna Biller",
//       birth_year: "N/A",
//       biography:
//         "Anna Biller is an independent American filmmaker who has directed two feature films. Biller considers herself a feminist filmmaker and consciously explores feminist themes throughout her work, including exploring the female gaze in cinema.",
//     },
//     released: "2017",
//     poster: "",
//   },
//   {
//     id: 3,
//     title: "Midsommar",
//     description:
//       "A couple travel to Sweden to visit their friend's rural hometown for its fabled midsummer festival, but what begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
//     genre: "Horror",
//     director: {
//       name: "Ari Aster",
//       birth_year: "1986",
//       biography:
//         "Ari Aster is an American director and screenwriter known for Hereditary and Midsommar.",
//     },
//     released: "2019",
//     poster: "",
//   },
//   {
//     id: 4,
//     title: "The Babadook",
//     description:
//       "A single mother, plagued by the violent death of her husband, battles with her son's fear of a monster lurking in the house, but soon discovers a sinister presence all around her.",
//     genre: "Horror",
//     director: {
//       name: "Jennifer Kent",
//       birth_year: "1969",
//       biography:
//         "Jennifer Kent is an Australian actress, writer and director, best known for her directorial debut, the horror film The Babadook. Her second film, The Nightingale, premiered at the 75th Venice International Film Festival and was released in the United States on August 2, 2019.",
//     },
//     released: "2014",
//     poster: "",
//   },
//   {
//     id: 5,
//     title: "We Need to Talk About Kevin",
//     description:
//       "Eva Khatchadourian (Tilda Swinton) is a travel writer/publisher who gives up her beloved freedom and bohemian lifestyle to have a child with her husband, Franklin (John C. Reilly). Pregnancy does not seem to agree with Eva, but what's worse, when she does give birth to a baby boy named Kevin, she can't seem to bond with him. When Kevin grows from a fussy, demanding toddler (Rocky Duer) into a sociopathic teen (Ezra Miller), Eva is forced to deal with the aftermath of her son's horrific act.",
//     genre: "Thriller/Drama",
//     director: {
//       name: "Lynne Ramsay",
//       birth_year: "1969",
//       biography:
//         "Lynne Ramsay is a Scottish film director, writer, producer, and cinematographer best known for the feature films Ratcatcher, Morvern Callar, We Need to Talk About Kevin, and You Were Never Really Here.",
//     },
//     released: "2011",
//     poster: "",
//   },
// ];

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

// // listen for requests on port 8080
// app.listen(8080, () => {
//   console.log("your app is listening on port 8080!");
// });

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

// mongoimport --uri "mongodb+srv://fataleFlixUser:databaseUser%2A%21%2A@fataleflixdb.7g43t.gcp.mongodb.net/test" --collection Films --type json --file ../exported_collections/films.json