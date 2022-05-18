import Joi from 'joi';
import { allOrder } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/all-orders',
  config: {
    auth: 'jwt',
    description: 'Api to get all orders.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      query: {
        type: Joi.string()
          .label('type')
          .required()
      }
    }
  },
  handler: allOrder
};
