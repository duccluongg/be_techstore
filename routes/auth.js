const express = require("express")
const router = express.Router()
const authCtrl = require("../src/controllers/AuthController")
const validatorHelper = require("../src/helpers/validatorHelper")
const loginValidator = require("../src/validators/auth/loginValidator")
const registerValidator = require('../src/validators/auth/registerValidator')
const verifyToken = require("../src/middlewares/verifyToken")

router.post('/register', registerValidator, validatorHelper, authCtrl.register)
router.post('/login', loginValidator, validatorHelper, authCtrl.login)
router.post('/refresh', verifyToken.refreshToken, authCtrl.refreshToken)

module.exports = router
