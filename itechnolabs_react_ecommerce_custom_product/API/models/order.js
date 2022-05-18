// const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let Orders = sequelize.define('orders', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_item: type.INTEGER,
    order_status: {
      type: type.ENUM('0', '1'), //0 - Pending, 1 - Success
      defaultValue: '0'
    },
    order_amount: type.STRING,
    order_help: type.STRING,
    user_id: {
      type: type.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    Shipment_number: type.STRING,
    Shipment_charger: type.STRING,
    reference_id: type.STRING
  });
  Orders.register = paylaod =>
    Orders.insertMany(paylaod).then(data => {
      console.log(data);
      return data;
    });
  Orders.updateData = (id, payload) => {
    let data = {
      $set: {
        ...payload,
        updated_at: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(id, data, { new: true });
  };
  return Orders;
};
