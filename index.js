const express = require('express')
const path = require('path')
const livereload = require("livereload")

const liveReloadServer = livereload.createServer()

const publicDir = path.join(__dirname, 'public')
liveReloadServer.watch(publicDir)
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/")
    }, 100)
  })

const app = express()
const PORT = 3000

app.use(require('connect-livereload')({
  ignore: ['.js', '.svg']
}));
app.use('/', express.static(path.join(__dirname, './public')))


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})