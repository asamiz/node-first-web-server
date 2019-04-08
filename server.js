const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

hbs.registerPartials(__dirname + "/Views/Partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} & ${req.url}`;
  // console.log(log);
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
  res.send({ name: "Ahmed Sami", age: 25 });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page",
    message: "this is the message!"
  });
});

app.listen(5566);
