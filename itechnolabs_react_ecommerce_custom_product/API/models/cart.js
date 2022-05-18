const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let Cart = sequelize.define('cart', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: type.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    product_id: {
      type: type.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    quantity: type.INTEGER,
    type: {
      type: type.ENUM('1', '2'), //1 - cart, 2 - save later
      defaultValue: '1'
    },
    category: {
      type: type.ENUM('1', '2'), //1 - custom, 2 - blank_order
      defaultValue: '1'
    },
    decorating_method: type.STRING,
    color: type.STRING,
    size: type.STRING,
    customized_image: type.STRING,
    color_size_arr: JsonField(sequelize, 'cart', 'color_size_arr'),
    customized_product_details: JsonField(sequelize, 'cart', 'customized_product_details'),
    setup_cost: type.STRING,
    total_price: type.STRING,
    expire_date: type.STRING,
    piece_price: type.STRING,
    product_custom_front: type.STRING,
    product_custom_back: type.STRING
  });
  Cart.register = paylaod =>
    Cart.create(paylaod).then(data => {
      return data;
    });
  Cart.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return Cart.update(data, { where: { id } });
  };
  return Cart;
};
