import Joi from 'joi';
import { reorderAddCart } from '../../../controllers/cart';

export default {
  method: 'POST',
  path: '/api/v1/cart/reorder-add',
  config: {
    auth: false,
    description: 'Api service used to add product in cart.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Product Id</b>: Should have valid product id.<br/>&bull;<b> Quantity</b>: Should have valid quantity.<br/>&bull;<b> User Id</b>: Should have valid user id.<br/>&bull;<b> Type</b>: Should have valid type - 1 to add cart, 2 - for save later.<br/>&bull;<b> Category</b>: Should have valid category - 1 to custom, 2 - for order_blank.<br/>&bull;<b> Decorating Method</b>: Should have valid decorating method.<br/>&bull;<b> Color Size</b>: Should have valid color and size combination array.<br/>&bull;<b> Customized image</b>: Should have valid customized image.<br/>&bull;<b> Customized Product Coordinates</b>: Should have valid customized product details.<br/>&bull;<b> Setup cost</b>: Should have valid Setup cost.<br/>&bull;<b> Total price</b>: Should have valid Total cost.',
    tags: ['api', 'cart'],
    validate: {
      payload: {
        product_id: Joi.string()
          .required()
          .label('Product Id'),
        quantity: Joi.number()
          .required()
          .label('Quantity'),
        user_id: Joi.number()
          .optional()
          .label('User Id'),
        type: Joi.number()
          .required()
          .label('Type'), //1- for add to cart, 2 - save for later
        category: Joi.number()
          .optional()
          .label('Category'), //1 -custom , 2 - blank_order
        decorating_method: Joi.string()
          .optional()
          .label('Decorating Method'),
        color_size_arr: Joi.array()
          .optional()
          .label('Color Size'),
        color: Joi.string()
          .optional()
          .label('Color'),
        size: Joi.string()
          .optional()
          .label('Size'),
        customized_image: Joi.string()
          .optional()
          .allow('')
          .label('Customized image'),
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
          .label('piece_price'),
        item_price: Joi.string()
          .optional()
          .label('item_price')
      }
    },
    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data',
      maxBytes: 104857600 // 100 MB max
    }
  },
  handler: reorderAddCart
};
