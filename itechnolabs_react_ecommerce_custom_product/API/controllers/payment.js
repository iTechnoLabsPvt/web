/* -----------------------------------------------------------------------
   * @ description : This is the payment controller layer.
----------------------------------------------------------------------- */

import { makePaymentService } from '../services/payment';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const makePayment = async (request, h) => {
  try {
    const { payload } = request;
    const data = await makePaymentService(payload);
    return successAction(data);
  } catch (error) {
    logger.error(error, '** make payment **');
    failAction(error.message);
  }
};
