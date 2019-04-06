const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const uuidv1 = require('uuid/v1');
const cors = require('cors');

const server = require('http').createServer(app);
const socket = require('socket.io');

const io = socket.listen(server);

io.on('connection', function(con) {
  con.join('room');
  console.log('Client connected...');
  con.on('message', data => {
    console.log('message received', data);
    if (data.type == 'client') {
      con.to('room').emit('getMsg', data.message);
    } else {
      con.to('room').emit('getMsg', data.message);
    }
  });
});

const dbChats = new Datastore({ filename: 'db/chats' });
const dbUsers = new Datastore({ filename: 'db/users' });

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

dbUsers.loadDatabase(function(err) {
  // Callback is optional
  // Now commands will be executed
});

dbChats.loadDatabase();

// REGISTER NEW USER
// app.post('/api/auth/register', async function(req, res) {
//   const registerDetails = {
//     uuid: uuidv1(),
//     username: req.body.username,
//     password: req.body.password
//   };
//   console.log('register', registerDetails);
//   const isAllowed = await isRegisterAllowed(registerDetails);
//   if (!isAllowed) {
//     res
//       .status(400)
//       .json({ message: 'Registration failed. User already exists.' });
//   } else {
//     dbUsers.insert(registerDetails, function(err, newUser) {
//       const jwtToken = jwt.sign(
//         { uuid: registerDetails.uuid, username: registerDetails.username },
//         'supersecretkey'
//       );
//       res.status(200).json({
//         jwtToken: jwtToken
//       });
//     });
//   }
// });

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
    const { uuid, userType } = user;
    const jwtToken = jwt.sign(
      {
        uuid: uuid,
        userType: userType,
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
    dbUsers.find({ username: username, password: password }, function(
      err,
      docs
    ) {
      const isValid = docs.length !== 0;
      resolve({ docs, isValid });
    });
  });
}

function isRegisterAllowed({ username, password }) {
  return new Promise(function(resolve, reject) {
    dbUsers.find({ username: username, password: password }, function(
      err,
      docs
    ) {
      const doesRecordExist = docs.length === 0;
      resolve(doesRecordExist);
    });
  });
}

// CHAT STUFF
app.get('/api/get-chats/:sid', (req, res) => {
  const sid = req.params.sid;
  const searchQuery = { users: sid };
  dbChats.find(searchQuery, function(err, chats) {
    let response = [];
    for (let chatID in chats) {
      response.push({ chatID: chatID, users: chats[chatID].users });
    }
    res.json(response);
  });
});

app.get('/api/get-messages/:uid', (req, res) => {
  const uid = req.params.uid;
  const searchQuery = { uuid: uid };
  dbUsers.findOne(searchQuery, function(err, user) {
    console.log(user.chats[0]);
    dbChats.findOne({ id: user.chats[0] }, function(err, chat) {
      res.json(chat.messages);
    });
  });
});

app.get('/api/get-messages/:sid/:uid', (req, res) => {
  const sid = req.params.sid;
  const uid = req.params.uid;
  const searchQuery = { users: [sid, uid] };
  dbChats.findOne(searchQuery, function(err, chat) {
    res.json(chat);
  });
});

// app.post('/api/send-message/', (req, res) => {
//   const message = {
//     type: req.body.type,
//     content: req.body.content,
//     from: req.body.from
//   };
//   const uid = req.body.uid;
//   const sid = req.body.sid;
//   dbChats.insert(registerDetails, function(err, newUser) {
//     const jwtToken = jwt.sign(
//       { uuid: registerDetails.uuid, username: registerDetails.username },
//       'supersecretkey'
//     );
//     res.status(200).json({
//       jwtToken: jwtToken
//     });
//   });
// });

const port = 8080;

// GAMIFICATION
app.post('/api/set-user-score/:uid/', (req, res) => {
  const uid = req.params.uid;
  const score = req.body.score;
  dbUsers.update(
    { uuid: uid },
    { $set: { score: score } },
    { multi: false },
    function(err, numReplaced) {
      if (numReplaced === 1) {
        res.status(200).json('update successful');
      } else {
        res.status(400).json('update not successful');
      }
    }
  );
});

// START APP
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// nedb-test insert
app.post('/send-message', (req, res) => {
  let docToInsert = req.body;
  console.log(docToInsert);
  dbUsers.insert(docToInsert, function(err, newDocs) {
    // newDocs is an array with these documents, augmented with their _id
    res.json(newDocs);
  });
});

// nedb-test read
app.get('/get-messages/:uid', (req, res) => {
  const uid = req.params.uid;
  dbUsers.find(uid, function(err, docs) {
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
