import Joi from 'joi';
import { verifyEmail } from '../../../controllers/user';

export default {
  method: 'POST',
  path: '/api/v1/user/email-verify',
  config: {
    auth: false,
    description: 'Api service used to verify email of user.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Token</b>: Should have valid token.',
    tags: ['api', 'user'],
    validate: {
      payload: {
        token: Joi.string()
          .required()
          .label('Token')
      }
    }
  },
  handler: verifyEmail
};
