import logger from './logger';
import { User, Vendor, Categories, SubCategories } from '../mysqlDb';
import * as Universal from './universal';
import _ from 'underscore';
import fs from 'fs';
import config from 'config';
import stream from 'stream';
import { exist } from 'joi';
import axios from 'axios';
import { getTimeStamp } from './universal';
const { SERVER_URL } = config.get('appConstants');
const { configData, configHeader } = config.get('ssactivewear_details');

const soap = require('soap');

export const addAdmin = async () => {
  let data = {
    name: 'Admin',
    email: 'admin1@yopmail.com',
    password: Universal.encryptpassword('string@123'),
    status: 1,
    role: 2
  };
  let admin = await User.findOne({ where: { email: 'admin1@yopmail.com' } });
  if (!admin) {
    await User.register(data);
    logger.info('Adding admin..............');
  }
};

export const addVendors = async () => {
  let data = [
    {
      vendor_name: 'SANMAR',
      status: 1
    },
    {
      vendor_name: 'SS Activewear',
      status: 1
    },
    {
      vendor_name: 'ETS Express',
      status: 1
    },
    {
      vendor_name: 'PCNA',
      status: 1
    }
  ];
  let vendors = await Vendor.findAll();
  if (vendors.length === 0) {
    await Vendor.register(data);
    logger.info('Adding vendors..............');
  }
};

export const addCategories = async () => {
  let categoryData = [
    {
      category_name: 'Apparel',
      category_image: 'https://www.ssactivewear.com/p/alstyle/1301'
    },
    {
      category_name: 'Health/PPE',
      category_image: 'https://www.ssactivewear.com/p/bayside/1941'
    },
    {
      category_name: 'Bags',
      category_image: 'https://www.sanmar.com/p/7184_Navy'
    },
    {
      category_name: 'Drinkware',
      category_image:
        'https://www.pcna.com/leeds/en-us/leeds-drinkware-sportbottles/product/1625-61_reg'
    },
    {
      category_name: 'Office',
      category_image:
        'https://www.pcna.com/leeds/en-us/leeds-office-journalbooksnotebooks/product/1921-12_reg'
    },
    {
      category_name: 'Tech',
      category_image:
        'https://www.pcna.com/leeds/en-us/leeds-office-journalbooksnotebooks/product/1921-12_reg'
    }
  ];
  try {
    const categories = await Categories.findAll();
    if (categories.length === 0) {
      await Categories.register(categoryData);
      logger.info('Adding categories..............');
    }
  } catch (err) {
    logger.error('Adding categories error..............', err);
  }
  return;
};

export const addSubCategories = async () => {
  let subcategoryData = [];
  try {
    let categories = await Categories.findAll({ raw: true });
    if (categories.length) {
      _.each(categories, obj => {
        if (obj.category_name == 'Apparel') {
          subcategoryData.push(
            {
              category_id: obj.id,
              subcategory_name: 'Fitness',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'Quarter Zips',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'T-Shirts',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'Hoodies',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'Hats',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'Polos',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'Jackets',
              gender: ['Women', 'Men']
            }
          );
        } else if (obj.category_name == 'Health/PPE') {
          subcategoryData.push(
            {
              category_id: obj.id,
              subcategory_name: 'Masks',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'Clean keys',
              gender: []
            },
            {
              category_id: obj.id,
              subcategory_name: 'Sanitizer',
              gender: []
            }
          );
        } else if (obj.category_name == 'Bags') {
          subcategoryData.push(
            {
              category_id: obj.id,
              subcategory_name: 'Backpacks',
              gender: ['Women', 'Men']
            },
            {
              category_id: obj.id,
              subcategory_name: 'Drawstrings',
              gender: []
            },
            {
              category_id: obj.id,
              subcategory_name: 'Totes',
              gender: []
            }
          );
        } else if (obj.category_name == 'Drinkware') {
          subcategoryData.push(
            {
              category_id: obj.id,
              subcategory_name: 'Mugs',
              gender: []
            },
            {
              category_id: obj.id,
              subcategory_name: 'Tumblers',
              gender: []
            },
            {
              category_id: obj.id,
              subcategory_name: 'Water Bottles',
              gender: []
            }
          );
        } else if (obj.category_name == 'Office') {
          subcategoryData.push(
            {
              category_id: obj.id,
              subcategory_name: 'Journals',
              gender: []
            },
            {
              category_id: obj.id,
              subcategory_name: 'Pens',
              gender: []
            }
          );
        } else if (obj.category_name == 'Tech') {
          subcategoryData.push(
            {
              category_id: obj.id,
              subcategory_name: 'Power Banks',
              gender: []
            },
            {
              category_id: obj.id,
              subcategory_name: 'Headphones',
              gender: []
            },
            {
              category_id: obj.id,
              subcategory_name: 'Speakers',
              gender: []
            }
          );
        }
      });
      const subcategories = await SubCategories.findAll();
      if (subcategories.length === 0) {
        await SubCategories.register(subcategoryData);
        logger.info('Adding SubCategories..............');
      }
    }
  } catch (err) {
    logger.error('Adding SubCategories error..............', err);
  }
  return;
};

