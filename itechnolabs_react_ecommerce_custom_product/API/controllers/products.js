/* -----------------------------------------------------------------------
   * @ description : This is the products controller layer.
----------------------------------------------------------------------- */

import {
  getAllProducts,
  getProductDetailService,
  getSimilarProductsService,
  getProductInfoByStyleColorSizeService,
  editProductDetailService,
  checkProductDetailService,
  getProductByColorSizeStyleFromDBService,
  testImages
} from '../services/products';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const getProducts = async (request, h) => {
  try {
    const { query } = request;
    const data = await getAllProducts(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Products **');
    failAction(error.message);
  }
};

export const getProductDetail = async (request, h) => {
  try {
    const { query } = request;
    const data = await getProductDetailService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Product Detail **');
    failAction(error.message);
  }
};

export const getSimilarProducts = async (request, h) => {
  try {
    const { payload } = request;
    const data = await getSimilarProductsService(payload);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Similar Products **');
    failAction(error.message);
  }
};

export const getProductInfoByStyleColorSize = async (request, h) => {
  try {
    const { query } = request;
    const data = await getProductInfoByStyleColorSizeService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Product Detail by Style color size **');
    failAction(error.message);
  }
};

export const testImage = async (request, h) => {
  try {
    console.log('ww');
    var payload = request.payload;
    const data = await testImages(payload);
    // console.log(data);
    console.log('hello');
    var res = {};
    res.data = data;
    res.ela_area = payload.ela_area;
    res.color = payload.color;
    return successAction(res, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Product Detail by Style color size **');
    failAction(error.message);
  }
};

export const editProductDetail = async (request, h) => {
  try {
    const { query } = request;
    const data = await editProductDetailService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** edit Product Detail **');
    failAction(error.message);
  }
};

export const checkProductDetail = async (request, h) => {
  try {
    const { payload } = request;
    const data = await checkProductDetailService(payload);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** check Product Detail **');
    failAction(error.message);
  }
};

export const getProductByColorSizeStyleFromDB = async (request, h) => {
  try {
    const { query } = request;

    const data = await getProductByColorSizeStyleFromDBService(query);
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Product Detail by Style color size from local **');
    failAction(error.message);
  }
};
