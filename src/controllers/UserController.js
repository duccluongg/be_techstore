const userService = require("../services/UserService")

class UserController {
  // RATING
  async rateProduct(req, res, next) {
    const user = req.payload
    const { product, comment, rate } = req.body
    const response = await userService.rateProduct({ user, product_id: product, comment, rate })

    return res.status(200).json(response)
  }

  async responseOfARating(req, res, next) {
    const { comment } = req.body
    const { rating_id } = req.params
    const user = req.payload

    const response = await userService.responseOfARating({ comment, rating_id, user })

    return res.status(200).json(response)
  }

  async myRatings(req, res, next) {
    const { product } = req.query
    const user = req.payload

    const response = await userService.myRatings({ product_id: product, user })

    return res.status(200).json(response)
  }

  // CART
  async getCartList(req, res, next) {
    const user = req.payload
    const { detail } = req.query

    // API: Get Cart List Detail with Fee, price, total_cost, payments
    if (detail) {
      const response = await userService.getCartItemDetail({ _id: detail, user_id: user.id})

      return res.status(200).json(response)
    }

    const response = await userService.getCartList({ user_id: user.id})

    return res.status(200).json(response)
  }

  async getCartItemInfo(req, res, next) {
    const { cart_id } = req.params
    const user = req.payload

    const response = await userService.getCartItemInfo({ _id: cart_id, user_id: user.id})

    return res.status(200).json(response)
  }

  async plusProductCountFromCart(req, res, next) {
    const { product } = req.body
    // count default is 1
    const count = req.body.count ? req.body.count : 1
    const user = req.payload

    const response = await userService.plusProductCountFromCart({ product_id: product, count, user })

    return res.status(200).json(response)
  }

  async subtractProductCountFromCart(req, res, next) {
    const { product } = req.body
    // count default is 1
    const count = req.body.count ? req.body.count : 1
    const user = req.payload

    const response = await userService.subtractProductCountFromCart({ product_id: product, count, user })

    return res.status(200).json(response)
  }

  async deleteCartItem(req, res, next) {
    const { cart_id } = req.params
    const user = req.payload

    const response = await userService.deleteCartItem({ _id: cart_id, user_id: user.id })

    return res.status(200).json(response)
  }

  async deleteListCartItem(req, res, next) {
    const user = req.payload
    const cartIdArr = req.body

    const response = await userService.deleteListCartItem({ cartIdArr, user_id: user.id })

    return res.status(200).json(response)
  }

  // ORDER
  async getOrderList(req, res, next) {
    const { page, page_size, status } = req.query
    const user = req.payload

    const response = await userService.getOrderList({ page, page_size , user_id: user.id, status })

    return res.status(200).json(response)
  }

  async getOrderDetail(req, res, next) {
    const { order_id } = req.params
    const user = req.payload

    const response = await userService.getOrderDetail({ order_id , user_id: user.id })

    return res.status(200).json(response)
  }

  async createOrder(req, res, next) {
    const orderInfo = req.body
    const user = req.payload

    const response = await userService.createOrder({ orderInfo, user })

    return res.status(200).json(response)
  }

  async cancelOrder(req, res, next) {
    const { order_id } = req.params
    const user = req.payload

    const response = await userService.cancelOrder({ _id: order_id, user })

    return res.status(200).json(response)
  }
}

module.exports = new UserController()
