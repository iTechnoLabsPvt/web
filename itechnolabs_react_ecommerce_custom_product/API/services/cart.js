/* -----------------------------------------------------------------------
   * @ description : This is the cart service layer.
----------------------------------------------------------------------- */

import { Cart, Products } from '../mysqlDb';
import _ from 'underscore';
import {
  saveImageReturnUrl,
  SOAPClient,
  getProductSytleId,
  getProductDetailsWithStyle,
  getPriceAccordingSize
} from '../utilities/methods';

export const addCartService = async payload => {
  try {
    let product_detail = await Products.findOne({ where: { id: payload.product_id }, raw: true });
    product_detail = JSON.parse(JSON.stringify(product_detail));
    if (product_detail) {
      let availbilty;
      availbilty = await productCheckInDB(product_detail, payload.color_size_arr);
      // payload.style = product_detail.style;
      if (availbilty.length) {
        throw new Error('This product quantity is out of stock.');
      } else {
        if (payload.customized_product_details && payload.customized_product_details !== null) {
          payload.customized_product_details = _.mapObject(
            payload.customized_product_details,
            obj => {
              if (obj.urlBase64) {
                let fileUrl = saveImageReturnUrl(obj.urlBase64);
                obj.currentEmbellishingUrl = fileUrl;
                payload.customized_image = fileUrl;
                delete obj.urlBase64;
              }
              return obj;
            }
          );
        }
        if (payload.product_custom_front) {
          let fileUrl = saveImageReturnUrl(payload.product_custom_front);
          payload.product_custom_front = fileUrl;
        }
        if (payload.product_custom_back) {
          let fileUrl = saveImageReturnUrl(payload.product_custom_back);
          payload.product_custom_back = fileUrl;
        }

        const cart = await Cart.register(payload);
        return cart;
      }
    } else {
      // return { flag: 'product_not_avl', message: 'This product is not available' };
      throw new Error('This product is not available.');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const removeCartService = async payload => {
  try {
    if (payload.flag == 0) {
      await Cart.update({ type: payload.type }, { where: { id: payload._id } });
    } else {
      await Cart.destroy({ where: { id: payload._id } });
    }
    return;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCartService = async payload => {
  try {
    let cart = await Cart.findAll({ where: { type: 1, user_id: payload.user_id }, raw: true });
    cart = JSON.parse(JSON.stringify(cart));
    cart = await getCart(cart);
    let save_for_later = await Cart.findAll({
      where: { type: 2, user_id: payload.user_id },
      raw: true
    });
    save_for_later = JSON.parse(JSON.stringify(save_for_later));
    save_for_later = await getSaveForLater(save_for_later);
    return { cart, save_for_later };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCart = async cart => {
  return await Promise.all(
    cart.map(async obj => {
      obj.product_data = await Products.findOne({ where: { id: obj.product_id }, raw: true });
      return obj;
    })
  );
};

const getSaveForLater = async save_for_later => {
  return await Promise.all(
    save_for_later.map(async obj => {
      obj.product_data = await Products.findOne({ where: { id: obj.product_id }, raw: true });
      return obj;
    })
  );
};

export const updateCartService = async payload => {
  try {
    let product_detail = await Products.findOne({ where: { id: payload.product_id }, raw: true });
    product_detail = JSON.parse(JSON.stringify(product_detail));
    let availbilty;
    availbilty = await productCheckInDB(product_detail, payload.color_size_arr);
    // payload.style = product_detail.style;
    if (availbilty.length) {
      throw new Error('This product quantity is out of stock.');
    } else {
      if (payload.customized_product_details && payload.customized_product_details !== null) {
        payload.customized_product_details = _.mapObject(
          payload.customized_product_details,
          obj => {
            if (obj.urlBase64) {
              let fileUrl = saveImageReturnUrl(obj.urlBase64);
              obj.currentEmbellishingUrl = fileUrl;
              payload.customized_image = fileUrl;
              delete obj.urlBase64;
            }
            return obj;
          }
        );
      }
      const cart = await Cart.update(
        {
          ...payload,
          customized_product_details: JSON.stringify(payload.customized_product_details),
          color_size_arr: JSON.stringify(payload.color_size_arr)
        },
        { where: { id: payload.id } }
      );
      return cart;
    }

    // if (payload.customized_product_details && payload.customized_product_details !== null) {
    //   payload.customized_product_details = _.mapObject(payload.customized_product_details, obj => {
    //     if (obj.urlBase64) {
    //       let fileUrl = saveImageReturnUrl(obj.urlBase64);
    //       obj.currentEmbellishingUrl = fileUrl;
    //       payload.customized_image = fileUrl;
    //       delete obj.urlBase64;
    //     }
    //     return obj;
    //   });
    // }
    // const cart = await Cart.update(
    //   {
    //     ...payload,
    //     customized_product_details: JSON.stringify(payload.customized_product_details),
    //     color_size_arr: JSON.stringify(payload.color_size_arr)
    //   },
    //   { where: { id: payload.id } }
    // );
    // return cart;
  } catch (err) {
    throw new Error(err.message);
  }
};

const checkProductAvalabilty = async (reqObj, product_detail) => {
  if (product_detail.vendor_id == 1) {
    const products = await SOAPClient(
      `https://ws.sanmar.com:8080/SanMarWebService/SanMarProductInfoServicePort?wsdl`,
      {
        style: reqObj.style,
        color: reqObj.color
      },
      'SANMAR',
      'getProductInfoByStyleColorSize'
    );
    //Get response from SOAP client
    console.log('----------------', products);

    // const data = products.find(
    //   elem => product_detail.unique_key == elem.productBasicInfo.uniqueKey
    // );

    // return await Promise.all(
    //   cart.map(async obj => {
    //     obj.product_data = await Products.findOne({ where: { id: obj.product_id }, raw: true });
    //     return obj;
    //   })
    // );
  } else if (product_detail.vendor_id == 2) {
    let product_details_sytle = await getProductSytleId(product_detail.style);
    if (product_details_sytle) {
      let resArr = [];
      let product_detail_array = await getProductDetailsWithStyle(product_details_sytle.styleID);
      await Promise.all(
        payload.color_size_arr.filter(async elem => {
          const { color, size_to_buy } = elem;
          Object.entries(size_to_buy).map(([size_key, qty_value]) => {
            let match_size_color = _.findWhere(product_detail_array, {
              size: size_key,
              color_name: color
            });
            if (match_size_color && match_size_color.qty <= qty_value) {
              resArr.push({ reqObj: payload, message: 'Product quantity is not available' });
            }
          });
        })
      );
      return resArr;
    }
  } else {
  }
};

const productCheckInDB = async (product_detail, color_size_arr) => {
  let style_product_detail = await Products.findAll({
    where: { style: product_detail.style, color_name: product_detail.color_name },
    raw: true
  });
  style_product_detail = JSON.parse(JSON.stringify(style_product_detail));
  let checkQty = [];
  await Promise.all(
    color_size_arr.filter(async elem => {
      const { color, size_to_buy } = elem;
      Object.entries(size_to_buy).map(([size_key, qty_value]) => {
        let match_size_color = _.findWhere(style_product_detail, {
          size: size_key,
          color_name: color
        });
        let choose_qty, aval_qty;
        typeof qty_value == 'number' ? (choose_qty = qty_value) : (choose_qty = Number(qty_value));
        typeof match_size_color.qty == 'number'
          ? (aval_qty = match_size_color.qty)
          : (aval_qty = Number(match_size_color.qty));
        if (match_size_color && aval_qty <= choose_qty) {
          checkQty.push({
            size: size_key,
            select_qty: choose_qty,
            avaliable_qty: aval_qty
          });
        }
      });
    })
  );
  return checkQty;
};

export const reorderAddCartService = async payload => {
  try {
    // get product details according to Product_id
    let product_detail = await Products.findOne({ where: { id: payload.product_id }, raw: true });
    product_detail = JSON.parse(JSON.stringify(product_detail));
    // get product details according to style
    let style_product_detail = await Products.findAll({
      where: { style: product_detail.style, color_name: product_detail.color_name },
      attributes: ['id', 'color_name', 'size', 'qty', 'piece_price', 'vendor_id', 'moq'],
      raw: true
    });
    //get no of color
    let values = Object.values(payload.customized_product_details);
    let total_colors = 0;
    _.each(values, obj => {
      if (obj.fileList.length && obj.confirmDesign) {
        const color_count = obj.currentEmbellishingColors.length;
        total_colors = total_colors + color_count;
      }
    });
    let no_of_color = total_colors >= 5 ? 5 : total_colors;
    // check product quantity is availabale
    let notAvailableProduct = [];
    await Promise.all(
      payload.color_size_arr.filter(async elem => {
        const { color, size_to_buy } = elem;
        Object.entries(size_to_buy).map(([size_key, qty_value]) => {
          let match_size_color = _.findWhere(style_product_detail, {
            size: size_key,
            color_name: color
          });
          let choose_qty, aval_qty;
          typeof qty_value == 'number'
            ? (choose_qty = qty_value)
            : (choose_qty = Number(qty_value));
          typeof match_size_color.qty == 'number'
            ? (aval_qty = match_size_color.qty)
            : (aval_qty = Number(match_size_color.qty));
          if (match_size_color && aval_qty <= choose_qty) {
            notAvailableProduct.push({
              size: size_key,
              select_qty: choose_qty,
              avaliable_qty: aval_qty
            });
          }
        });
      })
    );
    //product check quantity availablity
    if (notAvailableProduct.length) {
      throw new Error('This product quantity is out of stock.');
    } else {
      // get pricing and update price
      let getPricing = await getPriceAccordingSize(
        style_product_detail,
        payload.color_size_arr,
        no_of_color,
        payload.decorating_method
      );
      payload.item_price = getPricing[0].item_price.toFixed(2);
      payload.total_price = getPricing[0].markup_cost.toFixed(2);
      payload.setup_cost = getPricing[0].setup_cost;
      let cart = await Cart.register(payload);
      cart = JSON.parse(JSON.stringify(cart));
      cart.item_price = getPricing[0].item_price.toFixed(2);
      return cart;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
