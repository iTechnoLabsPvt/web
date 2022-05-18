import Joi from 'joi';
import { checkProductDetail } from '../../../controllers/products';

export default {
  method: 'POST',
  path: '/api/v1/products/check-details',
  config: {
    auth: false,
    description: 'Api service used to check products details.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Style Ids</b>: Should carry the style ids as in array field. This is a required field.<br/>&bull; <b>Color</b>: Should carry Color for product. This is optional field.<br/>&bull; <b>Size</b>: Should carry size for product. This is optional field.',
    tags: ['api', 'products'],
    validate: {
      payload: {
        arr_obj: Joi.array()
          .allow([])
          .label('Array of object.')
      }
    }
  },
  handler: checkProductDetail
};
