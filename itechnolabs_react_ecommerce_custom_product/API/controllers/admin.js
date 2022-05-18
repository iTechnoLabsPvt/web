/* -----------------------------------------------------------------------
   * @ description : This is the user controller layer.
----------------------------------------------------------------------- */

import {
  allProducts,
  allcategories,
  allSubCategories,
  updateCategory,
  allOrders,
  orderDetail,
  allPayments,
  addPages,
  getPage,
  updatePages,
  getUserProfile,
  addProducts,
  getProductDetail,
  UpdateProducts,
  addCategories,
  addSubCategories,
  updateSubCategory,
  deleteCategories,
  deleteProducts,
  confirmOrder,
  addOptions,
  allOptions,
  deleteOptions,
  updateOptions
} from '../services/admin';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

/* Getting product listing */

export const products = async (request, h) => {
  const { query } = request;
  try {
    const data = await allProducts(query);
    return successAction(data, Messages.fetchedProducts);
  } catch (error) {
    logger.error(error, '** all products **');
    failAction(error.message);
  }
};

/* get product detail */
export const productDetail = async (request, h) => {
  const { query } = request;
  try {
    const data = await getProductDetail(query);

    return successAction(data, Messages.fetchedProducts);
  } catch (error) {
    logger.error(error, '** all products **');
    failAction(error.message);
  }
};

// for confirm order
export const orderConfirm = async (request, h) => {
  const { query } = request;
  try {
    const data = await confirmOrder(query);

    return successAction(data, Messages.fetchedProducts);
  } catch (error) {
    logger.error(error, '** all products **');
    failAction(error.message);
  }
};

/* Getting categories listing */

export const categories = async (request, h) => {
  const { payload } = request;
  try {
    const data = await allcategories(payload);
    return successAction(data, Messages.fetchedCategories);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* Getting subCategories listing */

export const subCategories = async (request, h) => {
  const { query } = request;
  try {
    const data = await allSubCategories(query);
    return successAction(data, Messages.fetchedCategories);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* Function to edit category */

export const editCategory = async (request, h) => {
  const { payload } = request;
  try {
    const data = await updateCategory(payload);
    return successAction(data, Messages.editCategory);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* Function to edit sub category */

export const editSubCategory = async (request, h) => {
  const { payload } = request;

  try {
    const data = await updateSubCategory(payload);
    return successAction(data, Messages.editCategory);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* function to get all orders  */

export const allOrder = async (request, h) => {
  const { query } = request;
  try {
    const data = await allOrders(query);
    return successAction(data, Messages.editCategory);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* function to get order detail */
export const getOrder = async (request, h) => {
  const { payload } = request;

  try {
    const data = await orderDetail(payload);
    return successAction(data, Messages.editCategory);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* function to get all payments */

export const Payments = async (request, h) => {
  const { payload } = request;

  try {
    const data = await allPayments(payload);
    return successAction(data, Messages.editCategory);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* Add page */
export const addPage = async (request, h) => {
  const { payload } = request;

  try {
    const data = await addPages(payload);
    return successAction(data, Messages.pageAdded);
  } catch (error) {
    logger.error(error, '** add page **');
    failAction(error.message);
  }
};

/* get page */
export const getPages = async (request, h) => {
  const { payload } = request;

  try {
    const data = await getPage(payload);
    return successAction(data, Messages.pageAll);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};

/* Update page */
export const updatePage = async (request, h) => {
  const { payload } = request;

  try {
    const data = await updatePages(payload);
    return successAction(data, Messages.pageUpdated);
  } catch (error) {
    logger.error(error, '** page updated **');
    failAction(error.message);
  }
};

/* Get user profile */
export const getProfile = async (request, h) => {
  const {
    query,
    auth: {
      credentials: { user }
    }
  } = request;

  try {
    let data = await getUserProfile(query, user);
    return successAction(data, Messages.profileUpdate);
  } catch (error) {
    logger.error(error, '** Update User Profile **');
    failAction(error.message);
  }
};

/* Add Product */

export const addProduct = async (request, h) => {
  const { payload } = request;

  try {
    const data = await addProducts(payload);
    return successAction(data, Messages.pageAdded);
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

export const updateProduct = async (request, h) => {
  const { payload } = request;

  try {
    const data = await UpdateProducts(payload);
    return successAction(data, Messages.pageAdded);
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

/* Add category */

export const addCategory = async (request, h) => {
  const { payload } = request;

  try {
    const data = await addCategories(payload);
    return successAction(data, Messages.pageAdded);
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

export const addSubcategory = async (request, h) => {
  const { payload } = request;

  try {
    const data = await addSubCategories(payload);
    return successAction(data, Messages.pageAdded);
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

export const deleteCategory = async (request, h) => {
  const { payload } = request;

  try {
    const data = await deleteCategories(payload);
    return successAction(data, Messages.pageAdded);
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

export const deleteOption = async (request, h) => {
  const { payload } = request;

  try {
    const data = await deleteOptions(payload);
    return successAction(data, 'option deleted');
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

export const deleteProduct = async (request, h) => {
  const { payload } = request;

  try {
    const data = await deleteProducts(payload);
    return successAction(data, Messages.pageAdded);
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

// add otptions

export const addOption = async (request, h) => {
  const { payload } = request;

  try {
    const data = await addOptions(payload);
    return successAction(data, Messages.optionadd);
  } catch (error) {
    logger.error(error, '** add product **');
    failAction(error.message);
  }
};

// get option

export const getOption = async (request, h) => {
  try {
    const { query } = request;

    const data = await allOptions(query);
    return successAction(data, Messages.fetchedCategories);
  } catch (error) {
    logger.error(error, '** all option **');
    failAction(error.message);
  }
};

export const editOption = async (request, h) => {
  const { payload } = request;
  try {
    const data = await updateOptions(payload);
    return successAction(data, Messages.editCategory);
  } catch (error) {
    logger.error(error, '** all categories **');
    failAction(error.message);
  }
};
