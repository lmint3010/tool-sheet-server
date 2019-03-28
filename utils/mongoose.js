const mongoose = require('mongoose')
const { options, db_test } = require('../config').mongo

// For testing
const connectAndDrop = async () => {
  await mongoose.connect(db_test, options)
  await mongoose.connection.dropDatabase()
}

// For testing
const disconnect = async () => {
  await mongoose.disconnect()
}

// Module Exports
module.exports = {
  mongoose,
  connect(url) {
    mongoose.connect(url, options)
    const { connection: db } = mongoose
    db.on('error', () => console.log('Fail to connect with MongoDB'))
    db.once('open', () => console.log('MongoDB:', url))
  },
  connectAndDrop,
  disconnect,
}
