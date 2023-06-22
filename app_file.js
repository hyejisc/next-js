var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require("fs");

app.set("views", "./views_file");
app.set("view engine", "pug");

app.get("/topic/new", function (req, res) {
  res.render("new");
});
app.post("/topic", function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile("data/" + title, description, function (err) {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    res.send("post complete");
  });
});

app.listen(3030);
