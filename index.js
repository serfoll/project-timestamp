// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//timestamp routing
app.get("/api/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  //match 5 number or more or -
  const msec = timestamp.match(/\d{5,}|-/) ? Date.parse(timestamp) : +timestamp;
  const parsedDade = new Date(msec).toUTCString();

  if (parsedDade === "Invalid Date") return res.json({ error: "Invalid Date" });

  res.json({ unix: msec, utc: parsedDade });
});

app.get("/api/", (req, res) => {
  const currDate = new Date().toUTCString();
  const msec = Date.parse(currDate);

  res.json({ unix: msec, utc: currDate });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
