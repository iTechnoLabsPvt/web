import { join } from 'bluebird';
import Joi from 'joi';
import { deleteOption } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/delete-option',
  config: {
    auth: 'jwt',
    description: 'Api to delete the option.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        id: Joi.number()
          .label('Id')
          .required()
      }
    }
  },
  handler: deleteOption
};
