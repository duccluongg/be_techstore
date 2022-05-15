const mongoose = require("mongoose")
const Schema = mongoose.Schema

const authPermissionSchema = new Schema(
  {
    content_type_id: String,
    code_name: String,
    name: String,
    created_at: { type: String, default: new Date() },
    updated_at: { type: String, default: null },
  }
)

authPermissionSchema.virtual('id').get(function(){
  return this._id.toHexString()
})
authPermissionSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('AuthPermission', authPermissionSchema)
