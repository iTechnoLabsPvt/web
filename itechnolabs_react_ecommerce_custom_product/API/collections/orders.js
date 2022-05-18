/* -----------------------------------------------------------------------
   * @ description : This file defines the orders schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class OrdersClass {
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

const OrdersSchema = new Schema({
  vendor_id: { type: Schema.ObjectId, ref: 'Vendors', autopopulate: true },
  product_id: { type: String, default: '' },
  user_id: { type: Schema.ObjectId, ref: 'User', autopopulate: true },
  customized_front_img: { type: String, default: '' },
  customized_back_img: { type: String, default: '' },
  customized_left_img: { type: String, default: '' },
  customized_right_img: { type: String, default: '' },
  uploaded_img_by_user: { type: String, default: '' },
  note: { type: String, default: '' },
  note_type: { type: Number, default: 0 }, //0- text, 1- number
  price: { type: Number, default: 0 },
  color: { type: String, default: '' },
  logo_coordinates: { type: Array, default: [] },
  size: { type: String, default: '' },
  size_number: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  order_type: { type: Number, default: 0 }, //0- blank, 1 - sample, 2- customized
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

OrdersSchema.loadClass(OrdersClass);

export default Mongoose.model('Orders', OrdersSchema);
