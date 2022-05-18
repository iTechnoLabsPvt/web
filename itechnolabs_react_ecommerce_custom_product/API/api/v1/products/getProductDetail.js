import Joi from 'joi';
import { getProductDetail } from '../../../controllers/products';

export default {
  method: 'GET',
  path: '/api/v1/products/detail/get',
  config: {
    auth: false,
    description: 'Api service used to get product detail.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Product Id</b>: Should carry Product Id. This is required field.',
    tags: ['api', 'products'],
    validate: {
      query: {
        product_id: Joi.string()
          .trim()
          .label('Product Id')
          .required()
      }
    }
  },
  handler: getProductDetail
};
