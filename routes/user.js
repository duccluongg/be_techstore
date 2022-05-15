const express = require("express")
const router = express.Router()
const authCtrl = require("../src/controllers/AuthController")
const userCtrl = require("../src/controllers/UserController")
const verifyToken = require("../src/middlewares/verifyToken")

router.use(verifyToken.accessToken)

router.get('/me', authCtrl.profile)
router.put('/me', authCtrl.updateProfile)

router.post('/ratings', userCtrl.rateProduct)
router.post('/ratings/:rating_id/response', userCtrl.responseOfARating)
router.get('/ratings', userCtrl.myRatings)

router.get('/carts', userCtrl.getCartList) // shared with the API "Get Cart List Detail with Fee, price, total_cost, payments" too
router.get('/carts/:cart_id', userCtrl.getCartItemInfo)
router.put('/carts/add', userCtrl.plusProductCountFromCart)
router.put('/carts/remove', userCtrl.subtractProductCountFromCart)
router.delete('/carts/:cart_id', userCtrl.deleteCartItem)
router.delete('/carts', userCtrl.deleteListCartItem)

router.get('/orders', userCtrl.getOrderList) // "Get orders list" & "Get orders list by status"
router.get('/orders/:order_id', userCtrl.getOrderDetail)
router.post('/orders', userCtrl.createOrder)
router.put('/orders/:order_id/cancel', userCtrl.cancelOrder)

module.exports = router
