var express = require("express");
var app = express();
var router = express.Router();

router.get("/create", function (req, res) {
  var html = template.html(``);
});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var fs = require("fs");

app.set("views", "./views_file");
app.set("view engine", "pug");

app.get("/topic/new", function (req, res) {
  res.render("new");
});

app.get(["/topic", "/topic/:id"], function (req, res) {
  fs.readdir("data", function (err, files) {
    if (err) {
      console.log(err);

      res.status(500).send("Internal Server Error");
    }
    var id = req.params.id;
    if (id) {
      // id 값이 있을 때
      fs.readFile("data/" + id, "utf8", function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
        res.render("view", { topics: files, title: id, description: data });
      });
    } else {
      // id 값이 없을때
      res.render("view", {
        topics: files,
        title: "welcome",
        description: "hello javascript",
      });
    }
  });
});

// app.get("/topic/:id", function (req, res) {
//   var id = req.params.id;

//   fs.readdir("data", function (err, files) {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     }
//     fs.readFile("data/" + id, "utf8", function (err, data) {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//       }
//       res.render("view", { topics: files, title: id, description: data });
//     });
//   });
// });

app.post("/topic", function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile("data/" + title, description, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.send("post complete");
  });
});

app.listen(3030);
