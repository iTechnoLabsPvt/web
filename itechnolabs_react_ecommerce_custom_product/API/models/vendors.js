module.exports = (sequelize, type) => {
  let Vendor = sequelize.define('vendors', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vendor_name: type.STRING,
    status: {
      type: type.ENUM('0', '1', '2'), //0- inactive, 1- active, 2- disabled
      defaultValue: '1'
    }
  });
  Vendor.register = paylaod =>
    Vendor.bulkCreate(paylaod).then(data => {
      return data;
    });
  Vendor.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return User.update(data, { where: { id } });
  };
  return Vendor;
};
