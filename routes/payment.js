const express = require("express")
const router = express.Router()
const paymentCtrl = require("../src/controllers/PaymentController")

router.get('/', paymentCtrl.getAll)

module.exports = router
