// The requiring section
const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

//Intialize the app with the server
var app = express();

// specifing the port to deploy on it
const port = process.env.PORT || 6633;

// Config. app to use the middlewares
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
app.set("Views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contactus", (req, res) => {
  res.render("contactus.ejs", {
    people: [
      { name: "Ahmed Sami", tel: 45644 },
      { name: "Sami Essayed", tel: 57879 }
    ]
  });
});

app.listen(port, () => {
  console.log("Server is running >>>>>>>>>");
});
