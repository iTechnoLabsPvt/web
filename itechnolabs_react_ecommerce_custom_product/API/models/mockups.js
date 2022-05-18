const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let Mockups = sequelize.define('mockups', {
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
    decorating_method: type.STRING,
    color: type.STRING,
    size: type.STRING,
    customized_image: type.STRING,
    color_size_arr: JsonField(sequelize, 'mockups', 'color_size_arr'),
    customized_product_details: JsonField(sequelize, 'mockups', 'customized_product_details'),
    item_price: type.STRING,
    total_price: type.STRING
  });
  Mockups.register = paylaod =>
    Mockups.create(paylaod).then(data => {
      return data;
    });
  Mockups.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return Mockups.update(data, { id });
  };
  return Mockups;
};
