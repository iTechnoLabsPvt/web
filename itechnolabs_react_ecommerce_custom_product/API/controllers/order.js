/* -----------------------------------------------------------------------
   * @ description : This is the order controller layer.
----------------------------------------------------------------------- */

import {
  createOrderService,
  getOrderRatingService,
  getShipmentNumberService,
  getOrderListService,
  getOrderItemsService,
  getOrderDetailService,
  getAllOrderListService
} from '../services/order';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const createOrder = async (request, h) => {
  try {
    const { payload } = request;
    const data = await createOrderService(payload);
    return successAction(data, Messages.orderPlace);
  } catch (error) {
    logger.error(error, '** create order **');
    failAction(error.message);
  }
};

export const getOrderRating = async (request, h) => {
  try {
    const { payload } = request;
    const data = await getOrderRatingService(payload);
    return successAction(data, Messages.shipmentInfo);
  } catch (error) {
    logger.error(error, '** get order rating **');
    failAction(error.message);
  }
};

export const getShipmentNumber = async (request, h) => {
  try {
    const { payload } = request;
    const data = await getShipmentNumberService(payload);
    return successAction(data);
  } catch (error) {
    logger.error(error, '** get shipment details **');
    failAction(error.message);
  }
};

export const getOrderList = async (request, h) => {
  try {
    const { query } = request;
    const data = await getOrderListService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get order list **');
    failAction(error.message);
  }
};

export const getAllOrderList = async (request, h) => {
  try {
    // const { query } = request;
    const data = await getAllOrderListService();
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get order list **');
    failAction(error.message);
  }
};

export const getOrderItems = async (request, h) => {
  try {
    const { query } = request;
    const data = await getOrderItemsService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get order items **');
    failAction(error.message);
  }
};

export const getOrderDetail = async (request, h) => {
  try {
    const { query } = request;
    const data = await getOrderDetailService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get order items **');
    failAction(error.message);
  }
};
