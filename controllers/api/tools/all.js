const { spreadsheets } = require('../../../models')

const all = async (req, res) => {
   const spreadsheetList = await spreadsheets.find().lean()
   res.json({ data: spreadsheetList })
}

module.exports = { all }