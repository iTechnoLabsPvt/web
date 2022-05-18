/* -----------------------------------------------------------------------
   * @ description : This is the mockup controller layer.
----------------------------------------------------------------------- */

import {
  sendMockupEmail,
  addToMockupService,
  removeMockupService,
  getMockupsService
} from '../services/mockup';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const mockupEmail = async (request, h) => {
  try {
    const { payload } = request;
    const data = await sendMockupEmail(payload);
    return successAction(data, Messages.shareMockUpSuccessfull);
  } catch (error) {
    logger.error(error, '** share design **');
    failAction(error.message);
  }
};

export const addToMockup = async (request, h) => {
  try {
    const {
      payload,
      auth: {
        credentials: { user }
      }
    } = request;
    const data = await addToMockupService(payload, user);
    return successAction(data, Messages.ItemAddedToMockup);
  } catch (error) {
    logger.error(error, '** Add to Mockup **');
    failAction(error.message);
  }
};

export const removeMockup = async (request, h) => {
  try {
    const { payload } = request;
    const data = await removeMockupService(payload);
    return successAction(data, Messages.ItemRemovedFromMockup);
  } catch (error) {
    logger.error(error, '** Remove Mockup **');
    failAction(error.message);
  }
};

export const getMockups = async (request, h) => {
  try {
    const {
      auth: {
        credentials: { user }
      }
    } = request;
    const data = await getMockupsService(user);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Mockups **');
    failAction(error.message);
  }
};
