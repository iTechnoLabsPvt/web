/* -----------------------------------------------------------------------
   * @ description : This is the payment service layer.
----------------------------------------------------------------------- */
import Stripe from 'stripe';
const stripe = new Stripe(
  `sk_test_51He5EMLnoh1c2p0MPwaNLiNtbgu4Ml1xKGqy1gTgKLGYM69SijxKTKjr2GgCHWVcvn1mZU5XlDPjJ1Pr68DBtBSF006j2atezh`
);
import { Order } from '../mysqlDb';
import { createStripeCustomer } from '../utilities/stripe';

export const makePaymentService = async payload => {
  console.log('\n\n\n\n ===========makePaymentService payload==============', payload);
  try {
    const charge = await stripe.charges.create({
      amount: payload.order_amount * 100,
      currency: payload.currency,
      source: payload.source,
      description: payload.description,
      metadata: {
        oreder_id: payload.order_id
      },
      capture: true
    });
    return charge.status;
  } catch (err) {
    throw new Error(err.message);
  }
};
