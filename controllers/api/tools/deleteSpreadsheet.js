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
    await translation_model.deleteMany({ site })
    await spreadsheets.findByIdAndDelete(spreadsheetId)
    res.json({ deleted: true })
  } catch (err) {
    res.status(400).json({
      deleted: false,
      err,
    })
  }
}

module.exports = { deleteSpreadsheet }
