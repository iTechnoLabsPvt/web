import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { forgetPasssword } from '../../../actions/user';
import { Form, Input, Button, message } from 'antd';
import { injectIntl } from 'react-intl';
import Header1_Logo from '../../Images/logo.png';

const FormItem = Form.Item;

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    let data = {email: values.email};
    this.setState({loading:true});
    this.props.forgetPasssword(data, res => {
      if (res.status) {
        message.success(res.message);
        this.setState({loading:false});
        this.props.onRedirect('login');
      } else {
        this.setState({loading:false});
        message.error(res.message);
      }
    });
  }

  render() {
    return (
      <Form onFinish={this.handleSubmit} className="Container SigupForm" layout="vertical">
        <div className="login-inner">
          <img className="login-logo" src= {Header1_Logo} />
          {/* <p>{this.props.intl.formatMessage({id: 'signup_title'})}</p> */}
          <div className="login-inner-inputs">
              <h1>{this.props.intl.formatMessage({id:'password_recovery'})}
              </h1>
              <p className="email-text password-text">{this.props.intl.formatMessage({id: 'forget_password_title'})}</p>
              <FormItem name="email">
                <Input placeholder={this.props.intl.formatMessage({id: 'email_label'})} />
              </FormItem>
              <Button className="login-btn" disabled={this.state.loading} loading={this.state.loading} type="primary" size="large" htmlType="submit">{this.props.intl.formatMessage({id: 'continue'})}</Button>
              <span className="login-text"><a href="#" onClick = {(e) => {
                e.preventDefault();
                return this.props.onRedirect('login')}}>{this.props.intl.formatMessage({id: 'login'})}</a></span>
              <span className="not-account-text">{this.props.intl.formatMessage({id: 'dont_have_account'})}  <a href= "#" onClick = {(e) => {
                e.preventDefault();
                return this.props.onRedirect('signup')}}>{this.props.intl.formatMessage({id: 'signup_title_1'})}</a></span>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  forgetPasssword: bindActionCreators(forgetPasssword, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ForgetPassword));
