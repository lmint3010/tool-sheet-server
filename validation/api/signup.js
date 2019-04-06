const validator = require('validator')

const isEmpty = require('../isEmpty')

module.exports = body => {
  const { name, email, password, password2 } = body
  let errors = {}

  const dfoEmailRegExp = /^.*@dfo.global$/g
  const passwordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g

  if(!name) {
    errors.name = 'Please enter your name'
  }

  if(!email) {
    errors.email = 'Please enter your email'
  }

  if(!password) {
    errors.password = 'Please enter your password'
  }

  if(!password2) {
    errors.password2 = 'Please enter your confirm password'
  }

  if(!isEmpty(errors)) {
    return { errors, isValid: isEmpty(errors) }
  }


  // Email validation
  if(!validator.isEmail(email)) {
    errors.email = 'Email is not valid'
  } else if(!dfoEmailRegExp.test(email)) {
    errors.email = `You're not a member of DFO Global Company`
  }

  // Username validation
  if(!validator.isLength(name, { min: 4, max: 32 })) {
    errors.name = 'Your name must be between 4 - 32 characters'
  }

  // Password validation
  if(password !== password2) {
    errors.password2 = 'Your passwords not match'
  }

  if(!validator.isLength(password, { min: 6, max: 50 })) {
    errors.password = 'Your password must be between 6 - 50 characters'
  }

  if(!passwordRegExp.test(password)) {
    errors.password = 'Your password must have at least 1 lowercawe, 1 uppercase, 1 number, 1 special character'
  }

  return { errors, isValid: isEmpty(errors) }
}
