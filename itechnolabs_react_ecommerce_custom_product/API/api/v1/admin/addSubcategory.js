import Joi from 'joi';
import { addSubcategory } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/add-subcategory',
  config: {
    auth: 'jwt',
    description: 'Api to add the subcategory.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        name: Joi.string()
          .label('Category Name')
          .required(),
        category_id: Joi.number()
          .label('Category Id')
          .required()
      }
    }
  },
  handler: addSubcategory
};
