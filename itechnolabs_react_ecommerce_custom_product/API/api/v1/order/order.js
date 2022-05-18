import Joi from 'joi';
import { createOrder } from '../../../controllers/order';

export default {
  method: 'POST',
  path: '/api/v1/order/place-order',
  config: {
    auth: false,
    description: 'Api service used for create order.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;',
    tags: ['api', 'order'],
    validate: {
      payload: {
        order_amount: Joi.number()
          .required()
          .label('Order Amount'),
        order_item: Joi.number()
          .required()
          .label('Order quatity'),
        order_help: Joi.string()
          .required()
          .label('Did anyone help you?'),
        user_id: Joi.number()
          .optional('')
          .label('user Id'),
        billing_info: Joi.object()
          .required()
          .label('Billing info'),
        item: Joi.array().items({
          product_id: Joi.number()
            .required()
            .label('product Id'),
          cart_id: Joi.number()
            .required()
            .label('cart Id'),
          user_id: Joi.number()
            .optional('')
            .label('user_id')
        })
      }
    },
    payload: {
      maxBytes: 104857600000 // 100 MB max
    }
  },
  handler: createOrder
};
