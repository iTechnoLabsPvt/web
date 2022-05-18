import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    let token = this.props.location.search.length  ? this.props.location.search.split('=').pop() : '';
    if(token){
      this.props.history.replace({pathname: '/', state: {token:token, flag:'verify_email'}});
    }
  }

  render() {
    return (
      <div className="verify-email-outer">
      
      </div>
    );
  }
}
export default (injectIntl(VerifyEmail));
