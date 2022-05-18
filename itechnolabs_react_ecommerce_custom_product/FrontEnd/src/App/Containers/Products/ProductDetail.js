import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SketchPicker } from 'react-color';

// import product_banner from '../../Images/product-banner.jpg';
import no_img from '../../Images/no-img.jpg';
import loaderImg from '../../Images/Rolling-1s-200px.gif';





import {
  getProductDetail,
  addProductDetail,
  getSimilarProducts,
  getProductInfoByStyleColorSize,
  getProductByColorSizeStyleFromDB,
  getEditProductDetail,
} from "../../../actions/products";
import { injectIntl } from "react-intl";
import { Button, message, Spin, Upload, Modal, Switch,Progress } from "antd";
import {
  addToCart,
  addToCartService,
  updateCartService,
  updateCart,
  changeColors
} from "../../../actions/cart";


import { addToWishlistService, saveMockup } from "../../../actions/wishlist";
import { Link } from "react-router-dom";
import _ from "underscore";
import CKEditor from "react-ckeditor-component";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ColorExtractor } from "react-color-extractor";
import html2canvas from "html2canvas";
// import imageToBase64 from "image-to-base64";
// import {
//   toPng,
//   toJpeg,
//   toBlob,
//   toPixelData,
//   toSvg,
//   download,
// } from "html-to-image";

import Draggable from "react-draggable";
import Moveable from "react-moveable";
import ShareDesignModal from "../../Components/ShareDesignModal";
import {
  getMarkupCost,
  getPriceAccordingSize,
  getTimeStampExpire,
  getBase64Image,
} from "../../../utilities/universal";
import ReactImageZoom from 'react-image-zoom';
import Container from 'react-image-zoom';






// import GetColorsFromImage from 'get-image-colors';
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
const failedRequest = ({ file, onError }) => {
  setTimeout(() => {
    onError("error");
  }, 0);
};
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingByColor: false,
      zoomstyle:{},
      productDetail: null,
      similarProducts: [],
      available_colors: [],
      available_sizes: [],
      color: "",
      size: "",
      content: "",
      fileList: {},
      fileListOrginal: {},
      showColorModal: false,
      colors: [],
      mainimgheight: 0,
      mainimgwidth: 0,
      selectedItem: 0,
      zoomHighet:'776px',
      zoomWidth:'540px',
      isZoomed:false,
      fileList: {
        Front: {
          translate: [0, 0],
          rotate: 0,
          transformOrigin: "50% 50%",
          translateResize: [0, 0],
          fileList: [],
          confirmDesign: false,
          uploading:false,
          style:{width:"100px",height:"100px"}
        },
        Back: {
          translate: [0, 0],
          rotate: 0,
          transformOrigin: "50% 50%",
          translateResize: [0, 0],
          fileList: [],
          confirmDesign: false,
          uploading:false,
          style:{width:"100px",height:"100px"}
        },
      },
      embelleshing_type: "Print",
      styleSelected:{backgroundColor:"#32a1aa",color:"#fff"},
      styleUnSelected:{backgroundColor:"#fff",color:"#32a1aa"},
      showShareDesignModal: false,
      multicolorChecked: false,
      multicolorSizeArr: [],
      item_price: 0,
      setup_price: 0,
      total_price: 0,
      qty_error: false,
      front_custom_image :'',
      back_custom_image :'',
      frame:{
        translate:[0,0],
      rotate:0
      },
      uploading:false,
      isOrignal:true,
      background:'#fff',
      loadchange:false,
      isEditColor:false
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentDidMount() {
    console.log('mount');
    this.getProductsAndSimilar();

    

  }
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });

    this.changeColor(color.hex,this.state.currentEmbellishingArea);

  };


  zoomIn() {
    this.setState({ isZoomed: true });
  }
  
  zoomOut() {
    this.setState({ isZoomed: false });
  }

  handleZoomChange = (states) => {
console.log(states);

if(states==false){
  this.setState({ isZoomed: true,zoomstyle:{height:"100vh",width:"100%",zIndex:"100",position:"fixed",top:"0",left:"0",bottom:"0",margin:"0px"} });
}else{
  this.setState({ isZoomed: false,zoomstyle:{} });

}
    
  }

  


       renderCustomThumbs = (proimage) => {
        const thumbList = proimage.map((product, index) => 
        <picture key={index}>
        <source data-srcSet={product.image} type="image/jpg" />
          <img
            key={index}
            src= {product.image}
            alt={product.alternativeText}
            height="70"
          />
          
        </picture>
        )
      
       console.log(thumbList);
      return(thumbList)
        
      
        }
      

  

