/* -----------------------------------------------------------------------
   * @ description : This is the cart controller layer.
----------------------------------------------------------------------- */

import {
  addCartService,
  removeCartService,
  getCartService,
  updateCartService,
  reorderAddCartService
} from '../services/cart';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const addCart = async (request, h) => {
  try {
    const { payload } = request;
    const data = await addCartService(payload);
    return successAction(
      data,
      payload.type == 1 ? Messages.ItemAddedToCart : Messages.ItemAddedToSaveForLater
    );
  } catch (error) {
    logger.error(error, '** Add Cart **');
    failAction(error.message);
  }
};

export const removeCart = async (request, h) => {
  try {
    const { payload } = request;
    const data = await removeCartService(payload);
    return successAction(
      data,
      payload.type == 1 ? Messages.ItemRemovedFromCart : Messages.ItemRemovedFromSaveForLater
    );
  } catch (error) {
    logger.error(error, '** Remove Cart **');
    failAction(error.message);
  }
};

export const getCart = async (request, h) => {
  try {
    const { query } = request;
    const data = await getCartService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Cart **');
    failAction(error.message);
  }
};

export const updateCart = async (request, h) => {
  try {
    const { payload } = request;
    const data = await updateCartService(payload);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Update Cart **');
    failAction(error.message);
  }
};

export const reorderAddCart = async (request, h) => {
  try {
    const { payload } = request;
    const data = await reorderAddCartService(payload);
    return successAction(data, Messages.ItemAddedToCart);
  } catch (error) {
    logger.error(error, '** Reorder Add Cart **');
    failAction(error.message);
  }
};
