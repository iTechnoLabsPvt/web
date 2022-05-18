import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup } from '../../../actions/user';
import { Form, Input, Button, message } from 'antd';
import { injectIntl } from 'react-intl';
import Header1_Logo from '../../Images/logo.png';

const FormItem = Form.Item;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hidden: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const { childSignupRef } = this.props;
    childSignupRef(this);
  }

  toggleShow = (e) => {
    this.setState({ hidden: !this.state.hidden });
  }

  handleSubmit(values){
    let data = {name: values.name, company_name: values.company_name, email: values.email, password: values.password, role: '0'};
    this.setState({loading:true});
    this.props.signup(data, res => {
      if (res.status) {
        // message.success(res.message);
        this.setState({loading:false});
        this.props.onRedirect('confirm_email', {email: values.email});
      } else {
        this.setState({loading:false});
        message.error(res.message);
      }
    });
  }

  componentWillUnmount(){
    const { childSignupRef } = this.props;
    childSignupRef(undefined);
  }

  render() {
    return (
      // <div className="login-outer">
      // <div className="container">

      //       <Form onFinish={this.handleSubmit} className="Container SigupForm" layout="vertical" scrollToFirstError>
      //           <div className="row">
      //             <div className="col-md-6 offset-md-3">
      //                 <div className="login-inner">
      //                   <img className="login-logo" src= {Header1_Logo} />
      //                   <p>Registering to this website, you accept our Terms of use and our Privacy policy</p>
      //                   <div className="login-inner-inputs">
      //                         <h1>Sign up
      //                         </h1>
      //                         <FormItem name="email">
      //                           <Input placeholder={this.props.intl.formatMessage({id: 'Name*'})} />
      //                         </FormItem>
      //                         <FormItem name="password">
      //                           <Input type="password" className="cpmanyname-input" placeholder={this.props.intl.formatMessage({id: 'Company name*'})} />
      //                         </FormItem>
      //                         <FormItem name="email">
      //                           <Input className="email-input" placeholder={this.props.intl.formatMessage({id: 'email_label'})} />
      //                         </FormItem>
      //                         <FormItem name="password">
      //                           <Input type="password" className="password-input" placeholder={this.props.intl.formatMessage({id: 'password_label'})} />
      //                         </FormItem>
      //                         <div className="remember-me-outer">
      //                             <div className="remeber-me-left">
      //                             <label class="remeber-container1">Show password
      //                               <input type="checkbox" />
      //                               <span class="checkmark"></span>
      //                             </label>
      //                             </div>
      //                         </div>
      //                         <Button className="login-btn" disabled={this.state.loading} loading={this.state.loading} type="primary" 
      //                         size="large" htmlType="submit">
      //                           {this.props.intl.formatMessage({id: 'signup_button'})}
      //                         </Button>
      //                         <span className="not-account-text">{this.props.intl.formatMessage({id: 'Already have account?'})} <Link to='/login'>{this.props.intl.formatMessage({id: 'Log in'})}</Link></span>
      //                   </div>
      //                 </div>
      //             </div>
      //           </div>
      //   </Form>
      // </div>
      // </div>
      <Form onFinish={this.handleSubmit} ref={(el) => this.myFormRef = el} className="Container SigupForm" layout="vertical" scrollToFirstError>
      <div className="login-inner">
        <img className="login-logo" src= {Header1_Logo} />
        <p> {this.props.intl.formatMessage({id: 'signup_title'})} </p>
        <div className="login-inner-inputs">
              <h1>{this.props.intl.formatMessage({id: 'signup_title_1'})}
              </h1>
              <FormItem 
                name="name"
                // hasFeedback
                rules= {[{ required: true, message: this.props.intl.formatMessage({id: 'enter_name'}) }]}
                
              >
                <Input placeholder={this.props.intl.formatMessage({id: 'name'})} />
              </FormItem>
              <FormItem 
                name="company_name"
                rules= {[{ required: true, message: this.props.intl.formatMessage({id: 'enter_company_name'}) }]}
              >
                <Input className="cpmanyname-input" placeholder={this.props.intl.formatMessage({id: 'company_name'})} />
              </FormItem>
              <FormItem 
                name="email"
                rules= {[{ required: true, message: this.props.intl.formatMessage({id: 'enter_email'}) },
                    { type: 'email', message: this.props.intl.formatMessage({id: 'invalid_email'}) }]}
              >
                <Input className="email-input" placeholder={this.props.intl.formatMessage({id: 'email_label'})} />
              </FormItem>
              <FormItem 
                name= "password"
                rules= {[{ required: true, message: this.props.intl.formatMessage({id: 'enter_password'}) },
                    { pattern: /^([a-zA-Z0-9()@:%_\+.~#?&\/=_-]){6,15}$/, message: this.props.intl.formatMessage({id: 'invalid_password'}) }]}
              >
                <Input type={this.state.hidden ? 'password' : 'text'} className="password-input" placeholder={this.props.intl.formatMessage({id: 'password_label'})} />
              </FormItem>
              <div className="remember-me-outer">
                  <div className="remeber-me-left">
                    <label className="remeber-container1">{this.props.intl.formatMessage({id: 'show_password'})}
                    <input type="checkbox" onClick={(e) => this.toggleShow(e)} />
                    <span className="checkmark"></span>
                  </label>
                  </div>
              </div>
              <Button className="login-btn" disabled={this.state.loading} loading={this.state.loading} type="primary" 
              size="large" htmlType="submit">
                {this.props.intl.formatMessage({id: 'signup_button'})}
              </Button>
              <span className="not-account-text">{this.props.intl.formatMessage({id: 'already_have_account'})} <a href= "#" onClick = {(e) => {
                e.preventDefault();
                return this.props.onRedirect('login')}}>{this.props.intl.formatMessage({id: 'login'})}</a></span>
        </div>
      </div>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(signup, dispatch)
});

export default connect(null, mapDispatchToProps)(injectIntl(Signup));