//   handleZoomChange = e => {
//     this.setState({
//        isZoomed: e
//     });
//  };


  formatStringToCamelCase(str) {
    const splitted = str.split("-");
    if (splitted.length === 1) return splitted[0];
    return (
      splitted[0] +
      splitted
        .slice(1)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join("")
    );
  };

   getStyleObjectFromString(str) {
    const style = {};
    str.split(";").forEach(el => {
      const [property, value] = el.split(":");
      if (!property) return;
  
      const formattedProperty = this.formatStringToCamelCase(property.trim());
      style[formattedProperty] = value.trim();
    });
  
    return style;
  };

  getProductsAndSimilar() {
    let context = this;
    context.setState({ loading: true });
    context.props.getProductDetail(
      {
        product_id:
          this.props.location.state && this.props.location.state.flag
            ? this.props.location.state.product_id
            : this.props.match.params.product_id,
      },
      (res) => {

        console.log(res,"=== get product detail response");

        if (res.status) {
          let sizes = null;

          console.log(res.data.product_detail.setup_fee);
              this.setState({
                setup_price:Number(res.data.product_detail.setup_fee)
              });
          
          if (res.data.available_sizes.length) {
            var i =1;
            _.each(res.data.available_sizes, (obj) => {
              sizes = sizes == null ? {} : sizes;
// console.log(res.data.product_detail.moq);
// console.log(res.data.product_detail.moq);

              var r = res.data.product_detail.moq % res.data.available_sizes.length;

              var d = res.data.product_detail.moq / res.data.available_sizes.length;
              if(i==res.data.available_sizes.length){
                d = parseInt(d) + r;
              }
              sizes[obj.size] = parseInt(d);
              i++;
              return;
            });
          }
          context.setState(
            {
              productDetail: res.data.product_detail,
              available_colors: res.data.available_colors,
              available_sizes: res.data.available_sizes,
              color: res.data.product_detail
                ? res.data.product_detail.color_name
                : "",
              size: res.data.product_detail ? res.data.product_detail.size : "",
              multicolorSizeArr: [
                {
                  color: res.data.product_detail
                    ? res.data.product_detail.color_name
                    : "",
                  size_to_buy: sizes,
                },
              ],
              available_sizes_color_combination:
                res.data.available_sizes_color_combination,
              loading: false,
              setup_price:Number(res.data.product_detail.setup_fee)
              
            },
            () => {
             
              //add current product detail in redux
              context.props.addProductDetail(res.data.product_detail);
            
              if (this.props.location.state && this.props.location.state.flag) {

                
                if (this.props.user.loggedIn) {
                 
                  context.props.getEditProductDetail(
                    {
                      id: this.props.location.state.id,
                      flag: this.props.location.state.flag,
                    },
                    (res) => {
                      if (res.status) {
                        context.setState(
                          {
                            multicolorSizeArr:
                              res.data.color_size_arr &&
                              res.data.color_size_arr.length
                                ? JSON.parse(res.data.color_size_arr)
                                : this.state.res.data.multicolorSizeArr,
                            embelleshing_type:
                              res.data.decorating_method !== null
                                ? res.data.decorating_method
                                : "",
                            color: res.data.color,
                            size: res.data.size,
                            fileList:
                              res.data.customized_product_details &&
                              res.data.customized_product_details !== null &&
                              res.data.customized_product_details.length
                                ? JSON.parse(
                                    res.data.customized_product_details
                                  )
                                : this.state.fileList,
                            multicolorChecked:
                              res.data.color_size_arr &&
                              res.data.color_size_arr.length &&
                              JSON.parse(res.data.color_size_arr)
                                ? true
                                : false,
                                setup_price:res.data.setup_cost
                          },
                          () => {
                            let fileList = _.mapObject(
                              this.state.fileList,
                              (obj, key) => {
                                let target = document.querySelector(
                                  `#canvas_${key}`
                                );
                                if (target) {
                                  target.style.transform =
                                    `translate(${
                                      obj.translate.length
                                        ? obj.translate[0]
                                        : 0
                                    }px, ${
                                      obj.translate.length
                                        ? obj.translate[1]
                                        : 0
                                    }px)` + ` rotate(${obj.rotate}deg)`;
                                }
                                return obj;
                              }
                            );
                            this.setState({ fileList: fileList });
                            let values = Object.values(this.state.fileList);
                            let total_colors = 0;
                            _.each(values, (obj) => {
                              if (obj.fileList.length && obj.confirmDesign) {
                                const color_count =
                                  obj.currentEmbellishingColors.length;
                                total_colors = total_colors + color_count;
                              }
                            });
                            let no_of_color =
                              total_colors >= 5 ? 5 : total_colors;
                            let product_price_details = getPriceAccordingSize(
                              this.state.available_sizes_color_combination,
                              this.state.multicolorSizeArr,
                              no_of_color,
                              this.state.embelleshing_type,
                              this.state.productDetail.setup_fee
                            );

                           
                            if (product_price_details) {
                             
                              this.setState({
                                item_price: product_price_details[0].item_price.toFixed(
                                  2
                                ),
                                total_price: product_price_details[0].markup_cost.toFixed(
                                  2
                                ),
                                setup_price:
                                  product_price_details[0].setup_cost,
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                } else {

                  console.log('ajay2');
                  // start get data without login
                  let index = this.props.location.state.index;
                  let resData = this.props.cart.cart[index];
//console.log(res.data.product_detail.setup_fee);
              this.setState({
                setup_price:resData.setup_cost,
                item_price:resData.piece_price
              });

              

                  console.log(resData);
                  context.setState(
                    {
                      multicolorSizeArr:
                        resData.color_size_arr && resData.color_size_arr.length
                          ? resData.color_size_arr
                          : this.state.resData.multicolorSizeArr,
                      embelleshing_type:
                        resData.decorating_method !== null
                          ? resData.decorating_method
                          : "",
                      color: resData.color,
                      size: resData.size,
                      fileList: resData.customized_product_details
                        ? resData.customized_product_details
                        : this.state.fileList,
                      // resData.customized_product_details &&
                      // resData.customized_product_details !== null &&
                      // resData.customized_product_details.length
                      //   ? resData.customized_product_details
                      //   : this.state.fileList,
                      multicolorChecked:
                        resData.color_size_arr &&
                        resData.color_size_arr.length &&
                        resData.color_size_arr
                          ? true
                          : false,
                      item_price: resData.piece_price,
                       total_price: resData.total_price,
                       setup_price: resData.setup_cost,
                       
                    },
                    () => {
                      //console.log(resData);
                      console.log("ww");
                      let fileList = _.mapObject(
                        this.state.fileList,
                        (obj, key) => {
                          let target = document.querySelector(`#canvas_${key}`);
                          if (target) {
                            target.style.transform =
                              `translate(${
                                obj.translate.length ? obj.translate[0] : 0
                              }px, ${
                                obj.translate.length ? obj.translate[1] : 0
                              }px)` + ` rotate(${obj.rotate}deg)`;
                          }
                          return obj;
                        }
                      );
                      this.setState({ fileList: fileList });
                      let values = Object.values(this.state.fileList);
                      let total_colors = 0;
                      _.each(values, (obj) => {
                        if (obj.fileList.length && obj.confirmDesign) {
                          const color_count =
                          obj.currentEmbellishingColors ? obj.currentEmbellishingColors.length:0;
                          total_colors = total_colors + color_count;
                        }
                      });
                      let no_of_color = total_colors >= 5 ? 5 : total_colors;
                      let product_price_details = getPriceAccordingSize(
                        this.state.available_sizes_color_combination,
                        this.state.multicolorSizeArr,
                        no_of_color,
                        this.state.embelleshing_type,
                        this.state.productDetail.setup_fee
                      );
                      //   console.log(this.state.productDetail.setup_fee);
                      // this.setState({setup_price:this.state.productDetail.setup_fee})
                    
                      if (product_price_details) {
                        console.log('enter');
                        this.setState({
                          total_price: this.state.total_price
                        });
                      }
                    }
                  );
                  // end without login
                }
              }
              //get similar products
              let companion_styles = this.state.productDetail
                ? (this.state.productDetail.companion_styles)?this.state.productDetail.companion_styles.split("|"):[]
                : [];
              companion_styles = _.filter(companion_styles, (ele) => {
                return this.state.productDetail
                  ? ele !== this.state.productDetail.style
                  : ele;
              });
              companion_styles = _.uniq(companion_styles);
              if (companion_styles.length) {
                context.props.getSimilarProducts(
                  { styles: companion_styles },
                  (res) => {
                    if (res.status) {
                      context.setState({ similarProducts: res.data });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  /* get product by id */

  getProductsbyId(id) {
    
    console.log("hello");
    let context = this;
   // context.setState({ loading: true });
    context.props.getProductDetail(
      {
        product_id : id
      },
      (res) => {

        console.log(res,"=== get product detail response");

        if (res.status) {
          let sizes = null;
          
          if (res.data.available_sizes.length) {
            var i =1;
            _.each(res.data.available_sizes, (obj) => {
              sizes = sizes == null ? {} : sizes;
              var r = res.data.product_detail.moq % res.data.available_sizes.length;
              
              var d = res.data.product_detail.moq / res.data.available_sizes.length;
              if(i==res.data.available_sizes.length){
                d = parseInt(d) + r;
              }
              sizes[obj.size] = parseInt(d);
              i++;
              return;
              // console.log(res.data.product_detail.moq);
              // console.log(res.data.product_detail.moq);
              
                           




            });
          }
          context.setState(
            {
              productDetail: res.data.product_detail,
              available_colors: res.data.available_colors,
              available_sizes: res.data.available_sizes,
              color: res.data.product_detail
                ? res.data.product_detail.color_name
                : "",
              size: res.data.product_detail ? res.data.product_detail.size : "",
              multicolorSizeArr: [
                {
                  color: res.data.product_detail
                    ? res.data.product_detail.color_name
                    : "",
                  size_to_buy: sizes,
                },
              ],
              available_sizes_color_combination:
                res.data.available_sizes_color_combination,
              loading: false,
            },
            () => {
              //add current product detail in redux
              context.props.addProductDetail(res.data.product_detail);
              if (this.props.location.state && this.props.location.state.flag) {
                if (this.props.user.loggedIn) {
                  context.props.getEditProductDetail(
                    {
                      id: this.props.location.state.id,
                      flag: this.props.location.state.flag,
                    },
                    (res) => {
                      if (res.status) {
                        context.setState(
                          {
                            multicolorSizeArr:
                              res.data.color_size_arr &&
                              res.data.color_size_arr.length
                                ? JSON.parse(res.data.color_size_arr)
                                : this.state.res.data.multicolorSizeArr,
                            embelleshing_type:
                              res.data.decorating_method !== null
                                ? res.data.decorating_method
                                : "",
                            color: res.data.color,
                            size: res.data.size,
                            fileList:
                              res.data.customized_product_details &&
                              res.data.customized_product_details !== null &&
                              res.data.customized_product_details.length
                                ? JSON.parse(
                                    res.data.customized_product_details
                                  )
                                : this.state.fileList,
                            multicolorChecked:
                              res.data.color_size_arr &&
                              res.data.color_size_arr.length &&
                              JSON.parse(res.data.color_size_arr)
                                ? true
                                : false,
                          },
                          () => {
                            let fileList = _.mapObject(
                              this.state.fileList,
                              (obj, key) => {
                                let target = document.querySelector(
                                  `#canvas_${key}`
                                );
                                if (target) {
                                  target.style.transform =
                                    `translate(${
                                      obj.translate.length
                                        ? obj.translate[0]
                                        : 0
                                    }px, ${
                                      obj.translate.length
                                        ? obj.translate[1]
                                        : 0
                                    }px)` + ` rotate(${obj.rotate}deg)`;
                                }
                                return obj;
                              }
                            );
                            this.setState({ fileList: fileList });
                            let values = Object.values(this.state.fileList);
                            let total_colors = 0;
                            _.each(values, (obj) => {
                              if (obj.fileList.length && obj.confirmDesign) {
                                const color_count =
                                  obj.currentEmbellishingColors.length;
                                total_colors = total_colors + color_count;
                              }
                            });
                            let no_of_color =
                              total_colors >= 5 ? 5 : total_colors;
                            let product_price_details = getPriceAccordingSize(
                              this.state.available_sizes_color_combination,
                              this.state.multicolorSizeArr,
                              no_of_color,
                              this.state.embelleshing_type,
                              this.state.productDetail.setup_fee
                            );
                            if (product_price_details) {
                              this.setState({
                                item_price: product_price_details[0].item_price.toFixed(
                                  2
                                ),
                                total_price: product_price_details[0].markup_cost.toFixed(
                                  2
                                ),
                                setup_price:
                                  product_price_details[0].setup_cost,
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  // start get data without login
                  let index = this.props.location.state.index;
                  let resData = this.props.cart.cart[index];
                  context.setState(
                    {
                      multicolorSizeArr:
                        resData.color_size_arr && resData.color_size_arr.length
                          ? resData.color_size_arr
                          : this.state.resData.multicolorSizeArr,
                      embelleshing_type:
                        resData.decorating_method !== null
                          ? resData.decorating_method
                          : "",
                      color: resData.color,
                      size: resData.size,
                      fileList: resData.customized_product_details
                        ? resData.customized_product_details
                        : this.state.fileList,
                      // resData.customized_product_details &&
                      // resData.customized_product_details !== null &&
                      // resData.customized_product_details.length
                      //   ? resData.customized_product_details
                      //   : this.state.fileList,
                      multicolorChecked:
                        resData.color_size_arr &&
                        resData.color_size_arr.length &&
                        resData.color_size_arr
                          ? true
                          : false,
                      // item_price: resData.item_price,
                      // total_price: resData.total_price,
                      // setup_price: resData.setup_price,
                    },
                    () => {
                      let fileList = _.mapObject(
                        this.state.fileList,
                        (obj, key) => {
                          let target = document.querySelector(`#canvas_${key}`);
                          if (target) {
                            target.style.transform =
                              `translate(${
                                obj.translate.length ? obj.translate[0] : 0
                              }px, ${
                                obj.translate.length ? obj.translate[1] : 0
                              }px)` + ` rotate(${obj.rotate}deg)`;
                          }
                          return obj;
                        }
                      );
                      this.setState({ fileList: fileList });
                      let values = Object.values(this.state.fileList);
                      let total_colors = 0;
                      _.each(values, (obj) => {
                        if (obj.fileList.length && obj.confirmDesign) {
                          const color_count = obj.currentEmbellishingColors ? 
                            obj.currentEmbellishingColors.length:0;
                          total_colors = total_colors + color_count;
                        }
                      });
                      let no_of_color = total_colors >= 5 ? 5 : total_colors;
                      let product_price_details = getPriceAccordingSize(
                        this.state.available_sizes_color_combination,
                        this.state.multicolorSizeArr,
                        no_of_color,
                        this.state.embelleshing_type,
                        this.state.productDetail.setup_fee
                      );
                      if (product_price_details) {
                        this.setState({
                          item_price: product_price_details[0].item_price.toFixed(
                            2
                          ),
                          total_price: product_price_details[0].markup_cost.toFixed(
                            2
                          ),
                          setup_price: product_price_details[0].setup_cost,
                        });
                      }
                    }
                  );
                  // end without login
                }
              }
              //get similar products
              let companion_styles = this.state.productDetail
                ? (this.state.productDetail.companion_styles)?this.state.productDetail.companion_styles.split("|"):[]
                : [];
              companion_styles = _.filter(companion_styles, (ele) => {
                return this.state.productDetail
                  ? ele !== this.state.productDetail.style
                  : ele;
              });
              companion_styles = _.uniq(companion_styles);
              if (companion_styles.length) {
                context.props.getSimilarProducts(
                  { styles: companion_styles },
                  (res) => {
                    if (res.status) {
                      context.setState({ similarProducts: res.data });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {

    console.log(1)
    if (
      (prevProps.match &&
        prevProps.match.params &&
        prevProps.match.params.product_id) !==
      (this.props.match &&
        this.props.match.params &&
        this.props.match.params.product_id)
    ) {
      this.getProductsAndSimilar();
    }
  }

  addToCart = (flag) => {
    if (flag !== "sample") {
      let params = {
        product_id: this.state.productDetail.id,
        user_id: this.props.user.loggedIn ? this.props.user.id : "",
      };
      let values = Object.values(this.state.fileList);
      values = _.filter(
        values,
        (obj) => obj.fileList.length > 0 && obj.confirmDesign
      );
      if (values.length === 0) {
        message.error(`You need to upload your design`);
        return false;
      }
      if (this.state.embelleshing_type.length == 0) {
        message.error(`Choose your decorating method`);
        return false;
      }
      let total = 0;
      let val = _.filter(this.state.multicolorSizeArr, (obj) => {
        return _.keys(obj.size_to_buy).length === 0;
      });
      if (val.length > 0) {
        message.error(`You need to select size quantity`);
        return false;
      } else {
        _.each(this.state.multicolorSizeArr, (obj) => {
          const size_arr = Object.values(obj.size_to_buy);
          const total_size_count = size_arr.reduce(function (a, b) {
            return Number(a) + Number(b);
          }, 0);

          total = total + total_size_count;
        });
        if (total < this.state.productDetail.moq) {
          message.error(
            `Minimum order quantity is ${this.state.productDetail.moq}`
          );
          return false;
        }
      }
      params.quantity = total;
      params.decorating_method = this.state.embelleshing_type;
      params.customized_image = "";
      params.color = this.state.color;
      params.size = this.state.size;
      params.color_size_arr = this.state.multicolorSizeArr;
      params.customized_product_details = this.state.fileList;
      params.category = 1; //as custom
      params.setup_cost = this.state.setup_price;
      params.total_price = this.state.total_price;
      params.expire_date = getTimeStampExpire();
      params.piece_price = this.state.productDetail.piece_price;
      params.product_custom_front = this.state.front_custom_image;
      params.product_custom_back = this.state.back_custom_image;
      if (this.props.user.loggedIn) {
        params = { ...params, type: 1 };
        let body = new FormData();
        _.mapObject(params, (obj, key) => {
          if (
            key == "customized_product_details" ||
            key == "sizes_quantity" ||
            key == "color_size_arr"
          ) {
            body.append(key, JSON.stringify(obj));
          } else {
            body.append(key, obj);
          }
          return;
        });
        this.props.addToCartService(body, (res) => {
          if (res.status == true) {
            if (!res.data.flag) {
              params = {
                ...params,
                id: res.data.id,
                customized_image: res.data.customized_image,
              };
              params = { ...params, product_data: this.state.productDetail };
              this.props.addToCart(params);
              this.props.history.push("/cart");
            } else if (res.data.flag == "product_not_avl") {
              message.error(res.data.message);
              this.props.history.push("/");
            } else if (res.data.flag == "quantity_not_avl") {
              message.error(res.data.message);
            } else {
              message.error(res.message);
            }
          } else {
            message.error(res.message);
          }
        });
      } else {
        params = { ...params, product_data: this.state.productDetail };
        this.props.addToCart(params);
        this.props.history.push("/cart");
      }
    } else {
      let params = {
        product_id: this.state.productDetail.id,
        user_id: this.props.user.loggedIn ? this.props.user.id : "",
      };
      let total = 0;
      let val = _.filter(this.state.multicolorSizeArr, (obj) => {
        return _.keys(obj.size_to_buy).length === 0;
      });
      if (val.length > 0) {
        message.error(`You need to select size quantity`);
        return false;
      } else {
        _.each(this.state.multicolorSizeArr, (obj) => {
          const size_arr = Object.values(obj.size_to_buy);
          const total_size_count = size_arr.reduce(function (a, b) {
            return Number(a) + Number(b);
          }, 0);

          total = total + total_size_count;
        });
        if (total < this.state.productDetail.moq) {
          message.error(
            `Minimum order quantity is ${this.state.productDetail.moq}`
          );
          return false;
        }
      }
      params.quantity = total;
      params.color = this.state.color;
      params.size = this.state.size;
      params.color_size_arr = this.state.multicolorSizeArr;
      params.category = 2; //as sample
      params.expire_date = getTimeStampExpire();
      params.piece_price = this.state.productDetail.piece_price;
      params.customized_product_details = this.state.fileList;
      params.decorating_method = this.state.embelleshing_type;

      // start get costing

      let values = Object.values(this.state.fileList);
      let total_colors = 0;
      _.each(values, (obj) => {
        if (obj.fileList.length && obj.confirmDesign) {
          const color_count = obj.currentEmbellishingColors.length;
          total_colors = total_colors + color_count;
        }
      });
      let no_of_color = total_colors >= 5 ? 5 : total_colors;
      let product_price_details = getPriceAccordingSize(
        this.state.available_sizes_color_combination,
        this.state.multicolorSizeArr,
        no_of_color,
        this.state.embelleshing_type,
        this.state.productDetail.setup_fee
      );
      if (product_price_details) {
        this.setState({
          item_price: product_price_details[0].item_price.toFixed(2),
          total_price: product_price_details[0].markup_cost.toFixed(2),
          setup_price: product_price_details[0].setup_cost,
        });
        params.item_price = product_price_details[0].item_price.toFixed(2);
        params.total_price = product_price_details[0].markup_cost.toFixed(2);
        params.setup_cost = product_price_details[0].setup_cost;
      }

      //end

      if (this.props.user.loggedIn) {
        params = { ...params, type: 1 };
        // added for order sample start
        let body = new FormData();
        _.mapObject(params, (obj, key) => {
          if (
            key == "customized_product_details" ||
            key == "sizes_quantity" ||
            key == "color_size_arr"
          ) {
            body.append(key, JSON.stringify(obj));
          } else {
            body.append(key, obj);
          }
          return;
        });
        // end if u need change (body replece with params)
        this.props.addToCartService(body, (res) => {
          if (res.status == true) {
            if (res.status && !res.data.flag) {
              params = {
                ...params,
                id: res.data.id,
                customized_image: res.data.customized_image,
              };
              params = { ...params, product_data: this.state.productDetail };
              this.props.addToCart(params);
              this.props.history.push("/cart");
            } else if (res.data.flag == "product_not_avl") {
              message.error(res.data.message);
              this.props.history.push("/");
            } else if (res.data.flag == "quantity_not_avl") {
              message.error(res.data.message);
            } else {
              message.error(res.message);
            }
          } else {
            message.error(res.message);
          }
        });
      } else {
        params = {
          ...params,
          // id: this.props.location.state.id,
          product_data: this.state.productDetail,
        };
        this.props.addToCart(params);
        this.props.history.push("/cart");
      }
      // else {
      //   let values = Object.values(this.state.fileList);
      //   let total_colors = 0;
      //   _.each(values, (obj) => {
      //     if (obj.fileList.length && obj.confirmDesign) {
      //       const color_count = obj.currentEmbellishingColors.length;
      //       total_colors = total_colors + color_count;
      //     }
      //   });
      //   let no_of_color = total_colors >= 5 ? 5 : total_colors;
      //   if (no_of_color) {
      //     let product_price_details = getPriceAccordingSize(
      //       this.state.available_sizes_color_combination,
      //       this.state.multicolorSizeArr,
      //       no_of_color,
      //       this.state.embelleshing_type
      //     );
      //     if (product_price_details) {
      //       this.setState({
      //         item_price: product_price_details[0].item_price.toFixed(2),
      //         total_price: product_price_details[0].markup_cost.toFixed(2),
      //         setup_price: product_price_details[0].setup_cost,
      //       });
      //     }
      //     params = {
      //       ...params,
      //       product_data: this.state.productDetail,
      //       item_price: this.state.item_price,
      //       total_price: this.state.total_price,
      //       setup_cost: this.state.setup_price,
      //     };
      //     this.props.addToCart(params);
      //     this.props.history.push("/cart");
      //   } else {
      //     let product_price_details = getPriceAccordingSize(
      //       this.state.available_sizes_color_combination,
      //       this.state.multicolorSizeArr,
      //       no_of_color,
      //       this.state.embelleshing_type
      //     );
      //     if (product_price_details) {
      //       params = {
      //         ...params,
      //         product_data: this.state.productDetail,
      //         item_price: product_price_details[0].item_price.toFixed(2),
      //         total_price: product_price_details[0].markup_cost.toFixed(2),
      //         setup_cost: product_price_details[0].setup_cost,
      //       };
      //       this.props.addToCart(params);
      //       this.props.history.push("/cart");
      //     }
      //   }
      // }
    }
  };

  addToWishlist = () => {
    if (this.props.user.loggedIn) {
      let params = {
        product_id: this.state.productDetail.id,
        token: this.props.user.loginToken,
      };
      this.props.addToWishlistService(params, (res) => {
        if (res.status) {
          this.props.history.push("/wishlist");
        } else {
          message.error(res.message);
        }
      });
    } else {
      message.error("You need to login to add this product in wishlist");
    }
  };

  getProductInfoByStyleColorSize = (flag, ele) => {
    if (this.state.multicolorChecked && flag == "color") {
      let multicolorSizeArr = this.state.multicolorSizeArr;
      // start change for edit update color section
      multicolorSizeArr[0].color = ele;
      this.setState({
        color: ele,
        multicolorSizeArr: multicolorSizeArr,
      });
      this.getProductByColorSizeStyleFromDB(flag, ele);
      // end change for edit update color section

      // let color_exists = _.findWhere(multicolorSizeArr, { color: ele });
      // console.log("color_exists", color_exists);
      // if (
      //   color_exists &&
      //   this.state.color == ele &&
      //   multicolorSizeArr.length === 1
      // ) {
      //   return false;
      // }
      // if (color_exists) {
      //   if (
      //     color_exists.color == this.state.color &&
      //     multicolorSizeArr.length > 1
      //   ) {
      //     this.getProductByColorSizeStyleFromDB(
      //       flag,
      //       multicolorSizeArr[multicolorSizeArr.length - 1].color
      //     );
      //   }
      //   let color_exists_index = _.findIndex(multicolorSizeArr, { color: ele });
      //   multicolorSizeArr.splice(color_exists_index, 1);
      // } else {
      //   multicolorSizeArr.push({ color: ele, size_to_buy: null });
      // }
      // this.setState({ multicolorSizeArr });
    } else {
      this.getProductByColorSizeStyleFromDB(flag, ele);
    }
  };

  revertToOrignal = (img) =>{
    const image  = this.state.fileListOrginal &&
    this.state.fileListOrginal[img] &&
    this.state.fileListOrginal[img]
      .currentEmbellishingUrl
      ? this.state.fileListOrginal[img]
          .urlBase64
      : "";

      let fileList = this.state.fileList;
    fileList[img] = {
          ...fileList[img],
          message: " ",
          state: "uploaded",
          currentEmbellishingUrl: image,
          urlBase64: image,
        };
        this.setState({ fileList: fileList, currentEmbellishingArea: img });


  }
  changeColor = (color,img) => 
  {

    this.setState({loadchange:true});
     const image  = this.state.fileList &&
                this.state.fileList[img] &&
                this.state.fileList[img]
                  .currentEmbellishingUrl
                  ? this.state.fileList[img]
                      .urlBase64
                  : "";
    //console.log(image);

   

    const data = new FormData();
    data.append('image', image);
    data.append('color', color);
    data.append('ela_area', img);


    
     
    this.props.changeColors(data, (res) => {
      if (res.status == true) {
       var  response = res.data;
       var base64data = response.data;
       var ele = response.ela_area;
      // var ele = response.ela_area;

       console.log(ele);
        let fileList = this.state.fileList;
        fileList[ele] = {
          ...fileList[ele],
          message: " ",
          state: "uploaded",
          currentEmbellishingUrl: base64data,
          urlBase64: base64data,
        };
        this.setState({ fileList: fileList, currentEmbellishingArea: ele,isOrignal:false });
      } else {
        message.error(res.message);
      }
    this.setState({loadchange:false});

    });
  }

  getProductInfoByStyleColorSizeService = (flag, ele) => {
    let context = this,
      params = {};
    context.setState({ loadingByColor: true });
    params["style"] = this.state.productDetail.style;
    params = { ...params, color: this.state.color, size: this.state.size };
    if (flag == "color") {
      this.setState({ color: ele });
      params = { ...params, color: ele };
    }
    if (flag == "size") {
      this.setState({ size: ele });
      params = { ...params, size: ele };
    }
    context.props.getProductInfoByStyleColorSize(params, (res) => {
      if (res.status) {
        context.setState(
          { productDetail: res.data.product_detail, loadingByColor: false },
          () => {
            //add current product detail in redux
            context.props.addProductDetail(res.data.product_detail);
          }
        );
      }
    });
  };

  getProductByColorSizeStyleFromDB = (flag, ele) => {
    let context = this,
      params = {};
    context.setState({ loadingByColor: true });
    params["style"] = this.state.productDetail.style;
    params["size"] = this.state.productDetail.size;
    params = { ...params, color: this.state.color };
    if (flag == "color") {
      this.setState({ color: ele });
      params = { ...params, color: ele };
    }
    if (flag == "size") {
      this.setState({ size: ele });
      params = { ...params, size: ele };
    }
    context.props.getProductByColorSizeStyleFromDB(params, (res) => {
      if (res.status) {
        context.setState(
          { productDetail: res.data.product_detail, loadingByColor: false },
          () => {
            //add current product detail in redux

            console.log(res.data.product_detail,"== add detail in redux");
            context.props.addProductDetail(res.data.product_detail);
            console.log(res.data.product_detail.size);
            context.setState({available_sizes: res.data.product_detail.available_sizes})
         context.getProductsbyId(res.data.product_detail.id)
            /*context.setState({ multicolorSizeArr: [
              {
                color: res.data.product_detail
                  ? res.data.product_detail.color_name
                  : "",
                size_to_buy: res.data.product_detail.size,
              }
            ]
          }); */
          }
        );
      }
    });
  };

  calculatePercentage = (qty,currentQty,percentage) =>
  {
   var per = (Number(percentage) * Number(qty)) / 100;
   return per+qty;
  }

  reCalculateItemPrice = (itemPrice,decrease) => {
    // /console.log(parseFloat(itemPrice));
   var dec = (Number(decrease) * Number(itemPrice)) / 100;

   console.log(dec);

  return Number(itemPrice) - Number(dec);

  }


  // updateSizeCount = (flag, size) => {
  //    let size_to_buy = this.state.size_to_buy;
  //    if(flag == 'decrement' && size_to_buy[size] == 0){
  //       return;
  //    }
  //    if(flag === 'increment'){
  //       if(size_to_buy == null){
  //          size_to_buy = {};
  //          size_to_buy[size] = 1;
  //       }else if(!size_to_buy[size]){
  //          size_to_buy[size] = 1;
  //       }else{
  //          size_to_buy[size] = this.state.size_to_buy[size] + 1;
  //       }
  //    }else{
  //       size_to_buy[size] = this.state.size_to_buy[size] - 1;
  //    }
  //    this.setState({size_to_buy: size_to_buy});
  // }

  handleChangeQty = (size, index, flag) => {
   
    let multicolorSizeArr = this.state.multicolorSizeArr;
  console.log(multicolorSizeArr,"=== size array")
    let obj = multicolorSizeArr[index];
    let size_to_buy = obj.size_to_buy;
    let val = parseInt(size_to_buy[size]);
    if (flag == "INC") {
      val = val + 1;
      this.handleCount(val, size, index);
    } else {
      
      val = val - 1;
      if (val == -1) {
        message.error(`You reached to minimum quantity.`);
        return false;
      } else this.handleCount(val, size, index);
    }
  };

  handleCount = (e, size, index) => {
    const regex = /^\d+$/;
    //check if input does not contains only numbers or input is alphanumeric
    if (!regex.test(e)) {
      return;
    }
    let multicolorSizeArr = this.state.multicolorSizeArr;
    let obj = multicolorSizeArr[index];
    let size_to_buy = obj.size_to_buy;
    if (size_to_buy == null) {
      size_to_buy = {};
      size_to_buy[size] = e;
    } else {
      size_to_buy[size] = e;
    }
    multicolorSizeArr[index] = { ...obj, size_to_buy };
    // let context = this;
    // let values = Object.values(this.state.fileList);
    // values = _.filter(
    //   values,
    //   (obj) => obj.fileList.length > 0 && obj.confirmDesign
    // );
    let qty_chck = 0;

    
    Object.values(multicolorSizeArr[index].size_to_buy).forEach((elem) => {
      qty_chck = qty_chck + Number(elem);
    });
    let item_price = 0,
      total_price = 0;
    if (qty_chck >= this.state.productDetail.moq) {
      this.setState({ qty_error: false });
      let values = Object.values(this.state.fileList);
      let total_colors = 0;
      _.each(values, (obj) => {
        if (obj.fileList.length && obj.confirmDesign) {
          const color_count = (_.isArray(obj.currentEmbellishingColors))?obj.currentEmbellishingColors.length:1;
          total_colors = total_colors + color_count;
        }
      });
      let no_of_color = total_colors >= 5 ? 5 : total_colors;
      if (no_of_color) {
        let product_price_details = getPriceAccordingSize(
          this.state.available_sizes_color_combination,
          multicolorSizeArr,
          no_of_color,
          this.state.embelleshing_type,
          this.state.productDetail.setup_fee
        );
        console.log(qty_chck);

       
       
        if (product_price_details) {
          console.log(product_price_details[0].item_price);
          var item_p = 0;
          var total_p = 0;
          var percentage25 = this.calculatePercentage(this.state.productDetail.moq,qty_chck,25);
          console.log(percentage25);
          console.log(qty_chck);

          if(qty_chck >= percentage25){
          item_p =  this.reCalculateItemPrice(product_price_details[0].item_price,2);
          total_p = item_p * qty_chck;
          }

          // 50 percnete
          var percentage50 = this.calculatePercentage(this.state.productDetail.moq,qty_chck,50);

          if(qty_chck >=  percentage50){
            item_p =  this.reCalculateItemPrice(product_price_details[0].item_price,4);
          total_p = item_p * qty_chck;

            }

        // 75 percente    

        var percentage75 = this.calculatePercentage(this.state.productDetail.moq,qty_chck,75);
        if(qty_chck >= percentage75){
          item_p =  this.reCalculateItemPrice(product_price_details[0].item_price,6);
          total_p = item_p * qty_chck;

          }

       // 100 percente   
      
       var percentage100 = this.calculatePercentage(this.state.productDetail.moq,qty_chck,100);

       if(qty_chck  >= percentage100){
        item_p =  this.reCalculateItemPrice(product_price_details[0].item_price,8);
        total_p = item_p * qty_chck;

        }

        // 125 

        var percentage125 = this.calculatePercentage(this.state.productDetail.moq,qty_chck,125);

        if(qty_chck  >= percentage100){
         item_p =  this.reCalculateItemPrice(product_price_details[0].item_price,10);
         total_p = item_p * qty_chck;
 
         }

        console.log(item_p);

          this.setState({
            multicolorSizeArr,
            item_price: (item_p !== 0) ? item_p.toFixed(2):product_price_details[0].item_price.toFixed(2),
            total_price: (total_p !== 0) ? total_p.toFixed(2):product_price_details[0].markup_cost.toFixed(2),
            setup_price: (qty_chck >= '100') ? 0 : Number(this.state.productDetail.setup_fee),
          });
        }
      } else {
        this.setState({ multicolorSizeArr, item_price, total_price });
      }
    } else {
      this.setState({
        multicolorSizeArr,
        item_price,
        total_price,
        qty_error: true,
      });
    }
  };

  onTextChange(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent,
    });
  }

  uploadDesign = async (file, ele) => {
    let context = this;
    let fileList = this.state.fileList;
    let fileListOrginal = this.state.fileListOrginal;
    fileListOrginal[ele] = {
      ...fileListOrginal[ele],
      fileListOrginal: [],
      message: "Uploading design...",
    };


    this.setState({ fileList: fileList,fileListOrginal:fileListOrginal });
    //update inner fileList of upload component
    let updatedFileList = file.fileList.filter(
      (file) => file.status !== "error"
    );
    fileList[ele] = { ...fileList[ele], fileList: updatedFileList };
    this.setState({ fileList: fileList });
    //checking for only one file as allowing only one file upload for now for every product customization
    if (
      updatedFileList.length &&
      updatedFileList[0].status == "done" &&
      file.fileList.length <= 1
    ) {
      this.setState({uploading:false})
      let url = window.URL.createObjectURL(updatedFileList[0].originFileObj);
      var base64data;
      var reader = new FileReader();
      reader.readAsDataURL(updatedFileList[0].originFileObj);
      reader.onload = async function () {
        base64data = reader.result;
        fileList[ele] = {
          ...fileList[ele],
          message: " ",
          state: "uploaded",
          currentEmbellishingUrl: url,
          urlBase64: base64data,
        };

     //   let fileListOrginal = context.fileListOrginal;
        fileListOrginal[ele] = {
              ...fileListOrginal[ele],
              message: " ",
              state: "uploaded",
              currentEmbellishingUrl: url,
              urlBase64: base64data,
            };
            // this.setState({ fileListOrginal: fileListOrginal, currentEmbellishingArea: img });


        context.setState({ fileList: fileList, currentEmbellishingArea: ele,fileListOrginal: fileListOrginal,isEditColor:true });
        //Extracting colors from image
       //context.extractColors(ele);
       context.confirmAndAddDesign()
       
      };
    } else {
      //error case
      fileList[ele] = { ...fileList[ele], state: "uploaded", message: "" };
      this.setState({ fileList: fileList });
      this.setState({uploading:false})
    }
  };

  extractColors = (ele) => {
    let fileList = this.state.fileList;
    fileList[ele] = { ...fileList[ele], message: "" };
    this.setState({ fileList: fileList, showColorModal: false }); //for the time being for single image , we are setting embelleshing area and image. Futuristically if multiple image upload then will see other alternate
    
    setTimeout(
      () => this.confirmAndAddDesign(), 
      10000
    );
  };

  handleOkColorModal = (e) => {
    this.setState({
      showColorModal: false,
    });
  };

  handleCancelColorModal = (e) => {
    this.setState({
      showColorModal: false,
    });
  };

  handleShowColorModal = (e) => {
    this.setState({
      showColorModal: true,
    });
  };

  getColors = (colors) => {
    let fileList = this.state.fileList;
    fileList[this.state.currentEmbellishingArea] = {
      ...fileList[this.state.currentEmbellishingArea],
      currentEmbellishingColors: colors,
      message: "",
    };
    this.setState({ fileList: fileList });
  };

  renderSwatches = () => {
    const { fileList, currentEmbellishingArea } = this.state;
    const colors =
      fileList &&
      fileList[currentEmbellishingArea] &&
      fileList[currentEmbellishingArea].currentEmbellishingColors
        ? fileList[currentEmbellishingArea].currentEmbellishingColors
        : [];

        
       
    return (
      <div>
        <div className="product-modal-body">
        <div className="product-modal-left-outer">
            <div className="product-modal-left  side-accordian-bottom">
              { 1 > 10000 ? (
                <div>
                  <div className="product-modal-title ">
                    This product has a color limit
                  </div>
                  <div className="product-modal-subtitle">
                    We noticed your design has more than
                    <span> 5 colors.</span> This product only allows a
                    <span> 5 colors</span> print. Please remove some colors or
                    <span> upload a new design</span>
                  </div>
                </div>
              ) : (
                <div className="accordian-side-title">
                  We have detected  pantone color::
                </div>
              )}
              {colors.map((color, id) => (
                
                <div key={id} className="color-div-outer">

             
                  <hr class="accordian-hr"/>
                  <div class="sideaccordian-inner accordian-side-titlediv">
                      <div class="sideaccordian-title"><span className="color-div"
                    style={{
                      backgroundColor: color,
                      // width: '50px',
                      // height: '27px',
                      cursor: "pointer",
                    }}></span>  {color}</div>
                    </div>
                   
            
                   
                  {/* <div
                    className="color-div"
                    style={{
                      backgroundColor: color,
                      // width: '50px',
                      // height: '27px',
                      cursor: "pointer",
                    }}
                    
                  />
                  <span>{color}</span> */}

                  
                    

                  <Button
                    className="delete-color-btn"
                    onClick={() =>
                      this.changeColor(color, currentEmbellishingArea)
                    }
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </Button>
                </div>
              ))}
              <hr class="accordian-hr"/>
                    <div class="accordian-side-title">Select color:</div>
                    <div class="add-color-outer">
                    <SketchPicker
                        color={ this.state.background }
                        onChangeComplete={ this.handleChangeComplete }
                      />
                    </div>
                    <a class="confirm-btn" href="#" onClick={ this.handleCancelColorModal }>confirm</a>
            </div>
          
          </div>
          <div className="product-modal-right">
          {this.state.loadchange ? (<img src={loaderImg} height="100px"/>):""}

            <img
              className="product-modal-right-img"
              src={
                this.state.fileList &&
                this.state.fileList[currentEmbellishingArea] &&
                this.state.fileList[currentEmbellishingArea]
                  .currentEmbellishingUrl
                  ? this.state.fileList[currentEmbellishingArea]
                      .currentEmbellishingUrl
                  : ""
              }
              alt={currentEmbellishingArea}
            />
            { this.state.isOrignal ? "":(<a class="confirm-btn revert-btn" href="#" onClick={() => this.revertToOrignal(currentEmbellishingArea)}>Revert to Original</a>
              )}
          </div>
        </div>
      </div>
    );
  };

  deleteColor = (id, currentEmbellishingArea) => {
    const { fileList } = this.state;
    const colors =
      fileList &&
      fileList[currentEmbellishingArea] &&
      fileList[currentEmbellishingArea].currentEmbellishingColors
        ? fileList[currentEmbellishingArea].currentEmbellishingColors
        : [];
    if (colors.length <= 1) {
      return false;
    }
    colors.splice(id, 1);
    fileList[currentEmbellishingArea] = {
      ...fileList[currentEmbellishingArea],
      currentEmbellishingColors: colors,
    };
    this.setState({ fileList: fileList });
  };

  confirmAndAddDesign = () => {
    let fileList = this.state.fileList;
    console.log(fileList,"== file list")
    console.log( fileList[this.state.currentEmbellishingArea],"== file list current")
    fileList[this.state.currentEmbellishingArea] = {
      ...fileList[this.state.currentEmbellishingArea],
      confirmDesign: true,
    };
    //set selectedItem as well for slider w.r.t to design area
    console.log(this.state.productDetail.product_images,"== product images")
    let index = _.findIndex(this.state.productDetail.product_images, {
      area: this.state.currentEmbellishingArea,
    });
   
    console.log(index,"=== product image index");
    this.setState(
      { fileList, showColorModal: false, selectedItem: index },
      () => {
        let qty_chck = 0;
        Object.values(this.state.multicolorSizeArr[0].size_to_buy).forEach(
          (elem) => {
            qty_chck = qty_chck + Number(elem);
          }
        );
        let item_price = 0,
          total_price = 0;
        if (qty_chck >= this.state.productDetail.moq) {
          this.setState({ qty_error: false });
          let values = Object.values(this.state.fileList);
          let total_colors = 0;
          _.each(values, (obj) => {
            if (obj.fileList.length && obj.confirmDesign) {
              const color_count = (_.isArray(obj.currentEmbellishingColors))?obj.currentEmbellishingColors.length:1;
              total_colors = total_colors + color_count;
            }
          });
          let no_of_color = total_colors >= 5 ? 5 : total_colors;
          if (no_of_color) {
            let product_price_details = getPriceAccordingSize(
              this.state.available_sizes_color_combination,
              this.state.multicolorSizeArr,
              no_of_color,
              this.state.embelleshing_type,
              this.state.productDetail.setup_fee
            );
            if (product_price_details) {
              this.setState({
                item_price: product_price_details[0].item_price.toFixed(2),
                total_price: product_price_details[0].markup_cost.toFixed(2),
                setup_price: product_price_details[0].setup_cost,
              });
            }
          } else {
            this.setState({ item_price, total_price });
          }
        } else {
          this.setState({ item_price, total_price, qty_error: true });
        }
        // let values = Object.values(this.state.fileList);
        // let total_colors = 0;
        // _.each(values, (obj) => {
        //   if (obj.fileList.length && obj.confirmDesign) {
        //     const color_count = obj.currentEmbellishingColors.length;
        //     total_colors = total_colors + color_count;
        //   }
        // });
        // let qty = 0, total_base_price = 0;
        // _.each(this.state.multicolorSizeArr, obj=>{
        //    let size_arr = Object.values(obj.size_to_buy);
        //    let size_arr_key = Object.keys(obj.size_to_buy);
        //    const total_size_count = size_arr.reduce(function(a, b){
        //                   return Number(a) + Number(b);
        //                }, 0);
        //    qty = qty + total_size_count;
        //    _.each(size_arr_key, (obj1)=>{
        //       const price = _.findWhere(this.state.available_sizes_color_combination, {color_name: obj.color, size: obj1});
        //       total_base_price = total_base_price + price;
        //    });
        // })
        // // let item_price = this.state.item_price, total_price = this.state.total_price;
        // // item_price = getItemPrice(this.state.decorating_method, total_colors, qty, total_base_price);
        // // total_price = getTotalPrice(qty, item_price);
        this.setState({});
      }
    );
  };

  handleStop(e2, ele) {
    let fileList = this.state.fileList;
    fileList[ele.area] = {
      ...fileList[ele.area],
      position: { x: e2.layerX, y: e2.layerY },
    };
    this.setState({ fileList });
  }

  embelleshingType = (e) => {
    this.setState({ embelleshing_type: e });
  };

  saveDesign = (e) => {
    
    e.preventDefault();
    if (this.props.user.loggedIn) {
      let values = Object.values(this.state.fileList);
      values = _.filter(
        values,
        (obj) => obj.fileList.length > 0 && obj.confirmDesign
      );
      if (values.length === 0) {
        message.error(`You need to upload your design`);
        return false;
      }
      let total = 0;
      let val = _.filter(this.state.multicolorSizeArr, (obj) => {
        return _.keys(obj.size_to_buy).length === 0;
      });
      if (val.length === 0) {
        //means there is no size object which is empty
        _.each(this.state.multicolorSizeArr, (obj) => {
          const size_arr = Object.values(obj.size_to_buy);
          const total_size_count = size_arr.reduce(function (a, b) {
            return Number(a) + Number(b);
          }, 0);

          total = total + total_size_count;
        });
      }
      let params = {
        product_id: this.state.productDetail.id,
        token: this.props.user.loginToken,
      };
      params.quantity = total;
      params.decorating_method = this.state.embelleshing_type;
      params.customized_image = "";
      params.color = this.state.color;
      params.size = this.state.size;
      params.color_size_arr = this.state.multicolorSizeArr;
      params.customized_product_details = this.state.fileList;
      params.item_price = this.state.item_price;
      params.total_price = this.state.total_price;
      params.setup_cost = this.state.setup_cost;
      this.props.saveMockup(params, (res) => {
        if (res.status) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    } else {
      message.error("You need to login to save design");
    }
  };

  shareDesign = (e) => {
    e.preventDefault();
   //this.getScreenShot(e);
    //return;
    let values = Object.values(this.state.fileList);
    values = _.filter(
      values,
      (obj) => obj.fileList.length > 0 && obj.confirmDesign
    );
    if (values.length === 0) {
      message.error(`You need to upload your design`);
      return false;
    }
    let val = _.filter(this.state.multicolorSizeArr, (obj) => {
      return _.keys(obj.size_to_buy).length === 0;
    });
    if (val.length > 0) {
      message.error(`You need to select size quantity`);
      return false;
    }
    let total = 0;
    _.each(this.state.multicolorSizeArr, (obj) => {
      const size_arr = Object.values(obj.size_to_buy);
      const total_size_count = size_arr.reduce(function (a, b) {
        return Number(a) + Number(b);
      }, 0);

      total = total + total_size_count;
    });
    if (total < this.state.productDetail.moq) {
      message.error(
        `Minimum order quantity is ${this.state.productDetail.moq}`
      );
      return false;
    }
    this.setState({ showShareDesignModal: true });
  };

  getScreenShot = (type) => {
    //let text = document.getElementById("cnvs_Front");
    //console.log(text.innerHTML);
    //alert(text.innerHTML);
console.log(type,"=== type screenshot")
   

    html2canvas(document.getElementById("cnvs_"+type),{scrollY: -window.scrollY, useCORS : true, logging: true,
      useCORS : true}).then((canvas) => {
      //let context = canvas.getContext('2d');


      // save canvas image as data url (png format by default)
   //  console.log(canvas.toDataURL('image/jpeg',1));
        if(type=='Front')
        {
        this.setState({front_custom_image:canvas.toDataURL('image/jpeg',1)})
        }
        else
        {
          this.setState({back_custom_image:canvas.toDataURL('image/jpeg',1)})
        }
      /*console.log(canvas,"=== canvas");
      console.log(canvas.width,"=== width")
      console.log(canvas.height,"===")
      console.log(canvas.toDataURL("image/jpeg", 1));*/
    });
  };



  

  handleOkShareDesignModal = (e) => {
    this.setState({
      showShareDesignModal: false,
    });
  };

  handleCancelShareDesignModal = (e) => {
    this.setState({
      showShareDesignModal: false,
    });
  };

  saveChanges = (e) => {
    //console.log(this.state.productDetail);
   
    const context = this.state;
    let params = {
      id: this.props.location.state.id,
      product_id: this.state.productDetail.id,
    };
    let values = Object.values(this.state.fileList);
    values = _.filter(
      values,
      (obj) => obj.fileList.length > 0 && obj.confirmDesign
    );
    if (values.length === 0) {
      message.error(`You need to upload your design`);
      return false;
    }
    if (this.state.embelleshing_type.length == 0) {
      message.error(`Choose your decorating method`);
      return false;
    }
    let total = 0;
    let val = _.filter(this.state.multicolorSizeArr, (obj) => {
      return _.keys(obj.size_to_buy).length === 0;
    });
    if (val.length > 0) {
      message.error(`You need to select size quantity`);
      return false;
    } else {
      _.each(this.state.multicolorSizeArr, (obj) => {
        const size_arr = Object.values(obj.size_to_buy);
        const total_size_count = size_arr.reduce(function (a, b) {
          return Number(a) + Number(b);
        }, 0);

        total = total + total_size_count;
      });
      if (total < this.state.productDetail.moq) {
        message.error(
          `Minimum order quantity is ${this.state.productDetail.moq}`
        );
        return false;
      }
    }
    params.quantity = total;
    params.decorating_method = this.state.embelleshing_type;
    params.customized_image = "";
    params.color = this.state.color;
    params.size = this.state.size;
    params.color_size_arr = this.state.multicolorSizeArr;
    params.customized_product_details = this.state.fileList;
    params.setup_cost = this.state.setup_price;
    params.total_price = this.state.total_price;
    params.expire_date = getTimeStampExpire();
    params.piece_price = this.state.item_price;

    // // start details
    // let color_arr = Object.values(this.state.fileList);
    // let total_colors = 0;
    // _.each(color_arr, (obj) => {
    //   if (obj.fileList.length && obj.confirmDesign) {
    //     const color_count = obj.currentEmbellishingColors.length;
    //     total_colors = total_colors + color_count;
    //   }
    // });
    // let no_of_color = total_colors >= 5 ? 5 : total_colors;
    // let product_price_details = getPriceAccordingSize(
    //   this.state.available_sizes_color_combination,
    //   this.state.multicolorSizeArr,
    //   no_of_color,
    //   this.state.embelleshing_type
    // );
    // if (product_price_details) {
    //   this.setState({
    //     item_price: product_price_details[0].item_price.toFixed(2),
    //     total_price: product_price_details[0].markup_cost.toFixed(2),
    //     setup_price: product_price_details[0].setup_cost,
    //   });
    //   params.item_price = product_price_details[0].item_price.toFixed(2);
    //   params.total_price = product_price_details[0].markup_cost.toFixed(2);
    //   params.setup_cost = product_price_details[0].setup_cost;
    // }
    // // end details

    if (this.props.location.state.flag == "cart") {
      if (this.props.user.loggedIn) {
        let body = new FormData();
        _.mapObject(params, (obj, key) => {
          if (
            key == "customized_product_details" ||
            key == "sizes_quantity" ||
            key == "color_size_arr"
          ) {
            body.append(key, JSON.stringify(obj));
          } else {
            body.append(key, obj);
          }
          return;
        });
        this.props.updateCartService(body, (res) => {
          if (res.status) {
            params = {
              ...params,
              id: this.props.location.state.id,
              index: this.props.location.state.index,
              product_data: context.productDetail,
            };
            this.props.updateCart(params);
            this.props.history.push("/cart");
          } else {
            message.error(res.message);
          }
        });
      } else {
        params = {
          ...params,
          product_data: context.productDetail,
          index: this.props.location.state.index,
        };
        this.props.updateCart(params);
        this.props.history.push("/cart");
      }
    }
  };

  onChangeColorToggle = () => {
    let data;
    if (this.state.multicolorChecked) {
      data = {
        ...data,
        color: this.state.multicolorSizeArr.length
          ? this.state.multicolorSizeArr[
              this.state.multicolorSizeArr.length - 1
            ].color
          : this.state.color,
        multicolorSizeArr: [
          this.state.multicolorSizeArr[this.state.multicolorSizeArr.length - 1],
        ],
      };
      if (this.state.color !== data.color) {
        this.getProductInfoByStyleColorSizeService("color", data.color);
      }
    }
    this.setState({
      ...data,
      multicolorChecked: !this.state.multicolorChecked,
    });
  };

  imageUpload = async (ele) => {
    let baseImage = new Image();
    baseImage.setAttribute("crossOrigin", "anonymous");
    baseImage.src = ele;
    var canvas = document.createElement("canvas");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    var ctx = canvas.getContext("2d");
    await ctx.drawImage(baseImage, 0, 0);
    var dataURL = await canvas.toDataURL("image/png");
    return dataURL;
  };

  description = (str) => {
    var originalString = str;
    console.log(originalString);
    const strippedString = originalString.replace(/(<([^>]+)>)/gi, "");

    return strippedString;
  }

  getTotal = (p) =>{
    var pr = parseFloat(p);
    return pr.toFixed(2);
 
  }
 
  newgetBase64Image = (url) => {
    console.log("newgetBase64Image");
    let b64 = getBase64Image(url);
    console.log("b64", b64);
    return b64;
  };

  render() {
    const { frame ,zoomHighet,zoomWidth,isZoomed,zoomstyle} = this.state;
    console.log(this.state.available_sizes,"=== sizes")
    let embelleshing_area =
      this.state.productDetail &&
      this.state.productDetail.embelleshing_area.length
        ? JSON.parse(this.state.productDetail.embelleshing_area)
        : [];
    let embelleshing_type =
      this.state.productDetail &&
      this.state.productDetail.embelleshing_type.length
        ? JSON.parse(this.state.productDetail.embelleshing_type)
        : [];
    let context = this;
    let values = Object.values(this.state.fileList);
    values = _.filter(
      values,
      (obj) => obj.fileList.length > 0 && obj.confirmDesign
    );
   
    return (
      <main>
        {this.state.loading ? (
          <Spin />
        ) : (
          <div>
            <Modal
              className="product-detail-modal"
              visible={this.state.showColorModal}
              onOk={this.handleOkColorModal}
              onCancel={this.handleCancelColorModal}
              footer={null}
            >
              <div>
                <ColorExtractor
                  src={
                    this.state.fileList &&
                    this.state.fileList[this.state.currentEmbellishingArea] &&
                    this.state.fileList[this.state.currentEmbellishingArea]
                      .currentEmbellishingUrl
                      ? this.state.fileList[this.state.currentEmbellishingArea]
                          .currentEmbellishingUrl
                      : ""
                  }
                  getColors={this.getColors}
                />
                <div>{this.renderSwatches()}</div>
              </div>
            </Modal>
            <Modal
              className="product-detail-modal"
              visible={this.state.showShareDesignModal}
              onOk={this.handleOkShareDesignModal}
              onCancel={this.handleCancelShareDesignModal}
              footer={null}
            >
              <ShareDesignModal
                product_id={
                  this.state.productDetail
                    ? this.state.productDetail.id.toString()
                    : this.props.match.params.product_id
                }
                size_to_buy={this.state.multicolorSizeArr}
                item_price={this.state.item_price}
                total_price={this.state.total_price}
                customized_product_details={this.state.fileList}
                handleCancelShare={this.handleOkShareDesignModal}
              />
            </Modal>
            <section className="product-detail-page">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product_left_side">
                      <div className="product_des">
                        <h2
                          dangerouslySetInnerHTML={{
                            __html: this.state.productDetail
                              ? this.state.productDetail.product_title.replace(
                                  this.state.productDetail.style,
                                  ""
                                )
                              : "",
                          }}
                        ></h2>
                        <p className="mb-0">
                          Starting at: $
                          {this.state.productDetail
                            ? this.state.productDetail.piece_price
                            : ""}
                        </p>
                        <p className="mb-0">
                          Min Qty:
                          {this.state.productDetail
                            ? this.state.productDetail.moq
                            : 0}
                        </p>
                        <p className="mb-0">
                          Setup  Cost: $
                          {this.state.setup_price
                            }
                        </p>
                      </div>
                      <div className="share-save-outer">
                        <ul>
                          <li>
                            <a href="#" onClick={(e) => this.saveDesign(e)}>
                              <i
                                className="fa fa-download"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={(e) => this.shareDesign(e)}>
                              <i
                                className="fa fa-share-alt"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          {!_.filter(_.values(this.state.fileList), (obj) => {
                            return obj.fileList.length;
                          }) && (
                            <li>
                              <a href="#" onClick={() => this.addToWishlist()}>
                                <i
                                  className="fa fa-heart-o heart-custom"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>

                  
      

                      
      
   
                      <div className="product_images" id="images" style={zoomstyle}>
                        
                  


                         
                      {/*<img id="image-screenshot" src='http://localhost:3000/download.jpg' /> */}
                        {!this.state.loadingByColor &&
                        this.state.productDetail &&
                        this.state.productDetail.product_images.length ? (
                         
                          <Carousel
                          preventMovementUntilSwipeScrollTolerance={true}
                            showIndicators={false}
                            showArrows={false}
                            showStatus={false}
                            autoPlay={false}
                            swipeable={false}
                            infiniteLoop={false}
                            showThumbs={true}
                            selectedItem={this.state.selectedItem}
                            renderThumbs={ () => 
                              this.renderCustomThumbs(this.state.productDetail.product_images)
                               }
                            onClickThumb={(e) => {
                              this.setState({ selectedItem: e });
                            }}

                            onChange ={(index)  => {
                              if (index !== this.state.selectedItem) {
                                this.setState({selectedItem: index});
                              }
                            }
                          }

                      onClickItem ={ (index) => {

                        return;
                        console.log(11111111);
                              // Prevent clicking from changing selectedItem
                              if (index == this.state.selectedItem) {
                        console.log(222222);

                                setTimeout(() => this.forceUpdate());
                              }
                            }
                          }
                            
                          >
                            {this.state.productDetail.product_images.map(
                              (ele, i) => (
                                <div key={i} id={`cnvs_${ele.area}`}>


                                
                                 

                                {/* <SideBySideMagnifier
                                      imageSrc={ele.image}
                                      imageAlt="Example"
                                      id={`parent_${ele.area}`}
                                      
                                    /> */}

                                    <ReactImageZoom   {...{width: 400, zoomWidth: 500,img:ele.image,id:`parent_${ele.area}` }}  /> 
                                  
                                    
                                    {/* <img
                                    id={`parent_${ele.area}`}
                                     //src='https://s3-us-east-2.amazonaws.com/time-s3-bucket/dl/9fbd8c25b7ff0cbb60755d266d94ddf8-back'
                                   src={ele.image}
                                   crossOrigin="anonymous"
                                   //src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAJYBAMAAAAOPokQAAAAG1BMVEXMzMwAAAB/f39MTEyysrJmZmYZGRmZmZkzMzN1E+ztAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAMxklEQVR4nO3dQXfj1nUAYFkiRS3DuJ56KdV2k6VZxcdZjuJY9dKyM02W1mnreFkl8ayHcZz+7RCkSBDAfe+BME/sQ3zfZiRhRNwHXFw8AO9BZ2cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAT8nsg9vb2y/+L7V48qcvb7+7/eLlPzGivZV/cPvr21e/SKy8EHlx+Yic397+Kl4y+cN84/twQ822i+ffv8yv4s+3tz8wyNzK3+8uLUReXD4qD/P5v4QLzpfbbTx/97qzdPLLee3d/HZ8nM+PEWkcW5B/+cjLy0flYp5IgNnj3jZ+0d7Ds/09sNqOLwurOFq8a+ePjbX/6yGRl5ePyuQxlQCLzfb5erO13m4ubO2B+fydzDpujp0Az9n34uuvwwTIRt5j+ai8nicS4H5dXP+y+uo/1yfM/9lfuNn/L76vumCTb9e748PkKibzYyfAzS62s998+dhOgGzkPZaPynSeSIB1Zfjd8zefVt/sl8rL6rf++nL77b9XJ4HkOq6OnQDVKeXFNrazyXvNBMhHXl4+Lqtq+HaYANVhUl8cfNKqs5f7e+BskwHJEvBw7ARYVZwX13vfn3+8vzQfeXn5qHy2av77UQJMWoV1daZ48bL+9rLV75+s9snPE+uYzY+cAFf5E04+8uLyUam6w3+cRAlwFWy2N/W3l+3rvmqnvDwLrY645VETYJFOtrNi5MXlo3JTbYwwAW7afaP7Rkf/onPaXCaPysX83btjJsB5/qxdiLy4fEyqztSbsygBJt2uU/oQX7tP3k5aLThqAtxlT9qlyA9v2emqTtzvnIUJcNE9Km7ylfI8dUG92l/XR02AZbYAlCI/vGWnq+oOX8cJcNfdJleF3nLqdu/jKjGOmQDTbA+gGPmAlp2q6lz6x7M4ARbdo2xSuGf2EB+YF9Up95gJEOzBfaXIB7TsVD0838EPEiDcJIv8qXK1Yz4PfvxUbfBjJsBDNoxS5ENadqJ2V9NBAkyjHl1iD29dhkfm6iLrnbNjJsAk32cvRT6kZaepuvzdbMkgAcKducqYrzIfeBEuvlp/0hETYJqPohT5kJadpte7y6EgAe7WvcOWWb6vtOpS/Kz7003BPmICXEah1UqRD2nZSZrVT8GCBHgId9hjtvjOouI623TZj5gAT/mPKkU+pGUnaVo/vgsSYBl2ixeZJ36JBLjc9DOOmACL/L4qRT6kZSdpWvd7ggSIL7Vvsp3lMAEW8xfVP/kEuI4/L15X6objbnE+8iEtO0nTekN0EyDcl4nzZ/aXzp9PrtkEuIgP6dfhOI1Zvr9WinxQy07StB4K102ARE/7Mnu1FG3b++ffyCbAIvzU2WP4kHaav2IrRT6oZSdp+rfdl90EuIif7F1k78FFVwHL53NrLgGCm/OV1/FQrav8+J1S5INadpJm9ZfdBEgcEOfZ8hscXNPtTswlQHU90l1bNVIh2lVv5buTpcgHtezUdRPgrfgwS5xAnwVH0dP2c7KngKeoBLxO3J9/yvfXS5EPatmp6ybAXaJTnL1fEhxcu8vrbAJEJSBVAFb99W2yzKqZYR/9pbm4FPmglp26bgKkbrY85h7E3nUOrrom5C8DgxKQKgCrHuMmhNl/Pc9H+O/GSkuRD2rZqesmwM3m6r1jmbsJ073HVl9d5xOgWwKSBWC1p9axflrPS2mMTi5FPqhlp66bAA+JE218G+3ZY3vhpL7pUrgT2CkByQJwtrnU+GS+by95SpEPatmp6ybAIll/05tp1rnHdlUfxYUEaJeAdAGYrLvrm9ks39ze/nozQak+C5QiH9Kyk9c/AVLHT6X7NPihHn5dehbQKgHpAjBbj2KtpqL977r7N3mvSoE680qRD2nZyesmQOqMmNtMnUEV+89YSwnQLAHpAlBdsH+4fpK9mwu0nqW4+91S5ENadvK6CZB6OprqQlU6w6ru9/ZL8WlgowSkC0BV/D+cNaZ2rTNg97ulyIe07ORFCRBfFGU2U3es3f4j1mIC7JeATAFYPwq434xl3flsXj/KKUU+oGWnr38CZAZjXLQ/5Hz/B+XxAHslIFMAqtV8/th+G8WiPtmUIh/QstN3lAR4ancBGk9YywlQl4BcAagS4L3OLefVD7fHrwQY4CgJ8NiuoY3bAj1GBO1KQK4AVJeWweid5S77JMAA3QRI3RlPb6bOdJ3mVWGPBNiWgGwB2Lxr4qv2T+t5iaXID2/ZCBwjAZ7adfmp8WSgz5jA5xKQLQCbN5O8bP+0npcoAQY4wilg8th6ycKkeb3VJwE2JSBfANYJEFzI7d4/4BQwwBES4Kp9BrhqVoReo4LXJSBfANYJ8FX4q9frLyTAAEe4D/DQPmwfmhWhVwJUJeD3+QKwToBgSM9uvo/7AAP88AQ4n7cWtKfa9JsX8LR+xpN9KnMZv8xhuh2PKAEG6P8sILWZ7tqf0B4d1C8BNm+TyhWA6oOjm/aTbcKVIj+0ZaPwgx8GVfNMm4OB2tfqPWcGPZUKQJUAYWjbPqeHQQP84MfBl+0u4Hn7E3smQPXKijfZ/3GZuI5bFp73exycESVAvDkSm2/Zrtv37Yk2PRPgdXyRt+cqMXy33sH5yA9s2ThEQ8IOGTl30TkvdwZY9ewDPM7jTn7tKpyDXp/DS5Ef1rKRiAaFHjJ2dtGu29POpJ5+CbB+b3V+T1wkE2De+LdtG/lhLRuJ/sPCwxPwRfsasHUbuNLvPsCqAHxcKAGpBNhGXIr8oJaNRTgxJJo/E75StLoJ1Dreu8NueiXA+iZgOE2oNi0kQCnyg1o2FuHcwOvgP4YvgZl23rUczBHr9SxgfRMwnim4H0K4p7YJUIr8kJaNRjcBruLbMdPoIq1bAFY744t/a3rY/SgdxvNTgHwJSE3i2yZAKfJDWjYa4fsB3gT/Mdp63QKw+XMeKckoto8B8yVgkjhZb68CSpEf0LLx6CZAoiK+FdTPRXca/7AE2D0GzJeAxLDe7X2AUuQHtGw8ugmQOM6eug9iLoK/tjAoAepxAPkSkLhjs/1xKfL+LRuRoAscH2fBXZSgAAxLgL1xANkSkLiTs7uRU4q8d8tGJEiARbhBOtM/O399Y/N5v+1YXQU8f5WIYX8gULYEPMXXcbunEaXI+7ZsTIIECDfzpPuKtWXPv7lWvAxsDATKlYC3wuSoLw5Kkfdt2ZjE7wru9oq7N2E+6/v3lopzAxsDgXIlIH4jcf1+olLkPVs2KkECdOb5VDrbrhoH8LfOf4uUEqA1EjBTAs7DXlwdWinyfi0blyABZtEeuGlXz/vcX4tsKL0foDUSMFcCHqN11oW9FHm/lo1LdCN8GdT29uSfare96beKQgJ0hgJnSsBDtLOWdWilyPu0bGSiBHjqHoKdyT83/f/SSuEdQZ2hwJkScBdk3f5hXYq8T8tGJkqAYOjVXav7dZ69YdP53czSYC5AugRELxa93AutFHmPlo1NlACzzkP+s/bIz4cD/t5i/j2BwVyAdAmI/srfYu9ObinyHi0bm/Bh+KJdadsDv6o/OnnddxXZBAgnA6VLwEPn3sO0EVop8mLLRidMgPv2Xmnf9F0eMogmlwDxbMB0CejefXxoNKAUebFloxMmQLUD9q/xq3nZ+3XyvvF2tpJcAlzEfcmn1CCd6hzQeEVMqxaVIi8tH594PNRNYw/PHpslufr+gMMmewpYhndhZsndskqN/ZdEVaE0OvH5yMvLRydOgKqT//Z2O00WrYr8NG+/qCcrmwBX8cXkU+oMU0U2370fdrZsd0bykZeXj05iRGT1VPfd99df/qbayI0CUH3/quOL1Cryl4HX4U9nybpclYD5f7xcf/1tNZegdRWfi7zP8rFJJMBmmsY3H7368u/VF40z/nn8sD95P63nzKC+AS/XK/vu1avNq2LbtSgXeZ/lY5MaE918I/Ov9hf9uAnw/K7gnU4Fz0Tea/nIJAfFf7a3lf6/seRHToCzT/dX+rvu8nTk/ZaPS3pWxO6t/O2N/GMnwNn5crvOt6+j5cnIey5nY/LB31db6pvnDtdPyrfV+f/Fd79ILC5F/hNuGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwPj8A2P/ShIQ2dMNAAAAAElFTkSuQmCC"
                                     //onLoad={() => this.newgetBase64Image(ele.image)}
                                     
                                  />  */}
                                    
                                   
                                   
                                     
                                
                                  
                                  
                                  
                                 
                                  <div
                                    id={`outer_div_drag_${ele.area}`}
                                    style={{
                                      // border: this.state.fileList[ele.area] && this.state.fileList[ele.area].confirmDesign ? '1px solid cadetblue': 'none',
                                      width:
                                        ele.area == "Side" ? "70px" : "20%",
                                      backgroundColor: "transparent",
                                      position: "absolute",
                                      top: ele.area == "Side" ? "-152px" : 0,
                                      bottom: 0,
                                      left: ele.area == "Side" ? "92px" : 0,
                                      right: 0,
                                      margin: "auto",
                                      border:"none",
                                    }}
                                  >
                                    {this.state.fileList[ele.area] &&
                                      this.state.fileList[ele.area]
                                        .confirmDesign && (
                                        <div>
                                          <Moveable
                                            target={document.querySelector(
                                              `#canvas_${ele.area}`
                                            )}
                                            dragTarget={document.querySelector(
                                              `#outer_div_drag_${ele.area}`
                                            )}
                                            origin={false}
                                            edge={true}
                                            keepRatio={true}
                                            draggable={true}
                                            throttleDrag={0}
                                            resizable={true}
                                            throttleResize={0}

                                            rotatable={true}
                                            rotationPosition={"top"}
                                            throttleRotate={0}
                                            onDragStart={({ set }) => {
                                              set(frame.translate);
                                            }}
                                            onDrag={({ beforeTranslate }) => {
                                              frame.translate = beforeTranslate;
                                              let fileList = this.state.fileList;
                                              fileList[ele.area] = {
                                                ...fileList[ele.area],
                                                translate:beforeTranslate
                                              };
                                            }}
                                            onResizeStart={({ setOrigin, dragStart }) => {
                                              setOrigin(["%", "%"]);
                                              dragStart && dragStart.set(frame.translate);
                                            }}
                                            onResize={({ target, width, height, drag }) => {
                                              frame.translate = drag.beforeTranslate;
                                              target.style.width = `${width}px`;
                                              target.style.height = `${height}px`;

                                             
                                             
                                            }}
                                            onRotateStart={({ set }) => {
                                              set(frame.rotate);
                                            }}
                                            onRotate={({ beforeRotate }) => {
                                              frame.rotate = beforeRotate;

                                              let fileList = this.state.fileList;
                                             fileList[ele.area] = {
                                               ...fileList[ele.area],
                                               rotate:beforeRotate
                                             };
                                             this.setState({ fileList });
                                              
                                            }}
                                            onRender={({ target }) => {

                                              target.style.transform = `translate(${frame.translate[0]}px, ${
                                                frame.translate[1]
                                              }px) rotate(${frame.rotate}deg)`;


                                            }}
                                            onDragEnd={({ target,isDrag,clientX, clientY, }) => {
                                              
                                              var t = target;

                                              console.log(target);
                                              let st = t.getAttribute('style');
                                            let stl = this.getStyleObjectFromString(st);



                                           //  console.log(stl);

                                             let fileList = this.state.fileList;
                                             fileList[ele.area] = {
                                               ...fileList[ele.area],
                                               style:stl,
                                             };
                                             this.setState({ fileList });

                                              // console.log(clientX);
                                              // console.log(clientX);
                                              this.getScreenShot(ele.area);
                                            }}
                                           
                                          ></Moveable>
                                         
                                          <img
                                            id={`canvas_${ele.area}`}
                                            className="canvas_img_class"
                                            src={
                                              this.props.user.loggedIn
                                                ? this.state.fileList &&
                                                  this.state.fileList[
                                                    ele.area
                                                  ] &&
                                                  this.state.fileList[ele.area]
                                                    .currentEmbellishingUrl
                                                  ? this.state.fileList[
                                                      ele.area
                                                    ].currentEmbellishingUrl
                                                  : ""
                                                : this.state.fileList[ele.area]
                                                    .urlBase64
                                            }
                                            style={this.state.fileList[ele.area]
                                              .style}
                                          />
                                        </div>
                                      )}
                                  </div>
                                  
                                  
                                </div>
                              )
                            )}
                            {/* <div>
                              <img src='https://marketing.sanmar.com/imglib/mresjpg/2019/f11/OG105_navy_model_front_082019.jpg' />
                              <p className="legend">Legend 2</p>
                           </div>
                           <div>
                              <img src='https://cdnl.sanmar.com/imglib/mresjpg/2015/f4/203697_black_model_front_022015.jpg' />
                              <p className="legend">Legend 3</p>
                           </div> */}
                          </Carousel>
                        ) : (
                          <Spin />
                        )}
                      </div>
                      {this.state.isEditColor ? (<div class="side-accordian">
         <div id="main">
              <div class="container">
            <div class="accordion" id="faq">
                  <div class="card">
                      <div class="card-header" id="faqhead1">
                          <a href="#" class="btn btn-header-link" onClick={(e) => this.handleShowColorModal(e)}
                         >
                              <div class="sideaccordian-inner">
                                <div class="sideaccordian-title"><span class="colorSpan"></span>Edit Colors</div>
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                              </div>
                          </a>
                      </div>

                    
                  </div>
                
              </div>
                </div>
              </div>
      </div>):""}
                    </div>
                    
                  </div>
                  <div className="col-md-6 dd">
                    <div className="product_right_side">
                      {/* <div className="">
                        <Button
                          className="login-btn product-view-more add-cart-btn"
                          onClick={() => this.addToCart("sample")}
                        >
                          {this.props.intl.formatMessage({
                            id: "order_sample",
                          })}
                        </Button>
                      </div> */}
                      <div className="color_selection mt-4">
                        <p className="steps">
                          Step <span>1</span>
                        </p>
                        <h5 className="heading_steps">Choose Your Color</h5>
                        {/* <div>
                          <label> Multiple colors:</label> &nbsp;
                          <Switch
                            checked={this.state.multicolorChecked}
                            className={
                              this.state.multicolorChecked
                                ? `multi-color-checkbox`
                                : ""
                            }
                            onChange={() => this.onChangeColorToggle()}
                          />
                        </div> */}
                      </div>
                      {this.state.available_colors.length ? (
                        <div className="custom-radios">
                          {this.state.available_colors.map((ele, i) => (
                            <label
                              key={i}
                              className={`color1 checked_click ${
                                ele.color_name === this.state.color
                                  ? "active"
                                  : ""
                              } 
                              ${
                                this.state.multicolorChecked &&
                                _.findWhere(this.state.multicolorSizeArr, {
                                  color: ele.color_name,
                                })
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <img
                                src={
                                  ele.color_square_image.length &&
                                  ele.color_square_image.includes("https")
                                    ? ele.color_square_image
                                    : ele.url + ele.color_square_image
                                }
                                onClick={(e) =>
                                  this.getProductInfoByStyleColorSize(
                                    "color",
                                    ele.color_name
                                  )
                                }
                              />
                              <div className="button"></div>
                              <div className="color_name">{ele.color_name}</div>
                            </label>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="step_design mt-4">
                        <p className="steps">
                          Step <span>2</span>
                        </p>
                        <p>
                              Note:
                              <span className="mt-5">
                              All pricing includes 1 color/1 location logo only
                              </span>
                          </p>
                        <h5 className="heading_steps">Upload Your Design</h5>
                        <div className="design_section">
                          <div className="row">
                            {embelleshing_area.length
                              ? embelleshing_area.map((ele, i) => (
                                  <div key={i} className="col-md-12">
                                    <div className="design_style upload_button">
                                      {/* <img src="images/svg/shirt-front.svg" /> */}
                                      <Upload
                                       
                                       
                                        fileList={
                                          this.state.fileList[ele] &&
                                          this.state.fileList[ele].fileList
                                            .length
                                            ? this.state.fileList[ele].fileList
                                            : []
                                        }
                                        accept=".jpg,.png,.jpeg"
                                        customRequest={
                                          this.state.fileList[ele] &&
                                          this.state.fileList[ele].fileList
                                            .length >= 1
                                            ? failedRequest
                                            : dummyRequest
                                        }
                                        // showUploadList={false}
                                        multiple={false}
                                        beforeUpload={(file) => {
                                          let allFiles = this.state.fileList;
                                          if (
                                            allFiles[ele] &&
                                            allFiles[ele].fileList.length >= 1
                                          ) {
                                            message.error(
                                              "Uploaded files can't exceed 1, please re-select"
                                            );
                                            // return false;
                                          }
                                          return (
                                            allFiles[ele] &&
                                            allFiles[ele].fileList.length <= 1
                                          );
                                        }}
                                        onChange={(file) => {
                                          this.uploadDesign(file, ele);
                                          this.setState({uploading:true});
                                          
                                        }}

                                        
                                        onRemove={(file) => {
                                          this.setState((state) => {
                                            let fileList =
                                              state.fileList[ele] &&
                                              state.fileList[ele].fileList
                                                .length
                                                ? state.fileList[ele].fileList
                                                : [];
                                            const index = _.findIndex(
                                              fileList,
                                              { uid: file.uid }
                                            );
                                            fileList.splice(index, 1);
                                            state.fileList[ele] = {
                                              ...state.fileList[ele],
                                              fileList,
                                              state: "",
                                              confirmDesign: false,
                                            };
                                            return {
                                              fileList: state.fileList,
                                            };
                                          });
                                        }}
                                       
                                      
                                        
                                      >
                                        {this.state.fileList[ele] &&
                                        this.state.fileList[ele].state ==
                                          "uploaded" ? (
                                            <Button> {ele} </Button>
                                        ) : (
                                         <Button >Upload {ele} Design</Button> 
                                        )}

                                      </Upload>
                                    </div>
                                    <span>
                                      {this.state.fileList[ele] &&
                                        this.state.fileList[ele].message}
                                    </span>
                                  </div>
                                ))
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="step_design mt-4">
                        <p className="steps">
                          Step <span>3</span>
                        </p>
                        <h5 className="heading_steps">
                          Choose your decorating method
                        </h5>
                        <div className="design_section">
                          <div className="row">
                            {embelleshing_type.length
                              ? embelleshing_type.map((ele, i) => (
                                  <div
                                    key={i}
                                    className="product_btn_section d-flex justify-content-center align-items-center print-btn-outer"
                                  >
                                    <Button
                                      onClick={(e) =>
                                        this.embelleshingType(ele)
                                      }
                                      className="common_btn_product" style={(ele==this.state.embelleshing_type) ? this.state.styleSelected:this.state.styleUnSelected}
                                    >
                                      {ele}
                                    </Button>
                                  </div>
                                ))
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="step_design mt-4">
                        <p className="steps">
                          Step <span>4</span>
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="heading_steps">
                            {/* I Would Like <input type="number" id="printed_input" placeholder="101" /> Printed  */}
                            Min Qty:
                            {this.state.productDetail
                              ? this.state.productDetail.moq
                              : 0}
                          </h5>
                        </div>
                      </div>
                      {this.state.multicolorSizeArr.length ? (
                        <div className="size_select">
                          {this.state.multicolorSizeArr.map((ele11, i11) => (
                            <div key={i11} className="multi-sizes">
                              {this.state.multicolorChecked ? (
                                <span className="multi-size-color-label">
                                  {ele11.color}
                                </span>
                              ) : (
                                ""
                              )}
                              {this.state.available_sizes.length ? (
                                <div className="size_select">
                                  <div className="list_size">
                                    <ul className="d-flex align-items-center">
                                      {this.state.available_sizes.map(
                                        (ele, i) => (
                                          <li
                                            key={i}
                                            // className={`${
                                            //   ele.size === this.state.size
                                            //     ? "active"
                                            //     : ""
                                            // }`}
                                          >
                                            <div
                                              className="size_text"
                                              //   onClick={(e) => this.getProductInfoByStyleColorSize('size', ele.size)}
                                            >
                                              {ele.size}
                                            </div>
                                            {/* <div className="shape_top">
                                              <i className="fa fa-sort-up"></i>
                                            </div> */}
                                            <div className="shape_plus_icon">
                                              <i
                                                className="fa fa-plus-circle"
                                                onClick={(e) =>
                                                  this.handleChangeQty(
                                                    ele.size,
                                                    i11,
                                                    "INC"
                                                  )
                                                }
                                              ></i>
                                            </div>
                                            <input
                                              type="text"
                                              className="size_numeric size-input-custom"
                                              title={
                                                ele11.size_to_buy &&
                                                ele11.size_to_buy[ele.size]
                                                  ? ele11.size_to_buy[ele.size]
                                                  : 0
                                              }
                                              value={
                                                ele11.size_to_buy &&
                                                ele11.size_to_buy[ele.size]
                                                  ? ele11.size_to_buy[ele.size]
                                                  : 0
                                              }
                                              onChange={(e) =>
                                                this.handleCount(
                                                  e.target.value,
                                                  ele.size,
                                                  i11
                                                )
                                              }
                                              disabled={
                                                _.findWhere(
                                                  this.state
                                                    .available_sizes_color_combination,
                                                  {
                                                    color_name: ele11.color,
                                                    size: ele.size,
                                                  }
                                                )
                                                  ? false
                                                  : true
                                              }
                                            ></input>
                                            {/* <i className="fa fa-sort-up" onClick={()=> this.updateSizeCount('increment', ele.size)}></i>
                                    <i className="fa fa-sort-down" onClick={()=> this.updateSizeCount('decrement', ele.size)}></i> */}
                                            <div className="shape_plus_icon">
                                              <i
                                                className="fa fa-minus-circle"
                                                onClick={(e) =>
                                                  this.handleChangeQty(
                                                    ele.size,
                                                    i11,
                                                    "DEC"
                                                  )
                                                }
                                              ></i>
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                      {/* <div className="text-center">
                        <div className="text_how">
                          <h4>
                            <span className="back-to-last">
                              <span className="back-to-front">? </span>
                            </span>
                            how to upload a logo
                          </h4>
                        </div>
                      </div> */}
                      {this.state.qty_error ? (
                        <div className="text-center">
                          <div className="text_how">
                            <h4 className="text-danger">
                              <span className="back-to-last">
                                <span className="back-to-front">X</span>
                              </span>
                              You cannot order less than&nbsp;
                              {this.state.productDetail &&
                                this.state.productDetail.moq}
                            </h4>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* <div className="tab_add_text">
                          <nav>
                             <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Add text</a>
                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">add number</a>
                             </div>
                          </nav>
                          <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                             <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                             <CKEditor 
                                 activeClass="p10" 
                                 content={this.state.content} 
                                 events={{
                                    "change": this.onTextChange
                                 }}
                              />
                             </div>
                             <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <input type='number' className="form-control" placeholder="Add Number" />
                             </div>
                          </div>
                       </div> */}
                      {/* <div className="price_offer text-center">
                          <a href="#">
                          <img src="images/price-offer.png" />
                          </a>
                       </div> */}
                      <div className="cart-btn-outer11">
                        {values.length !== 0 ? (
                          <div>
                            <div className="item_price_div">
                              <span>
                                Item Price:
                                <span className="item_price_div_span1">
                                  $
                                  {this.state.productDetail
                                    ? this.state.item_price
                                    : 0}
                                </span>
                              </span>
                            </div>
                            <div className="total_price_div">
                              <span>
                                Total:
                                <span className="item_price_div_span2">
                                  $
                                  {/* {this.state.productDetail
                                    ? (this.state.total_price).toFixed(2)
                                    : 0} */}
                                    {this.getTotal(this.state.productDetail
                                    ? (this.state.total_price)
                                    : 0)}
                                </span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                          <p>
                            Starting at:
                            <span className="item_price_div_span2">
                              $
                              {this.state.productDetail
                                ? this.state.productDetail.piece_price
                                : ""}
                            </span>
                          </p>
                          <br></br>
                         
                          </div>
                        )}
                         
                        {this.props.location.state &&
                        this.props.location.state.flag == "cart" ? (
                          <Button
                            className="login-btn product-view-more add-cart-btn"
                            onClick={(e) => this.saveChanges(e)}
                          >
                            {this.props.intl.formatMessage({
                              id: "saveChanges",
                            })}
                          </Button>
                        ) : (
                          <Button
                            className="login-btn product-view-more add-cart-btn"
                            onClick={() => this.addToCart()}
                          >
                            {this.props.intl.formatMessage({
                              id: "addToCart",
                            })}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              
            </section>
            <section className="products_list">
              <div className="container">
                {this.state.similarProducts.length ? (
                  <div className="row">
                    <div className="col-md-12">
                      <h2>You might also like...</h2>
                    </div>
                    {this.state.similarProducts.map((ele, i) => (
                      <div key={i} className="col-md-3">
                        <div className="product_list_sec">
                          <div className="product_img shadow text-center">
                            <Link to={`/product-detail/${ele["id"]}`}>
                              <img
                                src={ele.front_model_image_url}
                                alt="product"
                              />
                            </Link>
                          </div>
                          <div className="product_ctn">
                            <div
                              className="product-name"
                              dangerouslySetInnerHTML={{
                                __html: ele.product_title.replace(
                                  ele["style"],
                                  ""
                                ),
                              }}
                            ></div>
                            <div className="d-flex align-items-center justify-content-between">
                              <p>Starting at: ${ele.piece_price}</p>
                              <p>Min Qty: {ele.moq}</p>
                           
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
            <section style={{marginBottom:"50px"}}>
              <div className="container">
                  <div className="row">
                      <h3 style={{color:"#32a1aa"}}>Description: </h3><br/>                   
                  </div>
                  <div className="row">
                  <p>{ this.description(this.state.productDetail
                                ? this.state.productDetail.product_description
                                : "") }
                     </p>  
                  </div>
              </div>

            </section>
            
            {/* <section className="cta_section">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-8 text-left">
                    <h3>Stay up to date on new product releases!!</h3>
                  </div>
                  <div className="col-md-4 text-right">
                    <p className="mb-0">
                      <a href="#" className="subscibe_btn">
                        SUBSCRIBE
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section> */}
          </div>
        )}
        
      </main>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user, cart: state.cart });
const mapDispatchToProps = (dispatch) => ({
  getProductDetail: bindActionCreators(getProductDetail, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch),
  addProductDetail: bindActionCreators(addProductDetail, dispatch),
  addToCartService: bindActionCreators(addToCartService, dispatch),
  addToWishlistService: bindActionCreators(addToWishlistService, dispatch),
  getSimilarProducts: bindActionCreators(getSimilarProducts, dispatch),
  getProductInfoByStyleColorSize: bindActionCreators(
    getProductInfoByStyleColorSize,
    dispatch
  ),
  getProductByColorSizeStyleFromDB: bindActionCreators(
    getProductByColorSizeStyleFromDB,
    dispatch
  ),
  saveMockup: bindActionCreators(saveMockup, dispatch),
  getEditProductDetail: bindActionCreators(getEditProductDetail, dispatch),
  updateCartService: bindActionCreators(updateCartService, dispatch),
  updateCart: bindActionCreators(updateCart, dispatch),
  changeColors: bindActionCreators(changeColors, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ProductDetail));