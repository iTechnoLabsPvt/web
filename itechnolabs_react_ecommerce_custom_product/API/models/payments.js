// const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let Payments = sequelize.define('payments', {
    payment_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    payment_status: {
      type: type.ENUM('0', '1'), //0 - Pending, 1 - Success
      defaultValue: '0'
    },
    payment_amount: type.STRING,
    order_id: type.INTEGER,
    user_id: {
      type: type.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  });
  Payments.register = paylaod =>
    Payments.insertMany(paylaod).then(data => {
      console.log(data);
      return data;
    });
  Payments.updateData = (id, payload) => {
    let data = {
      $set: {
        ...payload,
        updated_at: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(id, data, { new: true });
  };
  return Payments;
};
