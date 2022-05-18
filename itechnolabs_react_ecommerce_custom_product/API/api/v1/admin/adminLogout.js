import Joi from 'joi';
import { logoutUser } from '../../../controllers/user';

export default {
  method: 'POST',
  path: '/api/v1/admin/logout',
  config: {
    auth: 'jwt',
    description: 'Api service used for logging the user out of the application.',
    notes:
      'The request object should contain following fields in its <b>Headers</b> object<br/>&bull; <b>Token</b>: The token assigned to the user after successful login and should be send in headers in authorization key',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true })
    }
  },
  handler: logoutUser
};
