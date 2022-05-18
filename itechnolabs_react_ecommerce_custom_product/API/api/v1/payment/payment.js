import Joi from 'joi';
import { makePayment } from '../../../controllers/payment';

export default {
  method: 'POST',
  path: '/api/v1/payment/make-payment',
  config: {
    auth: false,
    description: 'Api service used for payment.',
    notes:
      '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b>Order Id</b>: Should have valid order id.<br/>&bull;<b>Id</b>: Should have valid payment id.<br/>&bull;<b> Object</b>: Should have token.<br/>&bull;<b>Client IP</b>: Should have valid Client Ip Address.<br/>&bull;<b> Created </b>: Should have valid time stamp.<br/>&bull;<b> Card</b>: Should have a object with all card details.',
    tags: ['api', 'payment'],
    validate: {}
  },
  handler: makePayment
};

// import Joi from 'joi';
// import { makePayment } from '../../../controllers/payment';

// export default {
//   method: 'POST',
//   path: '/api/v1/payment/make-payment',
//   config: {
//     auth: false,
//     description: 'Api service used for payment.',
//     notes:
//       '<br/>The request object should contain following fields in its <b>Payload/Body</b> object<br/>&bull;<b>Order Id</b>: Should have valid order id.<br/>&bull;<b>Id</b>: Should have valid payment id.<br/>&bull;<b> Object</b>: Should have token.<br/>&bull;<b>Client IP</b>: Should have valid Client Ip Address.<br/>&bull;<b> Created </b>: Should have valid time stamp.<br/>&bull;<b> Card</b>: Should have a object with all card details.',
//     tags: ['api', 'payment'],
//     validate: {
//       payload: {
//         order_id: Joi.string()
//           .required()
//           .label('Order Id'),
//         product_id: Joi.string()
//           .required()
//           .label('Product Id'),
//         id: Joi.string()
//           .required()
//           .label('Payment Id'),
//         object: Joi.string()
//           .required()
//           .label('token'),
//         client_ip: Joi.string()
//           .required()
//           .label('client_ip'),
//         created: Joi.number()
//           .required()
//           .label('created'),
//         email: Joi.string()
//           .required()
//           .label('email'),
//         livemode: Joi.boolean()
//           .required()
//           .label('livemode'),
//         order_amount: Joi.string()
//           .required()
//           .label('Order Amount'),
//         type: Joi.string()
//           .required()
//           .label('payment type'),
//         used: Joi.boolean()
//           .required()
//           .label('Used'),
//         card: Joi.object({
//           address_city: Joi.string()
//             .allow(null)
//             .label('address_city'),
//           address_country: Joi.string()
//             .allow(null)
//             .label('address_city'),
//           address_line1: Joi.string()
//             .allow(null)
//             .label('address_line1'),
//           address_line1_check: Joi.string()
//             .allow(null)
//             .label('address_line1_check'),
//           address_line2: Joi.string()
//             .allow(null)
//             .label('address_line2'),
//           address_state: Joi.string()
//             .allow(null)
//             .label('address_state'),
//           address_zip: Joi.string()
//             .allow(null)
//             .label('address_zip'),
//           address_zip_check: Joi.string()
//             .allow(null)
//             .label('address_zip_check'),
//           brand: Joi.string()
//             .allow(null)
//             .label('brand'),
//           country: Joi.string()
//             .allow(null)
//             .label('country'),
//           cvc_check: Joi.string()
//             .allow(null)
//             .label('cvc_check'),
//           dynamic_last4: Joi.string()
//             .allow(null)
//             .label('dynamic_last4'),
//           exp_month: Joi.number()
//             .allow(null)
//             .label('exp_month'),
//           exp_year: Joi.number()
//             .allow(null)
//             .label('exp_year'),
//           funding: Joi.string()
//             .allow(null)
//             .label('funding'),
//           id: Joi.string()
//             .allow(null)
//             .label('id'),
//           last4: Joi.string()
//             .allow(null)
//             .label('last4'),
//           name: Joi.string()
//             .allow(null)
//             .label('name'),
//           object: Joi.string()
//             .allow(null)
//             .label('object'),
//           tokenization_method: Joi.string()
//             .allow(null)
//             .label('tokenization_method')
//         })
//       }
//     }
//   },
//   handler: makePayment
// };
