const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'path/to/datafile' });

app.use(bodyParser.json());

// CORS
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

db.loadDatabase(function(err) {
  // Callback is optional
  // Now commands will be executed
});

// REGISTER NEW USER
app.post('/api/auth/register', function(req, res) {
  const registerDetails = {
    username: req.body.username,
    password: req.body.password
  };
  console.log('register', registerDetails);

  db.insert(registerDetails, function(err, newUser) {
    res.status(200).json({ message: 'Registration successful.' });
  });
});

// AUTHENTICATION
app.post('/api/auth/login', function(req, res) {
  const loginDetails = {
    username: req.body.username,
    password: req.body.password
  };
  console.log('login', loginDetails);

  if (!isValidCredentials(loginDetails)) {
    res.status(401).json({ message: 'Authentication failed. User not found.' });
  }
  const jwtToken = jwt.sign(
    { username: loginDetails.username },
    'supersecretkey'
  );

  res.json({
    jwtToken: jwtToken
  });
});

function isValidCredentials({ username, password }) {
  db.find({ username: username, password: password }, function(err, docs) {
    return docs.length !== 0;
  });
}

// START APP
const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

// nedb-test insert
app.post('/send-message', (req, res) => {
  let docToInsert = req.body;
  console.log(docToInsert);
  db.insert(docToInsert, function(err, newDocs) {
    // newDocs is an array with these documents, augmented with their _id
    res.json(newDocs);
  });
});

// nedb-test read
app.get('/get-messages/:uid', (req, res) => {
  const uid = req.params.uid;
  db.find(uid, function(err, docs) {
    res.json(docs);
  });
});

// DANGER ZONE
// // nedb delete
// app.get('/nedb-delete', (req, res) => {
//   db.remove({}, { multi: true }, function(err, numRemoved) {
//     db.loadDatabase(function(err) {
//       res.json('deleted database');
//     });
//   });
// });