//Soap Middleware to parse all third party API vendors requests and parse then XML response to JSON
export const SOAPClient = async (url, payload, type, func) => {
  return new Promise((resolve, reject) => {
    // url = 'https://ws.sanmar.com:8080/SanMarWebService/SanMarProductInfoServicePort?wsdl';
    // const args = {'arg0': {category: 'Bags'}, 'arg1': {sanMarCustomerNumber: 56404, sanMarUserName: 'cmagee', sanMarUserPassword: 'birdie1'}};
    let args;
    if (type == 'SANMAR') {
      soap.createClient(url, function(err, client) {
        if (client) {
          if (func == 'getProduct') {
            args = {
              arg0: payload,
              arg1: {
                sanMarCustomerNumber: 56404,
                sanMarUserName: 'cmagee',
                sanMarUserPassword: 'birdie1'
              }
            };
            client.getProduct(args, function(err1, result) {
              if (err1) {
                reject(err1);
              }
              if (result && result.return && !result.return.errorOccured) {
                resolve(result.return.listResponse);
              } else {
                return;
              }
            });
          } else if (func == 'getProductInfoByStyleColorSize') {
            args = {
              arg0: payload,
              arg1: {
                sanMarCustomerNumber: 56404,
                sanMarUserName: 'cmagee',
                sanMarUserPassword: 'birdie1'
              }
            };
            client.getProductInfoByStyleColorSize(args, function(err1, result) {
              if (err1) {
                reject(err1);
              }
              if (result && result.return && !result.return.errorOccured) {
                // console.log(result.return.listResponse);
                resolve(result.return.listResponse);
              } else {
                return;
              }
            });
          } else {
            client.getProductDeltaInfo(args, function(err1, result) {
              if (err1) {
                reject(err1);
              }
              if (result && result.return && !result.return.errorOccured) {
                console.log(result.return.listResponse);
                resolve(result.return.listResponse);
                // console.log(JSON.stringify(result.return.listResponse));
              } else {
                // const responseJSON = result.toJSON(result.body);
                // const finalData = xml2json.toJson(result.body);
                // if(responseJSON.statusCode == 500){

                // }
                // console.log(finalData, "==finalData")
                return;
              }
            });
          }
        } else {
          resolve();
        }
      });
    }
  });
};

// //Soap Middleware to parse all third party API vendors requests and parse then XML response to JSON
// export const SOAPClient = async (url, payload, type, func) => {
//   console.log('url', url, payload, type, func);
//   return new Promise((resolve, reject) => {
//     let args;
//     if (type == 'SANMAR') {
//       soap.createClient(url, function(err, client) {
//         if (client) {
//           if (func == 'getProduct') {
//             args = {
//               wsVersion: '1.0.0 ',
//               id: 'cmagee',
//               password: 'birdie1',
//               localizationCountry: 'us',
//               localizationLanguage: 'en',
//               productId: 'pc61'
//             };
//             console.log('args', args);

//             client.getProduct(args, function(err1, result) {
//               if (err1) {
//                 reject(err1);
//               }
//               if (result && result.Product) {
//                 resolve(result);
//               } else {
//                 return;
//               }
//             });
//           } else {
//           }
//         } else {
//           resolve();
//         }
//       });
//     }
//   });
// };

