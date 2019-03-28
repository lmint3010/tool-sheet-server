const { spreadsheets, users } = require('../../../models')
const { google } = require('googleapis')
const { authorize } = require('../auth/authCTL')

// Utils
const momentzone = require('moment-timezone')

// Validation suite
const isEmpty = require('../../../validation/isEmpty')
const validator = require('validator')

/** Create new spreadsheet instance and save to mongoDB
 * @param {Object} sprsheetInfo The Spreadsheet object responsed from Google Service
 * @param {String} alias Alias name for spreadsheet (Submit by Client)
 */
const createAndSave = async (sprsheetInfo, alias, username) => {
  const {
    data: {
      properties: { title },
      spreadsheetId,
      spreadsheetUrl,
      sheets,
    },
  } = sprsheetInfo
  const newSheets = sheets.map(({ properties: sheet }) => ({
    sheetId: `${sheet.sheetId}`,
    title: sheet.title,
    index: sheet.index,
    rowCount: sheet.gridProperties.rowCount,
    columnCount: sheet.gridProperties.columnCount,
  }))
  const newSprsheet = new spreadsheets({
    alias: alias.toLowerCase(),
    title,
    updated: momentzone(Date.now())
      .tz('Asia/Ho_Chi_Minh')
      .format(),
    sheets: newSheets,
    spreadsheetId,
    spreadsheetUrl,
    creator: username,
    lastEditor: '',
  })
  await newSprsheet.save()
  return { saved: true, title, alias, spreadsheetUrl }
}

/** Add new spreadsheet information from user submition
 * @return {Object} { saved: bool, title: string, alias: string }
 */
const newSprsheet = async (req, res) => {
  // Data submited from client
  const { sprsheetUri, alias, userId } = req.body

  // Validate Url
  if (isEmpty(sprsheetUri))
    return res.status(400).json({
      saved: false,
      errors: 'Please enter the Google Spreadsheet URL',
    })
  if (
    !validator.isURL(sprsheetUri) ||
    !/https:\/\/docs\.google\.com/g.test(sprsheetUri)
  )
    return res.status(400).json({
      saved: false,
      errors: 'Google Spreadsheet URL is not valid',
    })

  // Validate alias
  if (isEmpty(alias))
    return res.status(400).json({
      saved: false,
      errors: 'Please enter the alias for this spreadsheet',
    })
  const duplicatedAlias = await spreadsheets.findOne({
    alias: alias.toLowerCase(),
  })
  if (duplicatedAlias)
    return res.status(400).json({
      saved: false,
      errors: 'Alias name has been exists',
    })

  // Parse url to get spreadsheet Id
  const sprsheetIdRegex = /[\w-]{14,}/g
  const spreadsheetId = sprsheetUri.match(sprsheetIdRegex)[0]

  // Check duplicated spreadsheet in Database
  const duplicated = await spreadsheets.findOne({ spreadsheetId })
  if (duplicated) {
    const { creator } = duplicated
    return res.status(400).json({
      saved: false,
      errors: `This spreadsheet has been created by <${creator}>`,
    })
  }

  // Request Google to get subinfo about that sheet
  const auth = await authorize(userId)
  // If user already authorized -> Let's save
  if (auth.isAuth) {
    const { data } = auth
    const sheets = google.sheets({ version: 'v4', auth: data })
    try {
      const sprsheetInfo = await sheets.spreadsheets.get({ spreadsheetId })
      const { name: username } = await users.findById(userId)
      const saved = await createAndSave(sprsheetInfo, alias, username)
      return res.json({ saved: true, data: saved })
    } catch (err) {
      return res.status(400).json({ saved: false, errors: err })
    }
  } else {
    return res.status(401).json({ saved: false, verifyUri: auth.data })
  }
}

module.exports = { newSprsheet }
