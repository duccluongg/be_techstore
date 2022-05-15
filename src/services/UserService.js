const userRepo = require("../repositories/UserRepository");
const ratingRepo = require("../repositories/RatingRepository");
const cartRepo = require("../repositories/CartRepository");
const paymentRepo = require("../repositories/PaymentRepository");
const orderRepo = require("../repositories/OrderRepository");
const orderItemRepo = require("../repositories/OrderItemRepository");
const productRepo = require("../repositories/ProductRepository");

class UserService {
  // RATING
  async rateProduct({ user, product_id, comment, rate }) {
    const rating = await ratingRepo.createRating({
      user,
      product_id,
      comment,
      rate,
    });

    // return {
    //   status: 201,
    //   error: 0,
    //   message: "rate_product_success",
    //   data: {
    //     id: rating._id,
    //     rate: rating.rate,
    //     comment: rating.comment,
    //     created_at: rating.created_at,
    //     updated_at: rating.updated_at,
    //     user: {
    //       id: user._id,
    //       name: user.name,
    //       role: user.role,
    //     },
    //     product: rating.product_id,
    //   },
    // };

    return {
      id: rating._id,
      rate: rating.rate,
      comment: rating.comment,
      created_at: rating.created_at,
      updated_at: rating.updated_at,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      product: rating.product_id,
    };
  }

  async responseOfARating({ comment, rating_id, user }) {
    const ratingCheck = ratingRepo.findById({ _id: rating_id });

    const ratingResponse = await ratingRepo.createRatingResponse({
      comment,
      rating_id,
      user_id: user._id,
    });

    ratingResponse["user"] = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    let ratingResponseCreatedCheck
    do {
      setTimeout(async () => {
        if (ratingResponse._id) {
          const ratingUpdated = await ratingRepo.updateRatingResponse({ ratingId: rating_id, ratingResponseId: ratingResponse._id })
          ratingResponseCreatedCheck = ratingUpdated
        }
      }, 1000)
    }
    while (ratingResponseCreatedCheck)

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "success",
    //   data: {
    //     id: ratingResponse._id,
    //     comment: ratingResponse.comment,
    //     created_at: ratingResponse.created_at,
    //     updated_at: ratingResponse.updated_at,
    //     rating: ratingCheck.rate,
    //     user: {
    //       id: user.id,
    //       name: user.name,
    //       role: user.role,
    //     },
    //   },
    // };

    return {
      id: ratingResponse._id,
      comment: ratingResponse.comment,
      created_at: ratingResponse.created_at,
      updated_at: ratingResponse.updated_at,
      rating: ratingCheck.rate,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }

  async myRatings({ product_id, user }) {
    const ratings = await ratingRepo.findAllOfAUserByProductId({
      product_id,
      user_id: user.id,
    });

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "success",
    //   data: ratings,
    // };

    return ratings ? ratings : [];
  }

  // CART
  async getCartList({ user_id }) {
    const carts = await cartRepo.findAllByUseId({ user_id });

    return carts ? carts : [];
  }

  async getCartItemInfo({ _id, user_id }) {
    const carts = await cartRepo.findOneByIdAndUserId({ _id, user_id });

    return carts ? carts : [];
  }

  async getCartItemDetail({ _id, user_id }) {
    const cartItem = await cartRepo.findByIdAndUserId({ _id, user_id });
    const payments = await paymentRepo.findAll();

    const sum_price = cartItem.product.sale_price * cartItem.count;
    const shipping_fee = 30000;

    return {
      sum_price,
      shipping_fee,
      total_cost: sum_price + shipping_fee,
      items: [cartItem],
      payments,
    };
  }

  async plusProductCountFromCart({ product_id, count, user }) {
    const cartItemCheck = await cartRepo.findByProductIdAndUserId({
      product_id,
      user_id: user.id,
    });

    // if the product has been added to the cart by the user
    if (cartItemCheck) {
      cartItemCheck.count += count;

      cartItemCheck.save();

      return cartItemCheck;
    }

    const cartItem = await cartRepo.createCartItem({
      product_id,
      count,
      user_id: user.id,
    });

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "success",
    //   data: cartItem,
    // };

    return cartItem ? cartItem : {};
  }

  async subtractProductCountFromCart({ product_id, count, user }) {
    const cartItemCheck = await cartRepo.findByProductIdAndUserId({
      product_id,
      user_id: user.id,
    });

    // if the product has been added to the cart by the user
    if (cartItemCheck) {
      if (count >= cartItemCheck.count) {
        const cartItemDeleted = await cartRepo.deleteCartItem({
          _id: cartItemCheck._id,
        });

        return cartItemDeleted;
      }

      cartItemCheck.count -= count;
      cartItemCheck.save();

      return cartItemCheck ? cartItemCheck : {};
    }

    const cartItem = await cartRepo.createCartItem({
      product_id,
      count,
      user_id: user.id,
    });

    // return {
    //   status: 200,
    //   error: 0,
    //   message: "success",
    //   data: cartItem,
    // };

    return cartItem ? cartItem : {};
  }

  async deleteCartItem({ _id, user_id }) {
    const cartItemCheck = await cartRepo.findByIdAndUserId({ _id, user_id });

    if (!cartItemCheck) {
      return "Error, deleted cart item failed!";
    }

    try {
      await cartRepo.deleteCartItem({ _id });

      return "Cart deleted.";
    } catch (error) {
      return "Error, deleted cart item failed!";
    }
  }

  async deleteListCartItem({ cartIdArr, user_id }) {
    try {
      const cartItemListDeleted = await cartRepo.deleteManyByListIdAndUserId({
        list_id: cartIdArr,
        user_id,
      });

      if (cartItemListDeleted.deletedCount < 1)
        return "Error, cart item list is incorrect!";

      return `Deleted [${cartIdArr}] in cart.`;
    } catch (error) {
      console.log(error.message);
      return "Error, deleted cart item failed!";
    }
  }

  // ORDER
  async createOrder({ orderInfo, user }) {
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
      user_id: user.id,
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
      user: order.user_id,
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

  async cancelOrder ({ _id, user }) {
    const orderCanceled = await orderRepo.cancelOrder({ _id });

    return orderCanceled
  }

  async getOrderList({ page, page_size , user_id, status }) {
    const orders = await orderRepo.getListPaginate({ page, page_size , user_id, status });

    return orders? orders : {}
  }

  async getOrderDetail({ order_id , user_id }) {
    const order = await orderRepo.getOrderDetail({ order_id , user_id });

    return order ? order : {}
  }
}

module.exports = new UserService();
