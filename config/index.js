// Atlas user: thong.lu@dfo.global
const mongo = {
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
}

const authenticate = {
  SCOPES: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
}

const credentials = {
  installed: {
    client_id: process.env.GG_CLIENT_ID,
    project_id: 'quickstart-1552550434445',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.GG_CLIENT_SECRET,
    redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost:3001'],
  },
}

module.exports = { mongo, authenticate, credentials }
