/* -----------------------------------------------------------------------
   * @ description : This file defines the settings schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class SettingsClass {
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

const SettingsSchema = new Schema({
  vendor_id: { type: Schema.ObjectId, ref: 'Vendors', autopopulate: true },
  base_price: { type: String, default: '' },
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

SettingsSchema.loadClass(SettingsClass);

export default Mongoose.model('Settings', SettingsSchema);
