const express = require("express")
const router = express.Router()
const ratingCtrl = require("../src/controllers/RatingController")

router.get('/:product_id', ratingCtrl.getRatingsOfProduct)

module.exports = router
