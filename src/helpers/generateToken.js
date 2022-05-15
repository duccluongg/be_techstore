const jwt = require("jsonwebtoken")
require("dotenv").config()
const Env = process.env

const accessToken = (user) => {
  const payload = {
    username: user.username,
    name: user.name,
  }
  const token = jwt.sign(payload, Env.ACCESS_TOKEN_SECRET)
  return token
}

const refreshToken = (user) => {
  const payload = {
    username: user.username,
    name: user.name,
  }
  const token = jwt.sign(payload, Env.REFRESH_TOKEN_SECRET)
  return token
}

module.exports = { accessToken, refreshToken }
