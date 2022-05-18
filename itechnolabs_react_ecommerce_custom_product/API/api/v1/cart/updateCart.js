import Joi from 'joi';
import { updateCart } from '../../../controllers/cart';

export default {
  method: 'POST',
  path: '/api/v1/cart/update',
  config: {
    auth: false,
    description: 'Api service used to update product in cart.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b>Id</b>: Should have valid id of cart/save_later.<br/>&bull;<b> Quantity</b>: Should have valid quantity.<br/>&bull;<b> Decorating Method</b>: Should have valid decorating method.<br/>&bull;<b> Color Size</b>: Should have valid color & size combination.<br/>&bull;<b> Customized image</b>: Should have valid customized image.<br/>&bull;<b> Customized Product Coordinates</b>: Should have valid customized product details.<br/>&bull;<b> Setup cost</b>: Should have valid Setup cost.<br/>&bull;<b> Total price</b>: Should have valid Total cost.',
    tags: ['api', 'cart'],
    validate: {
      payload: {
        id: Joi.number()
          .required()
          .label('Id'),
        product_id: Joi.string()
          .required()
          .label('Product Id'),
        quantity: Joi.number()
          .required()
          .label('Quantity'),
        decorating_method: Joi.string()
          .optional()
          .label('Decorating Method'),
        customized_image: Joi.string()
          .optional()
          .allow('')
          .label('Customized image'),
        color_size_arr: Joi.array()
          .optional()
          .label('Color Size'),
        color: Joi.string()
          .optional()
          .label('Color'),
        size: Joi.string()
          .optional()
          .label('Size'),
        customized_product_details: Joi.object()
          .optional()
          .label('Customized Product Details'),
        setup_cost: Joi.string()
          .optional()
          .label('Setup cost'),
        total_price: Joi.string()
          .optional()
          .label('Total price'),
        expire_date: Joi.string()
          .optional()
          .label('Total price'),
        piece_price: Joi.string()
          .optional()
          .label('piece_price')
      }
    },
    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data',
      maxBytes: 104857600 // 100 MB max
    }
  },
  handler: updateCart
};
