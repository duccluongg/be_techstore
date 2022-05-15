const paymentService = require("../services/PaymentService")

class PaymentController {
  async getAll(req, res, next) {
    const response = await paymentService.getAll()

    return res.status(200).json(response)
  }
}

module.exports = new PaymentController()
