require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const routes = require('./routes')
const logger = require('./modules/logger')
const newsletterService = require('./services/newsletter')

const app = express()

/**
 * Same as body-parser. Available only in express@4.16.0 or above
 */
app.use(express.json())

app.use(helmet())

app.use(logger)

// run newsletter service
newsletterService()

// add routes
app.use('/', routes)

// universal route handler
app.use('*', (req, res) => {
  return res.status(404).send('Not found')
})

// generic error handler
app.use((err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    type: 'error',
  })
  return res.status(400).send({
    message: err.message,
    status: 'error',
  })
})

app.listen(process.env.PORT, () => {
  console.log(`started at port: ${process.env.PORT}`)
})

process.on('unhandledRejection', (err) => {
  console.error({
    message: err.message,
    stack: err.stack,
    type: 'unhandled rejection',
  })
})

process.on('uncaughtException', (err) => {
  console.error({
    message: err.message,
    stack: err.stack,
    type: 'uncaught exception',
  })
  process.exit(1)
})
