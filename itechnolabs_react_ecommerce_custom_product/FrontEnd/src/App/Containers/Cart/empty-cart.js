import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import product_img from '../../Images/product_img_1.jpg';
import no_img from '../../Images/no-img.jpg';
import { injectIntl } from 'react-intl';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div>

         <section className="category-section-outer">
           <div className="container">
             <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="category-title">Your Cart <span>(0 items)</span></div>
                          <hr className="category-border"/>
                        </div>
                    </div>
                    <div className="cart-left">
                       <div className="empty-cart-inner">
                           <p>Hey, your cart is empty !</p>
                           <a className="proceed-to-checkoutbtn shop-products" href="#">Shop Products</a>
                       </div>
                    </div>
                </div>
             </div>

           </div>
         </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Cart));