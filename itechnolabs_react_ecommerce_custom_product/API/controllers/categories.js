/* -----------------------------------------------------------------------
   * @ description : This is the categories controller layer.
----------------------------------------------------------------------- */

import { getAllCategories } from '../services/categories';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const getCategories = async (request, h) => {
  try {
    const data = await getAllCategories();
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Categories **');
    failAction(error.message);
  }
};
