/* -----------------------------------------------------------------------
   * @ description : This file defines the subcategories schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class SubCategoriesClass {
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

const SubCategoriesSchema = new Schema({
  subcategory_id: { type: String, default: '' },
  category_id: { type: String, default: '' },
  subcategory_name: { type: String, default: '' },
  subcategory_image: { type: String, default: '' },
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

SubCategoriesSchema.loadClass(SubCategoriesClass);

export default Mongoose.model('SubCategories', SubCategoriesSchema);
