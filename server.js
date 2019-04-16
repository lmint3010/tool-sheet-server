const port = process.env.PORT || 3000
const app = require('express')()
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { auth, sprsheet, users } = require('./routes/api')
app.use('/api/auth', auth)
app.use('/api/sprsheet', sprsheet)
app.use('/api/users', users)

const mongoUri = process.env.MONGODB_URI_PRODUCTION
require('./utils/mongoose').connect(mongoUri)

app.use(passport.initialize())
require('./utils/passport')(passport)

app.listen(port, () => {
  app.get('/', (_, res) => res.send(`Server is running!</br>PORT ${port}!`))
})
