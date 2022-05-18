import Joi from 'joi';
import { removeWishlist } from '../../../controllers/wishlist';

export default {
  method: 'PUT',
  path: '/api/v1/wishlist/remove',
  config: {
    auth: 'jwt',
    description: 'Api service used to remove item from wishlist.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> objectbr/>&bull;<b> Wishlist Id</b>: Should have valid Wishlist id.',
    tags: ['api', 'wishlist'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        _id: Joi.number()
          .label('Wishlist Id')
          .required()
      }
    }
  },
  handler: removeWishlist
};
