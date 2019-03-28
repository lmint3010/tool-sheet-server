const mongo = {
  db_real:
    'mongodb+srv://lmint:Taokobiet123@dfo-data-entry-f2qo2.gcp.mongodb.net/storage?retryWrites=true',
  db_test: 'mongodb://localhost/sheet_tool',
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
}

const authenticate = {
  SCOPES: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
}

const secretKey = 'lmint3010'

module.exports = { mongo, authenticate, secretKey }
