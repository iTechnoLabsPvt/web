import Joi from 'joi';
import { categories } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/all-categories',
  config: {
    auth: 'jwt',
    description: 'Api to get all categories.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true })
    }
  },
  handler: categories
};