export const getMarkupCost = (flag, no_of_color, quantity, price) => {
  //flag is decorating method here
  const qty_range_arr = {
    '1': {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: flag == 'Print' ? 1.52 : 3.13, markup_cost: 60 }, //markup cost is in %  and range from/to is as per quantity
        { range_from: 50, range_to: 71, cost: flag == 'Print' ? 1.15 : 3.13, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: flag == 'Print' ? 1.03 : 3.08, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: flag == 'Print' ? 0.86 : 3.04, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: flag == 'Print' ? 0.69 : 3.04, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: flag == 'Print' ? 0.56 : 3.0, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: flag == 'Print' ? 0.54 : 2.98, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: flag == 'Print' ? 0.49 : 2.98, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: flag == 'Print' ? 0.42 : 2.98, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 20 : 45 // in $
    },
    '2': {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 2.52, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.56, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.4, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.1, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 0.86, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.65, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.63, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.57, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.48, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 30 : 45 // in $
    },
    '3': {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 2.98, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.99, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.78, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.37, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.04, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.77, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.72, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.65, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.55, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 40 : 45 // in $
    },
    '4': {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 3.54, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.38, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.24, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.66, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.24, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.9, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.84, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.74, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.61, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 50 : 45 // in $
    },
    '5': {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 4.12, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.8, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.72, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.93, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.38, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 1.04, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.97, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.83, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.69, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 60 : 45 // in $
    }
  };

  let selected_obj = qty_range_arr[no_of_color].markup_pricing;
  const setup_cost = qty_range_arr[no_of_color].setup_costs;
  selected_obj = _.filter(selected_obj, obj => {
    return quantity >= obj.range_from && quantity <= obj.range_to;
  });
  if (selected_obj.length) {
    const markup_cost =
      ((parseFloat(price) + selected_obj[0].cost) * quantity * selected_obj[0].markup_cost) / 100;
    const total_cost = markup_cost + setup_cost;
    return { markup_cost, setup_cost, total_cost };
  } else {
    return { markup_cost: 0, setup_cost: 0, total_cost: 0 };
  }
};

export const saveImageReturnUrl = baseFile => {
  let baseArr = baseFile.split(';');
  let basestr = baseArr[1].split(',');
  let checkType = baseArr[0].split('/');
  let filetype = checkType[1];
  let cust_image_name = `custmize_image_${getTimeStamp()}.${filetype}`;
  const imgBuffer = Buffer.from(basestr[1], 'base64');
  var streamInstance = new stream.Readable();
  streamInstance.push(imgBuffer);
  streamInstance.push(null);
  streamInstance.pipe(fs.createWriteStream(`./assets/custmizeImage/${cust_image_name}`));
  let fileUrl = `${SERVER_URL}images/custmizeImage/${cust_image_name}`;
  console.log('file url => ', fileUrl);
  return fileUrl;
};

export const getPriceAccordingSize = (
  available_size_price,
  select_qty_array,
  no_of_color,
  print_method
) => {
  print_method = print_method ? print_method : 'Print';
  let final_price_array = select_qty_array.map(elem => {
    let Total_qty = 0,
      total_price = 0;
    const { color, size_to_buy } = elem;
    Object.entries(size_to_buy).map(([size_key, qty_value]) => {
      let match_size_color = _.findWhere(available_size_price, {
        size: size_key,
        color_name: color
      });
      if (match_size_color) {
        let qty_price = qty_value * match_size_color.piece_price;
        total_price = total_price + Number(qty_price);
        Total_qty = Total_qty + Number(qty_value);
      }
    });
    let item_price = total_price / Total_qty;
    if (no_of_color) {
      let markup_setup = getColorCost(print_method, no_of_color, Total_qty);
      // item cost with color cost
      const item_price_with_color = item_price + markup_setup.cost;
      // item cost with markup cost
      const markup_with_single = (item_price_with_color * markup_setup.markup_cost) / 100;
      const markup_cost = item_price_with_color + markup_with_single;
      // Total quantity cost with color markup
      const final_cost = markup_cost * Total_qty;

      let resObj = {
        item_price: item_price_with_color,
        markup_cost: final_cost,
        setup_cost: markup_setup.setup_cost
      };
      return resObj;
    } else {
      let resObj = {
        item_price: item_price,
        markup_cost: total_price,
        setup_cost: 0
      };
      return resObj;
    }
  });
  return final_price_array;
};

