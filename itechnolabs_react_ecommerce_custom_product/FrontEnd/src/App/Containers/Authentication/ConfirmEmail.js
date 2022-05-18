import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resendVerificationEmail } from '../../../actions/user';
import { injectIntl } from 'react-intl';
import { message, Button } from 'antd';
import Header_Logo from '../../Images/svg/header-logo.svg';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  resendEmail(){
    this.setState({loading:true})
    this.props.resendVerificationEmail({email : this.props.email}, res=>{
      if(res.status){
        message.success(res.message);
        this.setState({loading:false});
      }
    });
  }

  render() {
    return (
      <div className="login-inner recovery-email verify-email">
          <img className="login-logo" src= {Header_Logo} />
          <div className="login-inner-inputs">
          <h3>{this.props.intl.formatMessage({id: 'please_verify_email'})}</h3>
          <p className="email-text">{this.props.intl.formatMessage({id: 'we_sent_email1'})} <br></br>
          {this.props.email ? this.props.email : ''}</p>
          <p className="email-text">{this.props.intl.formatMessage({id: 'email_title'})}</p>
          <p className="email-text">{this.props.intl.formatMessage({id: 'still_cant_find_email'})}</p> 
              <Button className="login-btn verify-btn" disabled={this.state.loading} loading={this.state.loading} onClick={()=> this.resendEmail()}>{this.props.intl.formatMessage({id: 'resend_email'})}</Button>
              <span className="not-account-text">{this.props.intl.formatMessage({id: 'need_help'})}<a href= "#">{this.props.intl.formatMessage({id: 'contact_us'})}</a></span>
          </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  resendVerificationEmail: bindActionCreators(resendVerificationEmail, dispatch),
});

export default connect(null, mapDispatchToProps)(injectIntl(ConfirmEmail));
