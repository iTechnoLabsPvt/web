/* -----------------------------------------------------------------------
   * @ description : This file defines the notifications schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class NotificationsClass {
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

const NotificationsSchema = new Schema({
  user_id: { type: Schema.ObjectId, ref: 'User', autopopulate: true },
  from_id: { type: Schema.ObjectId, ref: 'User', autopopulate: true },
  product_id: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: Boolean, default: 0 }, //0- unread, 1 - read (in case real time then we will have delivered status as well)
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

NotificationsSchema.loadClass(NotificationsClass);

export default Mongoose.model('Notifications', NotificationsSchema);
