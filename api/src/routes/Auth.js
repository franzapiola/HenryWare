if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const server = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
 /*  const flash = require('express-flash') */
  const session = require('express-session')
  const methodOverride = require('method-override')
  const bodyParser = require('body-parser')
  const { User } = require('../db.js');

  server.use(bodyParser.json());
  
  const initializePassport = require('../passport-config')
  initializePassport(
    passport
  )
/*   
  const users = [] */
  
/*   server.set('view-engine', 'ejs')
  server.use(express.urlencoded({ extended: false }))
  server.use(flash()) */
  server.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }))
  server.use(passport.initialize())
  server.use(passport.session())
  server.use(methodOverride('_method'))

  // /auth/login
  server.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: 'http://localhost:3001/',
    failureRedirect: 'http://localhost:3001/login',
  }))
  
  
  //Ruta para crear un usuario    /auth/register
  server.post('/register', checkNotAuthenticated, (req, res) => {
    const { email, first_name, last_name, address, phone_number, role, password }= req.body;
    //Hice algunas modificaciones para que maneje bien los datos recibidos. Ya que el formulario manda a veces strings vacios. y la respuesta no la podia manejar si no era un objeto. 
    User.create({
        email,
        first_name,
        last_name,
        address,
        phone_number,
        role,
        password
    })
    .then((usuario) => res.status(201).send(usuario))
    .catch((error) => res.status(400).send(error));
  })
  
  server.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  module.exports = server;