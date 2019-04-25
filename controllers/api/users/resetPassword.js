// Node build-in module
const crypto = require('crypto')

const Email = require('email-templates')
const emailTemp = new Email()

// Sendgrid ultility
const { sendGridTo } = require('../../../utils/sendGrid')

// Model
const { users } = require('../../../models')

module.exports.resetPassword = async (req, res) => {
  const { email } = req.body

  const user = await users.findOne({ email })

  if (!user)
    return res.json({ success: false, errors: { emailNotFound: true } })

  // Generate random token by crypto
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err) // For debug
      res.json({ success: false, errors: { systemError: true } })
    }
    const token = buffer.toString('hex')
    // Token lifetime: 5min
    user.resetPasswordToken = token
    user.resetPasswordTokenExpiration = `${Date.now() + 300000}`
    user
      .save()
      .then(userSaved => {
        const directLink = `https://dfo-data-finder.herokuapp.com/resetPassword/${
          userSaved.resetPasswordToken
        }/${userSaved._id}`
        const { email, name } = userSaved

        emailTemp
          .render('mars/html', { name: name, directLink })
          .then(htmlContent => {
            const sendMailCallback = () => res.json({ success: true })
            sendGridTo(email, 'Reset Password', htmlContent, sendMailCallback)
          })
          .catch(console.error)
      })
      .catch(err => console.log(err))
  })
}
