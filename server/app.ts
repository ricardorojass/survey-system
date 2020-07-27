const express = require('express')
import * as  path from 'path'
import routes from './routes'
const { setUser } = require('./middlewares')

const app = express();

const isDev = process.env.NODE_ENV != 'production'

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client')))

app.use(setUser)
app.use('/api', routes)
console.log('processEnv', process.env.DATABASE_URL);
console.log('processEnv', process.env.NODE_ENV);

if (isDev) {
  const env = process.env.NODE_ENV == 'test' ? "Test" : "Development"
  console.log()
  console.log(`*** ${env} Mode ***`)

  require('dotenv').config()
  const fallback = require('connect-history-api-fallback')
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')

  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  app.use(fallback({ verbose: false }))

  app.use(webpackDevMiddleware(compiler))
} else {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/index.html"))
  })
}

export default app
