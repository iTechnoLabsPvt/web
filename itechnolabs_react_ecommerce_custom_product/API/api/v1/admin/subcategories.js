import Joi from 'joi';
import { subCategories } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/all-sub-categories',
  config: {
    auth: 'jwt',
    description: 'Api to get all Sub Categories.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      query: {
        category_id: Joi.number()
          .label('Category Id')
          .required()
      }
    }
  },
  handler: subCategories
};
