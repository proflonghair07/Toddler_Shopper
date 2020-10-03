const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/product',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  ).catch(e => {
    console.error('Connection error', e.message)
})

const db = mongoose.connection

module.exports = db
