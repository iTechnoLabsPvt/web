import Joi from 'joi';
import { editOption } from '../../../controllers/admin';

export default {
  method: 'PUT',
  path: '/api/v1/admin/edit-option',
  config: {
    auth: 'jwt',
    description: 'Api to edit the Option.',
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
          .label('Option Id')
          .required(),
        title: Joi.string()
          .trim()
          .label('Title')
          .required()
      }
    }
  },
  handler: editOption
};
