const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let Items = sequelize.define('items', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: type.INTEGER,
    product_id: type.INTEGER,
    user_id: type.INTEGER,
    color: type.STRING,
    color_size_arr: type.TEXT,
    customized_image: type.STRING,
    customized_product_details: type.TEXT,
    decorating_method: type.STRING,
    piece_price: type.STRING,
    setup_cost: type.STRING,
    total_price: type.STRING,
    category: type.STRING,
    product_data: type.TEXT,
    billing_info: type.TEXT,
    product_custom_front: type.STRING,
    product_custom_back: type.STRING
  });
  Items.register = paylaod =>
    Items.insertMany(paylaod).then(data => {
      return data;
    });
  Items.updateData = (id, payload) => {
    let data = {
      $set: {
        ...payload,
        updated_at: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(id, data, { new: true });
  };
  return Items;
};

// module.exports = (sequelize, type) => {
//   let Items = sequelize.define('items', {
//     id: {
//       type: type.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     //order details
//     order_id: type.INTEGER,
//     //custmise details
//     total_qty: type.STRING,
//     sizes_qty: JsonField(sequelize, 'mockups', 'sizes_qty'),
//     // qty_XS: type.STRING,
//     // qty_S: type.STRING,
//     // qty_M: type.STRING,
//     // qty_L: type.STRING,
//     // qty_XL: type.STRING,
//     // qty_XXL: type.STRING,
//     // qty_3XL: type.STRING,
//     // qty_4XL: type.STRING,
//     selectedColors: type.STRING,
//     colorsNumber: type.STRING,
//     custmize_front_image_url: type.STRING,
//     custmize_back_image_url: type.STRING,
//     custmize_left_image_url: type.STRING,
//     custmize_right_image_url: type.STRING,
//     decorating_method: type.STRING,
//     //product details
//     product_id: type.INTEGER,
//     unique_key: type.STRING,
//     product_title: type.STRING,
//     product_description: type.TEXT,
//     style: type.STRING,
//     available_sizes: type.STRING,
//     brand_logo_image: type.STRING,
//     thumbnail_image: type.STRING,
//     color_swatch_image: type.STRING,
//     product_image: type.STRING,
//     price_text: type.STRING,
//     suggested_price: type.STRING,
//     category_name: type.STRING,
//     subcategory_name: type.STRING,
//     color_name: type.STRING,
//     color_square_image: type.STRING,
//     color_product_image: type.STRING,
//     color_product_thumbnail_image: type.STRING,
//     size: type.STRING,
//     qty: type.STRING,
//     piece_weight: type.STRING,
//     piece_price: type.STRING,
//     dozens_price: type.STRING,
//     case_price: type.STRING,
//     price_group: type.STRING,
//     case_size: type.STRING,
//     inventory_key: type.STRING,
//     size_index: type.STRING,
//     mainframe_color: type.STRING,
//     mill: type.STRING,
//     product_status: type.STRING,
//     companion_styles: type.STRING,
//     MSRP: type.STRING,
//     map_pricing: type.STRING,
//     front_model_image_url: type.STRING,
//     back_model_image: type.STRING,
//     front_flat_image: type.STRING,
//     back_flat_image: type.STRING,
//     side_model_image_url: type.STRING,
//     GTIN: type.STRING,
//     vendor_id: {
//       type: type.INTEGER,
//       references: {
//         model: 'vendors',
//         key: 'id'
//       },
//       onDelete: 'cascade'
//     },
//     moq: type.INTEGER,
//     embelleshing_area: JsonField(sequelize, 'products', 'embelleshing_area'),
//     embelleshing_type: JsonField(sequelize, 'products', 'embelleshing_type')
//   });
//   Items.register = paylaod =>
//     Items.insertMany(paylaod).then(data => {
//       return data;
//     });
//   Items.updateData = (id, payload) => {
//     let data = {
//       $set: {
//         ...payload,
//         updated_at: getTimeStamp()
//       }
//     };
//     return this.findByIdAndUpdate(id, data, { new: true });
//   };
//   return Items;
// };
