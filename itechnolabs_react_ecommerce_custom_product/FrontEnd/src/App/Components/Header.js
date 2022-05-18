import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header_Logo from "../Images/svg/header-Catalog-Logo.svg";
import Cart from "../Images/svg/cart.svg";
import { Modal, message } from "antd";
import Login from "../Containers/Authentication/Login";
import Signup from "../Containers/Authentication/Signup";
import ForgetPassword from "../Containers/Authentication/ForgetPassword";
import ResetPassword from "../Containers/Authentication/ResetPassword";
import ConfirmEmail from "../Containers/Authentication/ConfirmEmail";
import { verifyEmail } from "../../actions/user";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLogin: false,
      visibleSignup: false,
      visibleForget: false,
      visibleReset: false,
      visibleConfirmEmail: false,
      email: "",
      category: "",
      wishlist: false,
    };
    this.onRedirect = this.onRedirect.bind(this);
  }

  componentDidMount() {
    //   if(this.props.history.location && this.props.history.location.state){
    //       if(this.props.history.location.state.flag == 'reset'){
    //         this.setState({token: this.props.history.location.state.token, visibleReset: true});
    //         this.props.history.replace({ ...this.props.history.location, state: {} });
    //       }else if(this.props.history.location.state.flag == 'verify_email'){
    //         this.props.verifyEmail({token: this.props.history.location.state.token}, res => {
    //             if (res.status) {
    //                 this.setState({visibleLogin: true});
    //                 message.success(res.message);
    //             } else {
    //                 message.error(res.message);
    //             }
    //             this.props.history.replace({ ...this.props.history.location, state: {} });
    //         });
    //       }
    //   }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.state !== this.props.history.location.state) {
      if (
        this.props.history.location.state &&
        this.props.history.location.state.flag == "reset"
      ) {
        this.setState({
          token: this.props.history.location.state.token,
          visibleReset: true,
        });
        this.props.history.replace({
          ...this.props.history.location,
          state: {},
        });
      } else if (
        this.props.history.location.state &&
        this.props.history.location.state.flag == "verify_email"
      ) {
        this.props.verifyEmail(
          { token: this.props.history.location.state.token },
          (res) => {
            if (res.status) {
              this.setState({ visibleLogin: true });
              message.success(res.message);
            } else {
              message.error(res.message);
            }
            this.props.history.replace({
              ...this.props.history.location,
              state: {},
            });
          }
        );
      }
    }
  }

  handleOkLogin = (e) => {
    this.setState({
      visibleLogin: false,
    });
  };

  handleCancelLogin = (e) => {
    this.setState({
      visibleLogin: false,
    });
  };
  handleOkSignup = (e) => {
    this.setState({
      visibleSignup: false,
    });
  };

  handleCancelSignup = (e) => {
    this.setState({
      visibleSignup: false,
    });
  };
  handleOkForget = (e) => {
    this.setState({
      visibleForget: false,
    });
  };

  handleCancelForget = (e) => {
    this.setState({
      visibleForget: false,
    });
  };
  handleOkReset = (e) => {
    this.setState({
      visibleReset: false,
    });
  };

  handleCancelReset = (e) => {
    this.setState({
      visibleReset: false,
    });
  };
  handleOkConfirmEmail = (e) => {
    this.setState({
      visibleConfirmEmail: false,
    });
  };

  handleCancelConfirmEmail = (e) => {
    this.setState({
      visibleConfirmEmail: false,
    });
  };

  onRedirect(flag, extraParam) {
    if (flag == "login") {
      if (this.childSignupRef && this.childSignupRef.myFormRef) {
        this.childSignupRef.myFormRef.resetFields();
      }
      this.setState({
        visibleLogin: true,
        visibleSignup: false,
        visibleForget: false,
        visibleReset: false,
        visibleConfirmEmail: false,
        wishlist: false,
      });
    } else if (flag == "signup") {
      if (this.childLoginRef && this.childLoginRef.myFormRef) {
        this.childLoginRef.myFormRef.resetFields();
      }
      this.setState({
        visibleLogin: false,
        visibleSignup: true,
        visibleForget: false,
        visibleReset: false,
        visibleConfirmEmail: false,
        wishlist: false,
      });
    } else if (flag == "confirm_email") {
      this.setState({
        visibleLogin: false,
        visibleSignup: false,
        visibleForget: false,
        visibleReset: false,
        visibleConfirmEmail: true,
        email: extraParam.email,
        wishlist: false,
      });
    } else {
      this.setState({
        visibleLogin: false,
        visibleSignup: false,
        visibleForget: true,
        visibleReset: false,
        visibleConfirmEmail: false,
        wishlist: false,
      });
    }
  }

  render() {
    return (
      <header>
        <Modal
          className="login-modal"
          visible={this.state.visibleLogin}
          onOk={this.handleOkLogin}
          onCancel={this.handleCancelLogin}
          footer={null}
        >
          <Login
            onRedirect={this.onRedirect}
            {...this.props}
            childLoginRef={(ref) => (this.childLoginRef = ref)}
            wishlist={this.state.wishlist}
          />
        </Modal>
        <Modal
          className="login-modal"
          visible={this.state.visibleSignup}
          onOk={this.handleOkSignup}
          onCancel={this.handleCancelSignup}
          footer={null}
        >
          <Signup
            onRedirect={this.onRedirect}
            {...this.props}
            childSignupRef={(ref) => (this.childSignupRef = ref)}
          />
        </Modal>
        <Modal
          className="login-modal"
          visible={this.state.visibleForget}
          onOk={this.handleOkForget}
          onCancel={this.handleCancelForget}
          footer={null}
        >
          <ForgetPassword onRedirect={this.onRedirect} {...this.props} />
        </Modal>
        <Modal
          className="login-modal"
          visible={this.state.visibleReset}
          onOk={this.handleOkReset}
          onCancel={this.handleCancelReset}
          footer={null}
        >
          <ResetPassword
            onRedirect={this.onRedirect}
            {...this.props}
            token={this.state.token}
          />
        </Modal>
        <Modal
          className="login-modal"
          visible={this.state.visibleConfirmEmail}
          onOk={this.handleOkConfirmEmail}
          onCancel={this.handleCancelConfirmEmail}
          footer={null}
        >
          <ConfirmEmail
            onRedirect={this.onRedirect}
            {...this.props}
            email={this.state.email}
          />
        </Modal>
        <div className="top-header_section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="header_logo">
                    <Link to="/">
                      <img src={Header_Logo} />
                    </Link>
                  </div>
                  <div className="right-side-content d-flex align-items-center ">
                    <div className="search-box">
                      <button className="search-button">
                        <i className="fa fa-search"></i>
                      </button>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                      />
                    </div>
                    <div className="cart_box ">
                      <a
                        href="#"
                        className="d-flex align-items-center "
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({ visibleLogin: true, wishlist: true });
                        }}
                      >
                        <i
                          className="fa fa-heart-o heart-custom"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                    <div className="cart_box ">
                      <Link to="/cart" className="d-flex align-items-center ">
                        <img src={Cart} className="cart-icon" />
                        <div className="cart_count">
                          <p className="mb-0">{this.props.cart.cart.length}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header_menu_section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mx-auto">
                <nav className="navbar main-nav navbar-expand-md">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon">
                      <i className="fa fa-bars" aria-hidden="true"></i>
                    </span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul
                      id="main-menu"
                      className="navbar-nav mx-auto sm sm-clean"
                    >
                      {this.props.categories.map((ele, i) => (
                        <li
                          key={i}
                          className={`nav-item ${
                            ele.category_name == this.state.category
                              ? "active"
                              : ""
                          }`}
                        >
                          <a
                            className="nav-link"
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({ category: ele.id });
                              this.props.history.push({
                                pathname: "/products/all",
                                state: { category_name: ele.id,type:"menu" },
                              });
                            }}
                          >
                            {ele.category_name}
                            {ele.sub_categories.length ? (
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              ""
                            )}
                          </a>
                          {ele.sub_categories.length ? (
                            <ul className="inner-ul">
                              {ele.sub_categories.map((ele1, ii) => (
                                <li key={ii}>
                                  <a
                                    href=""
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.props.history.push({
                                        pathname: "/products/all",
                                        state: {
                                          category_name: ele.id,
                                          sub_category: ele1.id,
                                          type:"menu"
                                        },
                                      });
                                    }}
                                  >
                                    {ele1.subcategory_name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                      ))}
                      {/* 
                      <li className="nav-item">
                        <button
                          className="login-header-btn"
                          onClick={() =>
                            this.setState({
                              visibleLogin: true,
                              wishlist: false,
                            })
                          }
                        >
                          {this.props.intl.formatMessage({ id: "login" })}
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="login-header-btn"
                          onClick={() =>
                            this.setState({
                              visibleSignup: true,
                              wishlist: false,
                            })
                          }
                        >
                          {this.props.intl.formatMessage({ id: "signup" })}
                        </button>
                      </li>
                               */}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({ cart: state.cart });
const mapDispatchToProps = (dispatch) => ({
  verifyEmail: bindActionCreators(verifyEmail, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Header));
