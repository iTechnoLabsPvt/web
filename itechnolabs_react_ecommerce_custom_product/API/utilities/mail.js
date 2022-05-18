/* -----------------------------------------------------------------------
   * @ description : Here initialising nodemailer transport for sending mails.
----------------------------------------------------------------------- */

import config from 'config';
import logger from './logger';
import nodemailer from 'nodemailer';
const { smtpServer, smtpPort, smtpUser, smtpPass } = config.get('smtp');

export const subjects = {
  userVerification: 'Verify Email',
  forgetPassword: 'Forgot Password',
  orderConfirm: 'Order Confirmed',
  newOrder: 'Order Recieved'
};

export const adminEmail = [
  'noel@voxmg.com',
  'orders@voxcatalog.com',
  'sueanne@voxmarketinggroup.com'
];

export const sendMail = async data => {
  let mailFrom = await getEmail();
  let transport = nodemailer.createTransport({
    host: smtpServer,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const message = {
    from: '"VOX" <' + mailFrom + '>',
    to: data.emails,
    bcc: 'sukhmandeep.singh@itechnolabs.tech',
    subject: data.subject,
    text: 'Hello, this is a test email!',
    html: data.body,
    attachments: data.attachments
  };

  transport.sendMail(message, function(err, info) {
    if (err) {
      logger.info(err, '=== error');
    } else {
      logger.info(info, '=== info');
    }
  });
};

export const sendMailAttachment = async (data, cb) => {
  let mailFrom = await getEmail();
  let transport = nodemailer.createTransport({
    host: smtpServer,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const message = {
    from: '"VOX" <' + mailFrom + '>',
    to: data.emails,
    subject: data.subject,
    text: 'Please find the attachment for mockup details.',
    html: data.body,
    attachments: data.attachments
  };

  transport.sendMail(message, function(err, info) {
    if (err) {
      logger.info(err, '=== error');
      return cb(false);
    } else {
      logger.info(info, '=== info');
      return cb(true);
    }
  });
};

/* Get Email from settings in application */
const getEmail = async () => {
  // let user = await User.findOne({role: 3});
  // return user.email;
  return smtpUser;
};
