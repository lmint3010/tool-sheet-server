const { Schema, model } = require('../utils/mongoose').mongoose

const spreadsheetsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  spreadsheetUrl: {
    type: String,
    required: true,
  },
  spreadsheetId: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  sheets: {
    type: [
      {
        sheetId: String,
        title: String,
        index: Number,
        rowCount: Number,
        columnCount: Number,
      },
    ],
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: String,
  },
  totalEnglishDocs: {
    type: Number,
    default: 0,
  },
  userLiked: {
    type: [String],
    default: [],
  },
})

module.exports = model('spreadsheet', spreadsheetsSchema)
