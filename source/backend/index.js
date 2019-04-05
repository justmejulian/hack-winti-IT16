const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Persistent datastore with manual loading
var Datastore = require("nedb"),
  db = new Datastore({ filename: "path/to/datafile" });
db.loadDatabase(function(err) {
  // Callback is optional
  // Now commands will be executed
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

// nedb-test insert
app.post("/nedb-insert", (req, res) => {
  let docToInsert = req.body;
  console.log(docToInsert);
  db.insert(docToInsert, function(err, newDocs) {
    // newDocs is an array with these documents, augmented with their _id
    res.json(newDocs);
  });
});

// nedb-test read
app.post("/nedb-read", (req, res) => {
  let searchString = req.body;
  db.find(searchString, function(err, docs) {
    res.json(docs);
  });
});

// nedb delete
app.get("/nedb-delete", (req, res) => {
  db.remove({ }, { multi: true }, function (err, numRemoved) {
    db.loadDatabase(function (err) {
      res.json("deleted database");
    });
  });
});