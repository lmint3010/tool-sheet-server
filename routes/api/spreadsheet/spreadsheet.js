const schedule = require('node-schedule')
const route = require('express').Router()
const {
  newSprsheet,
  getSpreadsheetContent,
  search,
  all,
  clean,
  deleteSpreadsheet,
  syncinfo,
  setDefaultSpreadsheet,
  getWorkspaceData,
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
schedule.scheduleJob('0 10 * * *', clean)

// @path POST /api/sprsheet/delete
route.post('/delete', deleteSpreadsheet)

// @path POST /api/sprsheet/syncinfo
route.post('/syncinfo', syncinfo)

// @path POST /api/sprsheet/setdefault
route.post('/setdefault', setDefaultSpreadsheet)

// @path POST /api/sprsheet/get-workspace-data
route.post('/get-workspace-data', getWorkspaceData)

module.exports = route
