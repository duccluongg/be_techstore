const express = require("express")
const router = express.Router()
const categoryCtrl = require("../src/controllers/CategoryController")

router.get('/', categoryCtrl.getAll)
router.get('/:id', categoryCtrl.getDetail)

module.exports = router
