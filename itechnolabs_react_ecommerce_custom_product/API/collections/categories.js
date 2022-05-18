/* -----------------------------------------------------------------------
   * @ description : This file defines the categories schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class CategoriesClass {
  static saveData(payload) {
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

const CategoriesSchema = new Schema({
  category_id: { type: String, default: '' },
  category_name: { type: String, default: '' },
  category_image: { type: String, default: '' },
  sub_categories: [
    {
      subcategory_name: { type: String, default: '' },
      gender: { type: Array, default: [] }
    }
  ],
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

CategoriesSchema.loadClass(CategoriesClass);

export default Mongoose.model('Categories', CategoriesSchema);
