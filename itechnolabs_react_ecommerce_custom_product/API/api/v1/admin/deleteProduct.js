import { join } from 'bluebird';
import Joi from 'joi';
import { deleteProduct } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/delete-product',
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
        style: Joi.number()
          .label('Style Id')
          .required(),
        type: Joi.string()
          .label('type')
          .required()
      }
    }
  },
  handler: deleteProduct
};
