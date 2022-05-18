import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import product_banner from "../../Images/product-banner.jpg";
import { injectIntl } from "react-intl";
import { getProducts, addProducts } from "../../../actions/products";
import { Link } from "react-router-dom";
import { Button } from "antd";
class CategoryWiseProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
    };
  }

  componentDidMount() {
    this.props.getProducts(
      {
        token: this.props.user.loginToken,
        type: 1,
        category:
          this.props.location.state && this.props.location.state.category_name
            ? this.props.location.state.category_name
            : "",
        sub_category:
          this.props.location.state && this.props.location.state.sub_category
            ? this.props.location.state.sub_category
            : "",
      },
      (res) => {
        if (res.status) {
          this.setState({ products: res.data.data });
          this.props.addProducts(res.data.data);
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.location.state && this.props.location.state.category_name) !==
        (prevProps.location.state && prevProps.location.state.category_name) ||
      (this.props.location.state && this.props.location.state.sub_category) !==
        (prevProps.location.state && prevProps.location.state.sub_category)
    ) {
      this.props.getProducts(
        {
          token: this.props.user.loginToken,
          type: 1,
          category:
            this.props.location.state && this.props.location.state.category_name
              ? this.props.location.state.category_name
              : "",
          sub_category:
            this.props.location.state && this.props.location.state.sub_category
              ? this.props.location.state.sub_category
              : "",
        },
        (res) => {
          if (res.status) {
            this.setState({ products: res.data.data });
            //add in redux
            this.props.addProducts(res.data.data);
          }
        }
      );
    }
  }

  viewMore(category_name) {
    //sending in sub_category key in case if its coming on the page with category name means to see all subcategory products under category and sending in sub_category because view more button is associated with Subcategories of that category
    this.props.history.push({
      pathname: "/products/all",
      state: { sub_category: category_name },
    });
  }

  render() {
    return (
      <div>
        <section className="banner_section pt-5">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={product_banner} alt="First slide" />
              </div>
            </div>
          </div>
        </section>

        <section className="category-section-outer">
          <div className="container">
            {this.state.products.length ? (
              <div>
                {this.state.products.map((ele, i) => (
                  <div key={i}>
                    <div className="row">
                      <div className="col-md-12 col-sm-12">
                        <div className="category-title">{ele.category}</div>
                        <hr className="category-border" />
                      </div>
                    </div>
                    <div className="row">
                      {ele.products.length &&
                        ele.products.map((ele1, ii) => (
                          <div key={ii} className="col-md-4 col-sm-12">
                            <div className="product-outer">
                              <div className="product-outer-upper">
                                <Link
                                  to={`/product-detail/${ele1["UNIQUE_KEY"]}`}
                                >
                                  <img
                                    src={ele1.FRONT_MODEL_IMAGE_URL}
                                    alt="product"
                                  />
                                </Link>
                              </div>
                              <div className="product-outer-bottom">
                                <div
                                  className="product-name"
                                  dangerouslySetInnerHTML={{
                                    __html: ele1.PRODUCT_TITLE.replace(
                                      ele1["STYLE#"],
                                      ""
                                    ),
                                  }}
                                ></div>
                                <div className="product-price-outer">
                                  <div className="product-price-outerleft">
                                    Starting at: ${ele1.SUGGESTED_PRICE}
                                  </div>
                                  <div className="product-price-outerright">
                                    Min Qty: {ele1.moq}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="col-md-12">
                      <Button
                        className="login-btn product-view-more"
                        disabled={this.state.loading}
                        loading={this.state.loading}
                        type="primary"
                        size="large"
                        htmlType="submit"
                        onClick={() => this.viewMore(ele.category)}
                      >
                        {this.props.intl.formatMessage({ id: "view_more" })}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              "No Products"
            )}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  getProducts: bindActionCreators(getProducts, dispatch),
  addProducts: bindActionCreators(addProducts, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CategoryWiseProducts));
