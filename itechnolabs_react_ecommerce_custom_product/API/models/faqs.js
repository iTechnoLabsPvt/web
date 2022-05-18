module.exports = (sequelize, type) => {
  let Faqs = sequelize.define('faqs', {
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
    role: {
      type: type.ENUM('0', '1')
    },
    question: type.STRING,
    answer: type.STRING
  });
  Faqs.register = paylaod =>
    Faqs.create(paylaod).then(data => {
      return data;
    });
  Faqs.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return Faqs.update(data, { id });
  };
  return Faqs;
};
