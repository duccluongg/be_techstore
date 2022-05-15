const Models = require("../models");

class BrandRepository {
  async create({ name }) {
    const brand = new Models.Brand({ name })
    brand.save()

    return brand
  }

  async update({ _id, name }) {
    const brand = await Models.Brand.findOne({ _id })
    
    brand.name = name ? name : brand.name

    brand.save()

    return brand
  }

  async delete({ _id }) {
    try {
      await Models.Brand.deleteOne({ _id })

      return 'Delete brand success'
    } catch (error) {
      return 'Error'
    }
  }

  async findAll() {
    const payments = await Models.Brand.find();

    return payments;
  }

  async findById({ _id }) {
    const payment = await Models.Brand.findOne({ _id });

    return payment;
  }
}

module.exports = new BrandRepository();
