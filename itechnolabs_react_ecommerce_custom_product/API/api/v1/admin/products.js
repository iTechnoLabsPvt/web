import Joi from 'joi';
import { products } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/all-products',
  config: {
    auth: 'jwt',
    description: 'Api to get all products.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      query: {
        category: Joi.string().allow(''),
        subCategory: Joi.string().allow(''),
        search: Joi.string().allow('')
      }
    }
  },
  handler: products
};
