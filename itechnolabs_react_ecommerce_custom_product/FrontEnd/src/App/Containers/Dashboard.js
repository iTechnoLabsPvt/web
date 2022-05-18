import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import { getProducts } from '../../actions/products';
import { Spin, Card, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import ProductDetail from './Products/ProductDetail';

const { Meta } = Card;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      products: [],
      productsList: [],
      count: 10
    }
  }

  componentDidMount(){
    // this.props.getProducts({token: this.props.user.loginToken}, res=>{
    //   if(res.status){
    //     this.setState({products: res.data, productsList: res.data.length ? res.data.slice(0, this.state.count) : [], loading: false});
    //   }
    // })
  }

  loadMore = () => {
    this.setState({productsList: this.state.products.length ? this.state.products.slice(0, this.state.count + 10) : [], count : this.state.count + 10});
  }
  
  render() {
    let products = [{
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 72,
        "catalogColor": "Natural",
        "color": "Natural",
        "inventoryKey": "2922",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, bags, bag, grocery tote, grocery, tote, port and co, port and company, port & company, port & co, port, company, 100% cotton twill, cotton, twill, web handles,",
        "pieceWeight": 0.43,
        "productDescription": "This tote has a wide bottom to fit bulky groceries. Four sides offer plenty of room for decoration.     Durable 10-ounce, 100% cotton twill     Cotton web handles with reinforced stitching     Dimensions: 15\" h x 13\" w x 7\" d; Approx. 1,365 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority Grocery Tote. B100",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B100",
        "uniqueKey": "29223"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/B100_Flat_Natural.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/B100_Flat_Natural.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_natural.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B100sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B100.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B100_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B100TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/B100_Flat_Natural.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 3.79,
        "dozenPrice": 4.79,
        "piecePrice": 4.79,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 72,
        "catalogColor": "Natural",
        "color": "Natural",
        "inventoryKey": "3477",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, bags, bag, port and co, port and company, port & company, port & co, port, company, jumbo tote, tote, totes, 100% cotton twill, cotton, twill, oversized, oversize, over size, over sized, shopping tote, shopping bag, grocery tote, grocery bag",
        "pieceWeight": 0.59,
        "productDescription": "This sturdy, wider, oversized tote is perfect for day trips, errands and more.     Durable 10-ounce, 100% cotton twill     Durable cotton web handles     Dimensions: 15\"h x 20\"w x 5\"d; Approx. 1,500 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Jumbo Tote. B300",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B300",
        "uniqueKey": "34773"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/2010/f1/B300_Natural_Flat_2010.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/2010/f1/B300_Natural_Flat_2010.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_natural.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B300sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B300.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B300_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B300TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/2010/f1/B300_Natural_Flat_2010.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 4.49,
        "dozenPrice": 5.49,
        "piecePrice": 5.49,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 72,
        "catalogColor": "Black",
        "color": "Black",
        "inventoryKey": "3478",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, bags, bag, port and co, port and company, port & company, port & co, port, company, jumbo tote, tote, totes, 100% cotton twill, cotton, twill, oversized, oversize, over size, over sized, shopping tote, shopping bag, grocery tote, grocery bag",
        "pieceWeight": 0.59,
        "productDescription": "This sturdy, wider, oversized tote is perfect for day trips, errands and more.     Durable 10-ounce, 100% cotton twill     Durable cotton web handles     Dimensions: 15\"h x 20\"w x 5\"d; Approx. 1,500 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Jumbo Tote. B300",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B300",
        "uniqueKey": "34783"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/2010/f1/B300_Black_Flat_2010.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/2010/f1/B300_Black_Flat_2010.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_black.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B300sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B300.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B300_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B300TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/2010/f1/B300_Black_Flat_2010.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 4.99,
        "dozenPrice": 5.99,
        "piecePrice": 5.99,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 72,
        "catalogColor": "Natural",
        "color": "Natural",
        "inventoryKey": "3479",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, port and co, port and company, port & company, port & co, port, company, bags, bag, convention tote, tote, 100% cotton twill, cotton, twill, denim,",
        "pieceWeight": 0.39,
        "productDescription": "A practical, effective way to make your logo mobile.     Durable 10-ounce, 100% cotton twill     Cotton web handles     Dimensions: 14\"h x 14\"w x 3\"d, Approx. 588 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Convention Tote. B050",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B050",
        "uniqueKey": "34793"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/2012/f1/B050_Natural_Bag_GA11.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/2012/f1/B050_Natural_Bag_GA11.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_natural.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B050sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B050.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B050_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B050TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/2012/f1/B050_Natural_Bag_GA11.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 3.49,
        "dozenPrice": 4.49,
        "piecePrice": 4.49,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 72,
        "catalogColor": "Black",
        "color": "Black",
        "inventoryKey": "3480",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, port and co, port and company, port & company, port & co, port, company, bags, bag, convention tote, tote, 100% cotton twill, cotton, twill, denim,",
        "pieceWeight": 0.39,
        "productDescription": "A practical, effective way to make your logo mobile.     Durable 10-ounce, 100% cotton twill     Cotton web handles     Dimensions: 14\"h x 14\"w x 3\"d, Approx. 588 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Convention Tote. B050",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B050",
        "uniqueKey": "34803"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/B050UBK03MS.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/B050UBK03MS.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_black.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B050sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B050.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B050_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B050TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/B050UBK03MS.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 3.49,
        "dozenPrice": 4.49,
        "piecePrice": 4.49,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 36,
        "catalogColor": "Natural/Navy",
        "color": "Natural/ Navy",
        "inventoryKey": "8250",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, bags, bag, port and co, port and company, port & company, port & co, port, company, two-tone shopping tote, tote, totes, shopping tote, shopping bag, grocery tote, grocery bag, 100% cotton twill, contrast, pocket, pockets, pocketed, with pockets, with pocket, web handles, reusable",
        "pieceWeight": 0.71,
        "productDescription": "Carry necessities with a touch of traditional style.     Durable 10-ounce, 100% cotton twill, contrast canvas bottom     Deep exterior pocket for easy decoration     Cotton web handles     Dimensions: 14\" h x 14.5\" w x 5.5\" d; Approx. 1,117 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Two-Tone Shopping Tote. B400",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B400",
        "uniqueKey": "82503"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/B400UNTNY03MS.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/B400UNTNY03MS.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_navy.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B400sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B400.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B400_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B400TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/B400UNTNY03MS.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 5.99,
        "dozenPrice": 7.99,
        "piecePrice": 7.99,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 36,
        "catalogColor": "Natural/Black",
        "color": "Natural/ Black",
        "inventoryKey": "8251",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, bags, bag, port and co, port and company, port & company, port & co, port, company, two-tone shopping tote, tote, totes, shopping tote, shopping bag, grocery tote, grocery bag, 100% cotton twill, contrast, pocket, pockets, pocketed, with pockets, with pocket, web handles, reusable",
        "pieceWeight": 0.71,
        "productDescription": "Carry necessities with a touch of traditional style.     Durable 10-ounce, 100% cotton twill, contrast canvas bottom     Deep exterior pocket for easy decoration     Cotton web handles     Dimensions: 14\" h x 14.5\" w x 5.5\" d; Approx. 1,117 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Two-Tone Shopping Tote. B400",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B400",
        "uniqueKey": "82513"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/B400UNTBK03MS.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/B400UNTBK03MS.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_black.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B400sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B400.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B400_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B400TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/B400UNTBK03MS.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 5.99,
        "dozenPrice": 7.99,
        "piecePrice": 7.99,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 36,
        "catalogColor": "Natural/Red",
        "color": "Natural/ Red",
        "inventoryKey": "8252",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, bags, bag, port and co, port and company, port & company, port & co, port, company, two-tone shopping tote, tote, totes, shopping tote, shopping bag, grocery tote, grocery bag, 100% cotton twill, contrast, pocket, pockets, pocketed, with pockets, with pocket, web handles, reusable",
        "pieceWeight": 0.71,
        "productDescription": "Carry necessities with a touch of traditional style.     Durable 10-ounce, 100% cotton twill, contrast canvas bottom     Deep exterior pocket for easy decoration     Cotton web handles     Dimensions: 14\" h x 14.5\" w x 5.5\" d; Approx. 1,117 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Two-Tone Shopping Tote. B400",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B400",
        "uniqueKey": "82523"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/2012/f13/B400_naturalred_flat.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/2012/f13/B400_naturalred_flat.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_red.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B400sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B400.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B400_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B400TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/2012/f13/B400_naturalred_flat.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 5.99,
        "dozenPrice": 7.99,
        "piecePrice": 7.99,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 36,
        "catalogColor": "Natural/Spruce",
        "color": "Natural/ Spruce",
        "inventoryKey": "8253",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, bags, bag, port and co, port and company, port & company, port & co, port, company, two-tone shopping tote, tote, totes, shopping tote, shopping bag, grocery tote, grocery bag, 100% cotton twill, contrast, pocket, pockets, pocketed, with pockets, with pocket, web handles, reusable",
        "pieceWeight": 0.71,
        "productDescription": "Carry necessities with a touch of traditional style.     Durable 10-ounce, 100% cotton twill, contrast canvas bottom     Deep exterior pocket for easy decoration     Cotton web handles     Dimensions: 14\" h x 14.5\" w x 5.5\" d; Approx. 1,117 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Two-Tone Shopping Tote. B400",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B400",
        "uniqueKey": "82533"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/B400UNTSP03MS.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/B400UNTSP03MS.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_forestgreen.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B400sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B400.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B400_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B400TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/B400UNTSP03MS.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 5.99,
        "dozenPrice": 7.99,
        "piecePrice": 7.99,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }, {
      "productBasicInfo": {
        "brandName": "Port Authority",
        "caseSize": 72,
        "catalogColor": "Navy",
        "color": "Navy",
        "inventoryKey": "19125",
        "keywords": "pad printing, pad-printing, padprinting, embroidery, embroider, embroidering, screen print, screenprint, screen printing, screenprinting, screen printer, screenprinter, heat transfer, heat-transfer, heat transferring, heat-transferring, pad print, pad-print, port and co, port and company, port & company, port & co, port, company, bags, bag, convention tote, tote, 100% cotton twill, cotton, twill, denim,",
        "pieceWeight": 0.39,
        "productDescription": "A practical, effective way to make your logo mobile.     Durable 10-ounce, 100% cotton twill     Cotton web handles     Dimensions: 14\"h x 14\"w x 3\"d, Approx. 588 cubic inches     Note: Bags not intended for use by children 12 and under. Includes a California Prop 65 and social responsibility hangtag.",
        "productStatus": "Active",
        "productTitle": "Port Authority - Convention Tote. B050",
        "size": "OSFA",
        "sizeIndex": 3,
        "style": "B050",
        "uniqueKey": "191253"
      },
      "productImageInfo": {
        "brandLogoImage": "https://cdnl.sanmar.com/catalog/images/portauthorityheader.jpg",
        "colorProductImage": "https://cdnl.sanmar.com/catalog/images/imglib/catl/B050UNY03MS.jpg",
        "colorProductImageThumbnail": "https://cdnl.sanmar.com/cache/altview/imglib/catl/B050UNY03MS.jpg",
        "colorSquareImage": "https://cdnl.sanmar.com/swatch/gifs/port_navy.gif",
        "colorSwatchImage": "https://cdnl.sanmar.com/catalog/images/B050sw.jpg",
        "productImage": "https://cdnl.sanmar.com/catalog/images/B050.jpg",
        "specSheet": "https://www.apparelvideos.com/images/specsheet/pdf/specsheet/B050_specsheet.pdf",
        "thumbnailImage": "https://cdnl.sanmar.com/catalog/images/B050TN.jpg",
        "titleImage": "",
        "frontModel": "https://cdnl.sanmar.com/imglib/mresjpg/B050UNY03MS.jpg",
        "backModel": "",
        "sideModel": "",
        "backFlat": "",
        "frontFlat": "",
        "threeQModel": ""
      },
      "productPriceInfo": {
        "casePrice": 3.49,
        "dozenPrice": 4.49,
        "piecePrice": 4.49,
        "priceCode": "A/P",
        "priceText": "Price"
      }
    }];
    console.log(products, "===products")
    return (
      <div>
        {this.state.loading ? <Spin />
      :
      products.length ? 
      <div>
      <div className="row">
      {products.map((ele, i) => {
        return <div className= "col-md-3">
          <Link to={`/product-detail/${ele.productBasicInfo.uniqueKey}`}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={ele.productImageInfo.productImage}
              />
            }
          >
            <Meta
            avatar={<Avatar src={ele.productImageInfo.productImage} />}
            title={ele.productBasicInfo.productTitle}
          description={<span title={ele.productBasicInfo.productDescription}>{ele.productBasicInfo.productDescription.length > 100 ? ele.productBasicInfo.productDescription.slice(0,100) + '...' : ele.productBasicInfo.productDescription }</span>}
          />
          </Card>
          </Link>
          </div>
      })}
      <br />
      </div>
      <div className= "col-md-3">
      <Button className="login-btn" disabled={this.state.loading} loading={this.state.loading} type="primary" size="large" htmlType="submit" onClick={()=> this.loadMore()}>{this.props.intl.formatMessage({id: 'load_more'})}</Button>
      </div>
      </div> : 
        `No Products found`
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  getProducts: bindActionCreators(getProducts, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Dashboard));