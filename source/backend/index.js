const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'path/to/datafile' });
const uuidv1 = require('uuid/v1');
const cors = require('cors');

const server = require('http').createServer(app);
const socket = require('socket.io');

const io = socket.listen(server);

io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(data) {
    console.log(data);
  });
});

app.use(bodyParser.json());
app.use(cors());

// CORS
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
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
app.post('/api/auth/register', async function(req, res) {
  const registerDetails = {
    uuid: uuidv1(),
    username: req.body.username,
    password: req.body.password
  };
  console.log('register', registerDetails);
  const isAllowed = await isRegisterAllowed(registerDetails);
  if (!isAllowed) {
    res
      .status(400)
      .json({ message: 'Registration failed. User already exists.' });
  } else {
    db.insert(registerDetails, function(err, newUser) {
      const jwtToken = jwt.sign(
        { uuid: registerDetails.uuid, username: registerDetails.username },
        'supersecretkey'
      );
      res.status(200).json({
        jwtToken: jwtToken
      });
    });
  }
});

// AUTHENTICATION
app.post('/api/auth/login', async function(req, res) {
  const loginDetails = {
    username: req.body.username,
    password: req.body.password
  };
  console.log('login', loginDetails);
  const { docs, isValid } = await isValidCredentials(loginDetails);
  if (!isValid) {
    res.status(401).json({ message: 'Authentication failed. User not found.' });
  } else {
    const user = docs[0];
    const { uuid } = user;
    const jwtToken = jwt.sign(
      {
        uuid: uuid,
        username: loginDetails.username
      },
      'supersecretkey'
    );
    res.status(200).json({
      jwtToken: jwtToken
    });
  }
});

function isValidCredentials({ username, password }) {
  return new Promise(function(resolve, reject) {
    db.find({ username: username, password: password }, function(err, docs) {
      const isValid = docs.length !== 0;
      resolve({ docs, isValid });
    });
  });
}

function isRegisterAllowed({ username, password }) {
  return new Promise(function(resolve, reject) {
    db.find({ username: username, password: password }, function(err, docs) {
      const doesRecordExist = docs.length === 0;
      resolve(doesRecordExist);
    });
  });
}

const port = 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// START APP
// app.listen(8080, () => {
//   // const host = server.address().address;
//   // const port = server.address().port;

//   console.log(`Server listening`);
// });

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
