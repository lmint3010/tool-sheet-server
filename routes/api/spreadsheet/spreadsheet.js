const route = require('express').Router()
const {
  newSprsheet,
  getSpreadsheetContent,
  search,
  all,
  deleteSpreadsheet,
  syncinfo,
} = require('../../../controllers/api').spreadsheet

// @path  POST /add
// @desc  Add new spreadsheet information from user submition
route.post('/add', newSprsheet)

// @path  POST /add
// @desc  Fetch & Save all content in spreadsheet to mongodb
route.post('/fetch', getSpreadsheetContent)

// @path POST /search
// @desc Find Translation for language
route.post('/search', search)

// @path POST /all
// @desc Find Translation for language
route.get('/all', all)

// @path POST /api/sprsheet/delete
route.post('/delete', deleteSpreadsheet)

// @path POST /api/sprsheet/syncinfo
route.post('/syncinfo', syncinfo)

module.exports = route
