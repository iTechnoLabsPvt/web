import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import Table from "../../Components/Table";
import { getOrderListService } from "../../../actions/order";
class Orders extends Component {
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
    if (!loggedIn) return;
    context.props.getOrderListService(
      {
        user_id: id,
      },
      (res) => {
        if (res.status) {
          this.setState({ data: res.data });
        }
      }
    );
  };

  render() {
    const columns = [
      {
        Header: "Order number",
        accessor: "order_number",
      },
      {
        Header: "Order date",
        accessor: "order_date",
      },
      {
        Header: "Total",
        accessor: "total",
      },
    ];
    return (
      <main>
        <section className="dashboard_page mb-2 pb-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="dashboard_cnt ml-0">
                  <h2>Order</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="order_list_table mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Table
                  data={this.state.data}
                  columns={columns}
                  tableType="orders"
                  fileName="Orders"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      //     <main>
      //        <section class="dashboard_page mb-2 pb-2">
      //             <div class="container">
      //             <div class="row">
      //                     <div class="col-md-12 mt-5">

      //                             <div class="dashboard_cnt ml-0">
      //                                 <h2>Order</h2>

      //                             </div>

      //                         </div>
      //                 </div>

      //            </div>

      //           </section>
      //           <section class="order_list_table mb-5">
      //             <div class="container">
      //                 <div class="row">
      //                     <div class="col-md-12">

      //   <table class="rwd-table">
      //     <tbody>
      //       <tr>
      //         <th>Order number</th>
      //         <th>Order date</th>
      //         <th>Total</th>

      //       </tr>
      //       <tr>
      //         <td data-th="Order number">
      //           <span>V123456709A</span>
      //         </td>
      //         <td data-th="Order date">
      //           Sept 04, 2020
      //         </td>
      //         <td data-th="Total">
      //           $403.02
      //         </td>

      //       </tr>
      //         <tr>
      //         <td data-th="Order number">
      //           <span>V123456709A</span>
      //         </td>
      //         <td data-th="Order date">
      //           Sept 04, 2020
      //         </td>
      //         <td data-th="Total">
      //           $403.02
      //         </td>

      //       </tr>
      //         <tr>
      //         <td data-th="Order number">
      //           <span>V123456709</span>
      //         </td>
      //         <td data-th="Order date">
      //           Aug 26,2020
      //         </td>
      //         <td data-th="Total">
      //           $815.95
      //         </td>

      //       </tr>
      //         <tr>
      //         <td data-th="Order number">
      //           <span>V123456709</span>
      //         </td>
      //         <td data-th="Order date">
      //           Aug 11, 2020
      //         </td>
      //         <td data-th="Total">
      //           $644,35
      //         </td>

      //       </tr>
      //         <tr>
      //         <td data-th="Order number">
      //           <span>V123456709</span>
      //         </td>
      //         <td data-th="Order date">
      //           Jul 25, 2020
      //         </td>
      //         <td data-th="Total">
      //           $410.98
      //         </td>

      //       </tr>
      //         <tr>
      //         <td data-th="Order number">
      //           <span>V123456709</span>
      //         </td>
      //         <td data-th="Order date">
      //           Jun 11, 2020
      //         </td>
      //         <td data-th="Total">
      //           $2,095.01
      //         </td>

      //       </tr>

      //     </tbody>
      //   </table>

      // </div>
      //                     </div>
      //                 </div>

      //           </section>
      //       </main>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  getOrderListService: bindActionCreators(getOrderListService, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Orders));
