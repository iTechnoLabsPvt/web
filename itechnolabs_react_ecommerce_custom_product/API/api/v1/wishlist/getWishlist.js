import Joi from 'joi';
import { getWishlist } from '../../../controllers/wishlist';

export default {
  method: 'GET',
  path: '/api/v1/wishlist/get',
  config: {
    auth: 'jwt',
    description: 'Api service used to get user wishlist.',
    notes: 'No Payload required',
    tags: ['api', 'wishlist'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true })
    }
  },
  handler: getWishlist
};
