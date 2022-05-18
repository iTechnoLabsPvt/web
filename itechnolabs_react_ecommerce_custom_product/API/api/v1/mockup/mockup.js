import Joi from 'joi';
import { mockupEmail } from '../../../controllers/mockup';

export default {
  method: 'POST',
  path: '/api/v1/mockup/send-mockup-email',
  config: {
    auth: false,
    description: 'Api service used for send pdf file on user email.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b>Email </b>: Should have a valid email.<br/>&bull;<b>Mockups Id</b>: Should have array of Mockups id.<br/>&bull;<b>Product Id</b>: Should have of product id.<br/>&bull;<b>Product description</b>: Product description is optinal.<br/>&bull;<b>Specs</b>: Specs is optinal.<br/>&bull;<b>sizes_quantity</b>: Size quantity object.<br/>&bull;<b>Production time</b>: Should have production time. <br/>&bull;<b>Price</b>: Should have price details of custmize object. <br/>&bull;<b> loggedIn</b>: Should have loggedIn value in true/false.',
    tags: ['api', 'mockup'],
    validate: {
      payload: {
        product_id: Joi.string()
          .optional()
          .allow('')
          .label('Product ID '),
        loggedIn: Joi.boolean()
          .required()
          .label('loggedIn '),
        email: Joi.string()
          .required()
          .label('Email Address'),
        product_desc: Joi.boolean().label('Product description'),
        spec: Joi.boolean().label('Specsfication'),
        sizes_quantity: Joi.boolean().label('Size quantity'),
        size_to_buy: Joi.array()
          .optional()
          .allow([])
          .label('Size quantity object'),
        production_time: Joi.boolean().label('Production time'),
        production_time_: Joi.string()
          .optional()
          .allow('')
          .label('Production time string'),
        price: Joi.boolean().label('Price'),
        mockup_ids: Joi.array()
          .optional()
          .allow([])
          .label('mockup Id'),
        item_price: Joi.string()
          .optional()
          .label('Item price'),
        total_price: Joi.string()
          .optional()
          .label('Total price'),
        customized_product_details: Joi.object()
          .optional()
          .label('custmize image object')
      }
    }
  },
  handler: mockupEmail
};
