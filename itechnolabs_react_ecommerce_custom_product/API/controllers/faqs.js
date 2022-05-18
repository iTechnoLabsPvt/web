/* -----------------------------------------------------------------------
   * @ description : This is the Faqs controller layer.
----------------------------------------------------------------------- */

import { addFaqService, updateFaqService } from '../services/faqs';
import { failAction, successAction } from '../utilities/rest';
import logger from '../utilities/logger';

export const addFaq = async (request, h) => {
  try {
    const { payload } = request;
    const data = await addFaqService(payload);
    return successAction(data);
  } catch (error) {
    logger.error(error, '** add faq **');
    failAction(error.message);
  }
};

export const updateFaq = async (request, h) => {
  try {
    const { payload } = request;
    const data = await updateFaqService(payload);
    return successAction(data);
  } catch (error) {
    logger.error(error, '** update faq **');
    failAction(error.message);
  }
};
