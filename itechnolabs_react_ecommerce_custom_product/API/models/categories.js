module.exports = (sequelize, type) => {
  let Categories = sequelize.define('categories', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: type.STRING,
    category_image: type.STRING
  });
  Categories.register = paylaod =>
    Categories.bulkCreate(paylaod).then(data => {
      return data;
    });
  Categories.updateData = (id, payload) => {
    let data = {
      $set: {
        ...payload,
        updated_at: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(id, data, { new: true });
  };
  Categories.addCategory = paylaod =>
    Categories.create(paylaod).then(data => {
      return data;
    });
  return Categories;
};
