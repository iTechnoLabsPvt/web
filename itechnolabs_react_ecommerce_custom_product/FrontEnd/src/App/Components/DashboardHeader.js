import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import Footer_Logo from '../Images/svg/footer-logo.svg';
import { logOut } from '../../actions/user';
import {Link} from 'react-router-dom';
import Header_Logo from '../Images/svg/header-logo.svg';
import Cart from "../Images/svg/cart.svg";
import { getCartService } from '../../actions/cart';

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state ={}
  }

   componentDidMount(){
      if(this.props.user.loggedIn){
         this.props.getCartService({user_id: this.props.user.id}, (res)=>{});
      }
   }

   logout = (e) => {
      e.preventDefault();
      this.props.logOut({token: this.props.user.loginToken}, res => {
      if(res.status){
         this.props.history.replace('/');
      }
      });
   }
  render() {
    return(
        <header>
         <div className="top-header_section">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-md-12">
                     <div className="dashboard-header inner-header-dashbrd">
                        <div className="header_logo">
                           <Link to="/">
                           <img src= {Header_Logo} />
                           </Link>
                        </div>
                        <div className="right-side-content">
                           <ul className="dashboard-ul">
                           {this.props.location.pathname !== '/' && 
                           
                           <li className="continous_section">
                              <Link to="/">{this.props.intl.formatMessage({id: 'back_to_dashboard'})}</Link>
                           </li>
                           }
                           <li className="continous_section">
                              <Link to="/">{this.props.intl.formatMessage({id: 'continue_shopping'})}</Link>
                           </li>
                           <li className="continous_section">
                              <a href="" onClick= {(e)=> this.logout(e)}>{this.props.intl.formatMessage({id: 'logout'})}</a>
                           </li>
                           <div className="cart_box " title="Save design">
                                <Link to="/my-mockups" className="d-flex align-items-center " >
                                <i className="fa fa-download icon_custom" aria-hidden="true"></i>
                                </Link>
                            </div>
                           <div className="cart_box " title="Wishlist">
                                <Link to="/wishlist" className="d-flex align-items-center " >
                                <i className="fa fa-heart-o heart-custom" aria-hidden="true"></i>
                                    {/* <div className="cart_count">
                                        <p className="mb-0">0</p>
                                    </div> */}
                                </Link>
                            </div>
                            <div className="cart_box " title="Cart">
                                <Link to="/cart" className="d-flex align-items-center ">
                                    <img src= {Cart} className="cart-icon" />
                                    <div className="cart_count">
                                        <p className="mb-0">{this.props.cart.cart.length}</p>
                                    </div>
                                </Link>
                            </div>
                           </ul>
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
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="true"></i></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul id="main-menu"  className="navbar-nav mx-auto sm sm-clean">
                                { this.props.categories.map((ele, i) => (
                                    <li key = {i} className={`nav-item ${ele.category_name == this.state.category ? 'active' : ''}`}>
                                    <a className="nav-link" href="" onClick={
                                        (e) => {e.preventDefault();
                                            this.setState({category: ele.id});
                                            this.props.history.push({pathname: '/products/all', state: {category_name : ele.id}});
                                        }
                                    }>{ele.category_name} 
                                    {ele.sub_categories.length ? <i className="fa fa-caret-down" aria-hidden="true"></i>: ''}
                                    </a>
                                    {ele.sub_categories.length ?
                                    <ul className="inner-ul">
                                        {ele.sub_categories.map((ele1, ii) => (
                                            <li key = {ii}><a href=""  onClick={
                                                (e) => {e.preventDefault();
                                                    this.props.history.push({pathname: '/products/all', state: {category_name : ele.id, sub_category : ele1.id}});
                                                }
                                            }>{ele1.subcategory_name}</a></li>
                                        ))}
                                    </ul>
                                    :
                                    ''    
                                }
                                </li>
                                ))}
                                <li className={`nav-item desktop-display-none ${ this.props.location.pathname == '/profile' ? 'active': ''}`}>
                                 <Link className="nav-link" to = "/profile" > {this.props.intl.formatMessage({id: 'profile'})} </Link>
                                 
                                 </li>
                                 <li className={`nav-item desktop-display-none ${ this.props.location.pathname == '/orders' ? 'active': ''}`}>
                                    <Link className="nav-link" to = "/orders" >{this.props.intl.formatMessage({id: 'orders'})}</Link>
                                 </li>
                                 <li className={`nav-item desktop-display-none ${ this.props.location.pathname == '/re-order' ? 'active': ''}`}>
                                    <Link className="nav-link" to = "/re-order"> {this.props.intl.formatMessage({id: 'reorder'})}  </Link>
                                 </li>
                                 <li className={`nav-item desktop-display-none ${ this.props.location.pathname == '/art-work' ? 'active': ''}`}>
                                    <Link className="nav-link" to = "/art-work">{this.props.intl.formatMessage({id: 'artwork'})} </Link>
                                 </li>
                            </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                </div>
            </div>
           <div className="header_menu_section dashbaord-product-header">
            <div className="container">
               <div className="row">
                  <div className="col-md-10 ">
                     <nav className="navbar main-nav navbar-expand-md">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="true"></i></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                           <ul id="main-menu"  className="navbar-nav  sm sm-clean">
                              <li className={`nav-item ${ this.props.location.pathname == '/profile' ? 'active': ''}`}>
                                 <Link className="nav-link" to = "/profile" > {this.props.intl.formatMessage({id: 'profile'})} </Link>
                                 
                              </li>
                              <li className={`nav-item ${ this.props.location.pathname == '/orders' ? 'active': ''}`}>
                                 <Link className="nav-link" to = "/orders" >{this.props.intl.formatMessage({id: 'orders'})}</Link>
                              </li>
                              <li className={`nav-item ${ this.props.location.pathname == '/re-order' ? 'active': ''}`}>
                                 <Link className="nav-link" to = "/re-order"> {this.props.intl.formatMessage({id: 'reorder'})}  </Link>
                              </li>
                              <li className={`nav-item ${ this.props.location.pathname == '/art-work' ? 'active': ''}`}>
                                 <Link className="nav-link" to = "/art-work">{this.props.intl.formatMessage({id: 'artwork'})} </Link>
                              </li>
                              
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

const mapStateToProps = state => ({ user: state.user, cart: state.cart });
const mapDispatchToProps = dispatch => ({
   logOut: bindActionCreators(logOut, dispatch),
   getCartService: bindActionCreators(getCartService, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DashboardHeader));