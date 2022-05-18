import Stripe from 'stripe';
const stripe = new Stripe(
  `sk_test_51HdwCiF47RNbxxmQqbFr1NNFH1XUL3UdsEhf1TNyxyuCGZ0KBUwTIQ0T1uzNkMl7XZ2Y9GnbpmJ4Dvfy54EznjwR00z3NwkxzH`
);

import { v4 as uuidv4 } from 'uuid';

export const createStripeCustomer = async (order, token) => {
  // console.log('order ', order);
  // console.log('token ', token);
  const idempontencyKey = uuidv4();

  // return stripe.customers
  // .create({
  //   email: token.email,
  //   source: token.id
  // })
  // .then(customer => {
  //   stripe.charges.create(
  //     {
  //       amount: order.order_amount,
  //       currency: 'inr',
  //       customer: customer.id,
  //       receipt_email: token.email,
  //       description: `Payment of order`,
  //       shipping: {
  //         name: token.card.name,
  //         address: {
  //           country: token.card.address_country
  //         }
  //       }
  //     },
  //     { idempontencyKey }
  //   );
  // })
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
      name: 'Gautam Sharma',
      address: {
        line1: 'TC 9/4 Old MES colony',
        postal_code: '110092',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India'
      }
    })
    .then(customer => {
      return stripe.charges.create({
        amount: 7000, // Charing Rs 25
        description: 'Web Development Product',
        currency: 'USD',
        customer: customer.id
      });
    })
    .then(charge => {
      console.log('charge => ', charge);
      return charge; // If no error occurs
    })
    .catch(err => {
      console.log('err => ', err);
      return err; // If some error occurs
    });
  // .then(result => {
  //   console.log('result => ', result);
  // })
  // .catch(err => console.log(err));
};
