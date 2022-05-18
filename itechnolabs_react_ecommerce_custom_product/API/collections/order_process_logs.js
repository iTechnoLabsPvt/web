/* -----------------------------------------------------------------------
   * @ description : This file defines the order_process_logs schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class OrderProcessLogsClass {
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

const OrderProcessLogsSchema = new Schema({
  vendor_id: { type: Schema.ObjectId, ref: 'Vendors', autopopulate: true },
  product_id: { type: String, default: '' },
  user_id: { type: Schema.ObjectId, ref: 'User', autopopulate: true },
  product_data: {},
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

OrderProcessLogsSchema.loadClass(OrderProcessLogsClass);

export default Mongoose.model('OrderProcessLogs', OrderProcessLogsSchema);
