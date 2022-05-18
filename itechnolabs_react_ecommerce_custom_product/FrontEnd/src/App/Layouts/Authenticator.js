import React from 'react';
import {
  Redirect
} from 'react-router-dom';
import { Spin, Row } from 'antd';

import { connect } from 'react-redux';

class Authenticator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticated: false,
      errorMessage: "",
      status: null,
      newLink: null,
    }
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate() {
    if (this.props.reverse == 'private' && !this.props.user.loggedIn) { //if private route is coming and user is not loggedIn then send him always to login
      this.setState({
        newLink: "/"
      })
    }else if (this.props.reverse == 'non_private' && this.props.user.loggedIn) { //if non private route is coming and user is loggedIn then send him always to dashboard
      this.setState({
        newLink: "/"
      })
    }else if(this.props.reverse == 'private_non_private'){
      this.setState({
        loading: false,
        authenticated: false
      })
    }else{
      this.setState({
        loading: false,
        authenticated: false
      })
    }
  }

  renderLoader() {
    return (
      <Row type="flex" align="center" justify="center" style={{height: "100vh"}}>
        <div className="main-spin-wrapper">
          <Spin />
          <h5>Loading...</h5>
        </div>
      </Row>
    )
  }

  render() {

    if (this.state.newLink) {
      return (
        <Redirect to={{
          pathname: this.state.newLink,
        }} />
      )
    }

    if (this.state.loading) {
      return this.renderLoader();
    }

    // if (this.props.reverse && this.props.user.loggedIn) { 
    //   this.props.history.replace('/');
    // }
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}


const mapStateToProps = state => ({ user: state.user });


export default connect(mapStateToProps, null)(Authenticator);