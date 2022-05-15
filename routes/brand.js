const express = require("express")
const router = express.Router()
const brandCtrl = require("../src/controllers/BrandController")

router.get('/', brandCtrl.getAll)
router.get('/:id', brandCtrl.getDetail)

module.exports = router
