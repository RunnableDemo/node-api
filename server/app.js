import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'

const config = {
  port: 3000
}

let app = express()

app.use(bodyParser.json())

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.WEB_CLIENT_HOSTNAME)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,X-Powered-By,Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

app.use('/', routes)

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port)
})

export default app
