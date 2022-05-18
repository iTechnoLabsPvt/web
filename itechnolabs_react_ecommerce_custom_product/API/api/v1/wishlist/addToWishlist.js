import Joi from 'joi';
import { addToWishlist } from '../../../controllers/wishlist';

export default {
  method: 'POST',
  path: '/api/v1/wishlist/add',
  config: {
    auth: 'jwt',
    description: 'Api service used to add product in wishlist.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Product Id</b>: Should have valid product id.',
    tags: ['api', 'wishlist'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        product_id: Joi.number()
          .label('Product Id')
          .required()
      }
    }
  },
  handler: addToWishlist
};
