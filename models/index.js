module.exports = {
  credentials: require('./credentials'),
  users: require('./users'),
  spreadsheets: require('./spreadsheets'),
  languages: {
    english: require('./languages/english'),
    translate: require('./languages/translate'),
    needupdate: require('./languages/needUpdate'),
  },
}
