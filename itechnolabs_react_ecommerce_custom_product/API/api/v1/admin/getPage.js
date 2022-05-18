import Joi from 'joi';
import { getPages } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/get-page',
  config: {
    auth: 'jwt',
    description: 'Api to get the page.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        page_id: Joi.number()
          .label('Page ID')
          .required()
      }
    }
  },
  handler: getPages
};
