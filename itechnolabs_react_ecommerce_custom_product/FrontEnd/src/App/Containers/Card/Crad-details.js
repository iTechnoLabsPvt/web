import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import product_img from "../../Images/product_img_1.jpg";
import no_img from "../../Images/no-img.jpg";
import { injectIntl } from "react-intl";
import { Modal, message as pop } from "antd";
// import Login from "../Authentication/Login";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { FormComponent, FormContainer } from "react-authorize-net";
// import { message as pop } from "antd";

import RestClient from "../../../utilities/RestClient";
import { REACT_APP_BASE_ENDPOINT } from "../../Config/connection";
import message from "../../../constants/messages";
import { withRouter } from "react-router-dom";

let clientKey = '74WnS3uc5C4x978Fj9pB9rUcZVDXhBdYApnTnV3QM2fG657Pv9Mh8TCzGB7Nuydt';
let apiLoginId = '9R7Sp6Nh9nK';




class PaymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visibleLogin: false,
      visiblePayment: true,
      order_amount:this.props.parentState.order_amount,
    };

    const { stripe, elements, cart, parentState } = this.props;
  console.log(parentState.order_amount);
  


  }




  componentDidMount(){
    
    
  }

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

  // handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const { stripe, elements, cart, parentState } = this.props;
  //   let req = {
  //     order_amount: parentState.order_amount,
  //     order_item: cart.cart.length,
  //   };
  //   req.item = await cart.cart.map((elem) => {
  //     return {
  //       product_id: elem.product_id,
  //       total_qty: elem.total_qty,
  //       qty_XS: elem.qty_XS,
  //       qty_S: elem.qty_S,
  //       qty_M: elem.qty_M,
  //       qty_L: elem.qty_L,
  //       qty_XL: elem.qty_XL,
  //       qty_XXL: elem.qty_XXL,
  //       qty_3XL: elem.qty_3XL,
  //       qty_4XL: elem.qty_4XL,
  //       selectedColors: elem.selectedColors,
  //       colorsNumber: elem.colorsNumber,
  //       custmize_front_image_url: elem.custmize_front_image_url,
  //       custmize_back_image_url: elem.custmize_back_image_url,
  //       custmize_left_image_url: elem.custmize_left_image_url,
  //       custmize_right_image_url: elem.custmize_right_image_url,
  //       decorating_method: elem.decorating_method,
  //     };
  //   });
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   const card = elements.getElement(CardElement);
  //   const result = await stripe.createToken(card);

  //   if (result.error) {
  //     console.log(result.error.message);
  //   } else {
  //     req.token = result.token;
  //     RestClient.post(`${REACT_APP_BASE_ENDPOINT}/order/place-order`, req)
  //       .then((result) => {
  //         if (result.status === 200) {
  //           pop.success("Payment done successfully.");
  //           this.props.history.push("/");
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

  onErrorHandler = (response) => {
  
    pop.error(response.messages.message.map(err => err.text));
   


    
  }

  onSuccessHandler = (response) => {
  
    // pop.error(response.messages.message.map(err => err.text));
  }


  



  render() {
    return (
      <div>
         
        <FormContainer
            environment="sandbox"
            onError={this.onErrorHandler}
            onSuccess={this.onSuccessHandler}
            amount={this.state.order_amount}
            component={FormComponent}
            clientKey={clientKey}
            apiLoginId={apiLoginId}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  cart: state.cart,
});
export default connect(
  mapStateToProps,
)(injectIntl(PaymentInfo));

