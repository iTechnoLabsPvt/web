/* -----------------------------------------------------------------------
   * @ description : This is the mockup service layer.
----------------------------------------------------------------------- */

import util from 'util';
import { Mockup, Products } from '../mysqlDb';
import config from 'config';
import * as Mail from '../utilities/mail';
import fs from 'fs';
import path from 'path';
import pdf from 'html-pdf';
import _ from 'underscore';
import nodeHtmlToImage from 'node-html-to-image';
import { getTimeStamp } from '../utilities/universal';
import { saveImageReturnUrl } from '../utilities/methods';
const { StaticFiles } = config.get('appConstants');

export const sendMockupEmail = async payload => {
  try {
    if (payload.loggedIn && payload.product_id) {
      let product_detail = await Products.findOne({ where: { id: payload.product_id }, raw: true });
      product_detail = JSON.parse(JSON.stringify(product_detail));
      let finalObj = { ...payload, ...product_detail, sizes_qty: payload.size_to_buy };
      let mailObj = await makeHtml([finalObj]);
      let templatepath = path.join(__dirname, StaticFiles);
      let emailTemplate = fs.readFileSync(path.resolve(templatepath + 'pdfMail.html'), 'UTF-8');
      /******** Replace dynamic values in email template. ********/
      let sendStr = util.format(emailTemplate, mailObj);
      let templateName = `Mockup_${getTimeStamp()}.png`;
      nodeHtmlToImage({
        output: `./MockupTemplate/${templateName}`,
        html: sendStr,
        content: { name: 'VOX' }
      }).then(() => semdPdfOnMail(templateName, payload.email));
      // let templateName = `Mockup_${getTimeStamp()}.pdf`;
      // await pdf
      //   .create(sendStr, { format: 'A3', orientation: 'portrait' })
      //   .toStream(async (err, stream) => {
      //     await stream.pipe(fs.createWriteStream(`./MockupTemplate/${templateName}`));
      //     semdPdfOnMail(templateName, payload.email);
      //   });
      return;
    } else if (payload.loggedIn) {
      let mockup_details = await Mockup.findAll({ where: { id: payload.mockup_ids }, raw: true });
      mockup_details = JSON.parse(JSON.stringify(mockup_details));
      let product_id = [...new Set(_.pluck(mockup_details, 'product_id'))];
      let product_detail = await Products.findAll({ where: { id: product_id }, raw: true });
      product_detail = JSON.parse(JSON.stringify(product_detail));
      let final_object = await mockup_details.map(mockElem => {
        let productData = product_detail.find(prodElem => prodElem.id == mockElem.product_id);
        return { ...mockElem, ...productData };
      });
      let mailObj = await makeHtml(final_object);
      let templatepath = path.join(__dirname, StaticFiles);
      let emailTemplate = fs.readFileSync(path.resolve(templatepath + 'pdfMail.html'), 'UTF-8');
      /******** Replace dynamic values in email template. ********/
      let sendStr = util.format(emailTemplate, mailObj);
      let templateName = `Mockup_${getTimeStamp()}.png`;
      nodeHtmlToImage({
        output: `./MockupTemplate/${templateName}`,
        html: sendStr,
        content: { name: 'VOX' }
      }).then(() => semdPdfOnMail(templateName, payload.email));
      // let templateName = `Mockup_${getTimeStamp()}.pdf`;
      // await pdf
      //   .create(sendStr, { format: 'A3', orientation: 'portrait' })
      //   .toStream(async (err, stream) => {
      //     await stream.pipe(fs.createWriteStream(`./MockupTemplate/${templateName}`));
      //     semdPdfOnMail(templateName, payload.email);
      //   });
      return;
    } else {
      let product_detail = await Products.findOne({ where: { id: payload.product_id }, raw: true });
      product_detail = JSON.parse(JSON.stringify(product_detail));
      // let customized_image = await makeCustmizeImageUrl(payload.customized_product_details);
      payload.customized_image = await saveImageReturnUrl(
        payload.customized_product_details.Front.urlBase64
      );
      delete payload.customized_product_details;
      // console.log('------------image------', payload.customized_image);
      let finalObj = { ...payload, ...product_detail, sizes_qty: payload.size_to_buy };
      let mailObj = await makeHtml([finalObj]);
      let templatepath = path.join(__dirname, StaticFiles);
      let emailTemplate = fs.readFileSync(path.resolve(templatepath + 'pdfMail.html'), 'UTF-8');
      /******** Replace dynamic values in email template. ********/
      let sendStr = util.format(emailTemplate, mailObj);
      let templateName = `Mockup_${getTimeStamp()}.png`;
      nodeHtmlToImage({
        output: `./MockupTemplate/${templateName}`,
        html: sendStr,
        content: { name: 'VOX' }
      }).then(() => semdPdfOnMail(templateName, payload.email));

      // await pdf.create(sendStr, { format: 'A3' }).toStream(async (err, stream) => {
      //   await stream.pipe(fs.createWriteStream(`./MockupTemplate/${templateName}`));
      //   semdPdfOnMail(templateName, payload.email);
      // });
      return;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

async function makeHtml(obj) {
  let finalHtml = obj.map(elem => {
    let str = '';
    str = str + `<div class="product-pdf-main-title">${elem.product_title}</div>`;
    if (elem.product_desc) {
      str =
        str +
        `<div class="product-pdf-main-title sub-title-pdf">
      <p>Production Description </p>
      <p class="pdf-desc">${elem.product_description}</p>
      </div>`;
    }
    if (elem.spec) {
      str =
        str +
        `
      <div class="product-pdf-main-title sub-title-pdf">
            <p>Production Specification </p>
            <p class="pdf-desc">${elem.product_description}</p>`;
    }
    if (elem.sizes_quantity) {
      let sum = 0;
      _.each(elem.size_to_buy, obj1 => {
        const size_arr = Object.values(obj1.size_to_buy);
        const total_size_count = size_arr.reduce(function(a, b) {
          return Number(a) + Number(b);
        }, 0);

        sum = sum + total_size_count;
      });
      str =
        str +
        `
      <div class="product-pdf-main-title sub-title-pdf">
            <p> I would like <span class="day-count">${sum}</span> printed.</p>
         </div>`;
    }
    if (elem.production_time) {
      str =
        str +
        `
      <div class="product-pdf-main-title sub-title-pdf">
            <p> Production Time :  <span class="day-count">${elem.production_time_}</span> days.</p>
         </div>`;
    }
    if (elem.price) {
      // let qty = 0;
      // _.each(elem.size_to_buy, obj1 => {
      //   const size_arr = Object.values(obj1.size_to_buy);
      //   const total_size_count = size_arr.reduce(function(a, b) {
      //     return Number(a) + Number(b);
      //   }, 0);

      //   qty = qty + total_size_count;
      // });
      str =
        str +
        `
        <div class="product-pdf-main-title sub-title-pdf">
            <p>Each item: <span class="day-count">$${elem.item_price}</span></p>
            <p>Total: <span class="day-count">$${elem.total_price}</span> + Shipping + Setup</p>
          </div>`;
    }
    let finalStr = `
    <div class="col-md-6 col-sm-12">
      <div class="product-pdf-view-left">
        <img src=${elem.front_model_image_url} alt="">
      </div>
    </div>
    <div class="col-md-6 col-sm-12 pdf-right-col">
      <div class="product-pdf-view-right">
      ${str}
      </div>
    </div>`;
    return finalStr;
  });
  return finalHtml.join();
}

function semdPdfOnMail(templateName, email) {
  Mail.sendMailAttachment(
    {
      emails: [email],
      body: '',
      subject: 'Mockup Details',
      attachments: [
        {
          filename: `${templateName}`,
          path: path.join(__dirname, `../MockupTemplate/${templateName}`),
          contentType: 'image/png'
        }
      ]
    },
    cb => {
      if (cb) {
        fs.unlink(`./MockupTemplate/${templateName}`, function(err) {
          if (err) throw err;
          console.log('File deleted!');
        });
      }
    }
  );
}

export const addToMockupService = async (payload, user) => {
  try {
    payload = { ...payload, user_id: user.id };
    if (payload.customized_product_details && payload.customized_product_details !== null) {
      payload.customized_product_details = _.mapObject(payload.customized_product_details, obj => {
        if (obj.urlBase64) {
          //TODO upload Image
          // obj.currentEmbellishingUrl =
          //   'https://cdnl.sanmar.com/imglib/mresjpg/2015/f4/203697_black_model_front_022015.jpg'; //TODO - uploaded url
          // delete obj.urlBase64;
          let fileUrl = saveImageReturnUrl(obj.urlBase64);
          obj.currentEmbellishingUrl = fileUrl;
          payload.customized_image = fileUrl;
          delete obj.urlBase64;
        }
        return obj;
      });
    }
    const mockup = await Mockup.register(payload);
    return mockup;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const removeMockupService = async payload => {
  try {
    return await Mockup.destroy({ where: { id: payload._id } });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getMockupsService = async user => {
  try {
    let mockup = await Mockup.findAll({ where: { user_id: user.id } });
    mockup = JSON.parse(JSON.stringify(mockup));
    mockup = await Promise.all(
      mockup.map(async obj => {
        obj.product_data = await Products.findOne({ where: { id: obj.product_id }, raw: true });
        return obj;
      })
    );
    return mockup;
  } catch (err) {
    throw new Error(err.message);
  }
};
