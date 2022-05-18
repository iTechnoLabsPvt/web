import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import product_img from "../../Images/product_img_1.jpg";
import no_img from "../../Images/no-img.jpg";
import { injectIntl } from "react-intl";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	render() {
		return (
			<div>
				<section className="category-section-outer">
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-sm-12">
								<div className="row">
									<div className="col-md-12 col-sm-12">
										<div className="category-title">Delivery / Checkout</div>
										<hr className="category-border" />
									</div>
								</div>
								<div className="cart-left checkout-outer">
									<div className="checkout-title">Contact Details</div>
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
											<input type="text" placeholder="Company" />
										</div>
										<div className="col-md-6 col-sm-12">
											<input type="text" placeholder="Email" />
										</div>
									</div>
									<div className="checkout-title shipping-title">
										Shipping Info
									</div>
									<div className="row">
										<div className="col-md-6 col-sm-12">
											<input type="text" placeholder="First name *" />
										</div>
										<div className="col-md-6 col-sm-12">
											<input type="text" placeholder="Last name *" />
										</div>
									</div>
									<div className="row">
										<div className="col-md-12 col-sm-12">
											<input type="text" placeholder="Street Address *" />
										</div>
									</div>
									<div className="row">
										<div className="col-md-12 col-sm-12">
											<input type="text" placeholder="Office #, Floor, etc." />
										</div>
									</div>
									<div className="row">
										<div className="col-md-12 col-sm-12">
											<select className="custom-select">
												<option>United States</option>
												<option>United States</option>
												<option>United States</option>
											</select>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 col-sm-12">
											<input type="text" placeholder="City *" />
										</div>
										<div className="col-md-6 col-sm-12">
											<select className="custom-select">
												<option>Iowa (IA)</option>
												<option>Iowa (IA)</option>
												<option>Iowa (IA)</option>
											</select>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 col-sm-12">
											<input type="text" placeholder="Zip/Postal Code *" />
										</div>
										<div className="col-md-6 col-sm-12">
											<input type="text" placeholder="Phone Number" />
										</div>
									</div>
									<div className="row">
										<div className="col-md-12 col-sm-12">
											<textarea placeholder="Order note"></textarea>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4 col-sm-12">
								<div className="cart-right proceed-checkout">
									<div className="cart-inner-price">
										<p className="special-order">
											Your special order is one step away...
										</p>
									</div>
									<a className="proceed-to-checkoutbtn" href="#">
										proceed to checkout
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Cart));
