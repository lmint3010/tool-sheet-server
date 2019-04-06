const { formatSheetContent } = require('./formatSheetContent')
const { isEmpty } = require('../../validation')
const strEnzime = require('../../functions/pure/strEnzime')
const compare2Object = require('../../functions/pure/compare2Object')

// Models import
const { translation_model } = require('../../models')

/** Receive sheetContent and Save to mongoDB
 * @param {Array} content Array contain sheet content get by Google API.
 * @param {String} siteAlias Alias of current site
 * @param {String} currentSheet Name of current sheet
 */
const saveContentsOnSheet = async (content, siteAlias, currentSheet) => {
  let sheetContent = formatSheetContent(content)
  const languageList = sheetContent.shift()

  return Promise.all(
    sheetContent.map(async row => {
      // Step 1: Checkout _blank english document
      if (isEmpty(row[0])) {
        return;
      }

      // Step 2: Create new translated sub-document
      let newTranslated = {}
      // Loop on the row to map data to newTranslated
      for (let i = 1; i < row.length; i++) {
        const code = languageList[i].toLowerCase()

        // Get over if document is empty
        if (!isEmpty(row[i])) {
          newTranslated[code] = row[i]
        }
      }

      // Step 3: Verify existed english document on sheet
      const existedEnglish = await translation_model.findOne({
        text: row[0],
        sheet: currentSheet,
        site: siteAlias,
      })

      // Step 4: Handle exsited english document on sheet
      if (existedEnglish && !compare2Object(newTranslated, existedEnglish.translated)) {
        // Content will be update if has different point?
        return translation_model.findByIdAndUpdate(existedEnglish._id, {
          $set: { translated: newTranslated },
        })
      }

      // Create new document and save it
      const enzime = strEnzime(row[0].toLowerCase().trim())
      const newEnglishDocument = new translation_model({
        site: siteAlias,
        sheet: currentSheet,
        text: row[0],
        enzime,
        translated: newTranslated,
      })
      return newEnglishDocument.save()
      // --- Version 11 ---
    }) // End map loop
  )
}

module.exports = saveContentsOnSheet
