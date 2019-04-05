const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// AUTHENTICATION
app.post('/api/auth/login', function(req, res) {
  const loginDetails = {
    username: req.body.username,
    password: req.body.password
  };

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
  // TODO hardcoded user credentials
  return username === 'test' && password === 'test';
}

// START APP
const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
