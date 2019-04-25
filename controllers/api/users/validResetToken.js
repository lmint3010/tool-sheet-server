const { users } = require('../../../models')

module.exports.validResetToken = async (req, res) => {
  const { resetToken, userId } = req.body

  // Validate
  try {
    const user = await users.findById(userId)
    if (
      !user ||
      user.resetPasswordToken !== resetToken ||
      Number(user.resetPasswordTokenExpiration) < Date.now()
    ) {
      res.json({ valid: false })
    }
  } catch (err) {
    return res.json({ valid: false })
  }

  res.json({ valid: true })
}
