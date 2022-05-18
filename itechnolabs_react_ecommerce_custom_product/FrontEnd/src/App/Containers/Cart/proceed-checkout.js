import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import product_img from '../../Images/product_img_1.jpg';
import no_img from '../../Images/no-img.jpg';
import { injectIntl } from 'react-intl';
import { Modal, message } from 'antd';
import Login from '../../Containers/Authentication/Login';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visibleLogin: false,
      visiblePayment: false,
    }
  }

  handleOkLogin = e => {
    this.setState({
       visibleLogin: false
    });
 };

 handleOkPayment = e => {
  this.setState({
     visiblePayment: false
  });
};

  render() {
    return (
      <div>
          <Modal
              visible={this.state.visibleLogin}
              onOk={this.handleOkLogin}
              onCancel={this.handleCancelLogin}
              footer = {null}
              >
              <div className="cart-left checkout-outer billing-address-popup">
                 <div className="billing-address-title">Billing Address</div>
                  <div className="pay-order-title">Pay order - $4,630.35</div>
                  <p>sandeep@yopmail.com</p>
                  <div className="same-shipping">
                   <label class="remeber-container1">Show password<input type="checkbox" /><span class="checkmark"></span></label>
                  </div>
                  <div className="billing-address-inputs">
                      <div className="row">
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="First name *" />
                         </div>
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="Last name *" />
                         </div>
                      </div>
                      <div className="row">
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="Street Address *" />
                         </div>
                         <div className="col-md-12 col-sm-12">
                            <input type="text" placeholder="Unit" />
                         </div>
                      </div>
                      <div className="row">
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="City *" />
                         </div>
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="State/Region" />
                         </div>
                      </div>
                      <div className="row">
                         <div className="col-md-6 col-sm-12">
                            <select className="custom-select">
                              <option>United States</option>
                              <option>United States</option>
                              <option>United States</option>
                            </select>
                         </div>
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="Zip/Postal Code *" />
                         </div>
                      </div>
                      <div className="row">
                         <div className="col-md-12 col-sm-12">
                         <button className="proceed-to-checkoutbtn popup-check payment-in" onClick= {()=> this.setState({visiblePayment: true})}>payment info <i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                         </div>
                      </div>
                   </div>
              </div>
          </Modal>
          <Modal
              visible={this.state.visiblePayment}
              onOk={this.handleOkPayment}
              onCancel={this.handleCancelPayment}
              footer = {null}
              >
              <div className="cart-left checkout-outer billing-address-popup">
                 <div className="billing-address-title payment-information-title"><a href="#"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>Payment Information</div>
                  <div className="pay-order-title">Pay order - $4,630.35</div>
                  <p>sandeep@yopmail.com</p>
                  <div className="billing-address-inputs">
                      <div className="row">
                         <div className="col-md-12 col-sm-12">
                            <input type="text" placeholder="card Number" />
                         </div>
                      </div>
                      <div className="row">
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="MM/YY" />
                         </div>
                         <div className="col-md-6 col-sm-12">
                            <input type="text" placeholder="CVC" />
                         </div>
                      </div>
                      <div className="row">
                         <div className="col-md-12 col-sm-12">
                            <button class="proceed-to-checkoutbtn popup-check payment-in">Pay $4,630.35</button>
                         </div>
                      </div>
                   </div>
              </div>
          </Modal>
         <section className="category-section-outer">
           <div className="container">
             <div className="row">
                <div className="col-md-8 col-sm-12">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="category-title">Your Cart</div>
                          <hr className="category-border"/>
                        </div>
                    </div>
                  <div className="cart-left deleivery-address">
                    <h2>Delivery address <span>Change</span></h2>
                    <p>dsfds, 15, IOWA, IA, 50001</p>
                  </div>
                   <div className="cart-left">
                      <div className="row">
                         <div className="col-md-2 col-sm-12">
                           <div className="cart-inner">
                              <img src={product_img} alt="product" />
                           </div>
                         </div>
                         <div className="col-md-5 col-sm-12">
                           <div className="cart-inner">
                              <div className="product-name-div">Men's T-Shirt</div>
                              <p>Quantity: <span>12</span></p>
                              <p>Item price: <span><b>$30.36</b></span></p>
                              <p>Production: <span>25 days <i class="fa fa-pencil" aria-hidden="true"></i></span></p>
                           </div>
                         </div>
                         <div className="col-md-5 col-sm-12">
                           <div className="cart-inner">
                             <div className="cart-inner-price">
                               <div className="cart-inner-priceleft">Shipping:</div>
                               <div className="cart-inner-priceright">
                                 <select>
                                   <option>1-5 days</option>
                                   <option>1-5 days</option>
                                   <option>1-5 days</option>
                                 </select>
                               </div>
                             </div>
                             <div className="cart-inner-price">
                               <div className="cart-inner-priceleft">Shipping Cost:</div>
                               <div className="cart-inner-priceright">$117.00</div>
                             </div>
                             <div className="cart-inner-price total-price">
                               <div className="cart-inner-priceleft">Est. in hand:</div>
                               <div className="cart-inner-priceright"><span><b>Oct 22 - Oct 29</b></span></div>
                             </div>
                             <a className="need-soon-text" href="#">Need this sonner? Contact us.</a>

                             <div className="set-up-div">
                             <div className="cart-inner-price">
                               <div className="cart-inner-priceleft"><b>Setup Fee:</b></div>
                               <div className="cart-inner-priceright"><b>$117.00</b><i class="fa fa-exclamation-circle" aria-hidden="true"></i></div>
                             </div>
                             <div className="cart-inner-price total-price">
                               <div className="cart-inner-priceleft"><b>Total:</b></div>
                               <div className="cart-inner-priceright"><span>$147.36</span></div>
                             </div>
                             </div>
                           </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="row">
                      <div className="col-md-12 col-sm-12">
                        <div className="category-title">Order Summary</div>
                        <hr className="category-border"/>
                      </div>
                  </div>
                  <div className="cart-right">
                      <div className="cart-inner-price">
                        <div className="cart-inner-priceleft">Number of Items:</div>
                        <div className="cart-inner-priceright">1</div>
                      </div>
                      <div className="cart-inner-price">
                        <div className="cart-inner-priceleft">Items:</div>
                        <div className="cart-inner-priceright">$3,153.00</div>
                      </div>
                      <div className="cart-inner-price">
                        <div className="cart-inner-priceleft">Shipping:</div>
                        <div className="cart-inner-priceright">$156.85</div>
                      </div>
                      <div className="cart-inner-price total-price">
                        <div className="cart-inner-priceleft">Total:</div>
                        <div className="cart-inner-priceright"><span>$147.36</span></div>
                      </div>
                      <button className="proceed-to-checkoutbtn popup-check" onClick= {()=> this.setState({visibleLogin: true})}>{this.props.intl.formatMessage({id: 'Add payment info'})}</button>
                      <div class="accordian-outer">
                        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                          <div class="panel panel-default">
                            <div class="panel-heading" role="tab" id="headingOne">
                              <h4 class="panel-title">
                              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Promo Code
                              </a>
                            </h4>
                            </div>
                            <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                              <div class="panel-body">
                                <div className="accordian-inner">
                                  <input type="text"/>
                                  <a href="#">Apply</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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

