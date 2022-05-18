/* -----------------------------------------------------------------------
   * @ description : This is the user service layer.
----------------------------------------------------------------------- */

import { User, sequelizeConnection } from '../mysqlDb';
import { encryptpassword, generateToken, getTimeStamp } from '../utilities/universal';
import Messages from '../utilities/messages';
import config from 'config';
import * as Mail from '../utilities/mail';
import path from 'path';
import fs from 'fs';
import util from 'util';
import Instagram from 'instagram-web-api';
import _ from 'underscore';
const { fn, col, cast } = sequelizeConnection;
const { WEB_URL, StaticFiles, SERVER_URL, Instagram_username, Instagram_password } = config.get(
  'appConstants'
);

export const register = async payload => {
  const isEmailExists = await User.findOne({ where: { email: payload.email, status: '1' } });
  if (isEmailExists) throw new Error(Messages.emailAlreadyExists);
  const token = generateToken({ when: getTimeStamp(), email: payload.email });
  payload = {
    ...payload,
    password: encryptpassword(payload.password),
    verified: { token: token, status: false }
  };
  await User.register(payload);
  let url = `${WEB_URL}email-verify?token=` + token;
  let templatepath = path.join(__dirname, StaticFiles);
  let emailTemplate = fs.readFileSync(path.resolve(templatepath + 'verifyEmail.html'), 'UTF-8');
  let mailMsg = url;

  // /******** Replace dynamic values in email template. ********/
  let sendStr = util.format(emailTemplate, SERVER_URL, SERVER_URL, mailMsg);
  Mail.sendMail({
    emails: [payload.email],
    body: sendStr,
    subject: Mail.subjects.userVerification
  });
  return;
};

export const login = async payload => {
  let dataa;
  let userData = await User.login(payload.email, encryptpassword(payload.password), payload.role);
  if (!userData) throw new Error(Messages.invalidCredentials);
  if (userData && userData.dataValues) {
    dataa = userData.dataValues;
    if (dataa.status === '0') throw new Error(Messages.activateAccount);
    if (dataa.status === '2') throw new Error(Messages.deletedByAdmin);
    if (dataa.status === '3') throw new Error(Messages.blockedByAdmin);
  }
  const loginToken = generateToken({
    when: getTimeStamp()
  });

  let data = await User.onLoginDone(dataa.id, loginToken);
  if (data.length && data[0] == 1) {
    data = await User.findOne({ where: { id: dataa.id } });
  }
  return {
    id: data.id,
    name: data.name,
    company_name: data.company_name,
    email: data.email,
    role: data.role,
    status: data.status,
    profile_image: data.profile_image,
    complete_phone_number: data.complete_phone_number,
    loginToken: loginToken
  };
};

export const logout = async payload => {
  return await User.logout(payload.user.id);
};

