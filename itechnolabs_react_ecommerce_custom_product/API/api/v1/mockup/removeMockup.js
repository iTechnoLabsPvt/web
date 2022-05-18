import Joi from 'joi';
import { removeMockup } from '../../../controllers/mockup';

export default {
  method: 'PUT',
  path: '/api/v1/mockup/remove',
  config: {
    auth: 'jwt',
    description: 'Api service used to remove item from wishlist.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> objectbr/>&bull;<b> Mockup Id</b>: Should have valid mockup id.',
    tags: ['api', 'mockup'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        _id: Joi.number()
          .label('Mockup Id')
          .required()
      }
    }
  },
  handler: removeMockup
};
