import Joi from 'joi';
import { addToMockup } from '../../../controllers/mockup';

export default {
  method: 'POST',
  path: '/api/v1/mockup/save',
  config: {
    auth: 'jwt',
    description: 'Api service used to save mockup.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Product Id</b>: Should have valid product id.<br/>&bull;<b> Quantity</b>: Should have valid quantity.<br/>&bull;<b> Decorating Method</b>: Should have valid decorating method.<br/>&bull;<b> Color Size</b>: Should have valid color & size combination.<br/>&bull;<b> Customized image</b>: Should have valid customized image.<br/>&bull;<b> Customized Product Coordinates</b>: Should have valid customized product details.',
    tags: ['api', 'mockup'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        product_id: Joi.string()
          .required()
          .label('Product Id'),
        quantity: Joi.number()
          .required()
          .label('Quantity'),
        decorating_method: Joi.string()
          .optional()
          .allow('')
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
        item_price: Joi.string()
          .optional()
          .label('Item price'),
        total_price: Joi.string()
          .optional()
          .label('Total price')
      }
    },
    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data',
      maxBytes: 104857600 // 100 MB max
    }
  },
  handler: addToMockup
};
