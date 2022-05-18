import React, { Component } from "react";
import { injectIntl } from "react-intl";

class ShippingReturnsRefunds extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        <section className="about_page">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="heading_about">
                  <h2>SHIPPING, RETURNS AND REFUND POLICY – VOX CATALOG</h2>
                  <p>www.voxcatalog.com</p>
                  <p>Effective date: November 15, 2020</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 about_left_ctn">
                  <p>
                    Welcome to the Shipping, Returns and Refund policy of
                    www.voxcatalog.com
                  </p>
                  <p>
                    <b>SHIPPING TERMS</b>
                    <br />
                    <br />
                    <b>Order and Shipping Confirmation</b>
                    <br />
                    When placing your order, please make sure your shipping
                    address is correct as we are unable to redirect goods once
                    they are on route to you. Any incorrect address details will
                    often result in the parcel being returned to the sender, in
                    which case you will be charged for re-delivery. Vox Catalog
                    will not be responsible for any misplaced or unclaimed
                    parcels by the courier company.
                  </p>

                  <p>
                    <b>Delivery Time</b>
                    <br />
                    Orders will arrive within 14 business days after processing
                    normally. If you are buying items during promotional
                    periods, it may take a little longer for our items to be
                    delivered to you.
                    <br />
                    We are not responsible for delays outside our control. If
                    delivery of the items to you is delayed by an event outside
                    our control (e.g. because of postal/courier delays,
                    logistics or bad weather), we’ll let you know as soon as
                    possible.
                  </p>
                  <p>
                    <b>Courier Service</b>
                    <br />
                    Vox Catalog uses the following carrier to ship orders:
                    <ul style={{ marginLeft: "20px" }}>
                      <li>
                        <span>&#9679; </span>UPS
                      </li>
                    </ul>
                  </p>
                  <p>
                    <b>Where We Ship</b>
                    <br />
                    We currently ship directly within the United States.
                  </p>
                  <p>
                    <b>Delivery Fee</b>
                    <br />
                    All Customers are required to pay the delivery/shipping fee
                    for any orders they place which will be mentioned at the
                    time of checkout.
                  </p>
                  <p>
                    <b>REFUNDS/RETURNS </b>
                    <br />
                    Since the items are customized and the users approve the
                    mockup with their own discretion, we cannot provide refunds
                    on any item as they are forwarded to production. All Sales
                    are Final. Personalize/Customized items cannot be returned.
                    <br />
                    We may offer a refund if the item requested by the user is
                    out of stock or in exceptional circumstances at our own
                    discretion.
                  </p>
                  <p>
                    <b>CONTACT US</b>
                    <br />
                    For more information or to initiate a return request, please
                    get in touch with our Customer Support team by sending an
                    email on weborders@voxmg.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
       
      </main>
    );
  }
}
export default injectIntl(ShippingReturnsRefunds);
