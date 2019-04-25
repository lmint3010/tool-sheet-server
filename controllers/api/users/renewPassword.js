const users = require('../../../models/users')
const bcrypt = require('bcrypt')

module.exports.renewPassword = async (req, res) => {
  const { userId, password } = req.body

  // Validate token
  const user = await users.findById(userId)
  if (user) {
    const salt = await bcrypt.genSalt(10)
    const newPasswordHashed = await bcrypt.hash(password, salt)
    user.password = newPasswordHashed
    user
      .save()
      .then(async () => {
        await users.findByIdAndUpdate(userId, {
          $set: { resetPasswordToken: '', resetPasswordTokenExpiration: '' },
        })
        res.json({ renew: true })
      })
      .catch(() => {
        res.json({ renew: false })
      })
  }
}
