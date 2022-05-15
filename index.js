const express = require('express')
const route = require('./routes')
const app = express()
const Env = process.env
const path = require('path')
const http = require('http').Server(app)
const cors = require('cors')
const mongoose = require('mongoose')
const databaseConnect = require('./src/configs/databaseConnect')
require('dotenv').config()

//CORS Middleware
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization")
  next()
})

app.use(express.json())

mongoose.connect(databaseConnect.dbStr, () => {
  console.log('Connected Database!')
})
mongoose.connection.on('error', (err) => {
  console.log('Error connect to Database: ' + err)
})

route(app)
app.use(express.static(path.join(__dirname, 'resources'))) 

app.use((req, res, next) => {
  const error = {
    error: 404,
    message: 'not_found',
    status: 400,
    data: null
  }
  next(error)
})

app.use((err, req, res, next) => {
  return res.json({
    error: err.error,
    message: err.message,
    status: 400,
    data: null
  })
})

// http.listen(Env.PORT, () => {
//   console.log(`Server is running on port ${Env.PORT}`)
// })
const port = 3001;
http.listen(port, (err) => {
   console.log('server started on port: '+port);
   console.log(err);
});
