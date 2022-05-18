import Joi from 'joi';
import { addProduct } from '../../../controllers/admin';

export default {
  method: 'POST',
  path: '/api/v1/admin/add-product',
  config: {
    auth: 'jwt',
    description: 'Api to add the product.',
    notes: '<br/>',
    tags: ['api', 'admin'],
    validate: {
      headers: Joi.object({
        authorization: Joi.string()
          .trim()
          .required()
      }).options({ allowUnknown: true }),
      payload: {
        title: Joi.string()
          .label('Product Title')
          .required(),
        description: Joi.string()
          .trim()
          .label('Description')
          .required(),
        style: Joi.array()
          .items(Joi.string())
          .label('Style')
          .required(),
        size: Joi.array()
          .items(Joi.string())
          .label('Sizes')
          .required(),
        swatchFront: Joi.array()
          .items(Joi.string())
          .label('Front Images')
          .required(),
        swatchBack: Joi.array()
          .items(Joi.string())
          .label('Back Images'),
        sizesVariation: Joi.array().label('Sizes Variations'),
        emblesshing_area: Joi.array().label('printing area'),
        sizes: Joi.array()
          .items(Joi.string())
          .label('Sizes main'),
        image: Joi.string()
          .trim()
          .label('Product Image'),
        backImage: Joi.string()
          .allow('')
          .trim()
          .label('Product Back Image'),
        price: Joi.string()
          .trim()
          .label('Price Text'),
        vendor_name: Joi.string()
          .allow('')
          .trim()
          .label('vendor2'),
        vendor_item_no: Joi.string()
          .allow('')
          .trim()
          .label('vendor item no'),
        setupFee: Joi.required().label('Setup fees'),
        category_id: Joi.string()
          .trim()
          .label('Category Name'),
        sub_category_id: Joi.string()
          .trim()
          .label('Subcategory Name'),
        code: Joi.string()
          .trim()
          .label('Code'),
        weight: Joi.string()
          .trim()
          .label('Code'),
        minOrder: Joi.string()
          .trim()
          .label('Code'),
        color: Joi.string()
          .trim()
          .label('Product color')
      }
    }
  },
  handler: addProduct
};
