/* -----------------------------------------------------------------------
   * @ description : This file defines the vendors schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class VendorsClass {
  static register(payload) {
    return this.insertMany(payload);
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

const VendorsSchema = new Schema({
  vendor_name: { type: String, default: '' },
  status: { type: Number, default: 1 }, // 1- active, 0 -inactive, 2 -disabled
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

VendorsSchema.loadClass(VendorsClass);

export default Mongoose.model('Vendors', VendorsSchema);
