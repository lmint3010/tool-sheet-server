const { Schema, model } = require('../../utils/mongoose').mongoose

const englishSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  sheet: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  enzime: {
    type: String,
    required: true,
    unique: true,
  },
})

englishSchema.index({ content: 1 })

// module.exports = model('english', englishSchema, 'english')
