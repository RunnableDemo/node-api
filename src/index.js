import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes/index.js'

const app = express()

app.use(bodyParser.json())
app.use('/', routes)

const server = app.listen(3000, () => {
  const {address, port} = server.address()
  console.log(`Example app listening at http://${address}:${port}`)
})
