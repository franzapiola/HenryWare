const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db.js');
const bcrypt = require('bcrypt');



passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    //Este es el famoso 'verify callback'
    function (email, password, done) {
        console.log('Ejecutando estrategia')
        return User.findOne({
            where: {
                email
            }
        })
        .then((user) => {
            if (!user) { return done(null, false) }
            
            const isValid = user.checkPassword(password, user.password);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err));
    }
)
);

passport.serializeUser(function(user, done) {
    done(null, user.user_id);
});

passport.deserializeUser(function (user_id, done) {
    User.findOne({
      where: {
        user_id
      }
    }).then(user => {
      done(null, user);
    }).catch(error => {
      return done(error)
    })
  });


module.exports = passport;