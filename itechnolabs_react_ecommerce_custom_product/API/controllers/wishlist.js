/* -----------------------------------------------------------------------
   * @ description : This is the wishlist controller layer.
----------------------------------------------------------------------- */

import {
  addWishlistService,
  removeWishlistService,
  getWishlistService
} from '../services/wishlist';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const addToWishlist = async (request, h) => {
  try {
    const {
      payload,
      auth: {
        credentials: { user }
      }
    } = request;
    const data = await addWishlistService(payload, user);
    return successAction(data, Messages.ItemAddedToWishlist);
  } catch (error) {
    logger.error(error, '** Add to Wishlist **');
    failAction(error.message);
  }
};

export const removeWishlist = async (request, h) => {
  try {
    const { payload } = request;
    const data = await removeWishlistService(payload);
    return successAction(data, Messages.ItemRemovedFromCart);
  } catch (error) {
    logger.error(error, '** Remove Wishlist **');
    failAction(error.message);
  }
};

export const getWishlist = async (request, h) => {
  try {
    const {
      auth: {
        credentials: { user }
      }
    } = request;
    const data = await getWishlistService(user);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Wishlist **');
    failAction(error.message);
  }
};
