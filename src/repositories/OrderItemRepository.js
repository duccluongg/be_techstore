const Models = require('../models')

class OrderItemRepository {
  async createOrderItem({ count, order_id, product_id, order_price }) {
    const orderItem = new Models.OrderItem({ count, order_id, product_id, order_price })
    orderItem.save()

    return orderItem
  }

  async getByOrderID({ order_id }) {
    const orderItems = await Models.OrderItem.find({ order_id }).populate({
      path: 'product_id',
      populate: {
        path: "brand_id category_id",
      },
    })

    return orderItems
  }
}

module.exports = new OrderItemRepository()
