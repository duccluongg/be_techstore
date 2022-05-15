const Models = require("../models");

class CartRepository {
  async createCartItem({ product_id, count, user_id }) {
    let cartItem = new Models.Cart({
      product_id,
      count,
      user_id,
    });

    cartItem.save();

    return cartItem;
  }

  async findById({ _id }) {
    const cartItem = await Models.Cart.findOne({ _id });

    return cartItem;
  }

  async findByProductIdAndUserId({ product_id, user_id }) {
    const cartItem = await Models.Cart.findOne({ product_id, user_id });

    return cartItem;
  }

  async deleteCartItem({ _id }) {
    const cartItem = await Models.Cart.deleteOne({ _id });

    return cartItem;
  }

  async deleteManyByListIdAndUserId({ list_id, user_id }) {
    const cartItemListDeleted = await Models.Cart.deleteMany({ user_id, _id: { $in: list_id }});

    return cartItemListDeleted;
  }

  async findByIdAndUserId({ _id, user_id }) {
    const cartItem = await Models.Cart.findOne({ _id, user_id }).populate({
      path: "product_id",
      populate: {
        path: "brand_id category_id",
      },
    });

    return cartItem;
  }

  async findAllByUseId({ user_id }) {
    const carts = await Models.Cart.find({ user_id }).populate({
      path: "product_id",
      populate: {
        path: "brand_id category_id",
      },
    });

    return carts;
  }

  async findOneById({ _id }) {
    const carts = await Models.Cart.findOne({ _id }).populate({
      path: "product_id",
      populate: {
        path: "brand_id category_id",
      },
    });

    return carts;
  }

  async findOneByIdAndUserId({ _id, user_id }) {
    const carts = await Models.Cart.findOne({ _id, user_id }).populate({
      path: "product_id",
      populate: {
        path: "brand_id category_id",
      },
    });

    return carts;
  }
}

module.exports = new CartRepository();
