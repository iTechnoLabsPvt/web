import Joi from 'joi';
import { addCategory } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/add-category',
  config: {
    auth: 'jwt',
    description: 'Api to add the category.',
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
        category_image: Joi.string().label('Category Image')
      }
    }
  },
  handler: addCategory
};
