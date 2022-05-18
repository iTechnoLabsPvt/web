import Joi from 'joi';
import { testImage } from '../../../controllers/products';

export default {
  method: 'post',
  path: '/api/v1/products/testImage',
  config: {
    auth: false,
    description: 'Api service used to check products details.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Style Ids</b>: Should carry the style ids as in array field. This is a required field.<br/>&bull; <b>Color</b>: Should carry Color for product. This is optional field.<br/>&bull; <b>Size</b>: Should carry size for product. This is optional field.',
    tags: ['api', 'products'],
    validate: {
      payload: {
        color: Joi.string()
          .trim()
          .label('Color')
          .empty('')
          .optional(),
        image: Joi.string()
          .trim()
          .label('image')
          .empty('')
          .optional(),
        ela_area: Joi.string()
          .trim()
          .label('ela_area')
          .empty('')
          .optional()
      }
    },
    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data',
      maxBytes: 1048576000000 // 100 MB max
    }
  },
  handler: testImage
};
