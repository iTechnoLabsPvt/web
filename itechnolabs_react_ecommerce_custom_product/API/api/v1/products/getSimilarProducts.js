import Joi from 'joi';
import { getSimilarProducts } from '../../../controllers/products';

export default {
  method: 'POST',
  path: '/api/v1/products/similar',
  config: {
    auth: false,
    description: 'Api service used to get similar products.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Style Ids</b>: Should carry the style ids as in array field. This is a required field.<br/>&bull; <b>Color</b>: Should carry Color for product. This is optional field.<br/>&bull; <b>Size</b>: Should carry size for product. This is optional field.',
    tags: ['api', 'products'],
    validate: {
      payload: {
        styles: Joi.array()
          .label('Style Ids')
          .required(),
        color: Joi.string()
          .trim()
          .label('Color')
          .optional(),
        size: Joi.string()
          .trim()
          .label('Size')
          .optional()
      }
    }
  },
  handler: getSimilarProducts
};
