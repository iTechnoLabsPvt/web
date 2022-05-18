import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import { updateProfile, changePassword } from "../../actions/user";
import dashboard_logo from "../Images/dashboard-logo.png";
import { Form, Input, Button, Modal, message } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { fabric } from 'fabric'; // this also installed on your project
import { useFabricJSEditor } from 'fabricjs-react';
const FormItem = Form.Item;


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleProfile: false,
      visiblePassword: false,
      loading: false,
    };
  //  const { selectedObjects, editor, onReady } = useFabricJSEditor();

  }

  handleOkProfile = (e) => {
  const image =  fabric.Image.fromURL('my_image.png', function(oImg) { 
        
    })
    console.log(image);
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
          { this.handleOkProfile}
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
)(injectIntl(Test));
