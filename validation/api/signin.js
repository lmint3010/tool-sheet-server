const validator = require('validator')
const isEmpty = require('../isEmpty')

module.exports = body => {
  const { email, password } = body
  let errors = {}

  if(!email)
    errors.email = 'Please enter your email'

  if(!password)
    errors.password = 'Please enter your password'

  if(!isEmpty(errors))
    return { isValid: false, errors }

  if(!validator.isEmail(email))
    errors.email = 'Your email is not valid'

  return {
    errors,
    isValid: isEmpty(errors)
  }
}