import Joi from 'joi';
import { getCart } from '../../../controllers/cart';

export default {
  method: 'GET',
  path: '/api/v1/cart/get',
  config: {
    auth: false,
    description: 'Api service used to get cart/save for later items.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Product Id</b>: Should have valid product id.<br/>&bull;<b> User Id</b>: Should have valid user id.<br/>&bull;<b> Type</b>: Should have valid type - 1 to add cart, 2 - for save later.',
    tags: ['api', 'cart'],
    validate: {
      query: {
        product_id: Joi.string()
          .trim()
          .label('Product Id')
          .optional(),
        type: Joi.number()
          .optional()
          .label('Type'), //1- for add to cart, 2 - save for later
        user_id: Joi.string()
          .trim()
          .label('User Id')
          .required()
      }
    }
  },
  handler: getCart
};
