import Joi from 'joi';
import { Payments } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/all-payments',
  config: {
    auth: 'jwt',
    description: 'Api to get all payments details.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true })
    }
  },
  handler: Payments
};
