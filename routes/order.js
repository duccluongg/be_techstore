const express = require("express")
const router = express.Router()
const orderCtrl = require("../src/controllers/OrderController")

router.post('/', orderCtrl.createOrder)

module.exports = router
