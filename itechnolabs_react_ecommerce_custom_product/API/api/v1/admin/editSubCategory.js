import Joi from 'joi';
import { editSubCategory } from '../../../controllers/admin';

export default {
  method: 'PUT',
  path: '/api/v1/admin/edit-sub-category',
  config: {
    auth: 'jwt',
    description: 'Api to edit the subcategory.',
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
        subcategory_id: Joi.number()
          .label('Subcategory Id')
          .required(),

        category_name: Joi.string()
          .trim()
          .label('Subcategory Name')
          .required()
      }
    }
  },
  handler: editSubCategory
};
