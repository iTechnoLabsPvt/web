import { getLiveFeedsFromInstagram } from '../../../controllers/user';

export default {
  method: 'GET',
  path: '/api/v1/user/posts/get',
  config: {
    auth: false,
    description: 'Api service used to get recent posts from instagram.',
    notes: 'No Payload required',
    tags: ['api', 'user'],
    validate: {}
  },
  handler: getLiveFeedsFromInstagram
};
