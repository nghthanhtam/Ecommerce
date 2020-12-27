import React, { Component, Fragment } from "react";
import ADoneList from "./Tab/ADoneList";
import APendingList from "./Tab/APendingList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrdersByShop } from "../../../../state/actions/orderActions";

const mapStateToProps = (state) => ({});

class AOrder extends Component {
  state = {
    block: <APendingList />,
  };
  onTabClick = (name) => {
    if (name == "pending") this.setState({ block: <APendingList /> });
    else if (name == "done") this.setState({ block: <ADoneList /> });
  };

  render() {
    return (
      <Fragment>
        <Fragment>
          <section className="content-header">
            <h1>Đơn hàng</h1>
            <ol className="breadcrumb">
              <li>
                <a href="/seller">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="/seller/order">Đơn hàng</a>
              </li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li
                  onClick={() => this.onTabClick("pending")}
                  className="active"
                >
                  <a href="#list" data-toggle="tab">
                    Đơn hàng chờ duyệt
                  </a>
                </li>
                <li onClick={() => this.onTabClick("done")}>
                  <a href="#pendinglist" data-toggle="tab">
                    Lịch sử đơn hàng
                  </a>
                </li>
              </ul>
              <div className="tab-content">{this.state.block}</div>
            </div>
          </section>
          {/* /.content */}
        </Fragment>
        {/* )} */}
      </Fragment>
    );
  }
}

AOrder.propTypes = {
  getOrdersByShop: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  totalDocuments: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { getOrdersByShop })(AOrder);
