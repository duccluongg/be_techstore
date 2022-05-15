const express = require("express")
const router = express.Router()
const productCtrl = require("../src/controllers/ProductController")

router.get('/', productCtrl.getAll)

// temp
router.get('/suggestion', productCtrl.getAll)
router.get('/bought_by_same_users', productCtrl.getAll)

router.get('/lite', productCtrl.getAll)
router.get('/:id', productCtrl.getDetail)

module.exports = router
