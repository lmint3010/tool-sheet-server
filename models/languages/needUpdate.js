const { Schema, model } = require('../../utils/mongoose').mongoose

const needUpdateSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  oldcontent: {
    type: String,
    required: true,
  },
  newcontent: {
    type: String,
    required: true,
    unique: true,
  },
})

// module.exports = model('needupdate', needUpdateSchema, 'needupdate')
