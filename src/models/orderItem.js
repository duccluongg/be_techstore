const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderItemSchema = new Schema(
  {
    count: Number,
    order_price: Number,
    order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

orderItemSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
orderItemSchema.virtual('product').get(function(){
  return this.product_id
})
orderItemSchema.virtual('order').get(function(){
  return this.order_id
})

orderItemSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('OrderItem', orderItemSchema)
