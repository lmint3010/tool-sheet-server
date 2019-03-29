// Atlas user: thong.lu@dfo.global
const mongo = {
  db_real:
    'mongodb+srv://lmint:Taokobiet@123@dfo-h5hz5.gcp.mongodb.net/toolsheet?retryWrites=true',
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
