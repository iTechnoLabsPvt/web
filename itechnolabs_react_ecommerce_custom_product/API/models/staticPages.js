module.exports = (sequelize, type) => {
  let Pages = sequelize.define('pages', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    slug: type.STRING,
    description: type.STRING
  });
  Pages.addPage = paylaod =>
    Pages.create(paylaod).then(data => {
      return data;
    });
  Pages.updateData = (id, payload) => {
    let data = {
      ...payload,
      updated_at: sequelize.fn('NOW')
    };
    return Pages.update(data, {
      where: { id }
    });
  };
  return Pages;
};
