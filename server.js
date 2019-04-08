const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

const port = process.env.PORT || 6633;

app.set("view engine", "hbs");
hbs.registerPartials("/Views/Partials");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} & ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to write to the file!");
    }
  });

  next();
});

app.use(express.static(__dirname + "/Public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("upperIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs");
});

app.get("/about", (req, res) => {
  res.render("about.hbs");
});

app.get("/contactus", (req, res) => {
  res.render("contactus.hbs");
});

app.listen(port, () => {
  console.log("Server is running >>>>>>>>>");
});
