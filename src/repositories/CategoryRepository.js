const Models = require("../models");

class CategoryRepository {
  async create({ name, thumbnail }) {
    const category = new Models.Category({ name, thumbnail })
    category.save()

    return category
  }

  async update({ _id, name, thumbnail }) {
    const category = await Models.Category.findOne({ _id })
    
    category.name = name ? name : category.name
    category.thumbnail = thumbnail ? thumbnail : category.thumbnail

    category.save()

    return category
  }

  async delete({ _id }) {
    try {
      await Models.Category.deleteOne({ _id })

      return 'Delete category success'
    } catch (error) {
      return 'Error'
    }
  }

  async findAll() {
    const payments = await Models.Category.find();

    return payments;
  }

  async findById({ _id }) {
    const payment = await Models.Category.findOne({ _id });

    return payment;
  }
}

module.exports = new CategoryRepository();
