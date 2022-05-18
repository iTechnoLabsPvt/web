import Joi from 'joi';
import { getMockups } from '../../../controllers/mockup';

export default {
  method: 'GET',
  path: '/api/v1/mockup/get',
  config: {
    auth: 'jwt',
    description: 'Api service used to get user mockups.',
    notes: 'No Payload required',
    tags: ['api', 'mockup'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true })
    }
  },
  handler: getMockups
};
