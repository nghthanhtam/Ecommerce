import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import { getOrderDets } from "../../../../state/actions/orderActions";
import Loader from "react-loader";
import OrderRow from "./AOrderRow";

const mapStateToProps = (state) => ({
  isLoaded: state.order.isLoaded,
  history: state.history.history,
  order: state.order.order,
  isOrderDetsLoaded: state.order.isOrderDetsLoaded,
});

class AOrderDetail extends Component {
  state = {};

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getOrderDets(id);
  }

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  tokenConfig = (token) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    //Header
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCancel = (e) => {
    this.props.history.push("/home");
  };

  renderSelect = () => {
    const { sort, limit } = this.state;
    return (
      <select
        onChange={this.handleOnChange}
        name="limit"
        aria-controls="example1"
        style={{ margin: "0px 5px" }}
        className="form-control input-sm"
        value={limit}
      >
        {sort.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
  };

  renderOrders = () => {
    const { order, isOrderDetsLoaded } = this.props;

    return !isOrderDetsLoaded ? (
      <tr>
        <td>
          <Loader></Loader>
        </td>
      </tr>
    ) : (
      order.ProductVars.map((o, index) => (
        <OrderRow
          history={this.props.history}
          key={index}
          orderDet={o}
          index={index + 1}
        />
      ))
    );
  };

  render() {
    const { isOrderDetsLoaded, order } = this.props;
    const { totalAmount } = this.props.location;
    return (
      <Fragment>
        {isOrderDetsLoaded && (
          <Fragment>
            <section className="content-header">
              <h1>Chi tiết đơn hàng #{order.id}</h1>
              <ol className="breadcrumb">
                <li>
                  <a href="/home">
                    <i className="fa fa-dashboard" /> Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/seller/order">Đơn hàng</a>
                </li>
                <li>
                  <a href="fake_url">Đơn hàng chi tiết</a>
                </li>
              </ol>
            </section>
            {/* Main content */}
            <section className="content">
              <div className="row">
                {/* left column */}
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header" style={{ marginTop: "5px" }}>
                      <div style={{ paddingLeft: "5px" }} className="col-md-8">
                        <h3 className="box-title">
                          Tổng tiền: {this.convertPrice(totalAmount)}đ{" "}
                        </h3>
                      </div>

                      {/* <div className="col-md-4">
                    <OrderModal limit={limit} page={page} />
                  </div> */}
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                      <div
                        id="example1_wrapper"
                        className="dataTables_wrapper form-inline dt-bootstrap"
                      >
                        <div className="row">
                          <div>
                            {/* <div className="col-sm-6">
                          <div
                            className="dataTables_length"
                            id="example1_length"
                          >
                            <label>
                              Hiển thị
                              {this.renderSelect()}
                              kết quả
                            </label>
                          </div>
                        </div> */}
                            {/* <div className="col-sm-6">
                          <div id="example1_filter" className="dataTables_filter" >
                            <label style={{ float: 'right' }}>
                              Tìm kiếm
                                              <input
                                type="search"
                                name="query"
                                style={{ margin: '0px 5px' }}
                                className="form-control input-sm"
                                placeholder="Nhập từ khóa...  "
                                aria-controls="example1"
                                onChange={this.handleOnChange}
                                value={query} />
                            </label>
                          </div>
                        </div> */}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12">
                            <table
                              id="example1"
                              className="table table-bordered table-striped table-scroll"
                            >
                              <thead>
                                <tr>
                                  <th>Mã đơn hàng</th>
                                  <th>Người nhận</th>
                                  <th>Số điện thoại</th>
                                  <th>Địa chỉ</th>
                                  <th>Tổng cộng</th>
                                  <th>Ngày đặt</th>
                                  <th>Phí ship</th>
                                  <th>Tình trạng</th>
                                  <th>Lý do hủy</th>
                                  <th style={{ width: "100%" }}>Thao tác</th>
                                </tr>
                              </thead>

                              <tbody>{this.renderOrders()}</tbody>

                              <tfoot>
                                <tr>
                                  <th>Mã đơn hàng</th>
                                  <th>Người nhận</th>
                                  <th>Số điện thoại</th>
                                  <th>Địa chỉ</th>
                                  <th>Tổng cộng</th>
                                  <th>Ngày đặt</th>
                                  <th>Phí ship</th>
                                  <th>Tình trạng</th>
                                  <th>Lý do hủy</th>
                                  <th>Thao tác</th>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                        {/* <div className="row">

                      <div className="col-sm-7">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="example1_paginate">
                          <ul
                            className="pagination"
                            style={{ float: 'right' }}
                          >
                            {this.renderPageButtons()}
                          </ul>
                        </div>
                      </div>
                    </div> */}
                      </div>
                      {/*/.col (left) */}
                    </div>
                    {/* /.row */}
                  </div>
                </div>
              </div>
            </section>
            {/* /.content */}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, { pushHistory, getOrderDets })(
  AOrderDetail
);
