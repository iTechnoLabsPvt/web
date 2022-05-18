import Joi from 'joi';
import { resetPassword } from '../../../controllers/user';

export default {
  method: 'PUT',
  path: '/api/v1/user/reset-password',
  config: {
    auth: 'jwt',
    description: 'Api service used to reset password.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Password</b>: Password entered at the time of registration. <br/>&bull;<b> Confirm Password</b>:Confirm Password entered at the time of registration.',
    tags: ['api', 'user'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
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
          .label('New Password')
          .required(),

        confirm_password: Joi.string()
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
          .label('Confirm Password')
          .required()
      }
    }
  },
  handler: resetPassword
};
