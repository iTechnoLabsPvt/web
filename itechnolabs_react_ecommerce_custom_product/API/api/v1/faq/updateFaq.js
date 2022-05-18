import Joi from 'joi';
import { updateFaq } from '../../../controllers/faqs';

export default {
  method: 'POST',
  path: '/api/v1/faq/update-faq',
  config: {
    auth: false,
    description: 'Api service used for update faq.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Id</b>: Should have valid faq id.<br/>&bull;<b> Faq Question</b>: Please provide a faq question.<br/>&bull;<b> Faq Answer</b>: Please provide answer.<br/>&bull;',
    tags: ['api', 'faq'],
    validate: {
      payload: {
        id: Joi.number()
          .required()
          .label('User ID'),
        question: Joi.string()
          .required()
          .label('Faq question'),
        answer: Joi.string()
          .required()
          .label('Faq Answer')
      }
    }
  },
  handler: updateFaq
};