const getColorCost = (flag, no_of_color, quantity) => {
  //flag is decorating method here
  const qty_range_arr = {
    1: {
      markup_pricing: [
        {
          range_from: 24,
          range_to: 49,
          cost: flag == 'Print' ? 1.52 : 3.13,
          markup_cost: 60
        }, //markup cost is in %  and range from/to is as per quantity
        {
          range_from: 50,
          range_to: 71,
          cost: flag == 'Print' ? 1.15 : 3.13,
          markup_cost: 58
        },
        {
          range_from: 72,
          range_to: 99,
          cost: flag == 'Print' ? 1.03 : 3.08,
          markup_cost: 56
        },
        {
          range_from: 100,
          range_to: 149,
          cost: flag == 'Print' ? 0.86 : 3.04,
          markup_cost: 54
        },
        {
          range_from: 150,
          range_to: 214,
          cost: flag == 'Print' ? 0.69 : 3.04,
          markup_cost: 52
        },
        {
          range_from: 215,
          range_to: 359,
          cost: flag == 'Print' ? 0.56 : 3.0,
          markup_cost: 50
        },
        {
          range_from: 360,
          range_to: 499,
          cost: flag == 'Print' ? 0.54 : 2.98,
          markup_cost: 48
        },
        {
          range_from: 500,
          range_to: 999,
          cost: flag == 'Print' ? 0.49 : 2.98,
          markup_cost: 46
        },
        {
          range_from: 1000,
          range_to: 1999,
          cost: flag == 'Print' ? 0.42 : 2.98,
          markup_cost: 44
        }
      ],
      setup_costs: flag == 'Print' ? 20 : 45 // in $
    },
    2: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 2.52, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.56, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.4, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.1, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 0.86, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.65, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.63, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.57, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.48, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 30 : 45 // in $
    },
    3: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 2.98, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.99, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.78, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.37, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.04, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.77, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.72, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.65, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.55, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 40 : 45 // in $
    },
    4: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 3.54, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.38, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.24, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.66, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.24, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.9, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.84, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.74, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.61, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 50 : 45 // in $
    },
    5: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 4.12, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.8, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.72, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.93, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.38, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 1.04, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.97, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.83, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.69, markup_cost: 44 }
      ],
      setup_costs: flag == 'Print' ? 60 : 45 // in $
    }
  };

  let selected_obj = qty_range_arr[no_of_color].markup_pricing;
  const setup_cost = qty_range_arr[no_of_color].setup_costs;
  selected_obj = _.filter(selected_obj, obj => {
    return quantity >= obj.range_from && quantity <= obj.range_to;
  });
  if (selected_obj.length) {
    return { ...selected_obj[0], setup_cost };
  } else {
    return {
      range_from: 0,
      range_to: 0,
      cost: 0,
      markup_cost: 0,
      setup_cost: 0
    };
  }
};

// get product style_id by style
export const getProductSytleId = async style => {
  try {
    const config = {
      method: 'get',
      url: `https://api.ssactivewear.com/v2/styles/?search=${style}`,
      headers: configHeader,
      data: JSON.stringify(configData)
    };
    axios(config)
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        logger.error(error.message);
        throw new Error(err.message);
      });
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
};

// get all product by style_id
export const getProductDetailsWithStyle = async styleID => {
  try {
    const config = {
      method: 'get',
      url: `https://api.ssactivewear.com/v2/products/?style=${styleID}`,
      headers: configHeader,
      data: JSON.stringify(configData)
    };
    axios(config)
      .then(async response => {
        // return response.data;
        let finalObj = await response.data.map(elem => {
          let obj = {
            colorName: elem.colorName,
            size: elem.sizeName,
            piecePrice: elem.piecePrice,
            qty: elem.qty
          };
          return obj;
        });
        return finalObj;
      })
      .catch(error => {
        logger.error(error.message);
        throw new Error(err.message);
      });
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
};
