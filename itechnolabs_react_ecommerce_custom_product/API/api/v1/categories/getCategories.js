import Joi from 'joi';
import { getCategories } from '../../../controllers/categories';

export default {
  method: 'GET',
  path: '/api/v1/categories/get',
  config: {
    auth: false,
    description: 'Api service used to get categories.',
    notes: 'No Payload required',
    tags: ['api', 'categories'],
    validate: {}
  },
  handler: getCategories
};
