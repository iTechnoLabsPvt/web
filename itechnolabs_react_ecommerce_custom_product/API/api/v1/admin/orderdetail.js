import Joi from 'joi';
import { getOrder } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/order-detail',
  config: {
    auth: 'jwt',
    description: 'Api to get order detail.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        order_id: Joi.number()
          .label('Order Id')
          .required()
      }
    }
  },
  handler: getOrder
};
