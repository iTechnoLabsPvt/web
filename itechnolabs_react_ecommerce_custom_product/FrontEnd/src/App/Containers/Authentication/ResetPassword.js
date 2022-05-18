import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword } from '../../../actions/user';
import { Form, Input, Button, message } from 'antd';
import { injectIntl } from 'react-intl';
import Header1_Logo from '../../Images/logo.png';

const FormItem = Form.Item;

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    let token = this.props.location.search.length  ? this.props.location.search.split('=').pop() : '';
    if(token){
        this.props.history.replace({pathname: '/', state: {token:token, flag:'reset'}});
    }
  }

  handleSubmit(values){
    let data = {password: values.password,confirm_password: values.confirm_password, token: this.props.token};
    this.setState({loading:true});
    this.props.resetPassword(data, res => {
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
              <h1>{this.props.intl.formatMessage({id:'reset_password'})}
              </h1>
              <p className="email-text password-text">{this.props.intl.formatMessage({id:'reset_password_title'})}</p>
              <FormItem name="password">
                <Input type = 'password' placeholder={this.props.intl.formatMessage({id: 'password_label'})} />
              </FormItem>
              <FormItem name="confirm_password">
                <Input type = 'password' placeholder={this.props.intl.formatMessage({id: 'confirm_password_label'})} />
              </FormItem>
              <Button className="login-btn" disabled={this.state.loading} loading={this.state.loading} type="primary" size="large" htmlType="submit">{this.props.intl.formatMessage({id: 'reset_password'})}</Button>
              <span className="login-text"><a href="#" onClick = {(e) => {
                e.preventDefault();
                return this.props.onRedirect('login');}}>{this.props.intl.formatMessage({id: 'login'})}</a></span>
              <span className="not-account-text">{this.props.intl.formatMessage({id: 'dont_have_account'})}  <a href= "#" onClick = {(e) => {
                e.preventDefault();
                return this.props.onRedirect('login');}}>{this.props.intl.formatMessage({id: 'signup_title_1'})}</a></span>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  resetPassword: bindActionCreators(resetPassword, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ResetPassword));
