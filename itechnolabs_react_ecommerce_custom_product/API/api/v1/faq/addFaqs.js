import Joi from 'joi';
import { addFaq } from '../../../controllers/faqs';

export default {
  method: 'POST',
  path: '/api/v1/faq/add-faq',
  config: {
    auth: false,
    description: 'Api service used for add faq.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> User Id</b>: Should have valid user id.<br/>&bull;<b> Role</b>: Please enter the role<br/>&bull;<b> Faq Question</b>: Please provide a faq question.<br/>&bull;<b> Faq Answer</b>: Please provide answer.<br/>&bull;',
    tags: ['api', 'faq'],
    validate: {
      payload: {
        user_id: Joi.number()
          .required()
          .label('User ID'),
        role: Joi.number()
          .required()
          .label('Role'),
        question: Joi.string()
          .required()
          .label('Faq question'),
        answer: Joi.string()
          .required()
          .label('Faq Answer')
      }
    }
  },
  handler: addFaq
};
