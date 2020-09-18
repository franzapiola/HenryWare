const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { User,Order,LineaDeOrden,Product,Image } = require('./db.js')



function initialize(passport) {
  //Verify callback
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({
        where: {
            email
        }
    })
    .then(user => user)
    console.log("Usuario",user)
    if (user == null) {
      return done(null, false, { message: 'No se encontró un usuario registrado con ese email.' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Contraseña incorrecta...' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.user_id))
  passport.deserializeUser((user_id, done) => {
    User.findByPk(user_id)
    .then(user => done(null, user))
  })
}

module.exports = initialize