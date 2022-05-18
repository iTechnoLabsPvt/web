import Joi from 'joi';
import { changePassword } from '../../../controllers/user';

export default {
  method: 'PUT',
  path: '/api/v1/user/password/change',
  config: {
    auth: 'jwt',
    description: 'Api service used to change user password.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Old Password</b>: Should carry the old password of user. This is a required field.<br/>&bull;<b> New Password</b>: Should be a valid new password. This is required field.',
    tags: ['api', 'user'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        old_password: Joi.string()
          .trim()
          .label('Old Password')
          .required(),
        password: Joi.string()
          .trim()
          .label('Password')
          .required()
      }
    }
  },
  handler: changePassword
};
