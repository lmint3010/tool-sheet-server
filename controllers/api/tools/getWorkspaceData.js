const { translation_model } = require('../../../models')

module.exports.getWorkspaceData = (req, res) => {
  const { listSite } = req.body

  let responseData = []
  Promise.all(
    JSON.parse(listSite).map(async site => {
      const data = await translation_model
        .find({ site })
        .select('-enzime -_id')
        .lean()
      responseData = [...responseData, ...data]
    })
  )
    .then(() => {
      return res.json({ success: true, response: responseData })
    })
    .catch(() => res.json({ success: false }))
}
