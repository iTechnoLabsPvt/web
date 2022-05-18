import Joi from 'joi';
import { updateProfile } from '../../../controllers/user';

export default {
  method: 'PUT',
  path: '/api/v1/user/profile/update',
  config: {
    auth: 'jwt',
    description: 'Api service used to update user profile.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Name</b>: Should carry the Full name of the user. This is a required field.<br/>&bull;<b> Email</b>: Should be a valid email.<br/>&bull;<b> Phone</b>: Should be a valid phone number.<br/>&bull;<b> Company Name</b>: Should be a valid company name.',
    tags: ['api', 'user'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        name: Joi.string()
          .trim()
          // .min(2)
          // .max(20)
          .label('Name')
          .optional(),
        email: Joi.string()
          .email()
          .trim()
          .lowercase()
          .label('Email')
          .optional(),
        company_name: Joi.string()
          .trim()
          // .min(2)
          // .max(20)
          .label('Company Name')
          .optional(),
        complete_phone_number: Joi.string()
          .trim()
          // .min(2)
          // .max(20)
          .label('Phone Number ')
          .optional()
          .error(new Error('Should be a valid phone number.'))
      }
    }
  },
  handler: updateProfile
};
