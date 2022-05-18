module.exports = (sequelize, type) => {
  let Wishlist = sequelize.define('wishlist', {
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
    }
  });
  Wishlist.register = paylaod =>
    Wishlist.create(paylaod).then(data => {
      return data;
    });
  Wishlist.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return Wishlist.update(data, { id });
  };
  return Wishlist;
};
