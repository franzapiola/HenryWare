const server = require('express').Router();
const passport = require('passport');



server.post('/login',

    //Primero pasa por el middleware de autenticación
    passport.authenticate('local', { failureRedirect: '/login' }),

    //Si la autenticación es exitosa, se ejecuta esta siguiente función
    function(req,res) {
        res.redirect('/');
        //res.send('Autenticación exitosa wachitoooowww')
    }
);

module.exports = server;
