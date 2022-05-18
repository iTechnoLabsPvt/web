import Joi from 'joi';
import { removeCart } from '../../../controllers/cart';

export default {
  method: 'PUT',
  path: '/api/v1/cart/remove',
  config: {
    auth: false,
    description: 'Api service used to remove item from cart/save_later.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> objectbr/>&bull;<b> Cart Id</b>: Should have valid cart id.<br/>&bull;<b> Type</b>: Should have valid type - 1 to add cart, 2 - for save later. <br/>&bull;<b> Flag</b>: Should have valid flag -> 0 - to move from cart to save later & vice-versa, 1 - remove cart item .',
    tags: ['api', 'cart'],
    validate: {
      payload: {
        _id: Joi.number()
          .label('Cart Id')
          .required(),
        type: Joi.number()
          .optional()
          .label('Type'), // 1- for add cart, 2 - save later
        flag: Joi.number()
          .required()
          .label('Flag') //0 - to move from cart to save later & vice-versa, 1 - remove cart item
      }
    }
  },
  handler: removeCart
};
