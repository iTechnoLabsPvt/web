/* -----------------------------------------------------------------------
   * @ description : This is the Quotes controller layer.
----------------------------------------------------------------------- */

import { getQuoteService } from '../services/quotes';
import { failAction, successAction } from '../utilities/rest';
import logger from '../utilities/logger';

export const getQuote = async (request, h) => {
  try {
    const { payload } = request;
    const data = await getQuoteService(payload);
    return successAction(data);
  } catch (error) {
    logger.error(error, '** get Quotes **');
    failAction(error.message);
  }
};
