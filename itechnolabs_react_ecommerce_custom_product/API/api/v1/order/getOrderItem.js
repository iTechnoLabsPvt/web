import Joi from 'joi';
import { getOrderItems } from '../../../controllers/order';

export default {
  method: 'GET',
  path: '/api/v1/order/get-order-items',
  config: {
    auth: false,
    description: 'Api service used to get order item for re-order according to user.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> User Id</b>: Should have valid user id.',
    tags: ['api', 'order'],
    validate: {
      query: {
        user_id: Joi.string()
          .trim()
          .label('User Id')
          .required()
      }
    }
  },
  handler: getOrderItems
};
