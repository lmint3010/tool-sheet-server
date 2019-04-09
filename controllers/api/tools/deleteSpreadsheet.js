const { spreadsheets, translation_model } = require('../../../models')

/** When user send SpreadsheetId
 * TODO: Find that spreadsheet in Database -> Delete it
 */
const deleteSpreadsheet = async (req, res) => {
  // Get Spreadsheet Id from user submit
  const { spreadsheetId } = req.body
  const { alias: site } = await spreadsheets.findById(spreadsheetId)

  // Delete all english documents related
  try {
    await Promise.all([
      // Delete all english documents related
      languages.english.deleteMany({ site }),
      // Delete all translate documents related
      languages.translate.deleteMany({ site }),
      // Delete all update content related
      languages.needupdate.deleteMany({ site }),
      spreadsheets.findByIdAndDelete(spreadsheetId)
    ])
    res.json({ deleted: true, errors: null })
  } catch (err) {
    res.status(400).json({
      deleted: false,
      err,
    })
  }
}

module.exports = { deleteSpreadsheet }
