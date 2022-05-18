import Joi from 'joi';
import { productDetail } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/get-product',
  config: {
    auth: 'jwt',
    description: 'Api to get product detail.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      query: {
        product_id: Joi.number()
          .label('Product Id')
          .required()
      }
    }
  },
  handler: productDetail
};
