const { translation_model } = require('../../../models')
const strEnzime = require('../../../functions/pure/strEnzime')
const isEmpty = require('../../../validation/isEmpty')

const search = async (req, res) => {
  const { content, code } = req.body

  const enzimeRegExp = new RegExp(strEnzime(content.toLowerCase()), 'g')

  // Find all english docs match search case
  const results = await translation_model.find({ enzime: enzimeRegExp }).lean()

  if (isEmpty(results)) return res.json({ status: false })

  const searchResults = results.map(({ site, sheet, text, translated }) => ({
    text,
    position: `${site} | ${sheet}`,
    translated: translated[code.toLowerCase()],
  }))

  res.json({ status: true, searchResults })
}

module.exports = { search }
