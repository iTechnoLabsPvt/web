import Joi from 'joi';
import { resendEmail } from '../../../controllers/user';

export default {
  method: 'POST',
  path: '/api/v1/user/resend-email',
  config: {
    auth: false,
    description: 'Api service used to resend verification email to the user.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Email</b>: Should have email.',
    tags: ['api', 'user'],
    validate: {
      payload: {
        email: Joi.string()
          .email()
          .lowercase()
          .required()
          .label('Email')
      }
    }
  },
  handler: resendEmail
};
