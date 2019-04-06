// Atlas user: thong.lu@dfo.global
const mongo = {
  db_real:
    'mongodb+srv://lmint:Taokobiet@123@dfo-h5hz5.gcp.mongodb.net/toolsheet?retryWrites=true',
  db_test: 'mongodb://localhost/sheet_tool',
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
    client_id:
      '167434790478-dh9jveokttplmsdrq7gheqlfdje77p8q.apps.googleusercontent.com',
    project_id: 'quickstart-1552550434445',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'dCiuudng3h-QC1zW6FFpP1kZ',
    redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost:3001'],
  },
}

const secretKey = 'lmint3010'

module.exports = { mongo, authenticate, secretKey, credentials }
