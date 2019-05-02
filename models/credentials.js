const { Schema, model } = require('../utils/mongoose').mongoose

const credSchema = new Schema({
  user: String,
  installed: {
    client_id: String,
    project_id: String,
    auth_uri: String,
    token_uri: String,
    auth_provider_x509_cert_url: String,
    client_secret: String,
    redirect_uris: [String]
  }
})

// module.exports = model('credetials', credSchema, 'credentials')