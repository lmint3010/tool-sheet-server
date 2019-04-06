// Models
const { users } = require('../../../models')
const { secretKey } = require('../../../config')
// Use for decode password
const bcrypt = require('bcrypt')
// Use for generate token
const jwt = require('jsonwebtoken')
const validator = require('../../../validation/api/signin')

const signin = async (req, res) => {
  // Validate user submit data
  const { isValid, errors } = validator(req.body)
  if(!isValid) {
    return res.status(400).json({ errors })
  }

  const { email, password } = req.body

  // Find user information on database
  const user = await users.findOne({ email }).lean()

  // Sign In Fail - Email not found
  if(!user) {
    return res.status(404).json({ errors: { email: 'User not found!' }})
  }

  // Sign In Fail - Password is not correct
  const passwordMatch = await bcrypt.compare(password, user.password)
  if(!passwordMatch) {
    return res.status(400).json({ errors: { password: 'Email or password is not correct'}})
  }

  // Sign In Success
  // Generate JWT bearer token for user
  const { avatar, _id, name } = user
  const payload = { avatar, _id, name }
  const token = await jwt.sign(payload, secretKey, { expiresIn: '1h' })

  // Response bearer token to user
  res.json({
    isLogin: true,
    token: `Bearer ${token}`
  })
}

module.exports = { signin }
