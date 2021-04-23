const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

let filmSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Released: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  Queue: [{ type: mongoose.Schema.Types.ObjectID, ref: "Film" }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Film = mongoose.model("Film", filmSchema);
let User = mongoose.model("User", userSchema);

module.exports.Film = Film;
module.exports.User = User;