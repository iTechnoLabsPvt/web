import Joi from 'joi';
import { loginAdmin } from '../../../controllers/user';

export default {
  method: 'POST',
  path: '/api/v1/admin/login',
  config: {
    auth: false,
    description: 'Api service used to login admin.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Email</b>: Should have email.<br/>&bull;<b> Password</b>: Password entered at the time of registration.<br/>&bull;<b> Role</b>: Should have role - coming as user - 0(user), 1(Admin)',
    tags: ['api', 'admin'],
    validate: {
      payload: {
        email: Joi.string()
          .email()
          .lowercase()
          .required()
          .label('Email'),
        password: Joi.string()
          .required()
          .label('Password'),
        role: Joi.string()
          .required()
          .valid('0', '1', '2', '3') //0(login with email), 1(login through facebook), 2(login through twitter), 3(login as admin)
          .label('Role')
      }
    }
  },
  handler: loginAdmin
};
