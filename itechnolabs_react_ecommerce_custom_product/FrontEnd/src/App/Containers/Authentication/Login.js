import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login, rememberMe } from "../../../actions/user";
import {
  addToCart,
  addToCartService,
  updateCartService,
  updateCart,
} from "../../../actions/cart";
import { Form, Input, Button, message } from "antd";
import { injectIntl } from "react-intl";
import _ from "underscore";
import Header1_Logo from "../../Images/logo.png";

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      remember: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { childLoginRef } = this.props;
    childLoginRef(this);
    if (this.props.user && this.props.user.remember) {
      this.setState({ remember: this.props.user.remember.rememberMe });
    }
  }

  handleSubmit(values) {
    let data = { email: values.email, password: values.password, role: "0" };
    this.setState({ loading: true });
    this.props.login(data, (res) => {
      if (res.status) {
        this.props.rememberMe({
          email: values.email,
          password: values.password,
          rememberMe: this.state.remember,
        });
        // add cart details in cart
        if (this.props.cart.cart.length) this.updateCartDetails(res.user_id);
        this.props.history.push("/");
      } else {
        this.setState({ loading: false });
        message.error(res.message);
      }
    });
  }

  async updateCartDetails(id) {
    _.each(this.props.cart.cart, (elem, index) => {
      elem.user_id = id;
      elem.type = 1;
      let productData = elem.product_data;
      delete elem.product_data;
      let body = new FormData();
      _.mapObject(elem, (obj, key) => {
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
          elem.product_data = productData;
          elem.customized_image = res.data.customized_image;
          elem.id = res.data.id;
          let params = { ...elem, index: index };
          this.props.updateCart(params);
        } else {
          message.error(res.message);
        }
      });
    });
  }

  componentWillUnmount() {
    const { childLoginRef } = this.props;
    childLoginRef(undefined);
  }

  rememberMe(e) {
    this.setState({ remember: e.target.checked });
  }

  render() {
    return (
      // <div className="login-outer">
      // <div className="container">
      //   <Form onFinish={this.handleSubmit} className="Container SigupForm" layout="vertical">
      //   <div className="row">
      //      <div className="col-md-6 offset-md-3">
      //         <div className="login-inner">
      //            <img className="login-logo" src= {Header1_Logo} />
      //            <p>Registering to this website, you accept our Terms of use and our Privacy policy</p>
      //            <div className="login-inner-inputs">
      //                 <h1>Hi,<br></br>
      //                 Welcome back
      //                 </h1>
      //                 <FormItem name="email">
      //                   <Input placeholder={this.props.intl.formatMessage({id: 'email_label'})} />
      //                 </FormItem>
      //                 <FormItem name="password">
      //                   <Input type="password" className="password-input" placeholder={this.props.intl.formatMessage({id: 'password_label'})} />
      //                 </FormItem>
      //                 <div className="remember-me-outer">
      //                     <div className="remeber-me-left">
      //                     <label class="remeber-container">Remember me
      //                       <input type="checkbox" />
      //                       <span class="checkmark"></span>
      //                     </label>
      //                     </div>
      //                     <div className="remeber-me-right">
      //                       <a href="#">Forgot Password?</a>
      //                     </div>
      //                 </div>
      //                 <Button className="login-btn" disabled={this.state.loading} loading={this.state.loading} type="primary" size="large" htmlType="submit">{this.props.intl.formatMessage({id: 'login'})}</Button>
      //                 <span className="not-account-text">{this.props.intl.formatMessage({id: 'Dont have account?'})} <Link to='/signup'>{this.props.intl.formatMessage({id: 'Sign up'})}</Link></span>
      //            </div>
      //         </div>
      //      </div>
      //   </div>
      //   </Form>

      // </div>
      // </div>
      <Form
        onFinish={this.handleSubmit}
        initialValues={{
          email:
            this.props.user &&
            this.props.user.remember &&
            this.props.user.remember.rememberMe
              ? this.props.user.remember.email
              : "",
          password:
            this.props.user &&
            this.props.user.remember &&
            this.props.user.remember.rememberMe
              ? this.props.user.remember.password
              : "",
        }}
        ref={(el) => (this.myFormRef = el)}
        className="Container SigupForm"
        layout="vertical"
      >
        <div className="login-inner">
          <img className="login-logo" src={Header1_Logo} />
          {/* <p>{this.props.intl.formatMessage({id: 'signup_title'})}</p> */}
          <div className="login-inner-inputs">
            <h1>
              {this.props.wishlist &&
                this.props.intl.formatMessage({ id: "wishlist_title" })}
              {!this.props.wishlist &&
                this.props.intl.formatMessage({ id: "hi" })}
              <br></br>
              {!this.props.wishlist &&
                this.props.intl.formatMessage({ id: "welcome_back" })}
            </h1>
            <FormItem name="email">
              <Input
                placeholder={this.props.intl.formatMessage({
                  id: "email_label",
                })}
              />
            </FormItem>
            <FormItem name="password">
              <Input
                type="password"
                className="password-input"
                placeholder={this.props.intl.formatMessage({
                  id: "password_label",
                })}
              />
            </FormItem>
            <div className="remember-me-outer">
              <div className="remeber-me-left">
                <label className="remeber-container">
                  {this.props.intl.formatMessage({ id: "remember_me" })}
                  <input
                    type="checkbox"
                    checked={this.state.remember}
                    onClick={(e) => this.rememberMe(e)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="remeber-me-right">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    return this.props.onRedirect("forget_password");
                  }}
                >
                  {this.props.intl.formatMessage({ id: "forgot_password" })}
                </a>
              </div>
            </div>
            <Button
              className="login-btn"
              disabled={this.state.loading}
              loading={this.state.loading}
              type="primary"
              size="large"
              htmlType="submit"
            >
              {this.props.intl.formatMessage({ id: "login" })}
            </Button>
            <span className="not-account-text">
              {this.props.intl.formatMessage({ id: "dont_have_account" })}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  return this.props.onRedirect("signup");
                }}
              >
                {this.props.intl.formatMessage({ id: "signup_title_1" })}
              </a>
            </span>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(login, dispatch),
  rememberMe: bindActionCreators(rememberMe, dispatch),
  addToCartService: bindActionCreators(addToCartService, dispatch),
  updateCart: bindActionCreators(updateCart, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login));
