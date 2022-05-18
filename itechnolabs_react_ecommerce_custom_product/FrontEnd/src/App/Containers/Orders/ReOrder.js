import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import _ from "underscore";
import { message, Spin } from "antd";
import { getOrderItemListService } from "../../../actions/order";
import {
  addToCart,
  addToCartService,
  reorderAddToCartService,
} from "../../../actions/cart";
import { getTimeStampExpire } from "../../../utilities/universal";

class ReOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    this.getOrderListDetail();
  }
  getOrderListDetail = () => {
    let context = this;
    let { loggedIn, id } = context.props.user;
    if (!loggedIn) return;
    context.props.getOrderItemListService(
      {
        user_id: id,
      },
      async (res) => {
        console.log(res);
        if (res.status) {
          //  this.setState({ items: res.data });
          if (!res.data.length) this.setState({ items: [] });
          else {
            let items_arr = await res.data.map((elem, i) => {
              elem.id = i + 1;
              elem.color_size_arr = JSON.parse(elem.color_size_arr);
              elem.size_to_buy = elem.color_size_arr[0].size_to_buy;
              //   elem.size_to_buy = [{ X: 1 }, { Y: 2 }];
              elem.customized_product_details = JSON.parse(
                elem.customized_product_details
              );
              elem.product_data = JSON.parse(elem.product_data);
              let sum = 0;
              _.each(elem.color_size_arr, (obj) => {
                let { color, size_to_buy } = obj;
                let size_arr = Object.values(size_to_buy);
                let total_size_count = size_arr.reduce(function (a, b) {
                  return Number(a) + Number(b);
                }, 0);
                sum = sum + total_size_count;
              });
              elem.qty = sum;
              return elem;
            });
            this.setState({ items: items_arr });
          }
        }
      }
    );
  };

  addTocart = (e, elem, i) => {
    e.preventDefault();
    // console.log(elem);
    let params = {
      product_id: elem.product_id,
      user_id: elem.user_id,
      quantity: elem.qty,
      decorating_method: elem.decorating_method,
      customized_image: elem.customized_image,
      color: elem.color,
      color_size_arr: elem.color_size_arr,
      customized_product_details: elem.customized_product_details,
      category: elem.category,
      setup_cost: elem.setup_cost,
      total_price: elem.total_price,
      piece_price: elem.piece_price,
      expire_date: getTimeStampExpire(),
      type: 1,
    };
    elem.product_data.id = elem.product_id;
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
    this.props.reorderAddToCartService(body, (res) => {
      if (res.status == true) {
        params = {
          ...params,
          id: res.data.id,
          customized_image: res.data.customized_image,
          item_price: res.data.item_price,
          total_price: res.data.total_price,
          setup_cost: res.data.setup_cost,
        };
        params = { ...params, product_data: elem.product_data };
        this.props.addToCart(params);
        message.success(res.message);
        //  this.props.history.push("/cart");
      } else {
        message.error(res.message);
      }
    });
  };

  editProduct = (e, elem, i) => {
    e.preventDefault();
    alert("called");
  };

  render() {
    return (
      <main>
        <section className="dashboard_page">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="d-flex justify-content-between">
                  <div className="dashboard_cnt ml-0">
                    <h2>Reorder prior items</h2>
                    <h3 className="mb-0 pre_sec">
                      Changes cannot be made to reordered items since they skip
                      the prooﬁng process and go straight to production.
                    </h3>
                  </div>
                  <div className="download_btn">
                    <a href="">Total order - {this.state.items.length}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="your_cart order_cart">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="cart_heading">
                  <hr />
                </div>
              </div>

              <div className="col-md-12">
                {this.state.items.map((elem, i) => (
                  <div className="cart_list_section mb-5" key={i}>
                    <h3>{elem.product_data.product_title}</h3>
                    <div className="shadow product_purchase p-2">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <div className="cart_left_img">
                            <img
                              src={elem.product_data.front_model_image_url}
                            />
                          </div>
                        </div>
                        <div className="col-md-10">
                          <div className="printed_sec">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5 className="heading_steps mb-0">
                                I Would Like
                                <span className="text-danger">
                                  {" "}
                                  {elem.qty}{" "}
                                </span>
                                {/* <input
                                type="text"
                                id="printed_input"
                                placeholder="101"
                              /> */}
                                Printed (Min: {elem.product_data.moq})
                              </h5>
                            </div>
                          </div>
                          <div className="cnt_cart_list d-flex align-items-center justify-content-between mb-2">
                            <div className="width_seze">
                              <div className="size_select">
                                <div className="list_size mt-2">
                                  <ul className="d-flex justify-content-between align-items-center">
                                    {Object.entries(elem.size_to_buy).map(
                                      (ele, index) => (
                                        <li key={index}>
                                          <div className="size_text">
                                            {ele[0]}
                                          </div>
                                          <div className="shape_top">
                                            <i className="fa fa-sort-up"></i>
                                          </div>
                                          <div className="size_numeric">
                                            {ele[1]}
                                          </div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="price_box">
                              <div className="price_total_list d-flex align-items-center">
                                <div className="price_heading">
                                  <h4>Setup:</h4>
                                </div>
                                <div className="price_text">
                                  <p className="mb-0">${elem.setup_cost}</p>
                                </div>
                              </div>
                              <div className="price_total_list d-flex align-items-center">
                                <div className="price_heading">
                                  <h4>Total:</h4>
                                </div>
                                <div className="price_text">
                                  <p className="mb-0">${elem.total_price}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="edit_section_list d-flex align-items-center justify-content-end">
                            {/* <p className="mb-0">
                              <a
                                href="#"
                                onClick={(e) => this.editProduct(e, elem, i)}
                              >
                                {this.props.intl.formatMessage({
                                  id: "edit",
                                })}
                              </a>
                            </p> */}
                            {/* <p className="mb-0">
                              <a href="">Save for later</a>
                            </p> */}
                            <p className="mb-0">
                              <a
                                href="#"
                                onClick={(e) => this.addTocart(e, elem, i)}
                              >
                                {this.props.intl.formatMessage({
                                  id: "add_to_cart",
                                })}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="col-md-6">
                <div className="Order_summary">
                  <div className="heading_text">
                    <h2>Order summary</h2>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="summary_price">
                      <h4 className="mb-0">Transfer stickers</h4>
                    </div>
                    <div className="price_stickers">
                      <p className="mb-0">$39.00</p>
                    </div>
                  </div>
                  <div className="qty_sec">
                    <h4 className="mb-0">Qty: 10</h4>
                  </div>
                  <hr className="btn_border" />
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="summary_price">
                      <p className="mb-0">Total</p>
                    </div>
                    <div className="price_stickers">
                      <h4 className="total_price_summay mb-0">$1,720.00</h4>
                    </div>
                  </div>
                </div>
                <div className="check_out_btn text-center">
                  <a href="">ADD TO CART</a>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user, cart: state.cart });
const mapDispatchToProps = (dispatch) => ({
  getOrderItemListService: bindActionCreators(
    getOrderItemListService,
    dispatch
  ),
  addToCart: bindActionCreators(addToCart, dispatch),
  addToCartService: bindActionCreators(addToCartService, dispatch),
  reorderAddToCartService: bindActionCreators(
    reorderAddToCartService,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ReOrder));
