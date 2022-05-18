import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import product_img from '../../Images/product_img_1.jpg';
import no_img from "../../Images/no-img.jpg";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import _ from "underscore";
import { Modal, message } from "antd";
import { production_time } from "../../Config/connection";
import { getTimeStamp } from "../../../utilities/universal";
import { updateCart } from "../../../actions/cart";
import { getTimeStampExpire } from "../../../utilities/universal";

import {
  removeFromCart,
  addInSaveForLater,
  addToCart,
  removeFromSaveLater,
  addToCartService,
  removeFromCartService,
  makePaymentService,
} from "../../../actions/cart";
import { checkProductDetails } from "../../../actions/products";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visibleRemoveCart: false,
      visibleRemoveSaveLater: false,
      cart_item_index: "",
      product_id: "",
      cart_id: "",
      order_amount: 0,
      refersh_btn: false,
    };
  }

  componentDidMount() {
    this.calculateTotalPrice();
  }
  calculateTotalPrice = () => {
    let amount = 0;
    this.props.cart.cart.length
      ? this.props.cart.cart.map((ele, i) => {
          amount = amount + parseFloat(Number(ele.setup_cost)) +  parseFloat(Number(ele.total_price));
        })
      : 0;
    this.setState({ order_amount: amount.toFixed(2) });
  };
  removeFromCart = (e, ele, index) => {
    e.preventDefault();
    this.setState({
      visibleRemoveCart: true,
      product_id: ele ? ele.product_id : "",
      cart_id: ele ? ele.id : "",
      cart_item_index: index,
    });
  };

  handleOkRemoveCart = (e) => {
    //remove from API and redux
    if (this.props.user.loggedIn) {
      this.props.removeFromCartService(
        { _id: this.state.cart_id, flag: 1 },
        (res) => {
          if (res.status) {
            this.props.removeFromCart({ index: this.state.cart_item_index });
            this.setState({
              visibleRemoveCart: false,
            });
            this.calculateTotalPrice();
          } else {
            message.error(res.message);
          }
        }
      );
    } else {
      this.props.removeFromCart({ index: this.state.cart_item_index });
      this.setState({
        visibleRemoveCart: false,
      });
      this.calculateTotalPrice();
    }
  };

  handleCancelRemoveCart = (e) => {
    this.setState({
      visibleRemoveCart: false,
    });
  };
  handleOkRemoveSaveLater = (e) => {
    //remove from redux
    if (this.props.user.loggedIn) {
      this.props.removeFromCartService(
        { _id: this.state.cart_id, flag: 1 },
        (res) => {
          if (res.status) {
            this.props.removeFromSaveLater({
              index: this.state.cart_item_index,
            });
            this.setState({
              visibleRemoveSaveLater: false,
            });
          } else {
            message.error(res.message);
          }
        }
      );
    } else {
      this.props.removeFromSaveLater({ index: this.state.cart_item_index });
      this.setState({
        visibleRemoveSaveLater: false,
      });
    }
  };

  handleCancelRemoveSaveLater = (e) => {
    this.setState({
      visibleRemoveSaveLater: false,
    });
  };

  getItemTotal = (pr,sf) =>{
  var total = pr+sf;
  return total.toFixed(2); 
  }
  saveForLater = (e, ele, index) => {
    e.preventDefault();
    const product = this.props.cart.cart[index];
    //remove from API and redux
    if (this.props.user.loggedIn) {
      this.props.removeFromCartService(
        { _id: product ? product.id : "", type: 2, flag: 0 },
        (res) => {
          if (res.status) {
            this.props.removeFromCart({ index: index });
            //just to add in save for later
            if (product) {
              //add product in save for later in redux
              this.props.addInSaveForLater(product);
              this.calculateTotalPrice();
            }
          } else {
            message.error(res.message);
          }
        }
      );
    } else {
      this.props.removeFromCart({ index: index });
      if (product) {
        //add product in save for later in redux
        this.props.addInSaveForLater(product);
        this.calculateTotalPrice();
      }
    }
  };

  addToCart = (e, ele, index) => {
    e.preventDefault();
    const product = this.props.cart.save_for_later[index];
    if (this.props.user.loggedIn) {
      this.props.removeFromCartService(
        { _id: product ? product.id : "", type: 1, flag: 0 },
        (res) => {
          if (res.status) {
            //add product to cart in redux
            this.props.addToCart(product);
            this.calculateTotalPrice();
            //remove from save for later in redux
            this.props.removeFromSaveLater({ index: index });
          } else {
            message.error(res.message);
          }
        }
      );
    } else {
      //add product to cart in redux
      this.props.addToCart(product);
      this.calculateTotalPrice();
      //remove from save for later in redux
      this.props.removeFromSaveLater({ index: index });
    }
  };

  removeFromSaveLater = (e, ele, index) => {
    e.preventDefault();
    this.setState({
      visibleRemoveSaveLater: true,
      product_id: ele ? ele.product_id : "",
      cart_id: ele ? ele.id : "",
      cart_item_index: index,
    });
  };

  checkCartDetails = (e) => {
    e.preventDefault();
    if (this.props.cart.cart.length) {
      let timestamp = getTimeStamp();
      let expire_data = _.filter(this.props.cart.cart, (elem) => {
        if (elem.expire_date < timestamp) return elem;
      });
      if (expire_data.length) {
        this.setState({ refersh_btn: true });
        message.error(
          `There are some updations related to products in database. Please refresh your cart.`
        );
        return false;
      } else {
        this.props.history.push(`/card-details`);
      }
    } else {
      message.error(`Please add item in cart.`);
      return false;
    }
  };

  updateCartDetails = (e) => {
    e.preventDefault();
    this.setState({ refersh_btn: false });
    let reqObj = this.props.cart.cart.map((elem) => {
      let customized_product_details =
        typeof elem.customized_product_details === "string"
          ? JSON.parse(elem.customized_product_details)
          : elem.customized_product_details;

      let values = Object.values(customized_product_details);
      let total_colors = 0;
      _.each(values, (obj) => {
        if (obj.fileList.length && obj.confirmDesign) {
        const color_count = obj.currentEmbellishingColors ? obj.currentEmbellishingColors.length:0;
          total_colors = total_colors + color_count;
        }
      });
      let obj = {
        id: elem.id,
        user_id: elem.user_id,
        product_id: elem.product_id,
        quantity: elem.quantity,
        color: elem.color,
        decorating_method: elem.decorating_method,
        color_size_arr:
          typeof elem.color_size_arr === "string"
            ? JSON.parse(elem.color_size_arr)
            : elem.color_size_arr,
        customized_product_details: elem.customized_product_details,
        piece_price: elem.product_data.piece_price,
        style: elem.product_data.style,
        total_colors: total_colors,
      };
      return obj;
    });
    this.props.checkProductDetails({ arr_obj: reqObj }, async (res) => {
      if (res.status) {
        await Promise.all(
          this.props.cart.cart.map((obj, i) => {
            obj.expire_date = getTimeStampExpire();
            obj.index = i;
            obj = { ...obj, ...res.data[i] };
            this.props.updateCart(obj);
            return obj;
            // chnage in update Data on index
            // let updateData = _.findWhere(res.data, { id: obj["id"] });
            // if (updateData) {
            //   obj.expire_date = getTimeStampExpire();
            //   obj = { ...obj, ...updateData };
            //   this.props.updateCart(obj);
            //   return obj;
            // }
          })
        );
        message.success("Cart value update successfully.");
      } else {
        message.error(res.message);
      }
    });
  };

  editCart = (id, product_id, index) => {
    this.props.history.push({
      pathname: `/product-detail/edit/${product_id}`,
      state: { product_id: product_id, id: id, index: index, flag: "cart" },
    });
  };

  render() {
    return (
      <div>
        <Modal
          className="remove-cart-modal"
          title={this.props.intl.formatMessage({ id: "remove_cart" })}
          visible={this.state.visibleRemoveCart}
          onOk={this.handleOkRemoveCart}
          onCancel={this.handleCancelRemoveCart}
        >
          {this.props.intl.formatMessage({ id: "sure_want_delete_cart" })}
        </Modal>
        <Modal
          className="remove-cart-modal"
          title={this.props.intl.formatMessage({ id: "remove_cart" })}
          visible={this.state.visibleRemoveSaveLater}
          onOk={this.handleOkRemoveSaveLater}
          onCancel={this.handleCancelRemoveSaveLater}
        >
          {this.props.intl.formatMessage({ id: "sure_want_delete_cart" })}
        </Modal>
        <section className="category-section-outer">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-12">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="category-title">
                      {this.props.intl.formatMessage({ id: "your_cart" })} (
                      {this.props.cart.cart.length}{" "}
                      {this.props.cart.cart.length > 1 ? "items" : "item"})
                      <span>(Note:All inventory availability to be verified)</span>

                      
                    </div>
                    <hr className="category-border" />
                  </div>
                </div>
                {this.props.cart.cart.length ? (
                  this.props.cart.cart.map((ele, i) => (
                    <div key={i} className="cart-left">
                      <div className="row">
                        <div className="col-md-2 col-sm-12">
                          <div className="cart-inner">
                            <img
                              src={ele.product_data ? ele.product_data.front_model_image_url:""}
                              alt="product"
                            />
                          </div>
                        </div>
                        <div className="col-md-5 col-sm-12">
                          <div className="cart-inner">
                            <div
                              className="product-name-div"
                              dangerouslySetInnerHTML={{
                                __html: ele.product_data.product_title.replace(
                                  ele.product_data["style"],
                                  ""
                                ),
                              }}
                            ></div>
                            <p>
                              Quantity: <span>{ele.quantity}</span>
                            </p>
                            <p>
                              Production: &nbsp;
                              {/* <b>Standard - </b> */}
                              <span>
                                {production_time}{" "}
                                {/* <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i> */}
                              </span>
                            </p>
                            <p>
                              Note: <span>All pricing includes 1 color/1 location logo only</span>
                            </p>

                          </div>
                        </div>
                        <div className="col-md-5 col-sm-12">
                          <div className="cart-inner">
                            <div className="cart-inner-price">
                              <div className="cart-inner-priceleft">
                                Item price:
                              </div>
                              <div className="cart-inner-priceright">
                                $
                                {
                                  ele.total_price
                                  // getMarkupCost(
                                  //   ele.decorating_method,
                                  //   1,
                                  //   ele.quantity,
                                  //   ele.product_data.piece_price
                                  // ).markup_cost.toFixed(2)
                                }
                              </div>
                            </div>
                            <div className="cart-inner-price">
                              <div className="cart-inner-priceleft">
                                Setup Fee:
                              </div>
                              <div className="cart-inner-priceright">
                                $
                                {
                                  ele.setup_cost
                                  // getMarkupCost(
                                  //   ele.decorating_method,
                                  //   1,
                                  //   ele.quantity,
                                  //   ele.product_data.piece_price
                                  // ).setup_cost
                                }
                                <i
                                  className="fa fa-exclamation-circle"
                                  aria-hidden="true"
                                  title="Setup fee"
                                ></i>
                              </div>
                            </div>
                            <div className="cart-inner-price total-price">
                              <div className="cart-inner-priceleft">Total:</div>
                              <div className="cart-inner-priceright">
                                <span>
                                  $
                                { 
                                  this.getItemTotal(Number(ele.total_price),Number(ele.setup_cost))                               
                                }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <ul className="cart-ul">
                            {/* <li><a href="#">{this.props.intl.formatMessage({id: 'share'})}</a></li> */}
                            <li>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.editCart(ele.id, ele.product_data.id, i);
                                }}
                              >
                                {this.props.intl.formatMessage({ id: "edit" })}
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={(e) => this.saveForLater(e, ele, i)}
                              >
                                {this.props.intl.formatMessage({
                                  id: "save_for_later",
                                })}
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={(e) => this.removeFromCart(e, ele, i)}
                              >
                                {this.props.intl.formatMessage({
                                  id: "remove",
                                })}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <FormattedMessage id="your_cart_empty"></FormattedMessage>
                )}
                <div className="row">
                  <div className="col-md-12 col-md-12">
                    <Link className="Conatinue-shopping-btn" to="/">
                      {this.props.intl.formatMessage({
                        id: "continue_shopping",
                      })}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="category-title">
                      {this.props.intl.formatMessage({ id: "order_summary" })}
                    </div>
                    <hr className="category-border" />
                  </div>
                </div>
                <div className="cart-right">
                  <div className="cart-inner-price">
                    <div className="cart-inner-priceleft">
                      {this.props.intl.formatMessage({ id: "no_of_items" })}
                    </div>
                    <div className="cart-inner-priceright">
                      {this.props.cart.cart.length}
                    </div>
                  </div>
                  <div className="cart-inner-price total-price">
                    <div className="cart-inner-priceleft">
                      {this.props.intl.formatMessage({ id: "total" })}
                    </div>
                    <div className="cart-inner-priceright">
                      <span>
                        {this.state.order_amount ? `$` : ""}
                        {this.state.order_amount
                          ? this.state.order_amount
                          : this.state.order_amount}
                      </span>
                    </div>
                  </div>
                  <a
                    className="proceed-to-checkoutbtn"
                    onClick={(e) => this.checkCartDetails(e)}
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   this.props.history.push(`/card-details`);
                    // }}
                    href="#"
                  >
                    {this.props.intl.formatMessage({
                      id: "proceed_to_checkout",
                    })}
                  </a>
                  {this.state.refersh_btn ? (
                    <a
                      className="proceed-to-checkoutbtn"
                      onClick={(e) => this.updateCartDetails(e)}
                      href="#"
                    >
                      {this.props.intl.formatMessage({
                        id: "ref_cart",
                      })}
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 col-sm-12">
                {this.props.cart.save_for_later.length ? (
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <div className="category-title">
                        {this.props.intl.formatMessage({
                          id: "save_for_later",
                        })}
                      </div>
                      <hr className="category-border" />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {this.props.cart.save_for_later.length
                  ? this.props.cart.save_for_later.map((ele, i) => (
                      <div key={i} className="cart-left">
                        <div className="row">
                          <div className="col-md-2 col-sm-12">
                            <div className="cart-inner">
                              <img
                                src={ele.product_data.front_model_image_url}
                                alt="product"
                              />
                            </div>
                          </div>
                          <div className="col-md-5 col-sm-12">
                            <div className="cart-inner">
                              <div className="product-name-div">
                                {ele.product_data.product_title}
                              </div>
                              <p>
                                Quantity:{" "}
                                <span>{ele.product_data.quantity}</span>
                              </p>
                              <p>
                                Production: &nbsp;
                                {/* <b>Standard - </b> */}
                                <span>
                                  {production_time}{" "}
                                  {/* <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i> */}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-5 col-sm-12">
                            <div className="cart-inner">
                              <div className="cart-inner-price">
                                <div className="cart-inner-priceleft">
                                  Item price:
                                </div>
                                <div className="cart-inner-priceright">
                                  $ {ele.total_price}
                                  {/* {getMarkupCost(
                                    ele.decorating_method,
                                    1,
                                    ele.quantity,
                                    ele.product_data.piece_price
                                  ).markup_cost.toFixed(2)} */}
                                </div>
                              </div>
                              <div className="cart-inner-price">
                                <div className="cart-inner-priceleft">
                                  Setup Fee:
                                </div>
                                <div className="cart-inner-priceright">
                                  $
                                  {
                                    ele.setup_cost
                                    // getMarkupCost(
                                    //   ele.decorating_method,
                                    //   1,
                                    //   ele.quantity,
                                    //   ele.product_data.piece_price
                                    // ).setup_cost
                                  }
                                  <i
                                    className="fa fa-exclamation-circle"
                                    aria-hidden="true"
                                    title="Setup fee"
                                  ></i>
                                </div>
                              </div>
                              <div className="cart-inner-price total-price">
                                <div className="cart-inner-priceleft">
                                  Total:
                                </div>
                                <div className="cart-inner-priceright">
                                  <span>
                                    $
                                    {Number(ele.total_price) +
                                      Number(ele.setup_cost)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <ul className="cart-ul">
                              {/* <li><a href="#">{this.props.intl.formatMessage({id: 'share'})}</a></li> */}
                              <li>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.editCart(
                                      ele.id,
                                      ele.product_data.id,
                                      i
                                    );
                                  }}
                                >
                                  {this.props.intl.formatMessage({
                                    id: "edit",
                                  })}
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  onClick={(e) => this.addToCart(e, ele, i)}
                                >
                                  {this.props.intl.formatMessage({
                                    id: "add_to_cart",
                                  })}
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  onClick={(e) =>
                                    this.removeFromSaveLater(e, ele, i)
                                  }
                                >
                                  {this.props.intl.formatMessage({
                                    id: "remove",
                                  })}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>

            <br />

            {/* <div className="col-md-8 col-sm-12">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="category-title">
                    {this.props.intl.formatMessage({ id: "you_might_like" })}
                  </div>
                  <hr className="category-border" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <div className="product-outer cart-price-outer">
                    <div className="product-outer-upper">
                      <img src={no_img} alt="product" />
                    </div>
                    <div className="product-outer-bottom">
                      <div className="product-name">Men's Jogger</div>
                      <div className="product-price-outer">
                        <div className="product-price-outerleft">
                          From $9.20 to $28.50
                        </div>
                        <div className="product-price-outerright">
                          Min Qyt: 15
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="product-outer cart-price-outer">
                    <div className="product-outer-upper">
                      <img src={no_img} alt="product" />
                    </div>
                    <div className="product-outer-bottom">
                      <div className="product-name">Men's Jogger</div>
                      <div className="product-price-outer">
                        <div className="product-price-outerleft">
                          From $9.20 to $28.50
                        </div>
                        <div className="product-price-outerright">
                          Min Qyt: 15
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="product-outer cart-price-outer">
                    <div className="product-outer-upper">
                      <img src={no_img} alt="product" />
                    </div>
                    <div className="product-outer-bottom">
                      <div className="product-name">Men's Jogger</div>
                      <div className="product-price-outer">
                        <div className="product-price-outerleft">
                          From $9.20 to $28.50
                        </div>
                        <div className="product-price-outerright">
                          Min Qyt: 15
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  cart: state.cart,
});
const mapDispatchToProps = (dispatch) => ({
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
  addInSaveForLater: bindActionCreators(addInSaveForLater, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch),
  removeFromSaveLater: bindActionCreators(removeFromSaveLater, dispatch),
  addToCartService: bindActionCreators(addToCartService, dispatch),
  removeFromCartService: bindActionCreators(removeFromCartService, dispatch),
  makePaymentService: bindActionCreators(makePaymentService, dispatch),
  checkProductDetails: bindActionCreators(checkProductDetails, dispatch),
  updateCart: bindActionCreators(updateCart, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Cart));
