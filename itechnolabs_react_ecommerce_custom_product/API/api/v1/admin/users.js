import Joi from 'joi';
import { allUser } from '../../../controllers/user';

export default {
  method: 'GET',
  path: '/api/v1/admin/all-users',
  config: {
    auth: 'jwt',
    description: 'Api service used to change user password.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Old Password</b>: Should carry the old password of user. This is a required field.<br/>&bull;<b> New Password</b>: Should be a valid new password. This is required field.',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true })
    }
  },
  handler: allUser
};
