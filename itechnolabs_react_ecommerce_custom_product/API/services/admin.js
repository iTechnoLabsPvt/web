/* -----------------------------------------------------------------------
   * @ description : This is the user service layer.
----------------------------------------------------------------------- */

import {
  Products,
  Categories,
  SubCategories,
  Order,
  Payment,
  Page,
  sequelizeConnection,
  User,
  Item,
  AnyoneHelp
} from '../mysqlDb';
import { encryptpassword, generateToken, getTimeStamp } from '../utilities/universal';
import Messages from '../utilities/messages';
import config from 'config';
import * as Mail from '../utilities/mail';
import path from 'path';
import fs, { stat } from 'fs';
import util from 'util';
import Instagram from 'instagram-web-api';
import _ from 'underscore';
const { fn, col, cast } = sequelizeConnection;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const { WEB_URL, StaticFiles, SERVER_URL, Instagram_username, Instagram_password } = config.get(
  'appConstants'
);

// function to get all products
export const allProducts = async payload => {
  try {
    // / console.log(payload.category);

    const { category, subCategory, search } = payload;

    var querys = {};

    if (category) {
      querys.category_name = category;
    }

    if (subCategory) {
      querys.subcategory_name = subCategory;
    }
    if (search) {
      console.log(search);
      querys.product_title = { [Op.like]: `%${search}%` };

      //query['style'] = { [Op.in]: payload.styles };
    }

    const data = await Products.findAll({
      where: querys,
      order: [['id', 'DESC']],
      raw: true,
      group: ['style']
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// function to get product detail

export const getProductDetail = async payload => {
  try {
    let data_child = '';
    const data = await Products.findOne({
      limit: 1000,
      where: { id: payload.product_id }, // conditions
      order: [['id', 'DESC']]
    });
    console.log(data.style, '=== product detail style');
    if (data.style && data.parent == '1') {
      data_child = await Products.findAll({
        limit: 1000,
        where: { style: data.style, parent: '0' }, // conditions
        order: [['id', 'DESC']]
      });
    }
    return {
      data,
      data_child
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// confirm order

export const confirmOrder = async payload => {
  try {
    const { id } = payload;
    const faq_details = await Order.update(
      { order_status: '1' },
      {
        where: { id: id }
      }
    );
    return faq_details;
  } catch (err) {
    throw new Error(err.message);
  }
};

// function to get all categories
export const allcategories = async payload => {
  try {
    const data = await Categories.findAll({
      limit: 30,
      where: {} // conditions
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// function to get all subCategories
export const allSubCategories = async payload => {
  try {
    const data = await SubCategories.findAll({
      limit: 2000,
      where: { category_id: payload.category_id } // conditions
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* function to update the category */

export const updateCategory = async payload => {
  try {
    const categoryData = await Categories.findOne({
      where: {
        id: payload.category_id
      }
    });
    if (categoryData) {
      let image = '';
      if (payload.category_image) {
        image = payload.category_image;
      } else {
        image = categoryData.category_image;
      }

      await Categories.update(
        { category_name: payload.category_name, category_image: image },
        { where: { id: categoryData.id } }
      );
      return;
    } else {
      throw new Error(Messages.categoryNotFound);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/* function to update the subCategory */

export const updateSubCategory = async payload => {
  try {
    const categoryData = await SubCategories.findOne({
      where: {
        id: payload.subcategory_id
      }
    });

    if (categoryData) {
      await SubCategories.update(
        { subcategory_name: payload.category_name },
        { where: { id: categoryData.id } }
      );
      return;
    } else {
      throw new Error(Messages.categoryNotFound);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/* function to get all orders */

export const allOrders = async payload => {
  try {
    var status = 0;
    if (payload.type) {
      if (payload.type == 'unconfirmed') {
        status = '0';
      } else if (payload.type == 'show-success') {
        status = '1';
      }
    }
    console.log(status);
    const data = await Order.findAll({
      where: {
        order_status: status
      },
      include: [
        {
          model: User
        },
        {
          model: Item,
          as: 'items'
        },
        {
          model: Item,
          as: 'item'
        }
      ],
      order: [['id', 'DESC']]
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* function to get order detail */

export const orderDetail = async payload => {
  try {
    const data = await Order.findOne({
      where: {
        id: payload.order_id
      }
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* function to get all payments */

export const allPayments = async payload => {
  try {
    const data = await Payment.findAll();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addPages = async payload => {
  try {
    payload = {
      title: payload.title,
      slug: payload.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''),
      description: payload.description
    };

    const page = await Page.findOne({ where: { slug: payload.slug } });
    if (page) {
      throw new Error('please change the page title as page with same name is already exists');
    }
    const data = await Page.addPage(payload);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProducts = async payload => {
  try {
    const code = Date.now();
    let payload_main = {
      product_title: payload.title,
      product_description: payload.description,
      style: code,
      unique_key: code,
      color_swatch_image: payload.backImage,
      product_image: payload.image,
      color_square_image: payload.image,
      color_product_image: payload.image,
      color_product_thumbnail_image: payload.image,
      back_model_image: payload.backImage,
      front_flat_image: payload.image,
      back_flat_image: payload.backImage,
      price_text: payload.price,
      piece_price: payload.price,
      moq: payload.minOrder,
      color_name: payload.color,
      category_name: payload.category_id,
      subcategory_name: payload.sub_category_id,
      vendor_id: '1',
      parent: '1',
      size: payload.sizes,
      front_model_image_url: payload.image,
      back_model_image_url: payload.backImage,
      thumbnail_image: payload.image,
      embelleshing_type: payload.style,
      embelleshing_area: payload.emblesshing_area,
      piece_weight: payload.weight,
      setup_fee: payload.setupFee,
      vendor_name: payload.vendor_name,
      vendor_item_no: payload.vendor_item_no
    };
    const data = await Products.addProduct(payload_main);
    /* add products to swatches */

    let product_sizes = payload.size;

    let imagesFront = payload.swatchFront;
    let imagesBack = payload.swatchBack;
    let variationSizes = payload.sizesVariation;
    product_sizes.map(async (swatches, index) => {
      let payload_child = {
        product_title: payload.title,
        product_description: payload.description,
        style: code,
        unique_key: code,
        color_swatch_image: imagesFront[index],
        product_image: imagesFront[index],
        color_square_image: imagesFront[index],
        color_product_image: imagesFront[index],
        color_product_thumbnail_image: imagesFront[index],
        back_model_image: imagesBack[index],
        front_flat_image: imagesFront[index],
        back_flat_image: imagesBack[index],
        price_text: payload.price,
        moq: payload.minOrder,
        piece_price: payload.price,
        color_name: swatches,
        category_name: payload.category_id,
        subcategory_name: payload.sub_category_id,
        vendor_id: '1',
        thumbnail_image: imagesFront[index],
        size: _.isArray(variationSizes) && variationSizes.length ? variationSizes[index] : [],
        front_model_image_url: imagesFront[index],
        back_model_image_url: imagesBack[index],
        parent: '0',
        embelleshing_type: payload.style,
        embelleshing_area: payload.emblesshing_area,
        piece_weight: payload.weight,
        setup_fee: payload.setupFee,
        vendors: payload.vendor,
        vendor_item_no: payload.vendor_item_no
      };
      const data = await Products.addProduct(payload_child);
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UpdateProducts = async payload => {
  try {
    const product_exist = await Products.findOne({ where: { id: payload.productId } });
    if (!product_exist) {
      throw new Error('Product not found !');
    }
    const code = Date.now();
    let payload_main = {
      product_title: payload.title,
      product_description: payload.description,
      color_swatch_image: payload.backImage,
      product_image: payload.image,
      color_square_image: payload.image,
      color_product_image: payload.image,
      color_product_thumbnail_image: payload.image,
      back_model_image: payload.backImage,
      front_flat_image: payload.image,
      back_flat_image: payload.backImage,
      back_model_image: payload.backImage,
      front_flat_image: payload.image,
      back_flat_image: payload.backImage,
      price_text: payload.price,
      piece_price: payload.price,
      moq: payload.minOrder,
      color_name: payload.color,
      category_name: payload.category_id,
      subcategory_name: payload.sub_category_id,
      vendor_id: '1',
      parent: product_exist.parent,
      size: payload.sizes,
      front_model_image_url: payload.image,
      back_model_image_url: payload.backImage,
      thumbnail_image: payload.image,
      embelleshing_type: payload.style,
      embelleshing_area: ['Front', 'Back'],
      piece_weight: payload.weight,
      setup_fee: payload.setupFee,
      embelleshing_area: payload.emblesshing_area,
      vendor_name: payload.vendor_name,
      vendor_item_no: payload.vendor_item_no
    };

    console.log(payload.vendor_name);
    console.log(payload.vendor_item_no);
    // await Products.updateData(payload.product_id, payload_main);
    const data = await Products.updateData(payload.productId, payload_main);

    await Products.update(
      {
        price_text: payload.price,
        piece_price: payload.price,
        setup_fee: payload.setupFee,
        embelleshing_area: payload.emblesshing_area
      },
      { where: { unique_key: product_exist.unique_key } }
    );
    /* add products to swatches */

    if (payload.size.length) {
      let product_sizes = payload.size;

      let imagesFront = payload.swatchFront;
      let imagesBack = payload.swatchBack;
      let variationSizes = payload.sizesVariation;
      product_sizes.map(async (swatches, index) => {
        let payload_child = {
          product_title: payload.title,
          product_description: payload.description,
          style: product_exist.style,
          unique_key: product_exist.style,
          color_swatch_image: imagesFront[index],
          product_image: imagesFront[index],
          color_square_image: imagesFront[index],
          color_product_image: imagesFront[index],
          color_product_thumbnail_image: imagesFront[index],
          price_text: payload.price,
          moq: payload.minOrder,
          piece_price: payload.price,
          color_name: swatches,
          category_name: payload.category_id,
          subcategory_name: payload.sub_category_id,
          vendor_id: '1',
          thumbnail_image: imagesFront[index],
          size: _.isArray(variationSizes) && variationSizes.length ? variationSizes[index] : [],
          front_model_image_url: imagesFront[index],
          back_model_image_url: imagesBack[index],
          parent: '0',
          embelleshing_type: payload.style,
          piece_weight: payload.weight,
          embelleshing_area: payload.emblesshing_area
        };
        const data = await Products.addProduct(payload_child);
      });
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPage = async payload => {
  try {
    const data = await Page.findOne({ where: { id: payload.page_id } });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* update page */

export const updatePages = async payload => {
  try {
    const page_id = payload.page_id;
    payload = {
      title: payload.title,
      description: payload.description
    };
    const page = await Page.findOne({ where: { slug: payload.slug } });
    if (page && page.id != page_id) {
      throw new Error('please change the page title as page with same name is already exists');
    }
    const data = await Page.updateData(page_id, payload);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* Get user profile */

export const getUserProfile = async (payload, user) => {
  try {
    if (payload.email) {
      let emailCheck = await User.findOne({ where: { email: payload.email } });

      if (emailCheck && emailCheck.dataValues && emailCheck.dataValues.email != user.email)
        throw new Error(Messages.emailAlreadyExists);
    }

    let data = await User.findOne({ where: { email: payload.email } });

    return {
      id: data.id,
      name: data.name,
      company_name: data.company_name,
      email: data.email,
      role: data.role,
      status: data.status,
      profile_image: data.profile_image,
      complete_phone_number: data.complete_phone_number,
      loginToken: data.auth_token
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Add categories in the database */
export const addCategories = async payload => {
  try {
    const page = await Categories.findOne({ where: { category_name: payload.name } });
    if (page) {
      throw new Error('Category with same name already exist');
    }
    let payload_cat = {
      category_name: payload.name,
      category_image: payload.category_image
    };

    const data = await Categories.addCategory(payload_cat);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* Add options in the database */
export const addOptions = async payload => {
  try {
    const page = await AnyoneHelp.findOne({ where: { title: payload.title } });
    if (page) {
      throw new Error('options with same name already exist');
    }
    let payload_cat = {
      title: payload.title
    };

    const data = await AnyoneHelp.addHelp(payload_cat);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* Add subcategories in the database */
export const addSubCategories = async payload => {
  try {
    const category = await Categories.findOne({ where: { id: payload.category_id } });
    if (!category) {
      throw new Error('parent category not found');
    }
    const subCat = await SubCategories.findOne({
      where: { category_id: payload.category_id, subcategory_name: payload.name }
    });

    if (subCat) {
      throw new Error('Category with same name found under this category');
    }
    let payload_cat = {
      subcategory_name: payload.name,
      category_id: payload.category_id
    };

    const data = await SubCategories.addCategory(payload_cat);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategories = async payload => {
  try {
    if (payload.type == 'subcategory') {
      let deletecategory = await SubCategories.destroy({
        where: {
          // criteria
          id: payload.category_id
        }
      });
      if (deletecategory) {
        return true;
      }
    } else {
      let deleteMain = await Categories.destroy({
        where: {
          // criteria
          id: payload.category_id
        }
      });
      if (deleteMain) {
        return true;
      } else {
        throw new Error('category not deleted');
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProducts = async payload => {
  try {
    if (payload.type == '1') {
      let deleteProduct = await Products.destroy({
        where: {
          // criteria
          unique_key: payload.style
        }
      });
      if (deleteProduct) {
        return true;
      }
    } else {
      let deleteVariation = await Products.destroy({
        where: {
          // criteria
          id: payload.style
        }
      });
      if (deleteVariation) {
        return true;
      } else {
        throw new Error('category not deleted');
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// otpions

export const allOptions = async payload => {
  try {
    const data = await AnyoneHelp.findAll({
      order: [['id', 'DESC']],
      raw: true
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteOptions = async payload => {
  try {
    let deleteMain = await AnyoneHelp.destroy({
      where: {
        // criteria
        id: payload.id
      }
    });
    if (deleteMain) {
      return true;
    } else {
      throw new Error('category not deleted');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateOptions = async payload => {
  try {
    const help = await AnyoneHelp.findOne({
      where: {
        id: payload.id
      }
    });

    if (help) {
      await AnyoneHelp.update({ title: payload.title }, { where: { id: help.id } });
      return;
    } else {
      throw new Error(Messages.categoryNotFound);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
