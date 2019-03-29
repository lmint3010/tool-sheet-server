// Models
const { users } = require('../../../models')

// Packages
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

// Validator
const validator = require('../../../validation/api/signup')

const signup = async (req, res) => {
  // Validate user submit data
  const { isValid, errors } = validator(req.body)
  if (!isValid) return res.status(400).json({ errors })

  const { email, name, password } = req.body

  // Gravatar config
  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
  // Hash user password
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Save new user
    const newUser = new users({
      name,
      email,
      avatar,
      password: `${hashedPassword}`,
      google_token: {
        access_token: '',
        refresh_token: '',
        scope: '',
        token_type: '',
        expiry_date: '',
      },
    })
    try {
      const savedUser = await newUser.save()
      res.json(savedUser)
    } catch (err) {
      if (err.code === 11000) errors.email = 'This email has been existed'
      return res.status(400).json({ errors })
    }
  } catch (err) {
    console.log('Hash password error')
    errors.system = 'System has error...'
    return res.status(400).json({ errors })
  }
}

module.exports = { signup }
