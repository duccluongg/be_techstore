const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const orderSchema = new Schema(
  {
    is_paid: { type: Boolean, default: false },
    name: String,
    address: String,
    phone_number: Number,
    payment_id: { type: Schema.Types.ObjectId, ref: 'Payment' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    shipping_fee: Number,
    sum_price: Number,
    total_cost: Number,
    status: String,
    items: { type: [Schema.Types.ObjectId], ref: 'OrderItem', default: [] },
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

orderSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
orderSchema.virtual('payment').get(function(){
  return this.payment_id
})
orderSchema.virtual('user').get(function(){
  return this.user_id
})

orderSchema.set('toJSON', {
  virtuals: true
})

orderSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Order', orderSchema)
