const JsonField = require('sequelize-json');
module.exports = (sequelize, type) => {
  let User = sequelize.define('users', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    company_name: type.STRING,
    email: type.STRING,
    password: type.STRING,
    phone: JsonField(sequelize, 'users', 'phone'),
    profile_image: type.STRING,
    complete_phone_number: type.STRING,
    verified: JsonField(sequelize, 'users', 'verified'),
    auth_token: type.STRING,
    auth_when: {
      type: 'TIMESTAMP',
      defaultValue: type.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    status: {
      type: type.ENUM('0', '1', '2', '3'), //0:- pending, 1:- accepted/active, 2: rejected/deleted(by admin), 3: blocked(by admin)
      defaultValue: '0'
    },
    role: {
      type: type.ENUM('0', '1'), //0:- user, 1 - admin
      defaultValue: '0'
    },
    customer_id: type.STRING,
    card_id: type.STRING,
    is_deleted: { type: type.BOOLEAN, allowNull: false, defaultValue: false }, //true,false
    last_login: {
      type: 'TIMESTAMP',
      defaultValue: type.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
    // created_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: type.literal('CURRENT_TIMESTAMP'),
    //     allowNull: false
    // },
    // updated_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: type.literal('CURRENT_TIMESTAMP'),
    //     allowNull: false
    // }
  });
  User.register = paylaod =>
    User.create(paylaod).then(data => {
      return data;
    });
  User.checkToken = token => {
    return User.findOne({ where: { auth_token: token } });
  };
  User.logout = userId => {
    let updateData = {
      auth_token: '',
      updated_at: sequelize.fn('NOW')
    };
    return User.update(updateData, {
      where: { id: userId }
    });
  };
  User.onLoginDone = (userId, loginToken) => {
    let updateData = {
      auth_token: loginToken,
      auth_when: sequelize.fn('NOW'),
      last_login: sequelize.fn('NOW'),
      updated_at: sequelize.fn('NOW')
    };
    return User.update(updateData, {
      where: { id: userId }
    });
  };
  User.updateData = (id, payload) => {
    let data = {
      ...payload,
      last_login: sequelize.fn('NOW'),
      updated_at: sequelize.fn('NOW')
    };
    return User.update(data, {
      where: { id }
    });
  };
  User.login = (email, password, role) => {
    return User.findOne({
      where: {
        email: email,
        password: password,
        role: role
      }
    });
  };
  return User;
};
