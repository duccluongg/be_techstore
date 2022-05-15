const orderService = require("../services/OrderService")

class OrderController {
  async createOrder(req, res, next) {
    const orderInfo = req.body

    const response = await orderService.createOrder({ orderInfo })

    return res.status(200).json(response)
  }
}

module.exports = new OrderController()
