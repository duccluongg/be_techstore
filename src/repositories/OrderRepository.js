const Models = require('../models');
const OrderItemRepository = require('./OrderItemRepository');

class OrderRepository {
  async create({ orderInfo, shipping_fee, user_id, sum_price, total_cost }) {
    const payment = new Models.Order({
      name: orderInfo.name,
      address: orderInfo.address,
      phone_number: orderInfo.phone_number,
      payment_id: orderInfo.payment,
      user_id: user_id,
      shipping_fee: shipping_fee,
      sum_price: sum_price,
      total_cost: total_cost,
      items: [],
      status: 'waiting_confirm',
    });

    payment.save();

    return payment;
  }

  async getAll() {
    const orders = await Models.Order.find().populate([
      {
        path: 'user_id',
      },
      {
        path: 'payment_id',
      },
      {
        path: 'items',
        populate: {
          path: 'product_id',
          select:
            '_id name thumbnail brand_id price sale_price discount created_at updated_at category_id short_description',
          populate: [
            {
              path: 'brand_id',
              select: '_id name',
            },
            {
              path: 'category_id',
              select: 'id name thumbnail',
            },
          ],
        },
      },
    ]);

    return orders;
  }

  async updateStatus({ _id, status }) {
    const order = await Models.Order.findOne({ _id });

    if (!order) return 'order not found';

    order.status = status;
    order.save();

    return order;
  }

  async updateOrderItems({ _id, orderItems }) {
    const order = await Models.Order.findOne({ _id });
    order.items = orderItems;
    order.save();

    return order;
  }

  async findById({ _id }) {
    const order = await Models.Order.findOne({ _id });

    return order;
  }

  async cancelOrder({ _id }) {
    const order = await Models.Order.findOne({ _id });

    if (order.status === 'waiting_confirm') {
      order.status = 'canceled';

      order.save();

      return order;
    }

    return {
      detail:
        'The order has been processed and cannot be canceled. Please contact admin.',
      code: 'default',
    };
  }

  // paginate and populate
  async getListPaginate({ page, page_size, user_id, status }) {
    const options = {
      page: page ? page : 1,
      limit: page_size ? page_size : 5,
      populate: [
        {
          path: 'payment_id',
        },
        {
          path: 'items',
          populate: {
            path: 'product_id',
            populate: {
              path: 'brand_id category_id',
            },
          },
        },
      ],
    };

    const orders = await Models.Order.paginate(
      {
        user_id,
        status: status
          ? status
          : { $in: ['waiting_confirm', 'confirmed', 'shipping', 'success'] },
      },
      options
    );

    return {
      links: {
        next: orders.nextPage,
        previous: orders.prevPage,
      },
      total: orders.totalDocs,
      page: orders.page,
      page_size: orders.limit,
      results: orders.docs,
    };
  }

  async getOrderDetail({ order_id, user_id }) {
    const order = await Models.Order.findOne({
      _id: order_id,
      user_id,
    }).populate({
      path: 'payment_id',
    });

    if (!order) {
      return 'Error! Order not found.';
    }

    const orderItems = await OrderItemRepository.getByOrderID({
      order_id: order._id,
    });

    return {
      id: order._id,
      user: order.user_id,
      is_paid: order.is_paid,
      name: order.name,
      address: order.address,
      phone_number: order.phone_number,
      payment: order.payment_id,
      shipping_fee: order.shipping_fee,
      sum_price: order.sum_price,
      total_cost: order.total_cost,
      status: order.status,
      created_at: order.created_at,
      payment: order.payment_id,
      items: orderItems,
    };
  }

  async getDetail({ _id }) {
    const order = await Models.Order.findOne({
      _id,
    }).populate({
      path: 'payment_id',
    });

    if (!order) {
      return 'Error! Order not found.';
    }

    const orderItems = await OrderItemRepository.getByOrderID({
      order_id: order._id,
    });

    return {
      id: order._id,
      user: order.user_id,
      is_paid: order.is_paid,
      name: order.name,
      address: order.address,
      phone_number: order.phone_number,
      payment: order.payment_id,
      shipping_fee: order.shipping_fee,
      sum_price: order.sum_price,
      total_cost: order.total_cost,
      status: order.status,
      created_at: order.created_at,
      payment: order.payment_id,
      items: orderItems,
    };
  }
}

module.exports = new OrderRepository();
