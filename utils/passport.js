const { Strategy, ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')
const userModel = mongoose.model('users')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
}

module.exports = passport => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      // Constants
      const { _id } = payload

      // Find the user matched with ID
      const user = await userModel.findById(_id)
      if (user) return done(null, user)
      return done(null, false)
    })
  )
}
