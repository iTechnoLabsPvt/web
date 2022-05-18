import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Checkbox, Input, Button, message, Form } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { shareDesign } from "../../actions/products";
import { production_time } from "../Config/connection";

const FormItem = Form.Item;

class ShareDesignModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleCheckbox = (e) => {
    this.setState({
      params: { ...this.state.params, [e.target.name]: e.target.checked },
    });
  };

  handleShareDesign = (values) => {
    this.setState({ loading: true });
    let params = this.state.params;
    params.production_time_ = production_time;
    if (
      this.props.user.loggedIn &&
      this.props.mockup_ids &&
      this.props.mockup_ids.length
    ) {
      params = {
        ...params,
        mockup_ids: this.props.mockup_ids ? this.props.mockup_ids : [],
        loggedIn: true,
      };
    } else if (this.props.user.loggedIn && this.props.product_id) {
      params = {
        ...params,
        product_id: this.props.product_id,
        size_to_buy: this.props.size_to_buy,
        loggedIn: true,
      };
    } else if (!this.props.user.loggedIn) {
      params = {
        ...params,
        product_id: this.props.product_id,
        size_to_buy: this.props.size_to_buy,
        loggedIn: false,
      };
    }
    params.email = values.email;
    params.item_price = this.props.item_price;
    params.total_price = this.props.total_price;
    params.customized_product_details = this.props.customized_product_details;
    console.log("paraams", params);
    this.props.shareDesign(params, (res) => {
      if (res.status) {
        this.setState({
          loading: false,
          email: "",
          product_desc: false,
          spec: false,
          sizes_quantity: false,
          production_time: false,
          price: false,
        });
        this.props.handleCancelShare();
        message.success(res.message);
      } else {
        this.setState({ loading: false });
        message.error(res.message);
      }
    });
  };

  render() {
    console.log("this.props => ", this.props);
    return (
      <div>
        <div className="price-break-outer">
          <div className="price-break-title">Share your design </div>

          <p>
            We'll send a PDF of this design direct to your inbox. Select what
            else to include
          </p>
          <div className="share-design-outer">
            <div className="share-design-outerleft">Product Description</div>
            <div className="share-design-outerright">
              <Checkbox
                name="product_desc"
                onChange={(e) => this.handleCheckbox(e)}
              ></Checkbox>
            </div>
          </div>
          <div className="share-design-outer">
            <div className="share-design-outerleft">Specs</div>
            <div className="share-design-outerright">
              <Checkbox
                name="spec"
                onChange={(e) => this.handleCheckbox(e)}
              ></Checkbox>
            </div>
          </div>
          <div className="share-design-outer">
            <div className="share-design-outerleft">Quantity</div>
            <div className="share-design-outerright">
              <Checkbox
                name="sizes_quantity"
                onChange={(e) => this.handleCheckbox(e)}
              ></Checkbox>
            </div>
          </div>
          <div className="share-design-outer">
            <div className="share-design-outerleft">Production time</div>
            <div className="share-design-outerright">
              <Checkbox
                name="production_time"
                onChange={(e) => this.handleCheckbox(e)}
              ></Checkbox>
            </div>
          </div>
          <div className="share-design-outer">
            <div className="share-design-outerleft">Price</div>
            <div className="share-design-outerright">
              <Checkbox
                name="price"
                onChange={(e) => this.handleCheckbox(e)}
              ></Checkbox>
            </div>
          </div>
          <Form
            onFinish={this.handleShareDesign}
            className="Container SigupForm"
            layout="vertical"
          >
            <FormItem
              name="email"
              rules={[
                {
                  required: true,
                  message: this.props.intl.formatMessage({ id: "enter_email" }),
                },
                {
                  type: "email",
                  message: this.props.intl.formatMessage({
                    id: "invalid_email",
                  }),
                },
              ]}
            >
              <Input
                className="email-input share-email-input"
                placeholder={this.props.intl.formatMessage({
                  id: "email_label",
                })}
              />
            </FormItem>
            <Button
              className="login-btn share-send-btn"
              disabled={this.state.loading}
              loading={this.state.loading}
              type="primary"
              size="large"
              htmlType="submit"
            >
              {this.props.intl.formatMessage({ id: "send" })}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  shareDesign: bindActionCreators(shareDesign, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ShareDesignModal));
