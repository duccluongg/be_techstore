const paymentRepo = require("../repositories/PaymentRepository");
const orderRepo = require("../repositories/OrderRepository");
const orderItemRepo = require("../repositories/OrderItemRepository");
const productRepo = require("../repositories/ProductRepository");

class OrderService {
  async createOrder({ orderInfo }) {
    const payment = await paymentRepo.findById({ _id: orderInfo.payment });

    let shipping_fee = 0;
    if (payment.code === "cash") shipping_fee = 30000;

    let sum_price = 0
    const products = orderInfo.items.map(async (item) => {
      let product = await productRepo.findByIdPopulate({ _id: item.product });
      sum_price += product.sale_price * item.count
      return {
        count: item.count,
        order_price: product.sale_price,
        product
      };
    });

    let items;
    await Promise.all(products).then((values) => {
      items = values;
    });

    let order = await orderRepo.create({
      orderInfo,
      shipping_fee,
      sum_price,
      total_cost: sum_price + shipping_fee,
    });

    let orderItemIds = []
    // create order_item
    await items.forEach(async (item) => {
      const orderItem = await orderItemRepo.createOrderItem({
        count: item.count,
        product_id: item.product._id,
        order_id: order._id,
        order_price: item.product.price,
      })

      orderItemIds.push(orderItem._id)
    })

    // add orderItems to order created
    let orderCreatedCheck
    do {
      // wait 1s then add orderItems, because mongodb add order is delay => error if add orderItems right away
      setTimeout(async () => {
        if (orderItemIds) {
          const orderUpdated = await orderRepo.updateOrderItems({ _id: order._id, orderItems: orderItemIds })
          orderCreatedCheck = orderUpdated
        }
      }, 1000)
    } // repeat until successfully created
    while (orderCreatedCheck)

    return {
      id: order._id,
      status: order.status,
      is_paid: order.is_paid,
      name: order.name,
      address: order.address,
      phone_number: order.phone_number,
      sum_price: order.sum_price,
      shipping_fee: order.shipping_fee,
      total_cost: order.total_cost,
      created_at: order.created_at,
      updated_at: order.updated_at,
      payment,
      items
    }
  }
}

module.exports = new OrderService()
