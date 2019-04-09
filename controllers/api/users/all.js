const model = require('../../../models')

module.exports.getall = async (req, res) => {
  const users = await model.users.find().select('email name -_id')
  res.json(users)
}
