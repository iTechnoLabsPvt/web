import Joi from 'joi';
import { editProductDetail } from '../../../controllers/products';

export default {
  method: 'GET',
  path: '/api/v1/products/edit-detail',
  config: {
    auth: false,
    description: 'Api service used to edit product detail.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b> Id</b>: Should have valid id.<br/>&bull;<b> flag </b>: Flag have cart or mockup',
    tags: ['api', 'products'],
    validate: {
      query: {
        id: Joi.string()
          .trim()
          .label('Id')
          .required(),
        flag: Joi.string()
          .valid('cart', 'mockup')
          .label('Flag')
          .required()
      }
    }
  },
  handler: editProductDetail
};
