const { spreadsheets, users } = require('../../../models')
const { google } = require('googleapis')
const { authorize } = require('../auth/authCTL')

// Utils
const momentzone = require('moment-timezone')

const syncinfo = async (req, res) => {
  // Data submited from client
  const { spreadsheetIdFromUser, username, userId, id } = req.body
  // Request Google to get subinfo about that sheet
  const auth = await authorize(userId)
  // If user already authorized -> Let's save
  if (auth.isAuth) {
    const { data } = auth
    const sheets = google.sheets({ version: 'v4', auth: data })
    try {
      const sprsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetIdFromUser,
      })
      // Update document
      const {
        data: {
          properties: { title },
          spreadsheetId,
          spreadsheetUrl,
          sheets: sheetList,
        },
      } = sprsheetInfo
      const newSheets = sheetList.map(({ properties: sheet }) => ({
        sheetId: `${sheet.sheetId}`,
        title: sheet.title,
        index: sheet.index,
        rowCount: sheet.gridProperties.rowCount,
        columnCount: sheet.gridProperties.columnCount,
      }))
      const newSprsheet = {
        title,
        updated: momentzone(Date.now())
          .tz('Asia/Ho_Chi_Minh')
          .format(),
        sheets: newSheets,
        spreadsheetId,
        spreadsheetUrl,
        creator: username,
        lastEditor: '',
      }
      await spreadsheets.findByIdAndUpdate(id, {
        $set: newSprsheet,
      })
      return res.json({ updated: true, data: null })
    } catch (err) {
      return res.status(400).json({ updated: false, errors: err })
    }
  } else {
    return res.status(401).json({ updated: false, verifyUri: auth.data })
  }
}

module.exports = { syncinfo }
