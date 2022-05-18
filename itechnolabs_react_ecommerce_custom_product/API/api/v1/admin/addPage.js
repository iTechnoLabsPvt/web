import Joi from 'joi';
import { addPage } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/add-page',
  config: {
    auth: 'jwt',
    description: 'Api to add the page.',
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
          .label('Page Title')
          .required(),
        description: Joi.string()
          .trim()
          .label('Description')
          .required()
      }
    }
  },
  handler: addPage
};
