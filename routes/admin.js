const express = require("express")
const router = express.Router()
const adminCtrl = require("../src/controllers/AdminController")
const verifyToken = require("../src/middlewares/verifyToken")
const checkRole = require("../src/helpers/checkRole")

router.use(verifyToken.accessToken)
router.use(checkRole.isAdmin)

// users
router.get('/users', adminCtrl.getListUser)
router.delete('/users/:id', adminCtrl.deleteUser)

// ratings
router.post('/ratings/:rating_id/response', adminCtrl.responseOfARating)

// orders
router.get('/orders', adminCtrl.getOrderList)
router.put('/orders/:id', adminCtrl.updateOrderStatus)

// products
router.post('/products', adminCtrl.createProduct)
router.put('/products/:id', adminCtrl.updateProduct)
router.delete('/products/:id', adminCtrl.deleteProduct)

// categories
router.post('/categories', adminCtrl.createCategory)
router.put('/categories/:id', adminCtrl.updateCategory)
router.delete('/categories/:id', adminCtrl.deleteCategory)

// brands
router.post('/brands', adminCtrl.createBrand)
router.put('/brands/:id', adminCtrl.updateBrand)
router.delete('/brands/:id', adminCtrl.deleteBrand)

module.exports = router