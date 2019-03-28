// Google Authenticate API
const { authCTL } = require('./auth/authCTL')
const { setToken } = require('./auth/setToken')
const { signup } = require('./users/signup')
const { signin } = require('./users/signin')

// Spreadsheet API
const { getSpreadsheetContent } = require('./tools/getSpreadsheetContent')
const { newSprsheet } = require('./tools/newSprsheet')
const { search } = require('./tools/search')
const { all } = require('./tools/all')
const { syncinfo } = require('./tools/syncinfo')
const { deleteSpreadsheet } = require('./tools/deleteSpreadsheet')

module.exports = {
  authCTL,
  setToken,
  spreadsheet: {
    newSprsheet,
    getSpreadsheetContent,
    search,
    deleteSpreadsheet,
    syncinfo,
    all,
  },
  users: {
    signup,
    signin,
  },
}
