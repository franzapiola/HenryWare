const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
//Express session
const session = require('express-session');

//Passport
const passport = require('passport');
require('./config/passport');

require('./db.js');

const server = express();

server.name = 'API';


//Express session
//adjunta una sesión a la request. La sesión contiene una cookie.
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'henryware'
}));


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Inicializo passport y passport session
server.use(passport.initialize());
server.use(passport.session());

server.use('/', routes);

server.get('/testean2', (req, res) => {
  const { session } = req;
  
  console.log(req._passport.instance._strategies)
  res.send(session)
})

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;
