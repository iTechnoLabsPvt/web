import Joi from 'joi';
import { updatePage } from '../../../controllers/admin';

export default {
  method: 'PUT',
  path: '/api/v1/admin/update-page',
  config: {
    auth: 'jwt',
    description: 'Api to update the page.',
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
          .label('Page Id')
          .required(),
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
  handler: updatePage
};
