/* -----------------------------------------------------------------------
   * @ description : This is the products service layer.
----------------------------------------------------------------------- */
import config from 'config';
import { Categories, SubCategories, Products, Mockup, Cart, sequelizeConnection } from '../mysqlDb';
import _ from 'underscore';
import { SOAPClient } from '../utilities/methods';
import Messages from '../utilities/messages';
import { getPriceAccordingSize } from '../utilities/methods';
import { ServerlessApplicationRepository } from 'aws-sdk';
import util from 'util';
import helper from 'csvtojson';
const { limit, SANMAR_MEDIA_COLOR_SQUARE_IMAGE_URL } = config.get('appConstants');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
var Jimp = require('jimp');
const replaceColor = require('replace-color');
const convertColor = require('../utilities/convert-color');
const getDelta = require('../utilities/get-delta');

export const getAllProducts = async payload => {
  try {
    let query = {},
      sub_categories = [],
      products = [],
      regex = [];
    if (payload.type == 1) {
      //to get products on Category wise Page
      if (payload.category && payload.category.length) {
        let categories = await Category.findOne({ category_name: payload.category });
        if (categories && categories.sub_categories && categories.sub_categories.length) {
          sub_categories = _.pluck(categories.sub_categories, 'subcategory_name');
          if (sub_categories.length) {
            for (let i = 0; i < sub_categories.length; i++) {
              regex[i] = new RegExp(sub_categories[i]);
            }
          }
        }
        regex.push(new RegExp(payload.category));
      } else if (payload.sub_category && payload.sub_category.length) {
        regex.push(new RegExp(payload.sub_category));
      }
      query = {
        ...query,
        $and: [{ CATEGORY_NAME: payload.category }, { SUBCATEGORY_NAME: payload.sub_category }]
      };
      products = await Products.aggregate([
        { $match: query },
        {
          $group: {
            _id: {
              CATEGORY: payload.sub_category ? '$SUBCATEGORY_NAME' : '$CATEGORY_NAME',
              STYLE: '$STYLE#'
            },
            // _id : {CATEGORY: "$SUBCATEGORY_NAME", STYLE: "$STYLE#"},
            products: { $first: '$$ROOT' }
          }
        },
        { $project: { products: '$products' } },
        { $unwind: '$products' },
        {
          $group: {
            _id: '$_id.CATEGORY',
            final1: { $push: '$products' },
            category: { $first: '$_id.CATEGORY' }
          }
        },
        { $project: { _id: 0, category: '$category', products: { $slice: ['$final1', 6] } } }
      ]);
      return {
        count: products.length,
        limit: limit,
        data:
          payload['offset'] !== undefined || payload['offset']
            ? products.slice(payload.offset, payload.offset + limit)
            : products
      };
    } else if (payload.type == 2) {
      //to get products on Product Page
      if (payload.category && payload.category.length) {
        let categories = await Categories.findOne(
          { where: { category_name: payload.category } },
          { raw: true }
        );
        if (categories && categories.dataValues) {
          sub_categories = await SubCategories.findAll(
            { where: { category_id: categories.dataValues.id } },
            { raw: true }
          );
        }
        // console.log(JSON.stringify(categories, null, 2), "=====categories", JSON.stringify(sub_categories, null, 2))

        if (categories && sub_categories.length) {
          sub_categories = _.pluck(sub_categories, 'subcategory_name');
          if (sub_categories.length) {
            for (let i = 0; i < sub_categories.length; i++) {
              regex[i] = '%' + sub_categories[i] + '%';
            }
          }
        }
        regex.push('%' + payload.category + '%');
      } else if (payload.sub_category && payload.sub_category.length) {
        regex.push('%' + payload.sub_category + '%');
      }
      regex = regex.map(item => {
        return { [Op.like]: item };
      });
      if (payload.sub_category) {
        query = {
          ...query,
          [Op.and]: [
            { category_name: payload.category ? payload.category : '' },
            { subcategory_name: payload.sub_category ? payload.sub_category : '' }
          ]
          // product_status: {[Op.ne]: 'Coming Soon'}// in case of Sanmar as they written product with coming soon is not complete sometimes
        };
      } else {
        console.log('qqqqq');
        query = {
          ...query,
          [Op.or]: [
            { category_name: payload.category ? payload.category : '' },
            { subcategory_name: payload.sub_category ? payload.sub_category : '' }
          ]
          // product_status: {[Op.ne]: 'Coming Soon'}// in case of Sanmar as they written product with coming soon is not complete sometimes
        };
      }

      var orderby = [['unique_key', 'ASC']];
      if (payload.lowP == 1) {
        console.log('low');
        orderby = sequelizeConnection.literal('cast(piece_price as decimal(8,2)) Desc');
      } else if (payload.highP == 1) {
        console.log('high');
        orderby = sequelizeConnection.literal('cast(piece_price as decimal(8,2)) Asc');
      } else if (payload.Asc == 1) {
        orderby = [['product_title', 'ASC']];
      } else if (payload.Desc == 1) {
        orderby = [['product_title', 'DESC']];
      } else {
        orderby = [['unique_key', 'ASC']];
      }

      products = await Products.findAll({
        order: orderby,
        where: query,
        raw: true,
        group: ['style']
      });
      return {
        count: products.length,
        limit: limit,
        data:
          payload['offset'] !== undefined || payload['offset']
            ? products.slice(payload.offset, payload.offset + limit)
            : products
      };
    } else {
      return products;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProductDetailService = async payload => {
  try {
    let product_detail = await Products.findOne({ where: { id: payload.product_id }, raw: true });
    product_detail = JSON.parse(JSON.stringify(product_detail));
    //get product detail from sanmar
    // let updateRecord = await getProductDetailFromSANMAR(product_detail, payload);
    if (product_detail) {
      //get product details after update
      let product_detail = await Products.findOne({
        where: { id: payload.product_id },
        raw: true
      });
      product_detail = JSON.parse(JSON.stringify(product_detail));
      let product_images = [];
      if (product_detail.front_model_image_url && product_detail.front_model_image_url.length)
        product_images.push({
          image: product_detail.front_model_image_url + '?v=' + new Date().getTime(),
          area: 'Front'
        });
      if (product_detail.back_model_image && product_detail.back_model_image.length)
        product_images.push({
          image: product_detail.back_model_image + '?v=' + new Date().getTime(),
          area: 'Back'
        });
      if (product_detail.side_model_image_url && product_detail.side_model_image_url.length)
        product_images.push({
          image: product_detail.side_model_image_url + '?v=' + new Date().getTime(),
          area: 'Side'
        });

      // let url_substring;
      // if (product_detail.front_model_image_url.length) {
      //   let str = product_detail.front_model_image_url;
      //   url_substring = str.substring(0, str.lastIndexOf('/') + 1);
      // }
      // if (url_substring && product_detail.back_model_image.length) {
      //   product_images = [
      //     ...product_images,
      //     { image: `${url_substring}/${product_detail.back_model_image}`, area: 'Back' }
      //   ];
      // }

      product_detail.product_images = product_images;
      //Get all available color
      let available_colors = await Products.findAll({
        where: { style: product_detail.style },
        group: ['color_name'],
        attributes: ['color_name', 'color_square_image'],
        raw: true
      });

      if (available_colors.length) {
        available_colors = available_colors.map(obj => {
          return { ...obj, url: SANMAR_MEDIA_COLOR_SQUARE_IMAGE_URL };
        });
      }

      //Get all available size

      let available_sizes = await Products.findAll({
        where: { style: product_detail.style, id: payload.product_id },
        group: ['size'],
        order: [['unique_key', 'ASC']],
        attributes: ['size']
      });
      let avail_size = [];
      if (_.isArray(available_sizes) && available_sizes.length > 0) {
        let available_sizes_variation = await available_sizes.map(sizes => {
          sizes.size.map(size => {
            let final_size = { size: size };
            avail_size.push(final_size);
          });
        });
      } else {
        let final_size = { size: 'quantity' };
        avail_size.push(final_size);
      }

      //Get all available size color combination
      let available_sizes_color_combination = await Products.findAll({
        where: { style: product_detail.style, id: payload.product_id },
        // group: ['style'],
        order: [['unique_key', 'ASC']],
        attributes: ['size', 'color_name', 'piece_price']
      });
      //return available_sizes_color_combination;
      // available_sizes.sort(function(a, b) {
      //   return meta_sizes.indexOf(a._id) - meta_sizes.indexOf(b._id);
      // });
      let sizesColors = [];
      await available_sizes_color_combination.map(sizes => {
        if (sizes.size.length) {
          sizes.size.map(size => {
            let final_size = {
              color_name: sizes.color_name,
              piece_price: sizes.piece_price,
              size: size
            };
            sizesColors.push(final_size);
          });
        } else {
          let final_size = {
            color_name: sizes.color_name,
            piece_price: sizes.piece_price,
            size: 'Quantity'
          };
          sizesColors.push(final_size);
        }
      });
      if (!avail_size.length) {
        let final_size = { size: 'Quantity' };
        avail_size.push(final_size);
      }
      return {
        product_detail,
        available_sizes: avail_size,
        available_colors,
        available_sizes_color_combination: sizesColors
      };
    } else {
      throw new Error(Messages.systemError);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getSimilarProductsService = async payload => {
  try {
    let query = {};
    query['style'] = { [Op.in]: payload.styles };
    if (payload.color) {
      query = { ...query, color_name: payload.color };
    }
    if (payload.size) {
      query = { ...query, size: payload.size };
    }
    //get products from database
    let products = await Products.findAll({
      where: query,
      group: ['style'],
      raw: true,
      order: [['unique_key', 'ASC']]
    });
    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProductInfoByStyleColorSizeService = async payload => {
  try {
    let query;
    if (payload.style) {
      query = { ...query, style: payload.style };
    }
    if (payload.color) {
      query = { ...query, color_name: payload.color };
    }
    if (payload.size) {
      query = { ...query, size: payload.size };
    }
    let product_detail = await Products.findOne({ where: query, raw: true });
    product_detail = JSON.parse(JSON.stringify(product_detail));
    //get product detail from sanmar
    let updateRecord = await getProductDetailFromSANMAR(product_detail, {
      product_id: product_detail.id
    });
    if (updateRecord) {
      //get product details after update
      let product_detail = await Products.findOne({
        where: query,
        raw: true
      });
      product_detail = JSON.parse(JSON.stringify(product_detail));
      let product_images = [];
      if (product_detail.front_model_image_url && product_detail.front_model_image_url.length)
        product_images.push({ image: product_detail.front_model_image_url, area: 'Front' });
      if (product_detail.back_model_image && product_detail.back_model_image.length)
        product_images.push({ image: product_detail.back_model_image, area: 'Back' });
      if (product_detail.side_model_image_url && product_detail.side_model_image_url.length)
        product_images.push({ image: product_detail.side_model_image_url, area: 'Side' });

      product_detail.product_images = product_images;

      return { product_detail };
    } else {
      throw new Error(Messages.systemError);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const getProductDetailFromSANMAR = async (product_detail, payload) => {
  try {
    //call soap client
    /* const products = await SOAPClient(
      `https://ws.sanmar.com:8080/SanMarWebService/SanMarProductInfoServicePort?wsdl`,
      {
        style: product_detail.style,
        color: product_detail.mainframe_color,
        size: product_detail.size
      },
      'SANMAR',
      'getProductInfoByStyleColorSize'
    );*/
    //Get response from SOAP client
    const data = products.find(
      elem => product_detail.unique_key == elem.productBasicInfo.uniqueKey
    );
    if (data) {
      let res = {
        //imagaes
        brand_logo_image: data.productImageInfo.brandLogoImage
          ? data.productImageInfo.brandLogoImage
          : product_detail.brand_logo_image,
        thumbnail_image: data.productImageInfo.thumbnailImage
          ? data.productImageInfo.thumbnailImage
          : product_detail.thumbnail_image,
        color_swatch_image: data.productImageInfo.colorSwatchImage
          ? data.productImageInfo.colorSwatchImage
          : product_detail.color_swatch_image,
        product_image: data.productImageInfo.productImage
          ? data.productImageInfo.productImage
          : product_detail.product_image,
        color_square_image: data.productImageInfo.colorSquareImage
          ? data.productImageInfo.colorSquareImage
          : product_detail.color_square_image,
        color_product_image: data.productImageInfo.productImage
          ? data.productImageInfo.productImage
          : product_detail.color_product_image,
        color_product_thumbnail_image: data.productImageInfo.thumbnailImage
          ? data.productImageInfo.thumbnailImage
          : product_detail.color_product_thumbnail_image,
        front_model_image_url: data.productImageInfo.frontModel
          ? data.productImageInfo.frontModel
          : product_detail.front_model_image_url,
        back_model_image: data.productImageInfo.backModel
          ? data.productImageInfo.backModel
          : product_detail.back_model_image,
        front_flat_image: data.productImageInfo.frontFlat
          ? data.productImageInfo.frontFlat
          : product_detail.front_flat_image,
        back_flat_image: data.productImageInfo.backFlat
          ? data.productImageInfo.backFlat
          : product_detail.back_flat_image,
        side_model_image_url: data.productImageInfo.sideModel
          ? data.productImageInfo.sideModel
          : product_detail.side_model_image_url
      };
      // TODO: update multi data in database
      let updateRecord = await Products.update(res, {
        where: { id: payload.product_id }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const editProductDetailService = async payload => {
  try {
    const modelName = payload.flag == 'cart' ? Cart : Mockup;
    let custmize_details = await modelName.findOne({ where: { id: payload.id }, raw: true });
    custmize_details = JSON.parse(JSON.stringify(custmize_details));
    return custmize_details;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const testImages = async payload => {
  // var base64 = payload.image;
  //   var base64result = base64.split(';base64,')[1];

  //   console.log(base64result);
  try {
    var base64 = payload.image;
    var color = payload.color;
    var base64result = base64.split(';base64,')[1];
    const buf = Buffer.from(base64result, 'base64');

    var read = await Jimp.read(buf);

    var image = await read.color([{ apply: 'mix', params: ['green', 100] }]);

    var scan = await image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const colors = {
        type: 'hex',
        targetColor: '#008000',
        replaceColor: color
      };

      const formula = 'E00';
      const deltaE = 2.3;

      const targetLABColor = convertColor(colors.type, 'lab', colors.targetColor);
      const replaceRGBColor = convertColor(colors.type, 'rgb', colors.replaceColor);

      const currentLABColor = convertColor('rgb', 'lab', [
        image.bitmap.data[idx],
        image.bitmap.data[idx + 1],
        image.bitmap.data[idx + 2]
      ]);

      if (getDelta(currentLABColor, targetLABColor, formula) <= deltaE) {
        image.bitmap.data[idx] = replaceRGBColor[0];
        image.bitmap.data[idx + 1] = replaceRGBColor[1];
        image.bitmap.data[idx + 2] = replaceRGBColor[2];
        if (replaceRGBColor[3] !== null) image.bitmap.data[idx + 3] = replaceRGBColor[3];
      }
    });

    if (scan) {
      console.log('123');

      //  var promise = new Promise(function(resolve, reject) {
      //   scan.getBase64(Jimp.MIME_JPEG, function (err, src) {
      //    return resolve(src);
      //   })
      // });

      // if(promise){
      //   return { promise } ;
      // }

      var dd = scan.getBase64Async(Jimp.MIME_PNG);

      //  var res;
      //  dd.then(function(result){
      //      res = result; // Now you can use res everywhere

      //  });

      return dd;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const checkProductDetailService = async payload => {
  try {
    let finalArray = await Promise.all(
      payload.arr_obj.map(async elem => {
        let price_with_size = await Products.findAll({
          where: { style: elem.style, color_name: elem.color },
          order: [['unique_key', 'ASC']],
          attributes: ['size', 'color_name', 'piece_price']
        });
        price_with_size = JSON.parse(JSON.stringify(price_with_size));
        let no_of_color = elem.total_colors >= 5 ? 5 : elem.total_colors;
        let costRes = await getPriceAccordingSize(
          price_with_size,
          elem.color_size_arr,
          no_of_color,
          elem.decorating_method
        );
        let elemObj = {
          id: elem.id,
          user_id: elem.user_id,
          product_id: elem.product_id
        };
        const [costObj] = costRes;
        if (elem.user_id) {
          await Cart.update(
            { setup_cost: costObj.setup_cost, total_price: costObj.markup_cost.toFixed(2) },
            { where: { id: elem.id } }
          );
        }
        return { ...costObj, ...elemObj };
      })
    );
    return finalArray;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProductByColorSizeStyleFromDBService = async payload => {
  try {
    let query;
    if (payload.style) {
      query = { ...query, style: payload.style };
    }
    if (payload.color) {
      query = { ...query, color_name: payload.color };
    }
    /* if (payload.size) {
      query = { ...query, size: payload.size };
    }*/

    let product_detail = await Products.findOne({ where: query, raw: true });
    product_detail = JSON.parse(JSON.stringify(product_detail));
    //get product detail from sanmar
    /* let responsefromApi = getProductDetailFromSANMAR(product_detail, {
      product_id: product_detail.id
    }); */
    //await sleep(3000);
    if (product_detail) {
      //get product details after update
      let product_detail = await Products.findOne({
        where: query,
        raw: true
      });
      product_detail = JSON.parse(JSON.stringify(product_detail));
      let product_images = [];
      if (product_detail.front_model_image_url && product_detail.front_model_image_url.length)
        product_images.push({ image: product_detail.front_model_image_url, area: 'Front' });
      if (product_detail.back_model_image && product_detail.back_model_image.length)
        product_images.push({ image: product_detail.back_model_image, area: 'Back' });
      if (product_detail.side_model_image_url && product_detail.side_model_image_url.length)
        product_images.push({ image: product_detail.side_model_image_url, area: 'Side' });

      product_detail.product_images = product_images;
      let avail_size = [];
      let available_sizes = JSON.parse(product_detail.size);
      if (_.isArray(available_sizes) && available_sizes.length) {
        available_sizes.map(size => {
          let final_size = { size: size };
          avail_size.push(final_size);
        });
      } else {
        let final_size = { size: 'Qunatity' };
        avail_size.push(final_size);
      }
      product_detail.available_sizes = avail_size;
      return { product_detail };
    } else {
      let url_substring,
        product_images = [];
      if (product_detail.front_model_image_url.length) {
        let str = product_detail.front_model_image_url;
        url_substring = str.substring(0, str.lastIndexOf('/') + 1);
        product_images.push({ image: product_detail.front_model_image_url, area: 'Front' });
      }
      if (
        url_substring &&
        product_detail.back_model_image != null &&
        product_detail.back_model_image.length
      ) {
        if (product_detail.back_model_image.startsWith('https')) {
          product_images.push({
            image: `${product_detail.back_model_image}`,
            area: 'Back'
          });
        } else {
          product_images.push({
            image: `${url_substring}/${product_detail.back_model_image}`,
            area: 'Back'
          });
        }
      }
      if (
        url_substring &&
        product_detail.side_model_image_url != null &&
        product_detail.side_model_image_url.length
      ) {
        if (product_detail.side_model_image_url.startsWith('https')) {
          product_images.push({
            image: `${product_detail.side_model_image_url}`,
            area: 'Side'
          });
        } else {
          product_images.push({
            image: `${url_substring}/${product_detail.side_model_image_url}`,
            area: 'Side'
          });
        }
      }
      product_detail.product_images = product_images;

      return { product_detail };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
