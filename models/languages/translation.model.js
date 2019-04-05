const { Schema, model } = require('../../utils/mongoose').mongoose

const englishSchema = new Schema({
  site: {
    type: String,
    required: true,
  },
  sheet: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  enzime: String,
  translated: {},
})

module.exports = model('translations', englishSchema, 'translations')
