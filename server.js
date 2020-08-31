require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const cors = require('cors')
 
const app = express()
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);