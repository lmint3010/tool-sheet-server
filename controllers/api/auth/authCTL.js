const { credentials, users } = require('../../../models')
const { isEmpty } = require('../../../validation')
const { google } = require('googleapis')
const {
  authenticate: { SCOPES },
} = require('../../../config/index')

/** Get oAuth2Client created from local credentials */
const getOAuth2Client = async () => {
  const creds = await credentials.findOne({ user: 'lmint3010' })
  const { client_secret, client_id, redirect_uris } = creds.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  google.options({ auth: oAuth2Client })
  return oAuth2Client
}

/** Token validation */
const isValidToken = token => !isEmpty(token) && Number(token.expiry_date) >= Date.now()

/**
 * Google Authorization Controller
 * @return {Object} { isAuth: bool, data: auth || verifyUrl, token: String }*/
const authorize = async userId => {
  const auth = await getOAuth2Client()
  // const token = await usertoken.findOne({ user: 'lmint3010' })
  const { google_token: token } = await users.findById(userId).lean()

  // Token is valid
  if (isValidToken(token)) {
    auth.setCredentials(token)
    return { isAuth: true, data: auth, token }
  }

  // Token is not valid
  const verifyUrl = auth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })

  return { isAuth: false, data: verifyUrl, token: null }
}

const authCTL = async (req, res) => {
  const { userId } = req.body
  const guard = await authorize(userId)
  return res.json(guard)
}

module.exports = { authorize, authCTL, getOAuth2Client }
