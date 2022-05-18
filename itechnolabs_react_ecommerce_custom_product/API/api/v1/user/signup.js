import Joi from 'joi';
import { signup } from '../../../controllers/user';

export default {
  method: 'POST',
  path: '/api/v1/user/register',
  config: {
    auth: false,
    description: 'Api service used to signup user.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Name</b>: Should have valid name.<br/>&bull;<b> Company Name</b>: Should have valid company name.<br/>&bull;<b> Email</b>: Should have email.<br/>&bull;<b> Role</b>: Should have role - coming as user - 0(user), 1(Admin)<br/>&bull;<b> Password</b>: Password entered at the time of registration.',
    tags: ['api', 'user'],
    validate: {
      payload: {
        name: Joi.string()
          .required()
          .label('Name'),
        company_name: Joi.string()
          .required()
          .label('Company Name'),
        email: Joi.string()
          .email()
          .lowercase()
          .required()
          .label('Email'),
        password: Joi.string()
          .trim()
          .regex(/^([a-zA-Z0-9()@:%_\+.~#?&\/=_-]){6,15}$/)
          .options({
            language: {
              string: {
                regex: {
                  base: 'must be with 6 and 15 as min & max characters and no space respectively'
                }
              }
            }
          })
          .required()
          .label('Password'),
        role: Joi.string()
          .required()
          .valid('0', '1', '2', '3') //1(login with email), 2(login through facebook), 3(login through twitter), 3(login as admin)
          .label('Role')
        // facebook_id: Joi.string()
        // .optional()
        // .label('Facebook Id'),
        // twitter_id: Joi.string()
        // .optional()
        // .label('Twitter Id'),
      }
    }
  },
  handler: signup
};
