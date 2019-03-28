const route = require('express').Router()

const { signup, signin } = require('../../controllers/api').users

// @path  POST /api/users/signup
// @desc  Sign up feature
route.post('/signup', signup)

// @path  POST /api/users/signin
// @desc  Sign in feature
route.post('/signin', signin)

module.exports = route