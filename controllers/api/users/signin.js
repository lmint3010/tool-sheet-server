// Models
const { users } = require('../../../models')
// Use for decode password
const bcrypt = require('bcrypt')
// Use for generate token
const jwt = require('jsonwebtoken')
const validator = require('../../../validation/api/signin')

const signin = async (req, res) => {
  // Validation
  const { isValid, errors } = validator(req.body)
  if (!isValid) return res.status(400).json({ errors })

  const { email, password } = req.body

  const user = await users.findOne({ email }).lean()

  // Email not found
  if (!user)
    return res.status(404).json({ errors: { email: 'User not found!' } })

  // Password not correct
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch)
    return res
      .status(400)
      .json({ errors: { password: 'Email or password is not correct' } })

  // Success
  const { avatar, _id, name } = user
  const payload = { avatar, _id, name }
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '3h',
  })

  res.json({
    isLogin: true,
    token: `Bearer ${token}`,
  })
}

module.exports = { signin }
