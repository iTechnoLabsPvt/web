import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import click_icon from "../Images/click-icon.png";
import PPEHealth from "../Images/products/PPEHealth.jpg";
import bags from "../Images/products/bags.jpg";
import tech from "../Images/products/tech.jpg";
import Drinkware from "../Images/products/Drinkware.jpg";
import Office from "../Images/products/Office.jpg";
import Apparel from "../Images/products/apparel.jpg";
import Recived_img from "../Images/recived.png";
import Create_icon_img from "../Images/create-icon.png";
import design_img from "../Images/design.png";
import choose_icon_img from "../Images/choose-icon.png";
import middle_web_banner_1 from "../Images/middle_web_banner_1.jpg";

import banner_img from "../Images/banner.jpg";
import full_custom_section_center from "../Images/full-custom-section-center.jpg";
import Slider from "react-slick";
import { getCategories } from "../../actions/categories";
import { getLiveFeedsFromInstagram } from "../../actions/user";
import { injectIntl } from "react-intl";
import { Spin } from "antd";
import { ReactTypeformEmbed } from "react-typeform-embed";
import Drift from "react-driftjs";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      feeds: [],
    };
  }

  componentDidMount() {
    this.props.getCategories((res) => {
      if (res.status) {
        this.setState({ categories: res.data });
      }
    });
    //   this.props.getLiveFeedsFromInstagram(res => {
    //    if(res.status){
    //       this.setState({feeds: res.data});
    //    }
    // })
  }

  render() {
    return (
      <main>
        <section className="banner_section">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={banner_img} alt="First slide" />
                <div className="banner_text">
                  <div className="container">
                    <h1>
                      {this.props.intl.formatMessage({
                        id: "custom_brand_supply_title",
                      })}
                    </h1>
                    <p>
                      {this.props.intl.formatMessage({
                        id: "custom_brand_supply_title1",
                      })}{" "}
                      <br />
                      {this.props.intl.formatMessage({ id: "custom" })}{" "}
                      <strong>
                        {this.props.intl.formatMessage({
                          id: "custom_brand_supply_title2",
                        })}
                      </strong>{" "}
                      {this.props.intl.formatMessage({ id: "and" })}{" "}
                      <strong>
                        {this.props.intl.formatMessage({ id: "uniforms" })}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="banner_section" style={{"paddingTop": "40px",
    "background": "#fff",
    "paddingBottom": "20px"}}>
        <img src={middle_web_banner_1} alt="banner image" class="img-fluid" />
        </section>


        

        <section className="process_section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="heading">
                  <h2>Products</h2>
                </div>
              </div>
              {/*
              <div className="col-md-3">
                <div className="process_box">
                  <img src={choose_icon_img} />
                  <h4>{this.props.intl.formatMessage({ id: "choose" })}</h4>
                  <p>{this.props.intl.formatMessage({ id: "choose_descp" })}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="process_box">
                  <img src={design_img} />
                  <h4>{this.props.intl.formatMessage({ id: "design" })}</h4>
                  <p>{this.props.intl.formatMessage({ id: "design_descp" })}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="process_box">
                  <img src={Create_icon_img} />
                  <h4>{this.props.intl.formatMessage({ id: "create" })}</h4>
                  <p>{this.props.intl.formatMessage({ id: "create_descp" })}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="process_box">
                  <img src={Recived_img} />
                  <h4>{this.props.intl.formatMessage({ id: "receive" })}</h4>
                  <p>
                    {this.props.intl.formatMessage({ id: "receive_descp" })}
                  </p>
                </div>
              </div>
              */}
            </div>
          </div>
        </section>
        <section className="services_list">
          <div className="container">
            <div className="row">
              {this.state.categories.length
                ? this.state.categories.map((ele, i) => (
                    <div key={i} className="col-md-4">
                      <div className="ser_ltt shadow">
                        <div className="cnt_cnt cnt_color">
                          <h4>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                this.props.history.push({
                                  pathname: "/products/all",
                                  state: { category_name: ele.id },
                                });
                              }}
                            >
                              {ele.category_name}
                            </a>
                          </h4>
                        </div>
                        <img
                          src={
                            (ele.category_image)?ele.category_image:Office
                          }
                        />
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </section>
       
        {/* <section className="full_custom-section">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="full-custom-text">
                  <h2>
                    {this.props.intl.formatMessage({ id: "full_custom" })}{" "}
                  </h2>
                  <p>{this.props.intl.formatMessage({ id: "vox_exp" })}</p>
                  <p>{this.props.intl.formatMessage({ id: "vox_exp_1" })} </p>
                </div>
              </div>
              <div className="col-md-5 text-center">
                <img src={full_custom_section_center} />
              </div>
              <div className="col-md-3">
                <div className="form_section">
                  <div className="form_heading">
                    <h3>
                      {this.props.intl.formatMessage({ id: "contact_us" })}
                    </h3>
                  </div>
                  <form>
                    <div className="form-group">
                      <label>
                        {this.props.intl.formatMessage({ id: "name" })}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="youremail@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        {this.props.intl.formatMessage({ id: "email_label" })}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="subject name"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        {this.props.intl.formatMessage({ id: "message_label" })}
                      </label>
                      <textarea
                        className="form-control "
                        placeholder=""
                      ></textarea>
                      <div className="invalid-feedback"></div>
                    </div>
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        {this.props.intl.formatMessage({ id: "send_copy" })}
                      </label>
                    </div>
                    <div className="text-right">
                      <button type="submit" className="submit">
                        send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
         */}
        {/* <section className="insta_gram">
            <div className="container">
               <div className="row">
                  <div className="col-md-12 text-center">
                     <div className="heading_insta">
                        <h3>{this.props.intl.formatMessage({id: 'find_inspiration'})}  </h3>
                        <h2>{this.props.intl.formatMessage({id: 'vox_header'})}</h2>
                     </div>
                  </div>
                  <div className="col-md-12">
                     <div className="gallery-responsive">
                     <div>
                     {this.state.feeds && this.state.feeds.length ? <Slider {...settings}>
                        {this.state.feeds.map((ele, i) => (
                           <div className="vox-custom">
                              <img src= {ele}/>
                           </div>
                        ))}
                     </Slider>
                     :
                     <Spin />}
                     </div>
                </div>
                </div>
               </div>
            </div>
         </section> */}
        {/* <section className="cta_section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8 text-left">
                <h3>{this.props.intl.formatMessage({ id: "stay_up_date" })}</h3>
              </div>
              <div className="col-md-4 text-right">
                <p className="mb-0">
                  <a href="#" className="subscibe_btn">
                    {this.props.intl.formatMessage({ id: "subscribe" })}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
         */}
        {/* drift implement code start*/}
        <Drift appId="fb2sdg3fwvz8" />
        {/* drift implement code end*/}

        {/* Typeform start */}
        {/* <section className="full_custom-section">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div
                className="col-md-12"
                style={{ width: "100%", height: "400px" }}
              >
                <ReactTypeformEmbed
                  url="https://form.typeform.com/to/F1ejQu8S"
                  style={{ width: "100%", height: "400px" }}
                />
              </div>
            </div>
          </div>
        </section> */}
        {/* typeform end */}
      </main>
    );
  }
}

// const mapStateToProps = state => ({ locale: state.locale });
const mapDispatchToProps = (dispatch) => ({
  getCategories: bindActionCreators(getCategories, dispatch),
  getLiveFeedsFromInstagram: bindActionCreators(
    getLiveFeedsFromInstagram,
    dispatch
  ),
});
export default connect(null, mapDispatchToProps)(injectIntl(Home));
