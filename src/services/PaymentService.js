const paymentRepo = require("../repositories/PaymentRepository")

class PaymentService {
  async getAll() {
    const ratings = await paymentRepo.findAll()

    return ratings ? ratings : []
  }
}

module.exports = new PaymentService()
