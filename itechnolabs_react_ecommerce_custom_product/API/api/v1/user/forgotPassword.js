import Joi from 'joi';
import { forgotPassword } from '../../../controllers/user';

export default {
  method: 'POST',
  path: '/api/v1/user/forgot-password',
  config: {
    auth: false,
    description: 'Api service used to send email when user forget there password.',
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
  handler: forgotPassword
};
