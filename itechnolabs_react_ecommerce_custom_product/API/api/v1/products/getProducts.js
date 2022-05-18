import Joi from 'joi';
import { getProducts } from '../../../controllers/products';

export default {
  method: 'GET',
  path: '/api/v1/products/get',
  config: {
    auth: false,
    description: 'Api service used to get products.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull; <b>Category</b>: Should carry the category field. This is a optional field.<br/>&bull; <b>Sub Category</b>: Should carry the sub category field. This is a optional field.<br/>&bull;<b> Type </b>: Should carry type field. This is optional field.<br/>&bull;<b> Offset </b>: Should carry offset field. This is optional field.',
    tags: ['api', 'products'],
    validate: {
      query: {
        category: Joi.string()
          .trim()
          .label('Category')
          .empty('')
          .optional(),
        sub_category: Joi.string()
          .trim()
          .label('Sub Category')
          .empty('')
          .optional(),
        type: Joi.number()
          .label('Type')
          .optional(), //type - 1 for product page category wise
        offset: Joi.number()
          .label('Offset')
          .optional(),
        Asc: Joi.number()
          .label('Asc')
          .optional(),
        Desc: Joi.number()
          .label('Desc')
          .optional(),
        highP: Joi.number()
          .label('highP')
          .optional(),
        lowP: Joi.number()
          .label('lowP')
          .optional()
      }
    }
  },
  handler: getProducts
};
