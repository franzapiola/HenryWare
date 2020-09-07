const server = require('express').Router();
const {Op} = require('sequelize')
const bodyParser = require('body-parser')
const {User} = require('../db.js')

server.get('/',function(req,res){
    User.findAll({}).then(response => res.status(200).send(response))
})



module.exports = server;
