module.exports = (sequelize, type) => {
  let Help = sequelize.define('anyone_helps', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING
  });
  Help.register = paylaod =>
    Help.bulkCreate(paylaod).then(data => {
      return data;
    });
  Help.updateData = (id, payload) => {
    let data = {
      $set: {
        ...payload,
        updated_at: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(id, data, { new: true });
  };
  Help.addHelp = paylaod =>
    Help.create(paylaod).then(data => {
      return data;
    });
  return Help;
};
