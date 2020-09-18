const server = require('express').Router();
const passport = require('passport');



server.post('/login',
    //Primero pasa por el middleware de autenticación
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }),

    //Si la autenticación es exitosa, se ejecuta esta siguiente función
    function(req,res) {
        console.log('Autenticación exitosaa!')
    }
);

module.exports = server;
