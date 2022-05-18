/* -----------------------------------------------------------------------
   * @ description : This is the categories controller layer.
----------------------------------------------------------------------- */

import { getAllHelp } from '../services/anyonehelp';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const getHelp = async (request, h) => {
  try {
    const data = await getAllHelp();
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Help **');
    failAction(error.message);
  }
};
