const { Schema, model } = require('../../utils/mongoose').mongoose

const translateSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  site: {
    type: String,
    required: true
  },
  sheet: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    unique: true
  }
})

// module.exports = model('translate', translateSchema, 'translate')