const { getOAuth2Client } = require('./authCTL')
const { users } = require('../../../models')

/** Receive verify code from Google Service.
 * Then create new token and update your global token saved in Database
 * @param {String} code verify code give by Google Service
 */
const setToken = async (req, res) => {
  const { code, userId } = req.body
  const auth = await getOAuth2Client()

  auth.getToken(code, async (err, token) => {
    if(err) return res.status(400).json({ success: false, errors: 'Fail to get Token from Google' })
    const userdata = await users.findById(userId)

    // Update if user existed
    if(userdata) {
      await users.findByIdAndUpdate(
        userId,
        { $set: { google_token: token } }
      )
      return res.json({ success: true, errors: null })
    }
    res.status(400).json({ success: false, errors: 'User not found'})
  })
}

module.exports = { setToken }