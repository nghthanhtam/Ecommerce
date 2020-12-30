import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getOrderDets } from "../../../../state/actions/orderActions";
import AOrderRow from "./AOrderRow";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => ({
  isLoaded: state.order.isLoaded,
  history: state.history.history,
});

class AOrdersByPurchase extends React.Component {
  state = {};

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    const { orderList } = this.props.location;
    if (!orderList) {
      console.log(this.props.history);
      return <Redirect to="/admin/order" />;
    }
    return orderList.map((o, index) => (
      <AOrderRow
        history={this.props.history}
        key={index}
        order={o}
        index={index + 1}
      />
    ));
  };

  render() {
    return (
      <Fragment>
        <section className="content-header">
          <h1>Đơn cần xử lý</h1>
          <ol className="breadcrumb">
            <li>
              <a href="/admin">
                <i className="fa fa-dashboard" /> Trang chủ
              </a>
            </li>
            <li>
              <a href="/admin/order">Đơn hàng</a>
            </li>
            <li>
              <a href="javascript:void(0)">Đơn hàng chi tiết</a>
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
                    <h3 className="box-title">Tổng số lượng đơn hàng: 2 đơn</h3>
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
                              <th>Mã đơn hàng</th>
                              <th>Nhà bán</th>
                              <th>Thời gian giao hàng dự kiến</th>
                              <th>Tình trạng</th>
                              <th>Phí ship</th>
                              <th>Lý do hủy</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>

                          <tbody>{this.renderOrders()}</tbody>

                          <tfoot>
                            <tr>
                              <th>#</th>
                              <th>Nhà bán </th>
                              <th>Thời gian giao hàng dự kiến</th>
                              <th>Tình trạng</th>
                              <th>Phí ship</th>
                              <th>Lý do hủy</th>
                              <th>Thao tác</th>
                            </tr>
                          </tfoot>
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
    );
  }
}

export default connect(mapStateToProps, { getOrderDets })(AOrdersByPurchase);
