import Joi from 'joi';
import { getProfile } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/profile',
  config: {
    auth: 'jwt',
    description: 'Api service used to update user profile.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Name</b>: Should carry the Full name of the user. This is a required field.<br/>&bull;<b> Email</b>: Should be a valid email.<br/>&bull;<b> Phone</b>: Should be a valid phone number.<br/>&bull;<b> Company Name</b>: Should be a valid company name.',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      query: {
        email: Joi.string()
          .email()
          .trim()
          .lowercase()
          .label('Email')
          .optional()
      }
    }
  },
  handler: getProfile
};
