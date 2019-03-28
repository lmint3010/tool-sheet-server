const {
  languages: { english, translate },
} = require('../../../models')
const strEnzime = require('../../../functions/pure/strEnzime')
const isEmpty = require('../../../validation/isEmpty')

const search = async (req, res) => {
  const { content, code } = req.body

  const enzimeRegExp = new RegExp(strEnzime(content.toLowerCase()), 'g')

  // Find all english docs match search case
  const englishDocs = await english.find({ enzime: enzimeRegExp }).lean()

  if (isEmpty(englishDocs)) {
    return res.json({
      status: false,
      searchResults: null,
      errors: 'No results found!',
    })
  }

  Promise.all(
    englishDocs.map(async doc => {
      const { uid } = doc
      const translateDoc = await translate
        .findOne({ uid, code: code.toLowerCase() })
        .lean()
      if (translateDoc !== null) {
        translateDoc.english = doc.content
      }
      // return { translateDoc, englishDoc: doc }
      return translateDoc
    })
  ).then(data => {
    res.json({
      status: true,
      searchResults: data.filter(e => e !== null),
      errors: {},
    })
  })
}

module.exports = { search }
