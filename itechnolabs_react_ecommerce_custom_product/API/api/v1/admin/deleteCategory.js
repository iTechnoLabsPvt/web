import { join } from 'bluebird';
import Joi from 'joi';
import { deleteCategory } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/delete-category',
  config: {
    auth: 'jwt',
    description: 'Api to delete the category.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        category_id: Joi.number()
          .label('Category Id')
          .required(),
        type: Joi.string()
          .label('type')
          .required()
      }
    }
  },
  handler: deleteCategory
};
