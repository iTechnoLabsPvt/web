import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import { updateProfile, changePassword } from "../../actions/user";
import dashboard_logo from "../Images/dashboard-logo.png";
import { Form, Input, Button, Modal, message } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const FormItem = Form.Item;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleProfile: false,
      visiblePassword: false,
      loading: false,
    };
  }

  handleOkProfile = (e) => {
    this.setState({
      visibleProfile: false,
    });
  };

  handleCancelProfile = (e) => {
    this.setState({
      visibleProfile: false,
    });
  };

  handleOkPassword = (e) => {
    this.setState({
      visiblePassword: false,
    });
  };

  handleCancelPassword = (e) => {
    this.setState({
      visiblePassword: false,
    });
  };

  handleProfileSubmit = (values) => {
    let data = values;
    data = { ...data, token: this.props.user.loginToken };
    this.setState({ loading: true });
    this.props.updateProfile(data, (res) => {
      if (res.status) {
        this.setState({ loading: false, visibleProfile: false });
        message.success(res.message);
      } else {
        this.setState({ loading: false });
        message.error(res.message);
      }
    });
  };
  handlePasswordSubmit = (values) => {
    let data = values;
    data = { ...data, token: this.props.user.loginToken };
    delete data.confirm_password;
    this.setState({ loading: true });
    this.props.changePassword(data, (res) => {
      if (res.status) {
        this.setState({ loading: false, visiblePassword: false });
        message.success(res.message);
      } else {
        this.setState({ loading: false });
        message.error(res.message);
      }
    });
  };
  render() {
    const password_not_match = this.props.intl.formatMessage({
      id: "password_not_match",
    });
    return (
      <main>
        <Modal
          visible={this.state.visibleProfile}
          onOk={this.handleOkProfile}
          onCancel={this.handleCancelProfile}
          footer={null}
        >
          <Form
            onFinish={this.handleProfileSubmit}
            initialValues={{
              email: this.props.user ? this.props.user.email : "",
              name: this.props.user ? this.props.user.name : "",
              complete_phone_number: this.props.user
                ? this.props.user.complete_phone_number
                : "",
              company_name: this.props.user ? this.props.user.company_name : "",
            }}
            className="Container SigupForm"
            layout="vertical"
          >
            <div className="login-inner">
              <div className="login-inner-inputs">
                <h1>Edit Profile</h1>
                <FormItem name="email">
                  <Input
                    className="email-input"
                    placeholder={this.props.intl.formatMessage({
                      id: "email_label",
                    })}
                    disabled
                  />
                </FormItem>
                <FormItem
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: this.props.intl.formatMessage({
                        id: "enter_name",
                      }),
                    },
                  ]}
                >
                  <Input
                    placeholder={this.props.intl.formatMessage({ id: "name" })}
                  />
                </FormItem>
                <FormItem
                  name="complete_phone_number"
                  className="phone-input-custom"
                >
                  <PhoneInput
                    className="counry"
                    placeholder={this.props.intl.formatMessage({
                      id: "phone_label",
                    })}
                    country={"us"}
                    autoFormat={true}
                    dropdownClass={"phone-dropdown2"}
                    // value={this.state.phone}
                    // onChange={phone => this.setState({ phone })}
                  />
                </FormItem>
                <FormItem
                  name="company_name"
                  rules={[
                    {
                      required: true,
                      message: this.props.intl.formatMessage({
                        id: "enter_company_name",
                      }),
                    },
                  ]}
                >
                  <Input
                    className="cpmanyname-input"
                    placeholder={this.props.intl.formatMessage({
                      id: "company_label",
                    })}
                  />
                </FormItem>
                <Button
                  className="login-btn"
                  disabled={this.state.loading}
                  loading={this.state.loading}
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  {this.props.intl.formatMessage({ id: "update" })}
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
        <Modal
          visible={this.state.visiblePassword}
          onOk={this.handleOkPassword}
          onCancel={this.handleCancelPassword}
          footer={null}
        >
          <Form
            onFinish={this.handlePasswordSubmit}
            className="Container SigupForm"
            layout="vertical"
          >
            <div className="login-inner">
              <div className="login-inner-inputs">
                <h1>Change Password</h1>
                <FormItem name="old_password">
                  <Input
                    type="password"
                    className="password-input"
                    placeholder={this.props.intl.formatMessage({
                      id: "old_password_label",
                    })}
                  />
                </FormItem>
                <FormItem
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: this.props.intl.formatMessage({
                        id: "enter_password",
                      }),
                    },
                    {
                      pattern: /^([a-zA-Z0-9()@:%_\+.~#?&\/=_-]){6,15}$/,
                      message: this.props.intl.formatMessage({
                        id: "invalid_password",
                      }),
                    },
                  ]}
                >
                  <Input
                    type="password"
                    className="password-input"
                    placeholder={this.props.intl.formatMessage({
                      id: "new_password_label",
                    })}
                  />
                </FormItem>
                <FormItem
                  name="confirm_password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: this.props.intl.formatMessage({
                        id: "enter_confirm_password",
                      }),
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(password_not_match);
                      },
                    }),
                  ]}
                >
                  <Input
                    type="password"
                    className="password-input"
                    placeholder={this.props.intl.formatMessage({
                      id: "confirm_new_password_label",
                    })}
                  />
                </FormItem>
                <Button
                  className="login-btn"
                  disabled={this.state.loading}
                  loading={this.state.loading}
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  {this.props.intl.formatMessage({ id: "change" })}
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
        <section className="dashboard_page">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="d-flex">
                  <div className="logo_profile">
                    <img src={dashboard_logo} />
                  </div>
                  <div className="dashboard_cnt">
                    <h2>{this.props.user.name}</h2>
                    <h3>{this.props.user.email}</h3>
                    <ul className="d-flex align-items-center">
                      <li>
                        <a
                          href=""
                          className="btn_dashboard"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ visibleProfile: true });
                          }}
                        >
                          {this.props.intl.formatMessage({
                            id: "edit_profile",
                          })}
                        </a>
                      </li>
                      <li>
                        <a
                          href=""
                          className="btn_dashboard"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({ visiblePassword: true });
                          }}
                        >
                          {this.props.intl.formatMessage({
                            id: "change_password",
                          })}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-5">
                <div className="account_detail">
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <div className="left_side_detail text-left">
                      <p className="mb-0">
                        {this.props.intl.formatMessage({ id: "display_name" })}
                      </p>
                    </div>
                    <div className="right-side-detail text-right">
                      <p className="mb-0">{this.props.user.name}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <div className="left_side_detail text-left">
                      <p className="mb-0">
                        {this.props.intl.formatMessage({ id: "order_history" })}
                      </p>
                    </div>
                    <div className="right-side-detail text-right">
                      <p className="mb-0">0 Orders</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <div className="left_side_detail text-left">
                      <p className="mb-0">
                        {this.props.intl.formatMessage({
                          id: "default_shipping_address",
                        })}{" "}
                        <span>
                          {" "}
                          <strong>
                            {" "}
                            {this.props.intl.formatMessage({ id: "edit" })}
                          </strong>{" "}
                        </span>
                      </p>
                    </div>
                    <div className="right-side-detail text-right">
                      <p className="mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  updateProfile: bindActionCreators(updateProfile, dispatch),
  changePassword: bindActionCreators(changePassword, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Profile));
