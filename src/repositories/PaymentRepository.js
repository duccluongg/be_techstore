const Models = require("../models");

class PaymentRepository {
  async findAll() {
    const payments = await Models.Payment.find();

    return payments;
  }

  async findById({ _id }) {
    const payment = await Models.Payment.findOne({ _id });

    return payment;
  }
}

module.exports = new PaymentRepository();
