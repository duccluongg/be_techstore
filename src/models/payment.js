const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paymentSchema = new Schema(
  {
    name: String,
    code: String,
    logo: String,
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

paymentSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
paymentSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Payment', paymentSchema)
