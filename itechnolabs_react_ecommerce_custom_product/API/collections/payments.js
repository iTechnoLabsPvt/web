/* -----------------------------------------------------------------------
   * @ description : This file defines the payments schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class PaymentsClass {
  static save(payload) {
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

const PaymentsSchema = new Schema({
  vendor_id: { type: Schema.ObjectId, ref: 'Vendors', autopopulate: true },
  product_id: { type: String, default: '' },
  user_id: { type: Schema.ObjectId, ref: 'User', autopopulate: true },
  order_id: { type: Schema.ObjectId, ref: 'Orders', autopopulate: true },
  payment_id: { type: String, default: '' },
  amount: { type: String, default: '' },
  status: { type: Boolean, default: false }, //true, false
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

PaymentsSchema.loadClass(PaymentsClass);

export default Mongoose.model('Payments', PaymentsSchema);