export const updateUserProfile = async (payload, user) => {
  try {
    if (payload.email) {
      let emailCheck = await User.findOne({ where: { email: payload.email } });

      if (emailCheck && emailCheck.dataValues && emailCheck.dataValues.email != user.email)
        throw new Error(Messages.emailAlreadyExists);
    }

    let data = await User.updateData(user.id, payload);
    if (data.length && data[0] == 1) {
      data = await User.findOne({ where: { id: user.id } });
    }
    return {
      id: data.id,
      name: data.name,
      company_name: data.company_name,
      email: data.email,
      role: data.role,
      status: data.status,
      profile_image: data.profile_image,
      complete_phone_number: data.complete_phone_number,
      loginToken: data.auth_token
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const verifyEmailService = async payload => {
  const user = await User.findOne({
    where: fn(
      'JSON_CONTAINS',
      col('verified'),
      cast(
        '{"token": ' + JSON.stringify(payload.token) + ', "status": false}',
        'CHAR CHARACTER SET utf8'
      )
    )
  });
  if (!user) throw new Error(Messages.verifyTokenExpired);
  if (user) {
    await User.update(
      { verified: JSON.stringify({ token: '', status: true }), status: '1' },
      { where: { id: user.id } }
    );
    return true;
  }
  //case need to handle in case token expired or does not exist.
  return false;
};

export const forgotPasswordService = async payload => {
  try {
    let token = generateToken({
      when: getTimeStamp()
    });

    const userData = await User.findOne({
      where: {
        email: payload.email
      }
    });

    if (userData && userData.dataValues) {
      await User.update({ auth_token: token }, { where: { id: userData.id } });

      let url = `${WEB_URL}reset-password?token=` + token;
      let templatepath = path.join(__dirname, StaticFiles);
      let emailTemplate = fs.readFileSync(
        path.resolve(templatepath + 'forgotPassword.html'),
        'UTF-8'
      );
      let mailMsg = url;

      /******** Replace dynamic values in email template. ********/
      let sendStr = util.format(emailTemplate, SERVER_URL, mailMsg);

      Mail.sendMail({
        emails: [userData.email],
        body: sendStr,
        subject: Mail.subjects.forgetPassword
      });

      return;
    } else {
      throw new Error(Messages.emailNotExists);
    }
  } catch (err) {
    throw new Error(Messages.emailNotExists);
  }
};

// Use to reset password of the a particular user
export const resetPasswordService = async (payload, user) => {
  try {
    if (payload.password != payload.confirm_password)
      throw new Error(Messages.confirmPasswordMissMatch);

    let data = await User.update(
      { password: encryptpassword(payload.password), auth_token: '', auth_when: fn('NOW') },
      { where: { id: user.id } }
    );

    if (data.length && data[0] == 1) {
      return;
    } else {
      throw new Error(Messages.resetTokenExpired);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to resend verification email to user
export const resendEmailService = async payload => {
  try {
    const user = await User.findOne({ where: { email: payload.email, status: '0' } });
    if (!user) throw new Error(Messages.emailNotExists);
    const token = generateToken({ when: getTimeStamp(), email: payload.email });
    const data1 = { verified: JSON.stringify({ token: token, status: false }) };
    await User.update(data1, { where: { email: payload.email } });
    let url = `${WEB_URL}email-verify?token=` + token;
    let templatepath = path.join(__dirname, StaticFiles);
    let emailTemplate = fs.readFileSync(path.resolve(templatepath + 'verifyEmail.html'), 'UTF-8');
    let mailMsg = url;

    /******** Replace dynamic values in email template. ********/
    let sendStr = util.format(emailTemplate, SERVER_URL, SERVER_URL, mailMsg);
    Mail.sendMail({
      emails: [payload.email],
      body: sendStr,
      subject: Mail.subjects.userVerification
    });
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changePasswordService = async (payload, user) => {
  try {
    if (payload.old_password) {
      if (payload.password == payload.old_password)
        throw new Error(Messages.oldAndNewPasswordMatch);

      if (user.password != encryptpassword(payload.old_password))
        throw new Error(Messages.oldPassIncorrect);

      if (!payload.password) throw new Error(Messages.needNewPassword);
    }
    if (payload.password) {
      let query = {
        password: encryptpassword(payload.password),
        updated_at: getTimeStamp()
      };
      await User.update(query, { where: { id: user.id } });
    }
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Function to get Instagram posts
export const getLiveFeedsFromInstagramService = async () => {
  return new Promise((resolve, reject) => {
    try {
      const client = new Instagram({ username: Instagram_username, password: Instagram_password });
      (async () => {
        await client.login();
        const profile = await client.getHome();
        if (profile) {
          let data = profile.data.user.edge_web_feed_timeline.edges;
          data.sort((a, b) => b.node.taken_at_timestamp - a.node.taken_at_timestamp);
          data = _.pluck(data, 'node');
          data = _.pluck(data, 'display_url');
          let finalData = [];
          if (data.length) {
            finalData = data.slice(0, 5);
          }
          resolve(finalData);
        }
      })();
    } catch (error) {
      reject(error.message);
    }
  });
};

// function to get all users
export const allUsers = async payload => {
  try {
    const data = await User.findAll({ where: { role: '0' } });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* Register guest */

export const registerGuest = async payload => {
  const isEmailExists = await User.findOne({ where: { email: payload.email } });
  if (isEmailExists) return isEmailExists;
  const token = generateToken({ when: getTimeStamp(), email: payload.email });
  payload = {
    ...payload,
    password: encryptpassword(payload.password),
    verified: { token: token, status: false }
  };
  let user = await User.register(payload);
  return user;
};
