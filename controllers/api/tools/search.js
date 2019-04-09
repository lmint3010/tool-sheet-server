const { translation_model } = require('../../../models')
const strEnzime = require('../../../functions/pure/strEnzime')
const isEmpty = require('../../../validation/isEmpty')

const search = async (req, res) => {
  const { content, code } = req.body
  if (code.length > 2) return res.json({ status: false })

  const enzimeRegExp = new RegExp(strEnzime(content.toLowerCase()))

  // Find all english docs match search case
  const results = await translation_model.find({ enzime: enzimeRegExp }).lean()

  if (isEmpty(results)) return res.json({ status: false })

  const searchResults = results
    .reduce((arr, doc) => {
      return (!doc.translated || !doc.translated[code.toLowerCase()]) ? arr : arr.concat({
        text: doc.text,
        position: `${doc.site} | ${doc.sheet}`,
        translated: doc.translated[code.toLowerCase()],
      })
    }, [])

  res.json({ status: true, searchResults })
}

module.exports = { search }
