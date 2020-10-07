const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/static", express.static("public"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("oops! something broke!" + "<p>" + "error: " + err);
});
app.get("/", (req, res) => {
  res.send("welcome to my app!");
});
app.get("/films", (req, res) => {
  res.json("allFilms");
});

// listen for requests on port 8080
app.listen(8080, () => {
  console.log("your app is listening on port 8080!");
});
