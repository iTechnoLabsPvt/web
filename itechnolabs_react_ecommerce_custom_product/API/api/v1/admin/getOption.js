import Joi from 'joi';
import { getOption } from '../../../controllers/admin';

export default {
  method: 'GET',
  path: '/api/v1/admin/all-options',
  config: {
    auth: 'jwt',
    description: 'Api to get all options.',
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
  handler: getOption
};
