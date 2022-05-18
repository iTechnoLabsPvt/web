import Joi from 'joi';
import { getOrderList } from '../../../controllers/order';

export default {
  method: 'GET',
  path: '/api/v1/order/get-order-list',
  config: {
    auth: false,
    description: 'Api service used to get order list according to user.',
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
  handler: getOrderList
};
