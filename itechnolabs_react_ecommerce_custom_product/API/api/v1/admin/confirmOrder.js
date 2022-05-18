import Joi from 'joi';
import { orderConfirm } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/confirm-order',
  config: {
    auth: 'jwt',
    description: 'Api to Confirm order.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      query: {
        id: Joi.number()
          .label('order Id')
          .required()
      }
    }
  },
  handler: orderConfirm
};
