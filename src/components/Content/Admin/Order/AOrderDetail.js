import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import { getOrderDets } from "../../../../state/actions/orderActions";
import Loader from "react-loader";
import AOrderDetailRow from "./AOrderDetailRow";

const mapStateToProps = (state) => ({
  isLoaded: state.order.isLoaded,
  history: state.history.history,
  order: state.order.order,
  isOrderDetsLoaded: state.order.isOrderDetsLoaded,
  total: state.order.total,
});

class AOrderDetail extends Component {
  state = {};

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getOrderDets(id);
  }

  convertPrice = (value) => {
    if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        <AOrderDetailRow
          history={this.props.history}
          key={index}
          orderDet={o}
          index={index + 1}
        />
      ))
    );
  };

  render() {
    const { isOrderDetsLoaded, order, total } = this.props;
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
                          Tổng tiền: {this.convertPrice(total)}đ{" "}
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
                          <div></div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12">
                            <table
                              id="example1"
                              className="table table-bordered table-striped"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "8%" }}>Mã sản phẩm</th>
                                  <th style={{ width: "10%" }}>SKU</th>
                                  <th style={{ width: "8%" }}>Hình ảnh</th>
                                  <th style={{ width: "15%" }}>Tên sản phẩm</th>
                                  <th style={{ width: "10%" }}>Đơn giá</th>
                                  <th style={{ width: "10%" }}>Số lượng mua</th>
                                </tr>
                              </thead>

                              <tbody>{this.renderOrders()}</tbody>

                              <tfoot></tfoot>
                            </table>
                          </div>
                        </div>
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
