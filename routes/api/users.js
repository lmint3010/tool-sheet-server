const route = require('express').Router()

const {
  signup,
  signin,
  getall,
  resetPassword,
  renewPassword,
  validResetToken,
} = require('../../controllers/api').users

// POST -> /api/users/signup
// Sign up feature
route.post('/signup', signup)

// POST -> /api/users/signin
// Sign in feature
route.post('/signin', signin)

// POST -> /api/users/all
// Get all user information
route.get('/all', getall)

// POST -> /api/users/reset-password/
// Receive user email and send reset link
route.post('/reset-password/', resetPassword)

// POST -> /api/users/renewpassword/
// Receive user email and start to resetPassword
route.post('/valid-resettoken', validResetToken)

// POST -> /api/users/renewpassword/
// Receive user email and start to resetPassword
route.post('/renew-password/', renewPassword)

module.exports = route
