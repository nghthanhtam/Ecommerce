import React, { Component, Fragment } from "react";
import DoneList from "./Tab/DoneList";
import PendingList from "./Tab/PendingList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrdersByShop } from "../../../../state/actions/orderActions";

const mapStateToProps = (state) => ({
  permissions: state.auth.permissions,
});

class Order extends Component {
  state = {
    block: <PendingList />,
  };

  onTabClick = (name) => {
    if (name == "pending") this.setState({ block: <PendingList /> });
    else if (name == "done") this.setState({ block: <DoneList /> });
  };

  componentDidMount() {
    if (!this.props.permissions.includes("getUndoneOrders")) {
      this.setState({ block: <DoneList /> });
      console.log("donelist");
    } else {
      this.setState({ block: <PendingList /> });
      console.log("avcvcv");
    }
  }

  render() {
    const { permissions } = this.props;
    const { block } = this.state;
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
                {permissions.includes("getUndoneOrders") && (
                  <li
                    onClick={() => this.onTabClick("pending")}
                    className="active"
                  >
                    <a href="#pendinglist" data-toggle="tab">
                      Đơn hàng chờ duyệt
                    </a>
                  </li>
                )}
                {permissions.includes("getDoneOrders") && (
                  <li
                    onClick={() => this.onTabClick("done")}
                    className={
                      !permissions.includes("getUndoneOrders") ? "active" : ""
                    }
                  >
                    <a href="#list" data-toggle="tab">
                      Lịch sử đơn hàng
                    </a>
                  </li>
                )}
              </ul>
              <div className="tab-content">{block}</div>
            </div>
          </section>
          {/* /.content */}
        </Fragment>
        {/* )} */}
      </Fragment>
    );
  }
}

Order.propTypes = {
  getOrdersByShop: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  totalDocuments: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { getOrdersByShop })(Order);
