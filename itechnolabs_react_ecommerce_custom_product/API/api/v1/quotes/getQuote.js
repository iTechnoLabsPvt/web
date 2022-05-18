import Joi from 'joi';
import { getQuote } from '../../../controllers/quotes';

export default {
  method: 'POST',
  path: '/api/v1/faq/get-quote',
  config: {
    auth: false,
    description: 'Api service used for get quote.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b> Product price</b>: Should have provide product price.<br/>&bull;<b> quantity</b>: Should have provide quantity.<br/>&bull;<b> color</b>: Should provide the number of color.<br/>&bull;<b> zipcode </b>: Please provide zipcode.<br/>&bull;<b> country </b>: Please provide country name.<br/>&bull;<b> Flag </b>: Please provide flag value and flag should have Print or Embroidery.<br/>&bull;',
    tags: ['api', 'quote'],
    validate: {
      payload: {
        price: Joi.string()
          .required()
          .label('Product price'),
        quantity: Joi.number()
          .required()
          .label('Item Quantity'),
        // printLocation: Joi.number()
        //   .required()
        //   .label('Print Location'),
        no_of_color: Joi.number()
          .required()
          .label('Colour'),
        zipcode: Joi.string()
          .optional()
          .allow('')
          .label('Zipcode'),
        country: Joi.string()
          .optional()
          .allow('')
          .label('country'),
        flag: Joi.string()
          .valid('Print', 'Embroidery')
          .label('Flag')
          .required()
      }
    }
  },
  handler: getQuote
};
