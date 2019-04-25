require('dotenv').config()
const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const passport = require('passport')
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')

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

const server = app.listen(port, () => {
  app.get('/', (_, res) => res.send(`Server is running!</br>PORT ${port}!`))
})

server.timeout = 900000
