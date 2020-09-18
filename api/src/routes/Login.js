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

  server.use(bodyParser.json());
  
  const initializePassport = require('../passport-config')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
/*   
  const users = [] */
  
/*   server.set('view-engine', 'ejs')
  server.use(express.urlencoded({ extended: false }))
  server.use(flash()) */
  server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  server.use(passport.initialize())
  server.use(passport.session())
  server.use(methodOverride('_method'))
  
  server.get('/', checkNotAuthenticated, (req, res) => {
    res.send('login.ejs')
  })
  
  server.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: 'http://localhost:3001/',
    failureRedirect: 'http://localhost:3001/login',
  }))
  
  server.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  server.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
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