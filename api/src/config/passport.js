const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db.js');



passport.use(new LocalStrategy(
    {
    usernameField: 'email'
    },
    //Este es el famoso 'verify callback'
    function(email, password, done) {
        User.findOne({
            where: {
                email
            }
        }, 
        function (err, user) {
            if (err) { 
                console.log(err);
                return done(err); }
            if (!user) { return done(null, false); }
            if (!user.checkPassword(password, user.password)) { return done(null, false); }
            return done(null, user);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
      where: {
        id
      }
    }).then(user => {
      done(null, user);
    }).catch(error => {
      return done(error)
    })
  });


module.exports = passport;