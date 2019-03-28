const { formatSheetContent } = require('./formatSheetContent')
const uniqid = require('uniqid')
const { isEmpty } = require('../../validation')
const strEnzime = require('../../functions/pure/strEnzime')

// Models import
const { english, translate, needupdate } = require('../../models').languages

/** Receive sheetContent and Save to mongoDB
 * @param {Array} content Array contain sheet content get by Google API.
 * @param {String} siteAlias Alias of current site
 * @param {String} currentSheet Name of current sheet
 */
const saveContentsOnSheet = async (content, siteAlias, currentSheet) => {
  const sheetContent = formatSheetContent(content)
  const languageList = sheetContent.shift()

  sheetContent.forEach(async row => {
    // Verify empty case of English version
    if (isEmpty(row[0])) {
      console.log('English content is empty')
      return
    }

    let uid = uniqid()
    // Create English Document
    const ENDoc = new english({
      uid,
      site: siteAlias,
      sheet: currentSheet,
      code: 'EN',
      content: row[0],
      enzime: strEnzime(row[0].toLowerCase()),
    })

    try {
      // Save new english document
      const savedEN = await ENDoc.save()
      // console.log('Saved_en:', savedEN)
    } catch (err) {
      if (err.code === 11000) {
        // If english version existed
        const enzime = strEnzime(row[0].toLowerCase())
        const existEnglish = await english.findOne({ enzime }).lean()
        uid = existEnglish.uid // Re-assign uid (use existed uid)
        // console.log('English version has been existed with uid:', uid)
      }
    }

    // Loop to resolve all other translated documents
    for (let i = 1; i < row.length; i++) {
      const newDoc = new translate({
        uid,
        site: siteAlias,
        sheet: currentSheet,
        code: languageList[i].toLowerCase(),
        content: row[i],
      })

      // Check content already existed in database yet?
      const existed = await translate
        .findOne({ code: languageList[i], uid })
        .lean()
      if (existed) {
        // If content existed ?
        // Gross away document if incomming content is empty
        if (row[i].trim() === '') {
          continue
        }
        // Push Update translated content if has different point
        if (existed.content !== row[i]) {
          const newUpdate = new needupdate({
            uid,
            code: languageList[i],
            site: siteAlias,
            english: row[0],
            oldcontent: existed.content,
            newcontent: row[i],
          })

          try {
            // Push need update document to database "needupdate"
            const pushedUpdate = await newUpdate.save()
            // console.log('Pushed new update:', pushedUpdate)
          } catch (err) {
            if (err.code === 11000)
              console.log('Prevented push duplicate update')
            else console.log('Fail to updated translated content:', err)
          }
        }
      } else if (isEmpty(row[i])) {
        // If content doesn't exist before? -> Validate Empty
        console.log('Translate is empty', newDoc)
        continue
      }

      try {
        // Verify and save new translated document
        const savedTranslate = await newDoc.save()
        console.log('Saved_nw:', savedTranslate)
      } catch (err) {
        err.code === 11000 &&
          console.log('Translation has been existed:', newDoc)
      }
    } // End of for loop
  })
}

module.exports = saveContentsOnSheet
