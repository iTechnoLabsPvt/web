/* -----------------------------------------------------------------------
   * @ description : This file defines the user schema for mongodb.
----------------------------------------------------------------------- */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class UserClass {
  static register(payload) {
    return this(payload).save();
  }
  static checkPhone(payload) {
    return this.findOne({
      $or: [
        { completePhoneNumber: payload.code + payload.number },
        { 'phone.number': payload.number }
      ],
      isDeleted: false
    });
  }
  static checkPhoneOnLogin(number, role) {
    return this.findOne({
      $or: [
        { completePhoneNumber: number.code + number.number },
        { 'phone.number': number.number }
      ],
      role: role,
      isDeleted: false
    });
  }
  static checkToken(token) {
    return this.findOne({ 'auth.token': token });
  }
  static onLoginDone(userId, loginToken) {
    let updateData = {
      $set: {
        auth: { token: loginToken, when: getTimeStamp() },
        lastLogin: getTimeStamp(),
        updatedAt: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }
  static onCompleteProfile(payload, loginToken) {
    payload = {
      ...payload,
      auth: { token: loginToken },
      lastLogin: getTimeStamp(),
      updatedAt: getTimeStamp()
    };
    return this(payload).save();
  }
  static logout(userId, token) {
    let updateData = {
      $set: {
        auth: {},
        deviceToken: '',
        updatedAt: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(userId, updateData);
  }
  static updateData(id, payload) {
    let data = {
      $set: {
        ...payload,
        lastLogin: getTimeStamp(),
        updatedAt: getTimeStamp()
      }
    };
    return this.findByIdAndUpdate(id, data, { new: true });
  }
  static login(email, password, role) {
    return this.findOne({
      email: email,
      password: password,
      role: role
    });
  }
}

const UserSchema = new Schema({
  name: { type: String, default: '' },
  company_name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  phone: {
    number: { type: String, default: '' },
    code: { type: String, default: '' }
  },
  profile_image: { type: String, default: '' },
  completePhoneNumber: { type: String, default: '' },
  verified: {
    token: { type: String, default: '' },
    status: { type: Boolean, default: false }
  },
  auth: {
    token: { type: String, default: '' },
    when: { type: Number, default: getTimeStamp }
  },
  status: { type: Number, default: 0 }, //0:- pending, 1:- accepted/active, 2: rejected/deleted(by admin), 3: blocked(by admin)
  role: { type: Number, default: 0 }, //0:- user, 1 - admin
  customer_id: { type: String, default: '' },
  card_id: { type: String, default: '' },
  is_deleted: { type: Boolean, default: false }, //true,false
  last_login: { type: Number, default: getTimeStamp },
  created_at: { type: Number, default: getTimeStamp },
  updated_at: { type: Number, default: getTimeStamp }
});

UserSchema.loadClass(UserClass);

export default Mongoose.model('User', UserSchema);
