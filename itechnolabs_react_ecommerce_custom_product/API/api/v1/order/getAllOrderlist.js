import Joi from 'joi';
import { getAllOrderList } from '../../../controllers/order';

export default {
  method: 'GET',
  path: '/api/v1/order/get-all-order-list',
  config: {
    auth: false,
    description: 'Api service used to get order list for Admin.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> User Id</b>: Should have valid user id.',
    tags: ['api', 'order']
  },
  handler: getAllOrderList
};
