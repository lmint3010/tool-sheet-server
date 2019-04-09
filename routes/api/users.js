const route = require('express').Router()

const { signup, signin, getall } = require('../../controllers/api').users

// @path  POST /api/users/signup
// @desc  Sign up feature
route.post('/signup', signup)

// @path  POST /api/users/signin
// @desc  Sign in feature
route.post('/signin', signin)

// @path  POST /api/users/all
// @desc  Get all user information
route.get('/all', getall)

module.exports = route
