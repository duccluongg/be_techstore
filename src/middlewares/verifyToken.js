const jwt = require("jsonwebtoken")
require("dotenv").config()
const Env = process.env
const userRepo = require("../repositories/UserRepository")

const accessToken = async (req, res, next) => {
  let token = req.headers.authorization
  if (!token)
    return next({
      status: 401,
      error: 1,
      message: "Invalid_token",
      data: null,
    })
  try {
    const decoded = jwt.verify(token, Env.ACCESS_TOKEN_SECRET)
    
    const user = await userRepo.findByUsernameIncludePassword({ username: decoded.username })
    if (!user)
      return next({
        status: 400,
        error: 1,
        message: "user_not_found",
        data: null,
      })
      
    //return payload
    req.payload = user
    next()
  } catch (error) {
    return next({
      status: 401,
      error: 1,
      message: error.message,
      data: null,
    })
  }
}

const refreshToken = async (req, res, next) => {
  let token = req.body.refresh_token
  if (!token)
    return next({
      status: 401,
      error: 1,
      message: "Invalid_token",
      data: null,
    })

  try {
    const decoded = jwt.verify(token, Env.REFRESH_TOKEN_SECRET)

    const user = await userRepo.findByUsernameIncludePassword({ username: decoded.username })
    if (!user)
      return next({
        status: 400,
        error: 1,
        message: "user_not_found",
        data: null,
      })

    //return payload
    req.payload = user
    next()
  } catch (error) {
    return next({
      status: 401,
      error: 1,
      message: error.message,
      data: null,
    })
  }
}

module.exports = { accessToken, refreshToken }
