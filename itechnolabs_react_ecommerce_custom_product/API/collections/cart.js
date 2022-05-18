/* -----------------------------------------------------------------------
   * @ description : This file defines the cart schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class CartClass {
  static register(payload) {
    return this(payload).save();
  }
  static updateData(id, payload) {
    let data = {
      $set: {
        ...payload,
        lastLogin: getTimeStamp(),
        updatedAt: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(id, data, { new: true });
  }
}

const CartSchema = new Schema({
  user_id: { type: Schema.ObjectId, ref: 'User', autopopulate: true },
  product_id: { type: String, default: '' },
  quantity: { type: Number, default: 0 },
  type: { type: Number, default: 1 }, //1 - cart, 2 - save later
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

CartSchema.loadClass(CartClass);

export default Mongoose.model('Cart', CartSchema);
