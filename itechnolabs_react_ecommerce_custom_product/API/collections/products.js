/* -----------------------------------------------------------------------
   * @ description : This file defines the products schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class ProductsClass {
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
//schemaless, we will add products directly using insertMany
const ProductsSchema = new Schema(
  {
    vendor_id: { type: String, default: '' },
    // category_id: { type: Schema.ObjectId, ref: 'Categories', autopopulate: true },
    // subcategory_id: { type: Schema.ObjectId, ref: 'SubCategories', autopopulate: true },
    // product_data: [],
    created_at: { type: Number, default: getTimeStamp },
    updated_at: { type: Number, default: getTimeStamp }
  },
  { strict: false }
);

ProductsSchema.loadClass(ProductsClass);

export default Mongoose.model('Products', ProductsSchema);
