import { getHelp } from '../../../controllers/anyonehelp';

export default {
  method: 'GET',
  path: '/api/v1/help/get',
  config: {
    auth: false,
    description: 'Api service used to get help.',
    notes: 'No Payload required',
    tags: ['api', 'help'],
    validate: {}
  },
  handler: getHelp
};
