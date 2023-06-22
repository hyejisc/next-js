const express = require("express");
const { Client } = require("pg");

const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// 인덱스
app.get("/", function (req, res) {
  res.send("home");
});

// 정적파일 서비스
app.use(express.static("public"));

app.get("/route", function (req, res) {
  res.send("router, <img src='/test.jpg'></img>");
});

// 동적
app.get("/dynamic", function (req, res) {
  var lis = "";
  for (var i = 0; i < 5; i++) {
    lis += "<li>coding</li>";
  }

  var time = Date();
  var output = `
    <!DOCTYPE html> 
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        hello, dynamic!
        <ul>
          ${lis}
        </ul>
          ${time}
        </body>
    </html>
  `;
  res.send(output);
});

// 템플릿 엔진
app.set("view engine", "pug");
app.get("/template", function (req, res) {
  res.render("index", { title: "제목", message: "메시지" });
});

// 쿼리 스트링 & 시멘틱 url
// req.query 또는 req.params
app.get("/topic/:id", function (req, res) {
  var topics = ["javascript", "nodejs", "express"];
  var output = `
    <a href="topic?id=0">javascript</a><br>
    <a href="topic?id=1">nodejs</a><br>
    <a href="topic?id=2">express</a><br>
  ${topics[req.params.id]}
  `;
  res.send(output);
});

app.get("/topic/:id/:mode", function (req, res) {
  res.send(req.query.id + "," + req.query.mode);
});

// post로 form 전송
app.get("/form", function (req, res) {
  res.render("form");
});
app.get("/form_receiver", function (req, res) {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + description);
});
app.post("/form_receiver", function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + description);
});

// 디비 연결
const dbClient = new Client({
  host: "192.168.0.228",
  port: 5432,
  databse: "hyeji",
  user: "postgres",
  password: "0937",
});
dbClient.connect();
app.get("/read", (req, res) => {
  dbClient.query("SELECT * from member", (error, result) => {
    if (error) {
      res.sendStatus(500);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

app.use(express.static(__dirname + "/static"));
app.listen(3000);
