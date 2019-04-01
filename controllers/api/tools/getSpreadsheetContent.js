const { google } = require('googleapis')
const { authorize } = require('../../../controllers/api/auth/authCTL')
const { saveContentsOnSheet } = require('../../../functions/spreadsheet')
const momentzone = require('moment-timezone')
// Model
const { spreadsheets, users } = require('../../../models')

/** Receive spreadsheet ID and Fetch all content into this sheet */
const getSpreadsheetContent = async (req, res) => {
  const { spreadsheetId, userId } = req.body
  // Request Google to get subinfo about that sheet
  const auth = await authorize(userId) // Receive verify JSON Url of Auth object
  if (auth.isAuth) {
    const { data } = auth
    const sheets = google.sheets({ version: 'v4', auth: data })

    try {
      // Get all sheets availabel in current Spreadsheet => [Objects]
      const { sheets: sheetList, alias } = await spreadsheets
        .findOne({ spreadsheetId })
        .lean()

      const user = await users.findOne({ _id: userId }).lean()

      Promise.all(
        sheetList.map(async sheet => {
          // Loop through sheetList and Fetch data of each sheet
          // Fetch data in one sheet (Demo: PRE Sheet)
          const {
            data: { values: sheetContent },
          } = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheet.title}!A1:ZZ${sheet.rowCount}`,
          })
          console.log('RANGE:', `${sheet.title}!A1:ZZ${sheet.rowCount}`)
          try {
            await saveContentsOnSheet(sheetContent, alias, sheet.title)
          } catch (err) {
            console.log('Error with sheet:', sheet.title)
            return
          }
        })
      ).then(async () => {
        await spreadsheets.findOneAndUpdate(
          { spreadsheetId },
          {
            $set: {
              creator: user.name,
              updated: momentzone(Date.now())
                .tz('Asia/Ho_Chi_Minh')
                .format(),
            },
          }
        )
        res.json({ success: true })
      })
    } catch (errors) {
      return res.status(400).json({ success: false, errors })
    }
  } else {
    return res.status(400).json({ success: false, verifyUri: auth.data })
  }
}

module.exports = { getSpreadsheetContent }
