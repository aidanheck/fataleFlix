const jwtSecret = "your_jwt_secret"; //this has to be the same key used in the JWTStrategy
const jwt = require("jsonwebtoken"),
  passport = require("passport");
require("./passport"); //your local passport file

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //this is the username you're encoding in the JWT
    expiresIn: "7d",
    algorithm: "HS256",
  });
}

/* POST login */
module.exports = (router) => {
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
      console.log({ from: "auth.js", e: error, u: user, i: info });
      if (error) {
        return res.status(400).json({
          message: "Something is not right",
        });
      }
      if (!user) {
        return res.status(400).json({
          message: "no such user",
          user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res, next);
  });
};
