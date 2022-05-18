/* -----------------------------------------------------------------------
   * @ description : This is the Order service layer.
----------------------------------------------------------------------- */

import { Products, Order, Item, Payment, Cart } from '../mysqlDb';
import { getTimeStamp } from '../utilities/universal';
import { getRatingListForUps, shipmentDetailsForUps } from '../utilities/ups';
import config from 'config';
import * as Mail from '../utilities/mail';
import path from 'path';
import fs from 'fs';
import util from 'util';
import _ from 'underscore';
const { StaticFiles, SERVER_URL } = config.get('appConstants');

export const createOrderService = async payload => {
  try {
    /* Removed the shipment ****
    let shipment_details = await shipmentDetailsForUps(payload.billing_info);

    let create_order = await Order.create({
      order_item: payload.order_item,
      order_amount: payload.order_amount,
      user_id: payload.user_id,
      Shipment_number: shipment_details.ShipmentNumber,
      Shipment_charger: shipment_details.TotalCharges.MonetaryValue,
      reference_id: `VOX-${getTimeStamp()}`
    });
*/
    //let shipment_details = await shipmentDetailsForUps(payload.billing_info);
    let create_order = await Order.create({
      order_item: payload.order_item,
      order_help: payload.order_help,
      order_amount: payload.order_amount,
      user_id: payload.user_id,
      Shipment_number: 0,
      Shipment_charger: 0,
      reference_id: `VOX-${getTimeStamp()}`
    });
    create_order = JSON.parse(JSON.stringify(create_order));
    console.log(create_order, '=== order create vox');

    const { item } = payload;

    const item_obj = await Promise.all(
      item.map(async elem => {
        // items details
        let cart_detail = await Cart.findOne({ where: { id: elem.cart_id }, raw: true });
        cart_detail = JSON.parse(JSON.stringify(cart_detail));
        let cart_details_obj = {
          product_id: cart_detail.product_id,
          color: cart_detail.color,
          color_size_arr: cart_detail.color_size_arr,
          customized_image: cart_detail.customized_image,
          customized_product_details: cart_detail.customized_product_details,
          decorating_method: cart_detail.decorating_method,
          qty: cart_detail.quantity,
          piece_price: cart_detail.piece_price,
          setup_cost: cart_detail.setup_cost,
          total_price: cart_detail.total_price,
          category: cart_detail.category,
          user_id: cart_detail.user_id,
          product_custom_front: cart_detail.product_custom_front,
          product_custom_back: cart_detail.product_custom_back
        };

        // product details
        let product_detail = await Products.findOne({ where: { id: elem.product_id }, raw: true });
        product_detail = JSON.parse(JSON.stringify(product_detail));

        let { id, createdAt, updatedAt, ...updatedObject } = product_detail;
        let product_data = JSON.stringify({ ...updatedObject });
        let billing_info = JSON.stringify(payload.billing_info);

        return {
          ...cart_details_obj,
          order_id: create_order.id,
          product_data: product_data,
          billing_info: billing_info
        };
      })
    );

    await Item.bulkCreate(item_obj);
    await Payment.create({
      payment_amount: create_order.order_amount,
      order_id: create_order.id,
      user_id: payload.user_id
    });
    await Cart.destroy({
      where: {
        user_id: payload.user_id
      }
    });
    //send email for order confirmation
    let templatepath = path.join(__dirname, StaticFiles);
    let emailTemplate = fs.readFileSync(path.resolve(templatepath + 'orderConfirm.html'), 'UTF-8');
    let emailTemplateAdmin = fs.readFileSync(
      path.resolve(templatepath + 'orderAdmin.html'),
      'UTF-8'
    );

    /* run the map to get order details */
    let attachment = [];
    item_obj.map(async elem => {
      if (elem.customized_image) {
        attachment.push({
          fileName: elem.product_id + 'main.jpeg',
          path: elem.customized_image
        });
      }
      if (elem.product_custom_front) {
        attachment.push({
          fileName: 'front.jpeg',
          path: elem.product_custom_front
        });
      }
      if (elem.product_custom_back) {
        attachment.push({
          fileName: elem.product_id + 'back.jpeg',
          path: elem.product_custom_back
        });
      }
      // console.log(JSON.parse(elem.product_data),"==== product data");
    });
    //console.log(attachment,"==== images added");

    var content = item_obj.reduce(function(a, elem) {
      let sizes = JSON.parse(elem.color_size_arr);
      let all_size = [];
      sizes.map(ele => {
        console.log(ele, '=== elelments');
        all_size.push(ele.size_to_buy);
      });
      let product_details = JSON.parse(elem.product_data);
      return (
        a +
        `<tr><td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;">` +
        product_details.product_title +
        `</td>
      <td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;">` +
        elem.qty +
        `</td>
      <td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;">` +
        elem.color +
        `</td>
      <td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;">` +
        JSON.stringify(all_size) +
        `</td>
      </tr>`
      );
    }, '');
    var content_customer = item_obj.reduce(function(a, elem) {
      let sizes = JSON.parse(elem.color_size_arr);
      let all_size = [];
      sizes.map(ele => {
        console.log(ele, '=== elelments');
        all_size.push(ele.size_to_buy);
      });
      let product_details = JSON.parse(elem.product_data);
      return (
        a +
        `<tr><td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;">` +
        product_details.product_title +
        `</td>
      <td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;">` +
        elem.qty +
        `</td>
      <td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;">` +
        elem.color +
        `</td>
      <td style="border-collapse:collapse;line-height: 30px; font-family:Open Sans,open-sans,sans-serif; padding: 2px;"> $` +
        elem.total_price +
        `</td>
      </tr>`
      );
    }, '');
    let shipping_details =
      `
<th style="color:black;font-size:17px;font-family:Open Sans,open-sans,sans-serif;font-weight:600;text-align: left;">Fullname</th>
<td style="border-collapse:collapse; font-size:17px;font-family:Open Sans,open-sans,sans-serif;text-align: left;">` +
      payload.billing_info.first_name +
      ' ' +
      payload.billing_info.last_name +
      `</td>
</tr>
<tr style="line-height: 30px;">
<th style="color:black;font-size:17px;font-family:Open Sans,open-sans,sans-serif;font-weight:600;text-align: left;">Email</th>
<td style="border-collapse:collapse; font-size:17px;font-family:Open Sans,open-sans,sans-serif;text-align: left;">` +
      payload.billing_info.email +
      `</td>
</tr>
<tr style="line-height: 30px;">
<th style="color:black;font-size:17px;font-family:Open Sans,open-sans,sans-serif;font-weight:600;text-align: left;">Shipping Address</th>
<td style="border-collapse:collapse; font-size:17px;font-family:Open Sans,open-sans,sans-serif;text-align: left;">` +
      payload.billing_info.address_line +
      `</td>
</tr>
<tr style="line-height: 30px;">
<th style="color:black;font-size:17px;font-family:Open Sans,open-sans,sans-serif;font-weight:600;text-align: left;">City</th>
<td style="border-collapse:collapse; font-size:17px;font-family:Open Sans,open-sans,sans-serif;text-align: left;">` +
      payload.billing_info.city +
      `</td>
</tr>
<tr style="line-height: 30px;">
<th style="color:black;font-size:17px;font-family:Open Sans,open-sans,sans-serif;font-weight:600;text-align: left;">Postal Code</th>
<td style="border-collapse:collapse; font-size:17px;font-family:Open Sans,open-sans,sans-serif;text-align: left;">` +
      payload.billing_info.postal_code +
      `</td>
</tr>
<tr style="line-height: 30px;">
<th style="color:black;font-size:17px;font-family:Open Sans,open-sans,sans-serif;font-weight:600;text-align: left;">Country Code</th>
<td style="border-collapse:collapse; font-size:17px;font-family:Open Sans,open-sans,sans-serif;text-align: left;">` +
      payload.billing_info.country_code +
      `</td>
</tr>
<tr style="line-height: 30px;">
<th style="color:black;font-size:17px;font-family:Open Sans,open-sans,sans-serif;font-weight:600;text-align: left;">Telephone Number</th>
<td style="border-collapse:collapse; font-size:17px;font-family:Open Sans,open-sans,sans-serif;text-align: left;">` +
      payload.billing_info.telephone +
      `</td>
`;
    // /******** Replace dynamic values in email template. ********/
    let sendStr = util.format(
      emailTemplate,
      SERVER_URL,
      create_order.reference_id,
      create_order.order_amount,
      content_customer,
      shipping_details
    );

    let sendStrAdmin = util.format(
      emailTemplateAdmin,
      SERVER_URL,
      create_order.reference_id,
      create_order.order_amount,
      content,
      shipping_details
    );

    Mail.sendMail({
      emails: [payload.billing_info.email],
      body: sendStr,
      subject: Mail.subjects.orderConfirm
    });

    /* Send order confirmation email to admin users */
    Mail.sendMail({
      emails: Mail.adminEmail,
      body: sendStrAdmin,
      subject: Mail.subjects.newOrder,
      attachments: attachment
    });

    /* End send order confirmation to admin users */
    return create_order;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getOrderRatingService = async payload => {
  try {
    let rating_list = await getRatingListForUps(payload);
    if (rating_list) return rating_list;
  } catch (err) {
    throw new Error(err);
  }
};

export const getShipmentNumberService = async payload => {
  try {
    let shipment_res = await shipmentDetailsForUps(payload);
    if (shipment_res) return shipment_res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getOrderListService = async payload => {
  try {
    let order = await Order.findAll({
      where: { user_id: payload.user_id },
      order: [['createdAt', 'DESC']],
      attributes: ['reference_id', 'createdAt', 'order_amount'],
      raw: true
    });
    order = JSON.parse(JSON.stringify(order));
    let order_list = order.map(elem => {
      return {
        order_number: elem.reference_id,
        order_date: new Date(elem.createdAt).toString().substring(0, 24),
        total: `$${elem.order_amount}`
      };
    });
    return order_list;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAllOrderListService = async payload => {
  try {
    let order = await Order.findAll({
      order: [['createdAt', 'DESC']],
      raw: true
    });
    order = JSON.parse(JSON.stringify(order));
    let order_list = order.map(elem => {
      return {
        order_number: elem.reference_id,
        order_date: new Date(elem.createdAt).toString().substring(0, 24),
        total: `$${elem.order_amount}`
      };
    });
    return order_list;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getOrderItemsService = async payload => {
  try {
    let items_list = await Item.findAll({
      where: { user_id: payload.user_id },
      attributes: [
        'product_id',
        'user_id',
        'color',
        'color_size_arr',
        'customized_image',
        'customized_product_details',
        'decorating_method',
        'piece_price',
        'setup_cost',
        'total_price',
        'category',
        'product_data'
      ],
      raw: true
    });
    items_list = JSON.parse(JSON.stringify(items_list));
    return items_list;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getOrderDetailService = async payload => {
  try {
    let order = await Order.findAll({
      where: { user_id: payload.user_id, id: payload.order_id },
      order: [['createdAt', 'DESC']],
      attributes: ['reference_id', 'createdAt', 'order_amount'],
      raw: true
    });
    order = JSON.parse(JSON.stringify(order));
    let order_list = order.map(elem => {
      return {
        order_number: elem.reference_id,
        order_date: new Date(elem.createdAt).toString().substring(0, 24),
        total: `$${elem.order_amount}`
      };
    });
    return order_list;
  } catch (err) {
    throw new Error(err.message);
  }
};
