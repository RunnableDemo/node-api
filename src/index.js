import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes/index.js'

const app = express()

app.use(bodyParser.json())
app.use('/', routes)
app.use(logErrors)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.json({ error: err })
}

const server = app.listen(3000, () => {
  const {address, port} = server.address()
  console.log(`Example app listening at http://${address}:${port}`)
})
