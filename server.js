const port = process.env.PORT || 3000
const express = require('express')
const path = require('path')
const app = express()
const passport = require('passport')
const cors = require('cors')

app.use(cors())

// Express Config
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// SETUP: Body-Parser
const { json, urlencoded } = require('body-parser')
app.use(json())
app.use(urlencoded({ extended: false }))

// SETUP: Mongoose
const dbUrl = require('./config').mongo.db_real
require('./utils/mongoose').connect(dbUrl)

// IMPORT: Routes
const { auth, sprsheet, users } = require('./routes/api')

// Passport JWT Authenticate Config
app.use(passport.initialize())
require('./utils/passport')(passport)

// SETUP: Routes
app.use('/api/auth', auth)
app.use('/api/sprsheet', sprsheet)
app.use('/api/users', users)

app.listen(port)

module.exports = app // For testing
