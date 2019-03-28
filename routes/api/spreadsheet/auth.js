const route = require('express').Router()
const { authCTL, setToken } = require('../../../controllers/api')

// Base Url: domain/api/auth/...

// @path  GET /
// @desc  Google Authentication
route.get('/', authCTL)

// @path  POST /settoken
// @desc  Google Authentication
route.post('/settoken', setToken)

module.exports = route
