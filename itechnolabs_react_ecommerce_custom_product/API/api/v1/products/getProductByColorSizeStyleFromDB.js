import Joi from 'joi';
import { getProductByColorSizeStyleFromDB } from '../../../controllers/products';

export default {
  method: 'GET',
  path: '/api/v1/products/detail/get/product-style-color-size',
  config: {
    auth: false,
    description: 'Api service used to get product detail by style color size from Database.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Style</b>: Should carry Style for product. This is required field.<br/>&bull; <b>Color</b>: Should carry Color for product. This is required field.<br/>&bull; <b>Size</b>: Should carry size for product. This is required field.',
    tags: ['api', 'products'],
    validate: {
      query: {
        style: Joi.string()
          .trim()
          .label('Style')
          .required(),
        color: Joi.string()
          .trim()
          .label('Color')
          .required(),
        size: Joi.string()
          .trim()
          .label('Size')
          .required()
      }
    }
  },
  handler: getProductByColorSizeStyleFromDB
};
