import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import { Modal, message, Spin } from "antd";
import { withRouter } from "react-router-dom";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import {
	getShipmentRateService,
	orderPlacewithShipment,
} from "../../../actions/order";
import {
	deleteAllcart,
	addToCartService,
	updateCart,
} from "../../../actions/cart";
import { signupGuest } from "../../../actions/user";
import CardDetails from "./Crad-details";
import { states } from "../../../utilities/State";
import _ from "underscore";
import { FormComponent, FormContainer } from "react-authorize-net";
import { getHelp } from "../../../actions/anyonehelp";

let clientKey =
	"74WnS3uc5C4x978Fj9pB9rUcZVDXhBdYApnTnV3QM2fG657Pv9Mh8TCzGB7Nuydt";
let apiLoginId = "9R7Sp6Nh9nK";

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			visibleLogin: false,
			visiblePayment: false,
			order_amount: 0,
			anyoneHelp: [],
			first_name: "",
			last_name: "",
			email: "",
			address_line: "",
			city: "",
			state_province_code: "",
			postal_code: "",
			country_code: "",
			telephone: "",
			total_weight: 0,
			state: "",
			shiping_charge: 0,
			number_of_piece: 0,
			billing_state: false,
			user_id: 0,
		};
	}
	componentDidMount() {
		this.calculateTotalPrice();
		this.calculateTotalWeight();
		this.getAnyoneHelp();
	}

	getAnyoneHelp = () => {
		this.props.getHelp((res) => {
			if (res.status) {
				this.setState({
					anyoneHelp: [res.data],
				});
				return [res.data];
			}
		});
	};

	calculateTotalPrice = () => {
		let amount = 0;
		this.props.cart.cart.length
			? this.props.cart.cart.map((ele, i) => {
					amount = amount + Number(ele.setup_cost) + Number(ele.total_price);
			  })
			: 0;
		this.setState({ order_amount: amount.toFixed(2) });
	};
	calculateTotalWeight = () => {
		let weight = 0;
		let no_piece = 0;
		this.props.cart.cart.length
			? this.props.cart.cart.map((elem, i) => {
					weight = weight + elem.quantity * elem.product_data.piece_weight;
					no_piece = no_piece + elem.quantity;
			  })
			: 0;
		this.setState({
			total_weight: weight.toFixed(3),
			number_of_piece: no_piece,
		});
	};
	handleOkLogin = (e) => {
		this.setState({
			visibleLogin: false,
		});
	};

	handleOkPayment = (e) => {
		this.setState({
			visiblePayment: false,
		});
	};

	handleCancelPayment = (e) => {
		this.setState({
			visiblePayment: false,
		});
	};

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	// handleSubmit = async (event) => {
	//   event.preventDefault();
	//   alert("from submit");
	//   const { stripe, elements } = this.props;
	//   console.log(`From called `, stripe, elements);
	//   if (!stripe || !elements) {
	//     return;
	//   }

	//   const card = elements.getElement(CardElement);
	//   const result = await stripe.createToken(card);

	//   if (result.error) {
	//     console.log(result.error.message);
	//   } else {
	//     console.log(result.token);
	//     RestClient.post(
	//       `${REACT_APP_BASE_ENDPOINT}/payment/make-payment`,
	//       result.token
	//     )
	//       .then((result) => {
	//         if (result.status === 200) {
	//           pop.success("Payment done successfully.");
	//         } else {
	//           pop.error("Something went wrong, Please try again.");
	//         }
	//       })
	//       .catch((error) => {
	//         let res = {
	//           status: false,
	//           message: message.commonError,
	//           type: message.error,
	//         };
	//         pop.error(res.message);
	//         console.error("response ", res);
	//       });
	//   }
	// };
	handleFormSubmit = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const {
			first_name,
			last_name,
			email,
			address_line,
			city,
			state_province_code,
			postal_code,
			country_code,
			telephone,
			total_weight,
			select_help,
		} = this.state;
		const reqObj = {
			first_name,
			last_name,
			email,
			address_line,
			city,
			state_province_code,
			postal_code,
			country_code,
			telephone,
			total_weight,
		};
		await this.props.getShipmentRateService(reqObj, (res) => {
			if (res.status) {
				// message.success(res.message);
				this.setState({
					/* remove shipping charges */
					//shiping_charge: res.data.MonetaryValue,
					shiping_charge: 0,
					billing_state: true,
					loading: false,
				});
			} else {
				this.setState({ loading: false });
				message.error(res.message);
			}
		});
	};

	proceedGuest = async (event) => {
		this.setState({
			loading: true,
		});
		event.preventDefault();
		// this.setState({
		//   visiblePayment:true
		// })
		const request = {
			name: this.state.first_name,
			company_name: "vox abc",
			email: this.state.email,
			password: "ghgdhsgjsghdh",
			role: "0",
		};
		await this.props.signupGuest(request, (res) => {
			console.log(res, "=== response user");
			if (res.status) {
				this.setState({
					user_id: res.data.id,
				});
				this.processGuestCart(res.data.id);
				/* local storage for guest user */
				localStorage.setItem("guestUser", res.data.id);
				/* end local storage for guest user */
			} else {
				console.log(res);
				message.error(res.message);
			}
		});

		/*let u_id = 16;
 let data =  await this.updateCartDetails(u_id)
 
 if(data)
 {
  setTimeout(
    () => this.proceedGusetOrder(), 
    3000
  );
  
 }*/
	};

	processGuestCart = async (u_id) => {
		let data = await this.updateCartDetails(u_id);

		// if(data)
		// {

		//   console.log(data);
		//  setTimeout(
		//    () => this.proceedGusetOrder(),
		//    500
		//  );

		// }
	};

	proceedOrder = async (event) => {
		this.setState({ loading: true });
		event.preventDefault();
		/*this.setState({
      visiblePayment:true
    });*/

		let u_id = this.props.user.id;
		if (!this.props.user.loggedIn) {
			message.error("Please login first");
			return false;
		}

		const {
			first_name,
			last_name,
			email,
			address_line,
			city,
			state_province_code,
			postal_code,
			country_code,
			telephone,
			total_weight,
			shiping_charge,
			number_of_piece,
			order_amount,
			select_help,
		} = this.state;
		const billing_detail = {
			first_name,
			last_name,
			email,
			address_line,
			city,
			state_province_code,
			postal_code,
			country_code,
			telephone,
			total_weight,
			shiping_charge,
			number_of_piece,
			order_amount,
		};

		let item_length = this.props.cart.cart.length;
		let item_list = await this.props.cart.cart.map((elem) => {
			let item = {
				product_id: elem.product_id,
				cart_id: elem.id,
				user_id: elem.user_id,
			};
			return item;
		});
		let reqObj = {
			order_amount: this.state.order_amount,
			order_help: this.state.select_help,
			order_item: item_length,
			user_id: u_id,
			billing_info: billing_detail,
			item: item_list,
		};
		this.props.orderPlacewithShipment(reqObj, (res) => {
			if (res.status) {
				this.props.deleteAllcart();
				this.setState({ loading: false });
				message.success(res.message);
				//console.log(res,"=== order response")
				this.props.history.push("/order-detail/" + res.data.id);
			} else {
				this.setState({ loading: false });
				message.error(res.message);
			}
		});
	};

	proceedGusetOrder = async () => {
		this.setState({ loading: true });
		let u_id = this.state.user_id;

		const {
			first_name,
			last_name,
			email,
			address_line,
			city,
			state_province_code,
			postal_code,
			country_code,
			telephone,
			total_weight,
			shiping_charge,
			number_of_piece,
			order_amount,
			select_help,
		} = this.state;
		const billing_detail = {
			first_name,
			last_name,
			email,
			address_line,
			city,
			state_province_code,
			postal_code,
			country_code,
			telephone,
			total_weight,
			shiping_charge,
			number_of_piece,
			order_amount,
		};

		let item_length = this.props.cart.cart.length;
		let item_list = await this.props.cart.cart.map((elem) => {
			let item = {
				product_id: elem.product_id,
				cart_id: elem.id,
				user_id: elem.user_id,
			};
			return item;
		});
		let reqObj = {
			order_amount: this.state.order_amount,
			order_item: item_length,
			order_help: this.state.select_help,
			user_id: u_id,
			billing_info: billing_detail,
			item: item_list,
		};
		this.props.orderPlacewithShipment(reqObj, (res) => {
			if (res.status) {
				this.props.deleteAllcart();
				this.setState({ loading: false });
				//  message.success(res.message);
				//console.log(res,"=== order response")

				this.props.history.push("/order-detail/" + res.data.id);
			} else {
				this.setState({ loading: false });
				message.error(res.message);
			}
		});
	};

	/* Add cart guest */
	updateCartDetails = async (id) => {
		var data = "";
		var r = 0;
		var count = 0;
		var bar = new Promise((resolve, reject) => {
			this.props.cart.cart.forEach(async (elem, index) => {
				count = this.props.cart.cart.length;
				elem.user_id = id;
				elem.type = 1;
				let productData = elem.product_data;
				delete elem.product_data;
				let body = new FormData();
				_.mapObject(elem, (obj, key) => {
					if (
						key == "customized_product_details" ||
						key == "sizes_quantity" ||
						key == "color_size_arr"
					) {
						body.append(key, JSON.stringify(obj));
					} else {
						body.append(key, obj);
					}
				});
				await this.props.addToCartService(body, (res) => {
					if (res.status == true) {
						r++;
						elem.product_data = productData;
						elem.customized_image = res.data.customized_image;
						elem.id = res.data.id;
						let params = { ...elem, index: index };

						this.props.updateCart(params);
						console.log(index);
						if (index === count - 1) resolve();
					} else {
						//message.error(res.message);
					}
				});
			});
		});

		bar.then(() => {
			console.log("All done!");
			return this.proceedGusetOrder();
		});
	};

	onErrorHandler = (response) => {
		message.error(response.messages.message.map((err) => err.text));
	};

	onSuccessHandler = async (response) => {
		console.log(response);
		this.setState({
			visiblePayment: false,
		});

		console.log(this.props.cart, "===cart");
		let u_id = 0;
		if (!this.props.user.loggedIn) {
			const request = {
				name: this.state.first_name,
				company_name: "vox abc",
				email: this.state.email,
				password: "ghgdhsgjsghdh",
				role: "0",
			};
			await this.props.signupGuest(request, (res) => {
				console.log(res, "=== response user");
				this.setState({ loading: true });
				if (res.status) {
					this.setState({
						user_id: res.data.id,
					});
					this.processGuestCart(res.data.id);
					/* local storage for guest user */
					localStorage.setItem("guestUser", res.data.id);
					/* end local storage for guest user */
				} else {
					console.log(res);
					message.error(res.message);
				}
			});
		} else {
			u_id = this.props.user.id;

			this.setState({ loading: true });
			const {
				first_name,
				last_name,
				email,
				address_line,
				city,
				state_province_code,
				postal_code,
				country_code,
				telephone,
				total_weight,
				shiping_charge,
				number_of_piece,
				order_amount,
				select_help,
			} = this.state;
			const billing_detail = {
				first_name,
				last_name,
				email,
				address_line,
				city,
				state_province_code,
				postal_code,
				country_code,
				telephone,
				total_weight,
				shiping_charge,
				number_of_piece,
				order_amount,
				select_help,
			};

			let item_length = this.props.cart.cart.length;
			let item_list = await this.props.cart.cart.map((elem) => {
				let item = {
					product_id: elem.product_id,
					cart_id: elem.id,
					user_id: elem.user_id,
				};
				return item;
			});
			let reqObj = {
				order_amount: this.state.order_amount,
				order_item: item_length,
				user_id: u_id,
				billing_info: billing_detail,
				item: item_list,
			};
			this.props.orderPlacewithShipment(reqObj, (res) => {
				if (res.status) {
					this.props.deleteAllcart();
					this.setState({ loading: false });
					message.success(res.message);
					//console.log(res,"=== order response")
					this.props.history.push("/order-detail/" + res.data.id);
				} else {
					this.setState({ loading: false });
					message.error(res.message);
				}
			});
		}
	};

	/* End cart guest */

	render() {
		const load = this.state.loading;
		return (
			<main>
				{this.state.loading ? (
					<div className="loading">Loading&#8230;</div>
				) : (
					""
				)}
				<div>
					<Modal
						visible={this.state.visiblePayment}
						onOk={this.handleOkPayment}
						onCancel={this.handleCancelPayment}
						footer={null}
					>
						<FormContainer
							environment="sandbox"
							onError={this.onErrorHandler}
							onSuccess={this.onSuccessHandler}
							amount={this.state.order_amount}
							component={FormComponent}
							clientKey={clientKey}
							apiLoginId={apiLoginId}
							className="customname"
						/>
					</Modal>
					<section className="category-section-outer">
						<div className="container">
							<div className="row">
								<div className="col-md-8 col-sm-12">
									<div className="row">
										<div className="col-md-12 col-sm-12">
											{/* <div className="category-title">Your Cart</div> */}
											<div className="category-title">
												{this.props.intl.formatMessage({ id: "your_cart" })} (
												{this.props.cart.cart.length}{" "}
												{this.props.cart.cart.length > 1 ? "items" : "item"})
											</div>
											<hr className="category-border" />
										</div>
									</div>

									<div className="cart-left checkout-outer billing-address-popup">
										<div className="billing-address-title">
											Shipping Address
										</div>
										<form onSubmit={this.handleFormSubmit}>
											<div className="billing-address-inputs">
												<div className="row">
													<div className="col-md-6 col-sm-12">
														<input
															type="text"
															placeholder="First name *"
															name="first_name"
															required
															onChange={(e) => this.handleChange(e)}
														/>
													</div>
													<div className="col-md-6 col-sm-12">
														<input
															type="text"
															placeholder="Last name *"
															name="last_name"
															required
															onChange={(e) => this.handleChange(e)}
														/>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6 col-sm-12">
														<input
															type="text"
															placeholder="Email *"
															name="email"
															required
															onChange={(e) => this.handleChange(e)}
														/>
													</div>
													<div className="col-md-6 col-sm-12">
														<input
															type="text"
															placeholder="Street Address *"
															name="address_line"
															required
															onChange={(e) => this.handleChange(e)}
														/>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6 col-sm-12">
														<input
															type="text"
															placeholder="City *"
															name="city"
															required
															onChange={(e) => this.handleChange(e)}
														/>
													</div>
													{/* <div className="col-md-6 col-sm-12">
                            <input
                              type="text"
                              placeholder="State/Region"
                              name="state"
                              required
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div> */}
													<div className="col-md-6 col-sm-12">
														<select
															className="custom-select"
															name="state_province_code"
															value={this.state.option}
															onChange={(e) => this.handleChange(e)}
															required
														>
															<option value="">Select State</option>
															{states.map((elem, index) => (
																<option value={elem.abbreviation} key={index}>
																	{elem.name}
																</option>
															))}
														</select>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6 col-sm-12">
														<select
															className="custom-select"
															name="country_code"
															value={this.state.option}
															onChange={(e) => this.handleChange(e)}
															required
														>
															<option value="">Select Country</option>
															<option value="US">United States</option>
														</select>
													</div>
													<div className="col-md-6 col-sm-12">
														<input
															type="number"
															placeholder="Zip/Postal Code *"
															name="postal_code"
															required
															onChange={(e) => this.handleChange(e)}
														/>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6 col-sm-12">
														<input
															type="number"
															placeholder="Telephone *"
															name="telephone"
															required
															onChange={(e) => this.handleChange(e)}
														/>
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<button
														className="proceed-to-checkoutbtn popup-check"
														type="submit"
													>
														{this.state.billing_state
															? `Update Shipping Info`
															: `Submit`}
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
								<div className="col-md-4 col-sm-12">
									<div className="row">
										<div className="col-md-12 col-sm-12">
											<div className="category-title">Order Summary</div>
											<hr className="category-border" />
										</div>
									</div>
									<div className="cart-right">
										<div className="cart-inner-price">
											<div className="cart-inner-priceleft">
												{this.props.intl.formatMessage({ id: "no_of_items" })}
											</div>
											<div className="cart-inner-priceright">
												{this.props.cart.cart.length}
											</div>
										</div>
										<div className="cart-inner-price total-price">
											<div className="cart-inner-priceleft">Total:</div>
											<div className="cart-inner-priceright">
												<span>
													$
													{this.state.order_amount
														? this.state.order_amount
														: this.state.order_amount}
												</span>
											</div>
										</div>
										<div
											className="cart-inner-price total-price"
											style={{ display: "none" }}
										>
											<div className="cart-inner-priceleft">
												Shipping Charge:
											</div>
											<div className="cart-inner-priceright">
												<span>
													$
													{this.state.shiping_charge
														? this.state.shiping_charge
														: this.state.shiping_charge}
												</span>
											</div>
										</div>
										{this.state.billing_state ? (
											<div>
												{this.props.user.loggedIn ? (
													<button
														className="proceed-to-checkoutbtn popup-check"
														type="submit"
														onClick={(e) => this.proceedOrder(e)}
														disabled={load}
													>
														{load ? "Sending..." : "Submit For Review"}
													</button>
												) : (
													<div>
														<button
															className="proceed-to-checkoutbtn popup-check"
															type="submit"
															onClick={(e) => this.proceedGuest(e)}
															disabled={load}
														>
															{load ? "Sending..." : "Submit For Review"}
														</button>
													</div>
												)}
												<p>
													<b>NOTE:</b> This is not your final cost. A final cost
													breakdown of shipping, taxes, quantity discounts, and
													printing will be sent before the art-proof review.
												</p>
											</div>
										) : (
											<b className="text-danger">
												Please enter your Shipping info.
											</b>
										)}
										<div className="accordian-outer">
											<div
												className="panel-group"
												id="accordion"
												role="tablist"
												aria-multiselectable="true"
											>
												<div className="panel panel-default">
													<div
														className="panel-heading"
														role="tab"
														id="headingOne"
													>
														<h4 className="panel-title">
															<a
																role="button"
																data-toggle="collapse"
																data-parent="#accordion"
																href="#collapseOne"
																aria-expanded="false"
																aria-controls="collapseOne"
															>
																Promo Code
															</a>
														</h4>
													</div>
													<div
														id="collapseOne"
														className="panel-collapse collapse in"
														role="tabpanel"
														aria-labelledby="headingOne"
													>
														<div className="panel-body">
															<div className="accordian-inner">
																<input type="text" />
																<a href="#">Apply</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="accordian-outer2">
											<div
												className="panel-group"
												id="accordion"
												role="tablist"
												aria-multiselectable="true"
											>
												<div className="panel panel-default">
													<div
														className="panel-heading"
														role="tab"
														id="headingOne2"
													>
														<h4 className="panel-title">
															<a
																role="button"
																data-toggle="collapse"
																data-parent="#accordion"
																href="#collapseTwo"
																aria-expanded="true"
																aria-controls="collapseTwo"
															>
																Did anyone help you?
															</a>
														</h4>
													</div>
													<div
														id="collapseTwo"
														className="panel-collapse collapse in show"
														role="tabpanel"
														aria-labelledby="headingOne2"
													>
														<div className="panel-body">
															<div className="accordian-inner">
																<select
																	className="custom-select"
																	name="select_help"
																	// value={
																	// 	this.state.anyoneHelp.length
																	// 		? console.log(
																	// 				this.state.anyoneHelp[0][0]["id"]
																	// 		  )
																	// 		: ""
																	// }
																	value={this.state.option}
																	required
																	onChange={(e) => this.handleChange(e)}
																>
																	{this.state.anyoneHelp.length
																		? this.state.anyoneHelp[0].map(
																				(elem, index) => (
																					<option value={elem.id} key={index}>
																						{elem.title}
																					</option>
																				)
																		  )
																		: ""}
																</select>
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
			</main>
		);
	}
}

export function InjectedCheckoutForm() {
	return (
		<ElementsConsumer>
			{({ stripe, elements }) => (
				<CheckoutForm stripe={stripe} elements={elements} />
			)}
		</ElementsConsumer>
	);
}

const mapStateToProps = (state) => ({
	user: state.user,
	products: state.products,
	cart: state.cart,
	order: state.order,
});
const mapDispatchToProps = (dispatch) => ({
	getShipmentRateService: bindActionCreators(getShipmentRateService, dispatch),
	orderPlacewithShipment: bindActionCreators(orderPlacewithShipment, dispatch),
	deleteAllcart: bindActionCreators(deleteAllcart, dispatch),
	addToCartService: bindActionCreators(addToCartService, dispatch),
	updateCart: bindActionCreators(updateCart, dispatch),
	signupGuest: bindActionCreators(signupGuest, dispatch),
	getHelp: bindActionCreators(getHelp, dispatch),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(injectIntl(CheckoutForm))
);
