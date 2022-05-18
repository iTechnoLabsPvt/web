import Joi from 'joi';
import { addOption } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/add-option',
  config: {
    auth: 'jwt',
    description: 'Api to add the option.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        title: Joi.string()
          .label('option title')
          .required()
      }
    }
  },
  handler: addOption
};
