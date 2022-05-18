const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let Products = sequelize.define('products', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    unique_key: type.STRING,
    product_title: type.STRING,
    product_description: type.TEXT,
    style: type.STRING,
    available_sizes: type.STRING,
    brand_logo_image: type.STRING,
    thumbnail_image: type.STRING,
    color_swatch_image: type.STRING,
    product_image: type.STRING,
    price_text: type.STRING,
    suggested_price: type.STRING,
    category_name: type.STRING,
    subcategory_name: type.STRING,
    color_name: type.STRING,
    color_square_image: type.STRING,
    color_product_image: type.STRING,
    color_product_thumbnail_image: type.STRING,
    size: JsonField(sequelize, 'products', 'size'),
    qty: type.STRING,
    piece_weight: type.STRING,
    piece_price: type.STRING,
    setup_fee: type.STRING,
    dozens_price: type.STRING,
    case_price: type.STRING,
    price_group: type.STRING,
    case_size: type.STRING,
    inventory_key: type.STRING,
    size_index: type.STRING,
    mainframe_color: type.STRING,
    mill: type.STRING,
    product_status: type.STRING,
    companion_styles: type.STRING,
    MSRP: type.STRING,
    map_pricing: type.STRING,
    front_model_image_url: type.STRING,
    back_model_image: type.STRING,
    front_flat_image: type.STRING,
    back_flat_image: type.STRING,
    side_model_image_url: type.STRING,
    vendor_name: type.STRING,
    vendor_item_no: type.STRING,
    GTIN: type.STRING,
    vendor_id: {
      type: type.INTEGER,
      references: {
        model: 'vendors',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    moq: type.INTEGER,
    embelleshing_area: JsonField(sequelize, 'products', 'embelleshing_area'),
    embelleshing_type: JsonField(sequelize, 'products', 'embelleshing_type'),
    parent: type.BOOLEAN
  });
  Products.register = paylaod =>
    Products.insertMany(paylaod).then(data => {
      console.log(data);
      return data;
    });
  Products.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return Products.update(data, {
      where: { id }
    });
  };

  Products.addProduct = paylaod =>
    Products.create(paylaod).then(data => {
      return data;
    });
  return Products;
};
