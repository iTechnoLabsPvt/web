import Joi from 'joi';
import { getOrderRating } from '../../../controllers/order';

export default {
  method: 'POST',
  path: '/api/v1/order/get-order-rating',
  config: {
    auth: false,
    description: 'Api service used for get order rating.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b>first_name </b>: Please provide your first name.<br/>&bull;<b>last_name </b>: Please provide your last name.<br/>&bull;<b>email </b>: Should provide valid email.<br/>&bull;<b>address_line </b>: Please provide street address.<br/>&bull;<b>city </b>: Please provide address city.<br/>&bull;<b>state_province_code </b>: Please provide state provide code.<br/>&bull;<b>postal_code </b>: Please provide postal code.<br/>&bull;<b>country_code </b>: Please provide country code.<br/>&bull;<b>telephone </b>: Please provide telephone number.<br/>&bull;',
    tags: ['api', 'order'],
    validate: {
      payload: {
        first_name: Joi.string()
          .required()
          .label('First Name'),
        last_name: Joi.string()
          .required()
          .label('Last Name'),
        email: Joi.string()
          .required()
          .label('Email'),
        address_line: Joi.string()
          .required()
          .label('Address Line'),
        city: Joi.string()
          .required()
          .label('City'),
        state_province_code: Joi.string()
          .required()
          .label('State Province Code'),
        postal_code: Joi.string()
          .required()
          .label('Postal Code'),
        country_code: Joi.string()
          .required()
          .label('Country Code'),
        telephone: Joi.string()
          .required()
          .label('Telephone Number'),
        total_weight: Joi.string()
          .required()
          .label('Total weight')
      }
    }
  },
  handler: getOrderRating
};
