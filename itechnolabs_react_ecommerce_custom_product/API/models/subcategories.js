const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let SubCategories = sequelize.define('subcategories', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_id: {
      type: type.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    subcategory_name: type.STRING,
    subcategory_image: type.STRING,
    gender: JsonField(sequelize, 'subcategories', 'gender')
  });
  SubCategories.register = paylaod =>
    SubCategories.bulkCreate(paylaod).then(data => {
      return data;
    });
  SubCategories.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return this.update(data, { id });
  };
  SubCategories.addCategory = paylaod =>
    SubCategories.create(paylaod).then(data => {
      return data;
    });
  return SubCategories;
};
