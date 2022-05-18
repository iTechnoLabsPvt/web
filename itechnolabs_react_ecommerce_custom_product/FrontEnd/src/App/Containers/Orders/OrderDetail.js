import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import thank_text from "../../Images/thnku-text.png";
import thank_icon from "../../Images/thnku-icon.png";
import thank_background from "../../Images/thnkyou-bg.png"
import Table from "../../Components/Table";
import { getOrderDetailService } from "../../../actions/order";
class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };

       
      }
      componentDidMount() {
        this.getOrderListDetail();
      }
      getOrderListDetail = () => {
        let context = this;
        let { loggedIn, id } = context.props.user;
        let user_guest = localStorage.getItem('guestUser');

        if (!loggedIn && !user_guest) return;
        context.props.getOrderDetailService(
          {
            user_id: (id)?id:user_guest,
            order_id : this.props.match.params.order_id
          },
          (res) => {
            if (res.status) {
                console.log(res.data,"===data response");
              this.setState({ data: res.data });
            }
          }
        );
      };

    render() {

        return ((this.state.data && this.state.data.length)?(<div>
<section className="thnkyou-billing-outer">
         <div className="container">
            <div className="row">
               <div className="col-md-8 offset-md-2 col-sm-12">
                  <div className="thankyou-title">THANK YOU FOR YOUR ORDER</div>
                  {this.state.data.map((order, index) => (
                   <div class="row">
                     <div className="col-md-4">
                        <label className="modal-label">Order Id</label>
                        <div className="order-outer">
                        {order.order_number}
                        </div>
                     </div>
                     <div className="col-md-4">
                        <label className="modal-label">Order date</label>
                        <div className="order-outer">
                        <span>{order.order_date}</span>
                         
                        </div>
                     </div>
                     <div className="col-md-4">
                        <label className="modal-label">Order amount</label>
                        <div className="order-outer">
                           <span>{order.total}</span>
                        </div>
                     </div>
                   </div>
                  ))}
                  <p><b>NOTE:</b>This is not your final cost. A final cost breakdown of shipping, taxes, quantity discounts, and printing will be sent before the art-proof review.</p>
                   <div className="row">
                     <div className="col-md-12">
                        <div className="sub-title">Here's what happens next:</div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-md-12">
                        <hr className="modal-border"/>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <ul className="modal-ul">
                           <li>1. A Vox representative will reach out (within 1 business day) with a final cost breakdown of shipping, taxes, quantity discounts, and printing.</li>
                           <li>2. You will receive an art proof mockup. Approve or request changes.  </li>
                           <li>3. We will process and ship your order within 7-12 business days. </li>
                         
                        </ul>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <hr className="modal-border"/>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <ul className="modal-ul">
                           <li>If you have any questions, please contact <span><a href="mailto:orders@voxcatalog.com">orders@voxcatalog.com</a></span></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>  
      </div>):(<div>Nothing Found</div>))

    }

}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
    getOrderDetailService: bindActionCreators(getOrderDetailService, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderDetail));