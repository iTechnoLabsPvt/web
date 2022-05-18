import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header';
import Footer from './Footer';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import { getCategories } from '../../actions/categories';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

  }
  componentDidMount(){
    this.props.getCategories(res => {
      if(res.status){
          this.setState({categories: res.data});
      }
    })
    const el = document.getElementById('root1')
    const script =`
    "use strict";  
    !function() {
      var t = window.driftt = window.drift = window.driftt || [];
      if (!t.init) {
        if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
        t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
        t.factory = function(e) {
          return function() {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.push(n), t;
          };
        }, t.methods.forEach(function(e) {
          t[e] = t.factory(e);
        }), t.load = function(t) {
          var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
          o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
          var i = document.getElementsByTagName("script")[0];
          i.parentNode.insertBefore(o, i);
        };
      }
    }();
    drift.SNIPPET_VERSION = '0.3.1';
    drift.load('hknrbciz8crw');
    `;
// console.log(script)
// el.appendChild(script);
  }
  render() {
    window.scrollTo(0, 0);
    return (
      <Layout>
        {this.props.user && this.props.user.loggedIn ? 
          <DashboardHeader categories = {this.state.categories} {...this.props.children.props} />
          : 
          <Header {...this.props.children.props} categories = {this.state.categories} />
        }
          {this.props.children}
        {this.props.user && this.props.user.loggedIn ? 
          <DashboardFooter {...this.props.children.props} categories={this.state.categories} />
          : 
          <Footer {...this.props.children.props} categories = {this.state.categories} />
        }
      </Layout>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  getCategories: bindActionCreators(getCategories, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);