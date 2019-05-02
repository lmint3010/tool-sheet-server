const { spreadsheets } = require('../../../models')

module.exports.setDefaultSpreadsheet = async (req, res) => {
  const { userId, spreadsheetId } = req.body
  try {
    const spreadsheet = await spreadsheets.findById(spreadsheetId)
    const finder = spreadsheet.userLiked.find(e => e === userId)
    if (!finder) {
      spreadsheet.userLiked = [...spreadsheet.userLiked, userId]
    } else {
      spreadsheet.userLiked = spreadsheet.userLiked.filter(e => e !== userId)
    }
    await spreadsheet.save()
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false, err })
  }
}
