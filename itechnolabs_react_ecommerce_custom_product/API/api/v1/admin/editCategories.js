import Joi from 'joi';
import { editCategory } from '../../../controllers/admin';

export default {
  method: 'PUT',
  path: '/api/v1/admin/edit-category',
  config: {
    auth: 'jwt',
    description: 'Api to edit the category.',
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

        category_name: Joi.string()
          .trim()
          .label('Category Name')
          .required(),
        category_image: Joi.string()
          .allow('', null)
          .label('Category Image')
      }
    }
  },
  handler: editCategory
};
