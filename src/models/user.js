const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new Schema(
  {
    last_login: Date,
    username: String,
    password: String,
    email: String,
    role: { type: String, default: 'user' },
    name: String,
    address: String,
    phone_number: String,
    dob: Date,
    is_superuser: { type: Boolean, default: false },
    is_staff: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

// output "id" instead of "_id"
// Duplicate the ID field
userSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
// Ensure virtual fields are serialised
userSchema.set('toJSON', {
  virtuals: true
})

userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', userSchema)
