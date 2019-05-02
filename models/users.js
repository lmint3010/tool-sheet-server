const { Schema, model } = require('../utils/mongoose').mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  google_token: {
    access_token: String,
    refresh_token: String,
    scope: String,
    token_type: String,
    expiry_date: String,
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiration: String,
})

module.exports = model('users', userSchema, 'users')
