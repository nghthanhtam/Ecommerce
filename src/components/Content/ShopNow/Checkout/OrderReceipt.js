import React, { Fragment } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import { resetOrderAdded } from "../../../../state/actions/orderActions";

const mapStateToProps = (state) => ({
  ordersAdded: state.order.ordersAdded,
  history: state.history.history,
});

class OrderReceipt extends React.Component {
  state = {
    replyBoxHidden: false,
  };

  componentDidMount() {
    this.props.resetOrderAdded();
  }

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  convertPrice = (value) => {
    if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return 0;
  };

  replyClick = () => {
    let { replyBoxHidden } = this.state;
    this.setState({ replyBoxHidden: !replyBoxHidden });
  };

  getTotalEachShop = (o) => {
    let total = 0;
    o.orderDets.map((od) => {
      total += od.price * od.quantity;
    });
    return this.convertPrice(total);
  };

  getTotal = () => {
    let total = 0;
    this.props.ordersAdded.map((o) => {
      o.orderDets.map((od) => {
        total += od.quantity * od.price;
      });
    });
    return this.convertPrice(total);
  };

  render() {
    const { ordersAdded } = this.props;
    return (
      <Fragment>
        {this.props.ordersAdded.length == 0 ? (
          <Redirect to="/shopnow" />
        ) : (
          <div>
            {/* <Header /> */}
            <div
              style={{
                zIndex: 10,
                marginBottom: "300px",
                position: "relative",
                backgroundColor: "#f7f7f7",
              }}
            >
              <div className="nohome-section"></div>
              <div className="receipt-container">
                <div className="order-res-card">
                  <div className="res-infor">
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <div
                        className="btn-home"
                        onClick={() => this.props.pushHistory("/shopnow")}
                      >
                        Quay lại trang chủ
                      </div>
                      <div
                        className="btn-order-manage"
                        onClick={() =>
                          this.props.pushHistory("/shopnow/sales/order/history")
                        }
                      >
                        Quản lý đơn hàng
                      </div>
                    </div>
                    <h1>Đặt hàng thành công</h1>
                    <p>Cảm ơn! Bạn đã đặt hàng thành công</p>
                    {ordersAdded.map((o, index) => {
                      return (
                        <div key={index} className="sumup">
                          <div className="res-order">
                            <h4>Mã đơn hàng</h4>
                            <p>#{o.id}</p>
                          </div>
                          <div className="res-order">
                            <h4>Số lượng sản phẩm</h4>
                            <p>{o.orderDets.length}</p>
                          </div>
                          <div className="res-order">
                            <h4>Tổng tiền</h4>
                            <p>{this.getTotalEachShop(o)}</p>
                          </div>
                          <div className="res-order">
                            <h4>Ngày đặt</h4>
                            <p>{this.convertDate(o.createdAt)}</p>
                          </div>
                        </div>
                      );
                    })}

                    {/* <div className="res-infor-det">
                  <h2>Chi tiết đơn hàng</h2>
                  <div className="res-order-det">
                    <h4>Tổng số lượng </h4>
                    <p>:</p>
                    <p>3 sản phẩm</p>
                  </div>
                  <div className="res-order-det">
                    <h4>Ngày đặt hàng </h4>
                    <p>:</p>
                    <p>12/09/2020</p>
                  </div>
                  <div className="res-order-det">
                    <h4>Địa chỉ vận chuyển </h4>
                    <p>:</p>
                    <p>655 Le Duc Tho</p>
                  </div>
                </div> */}

                    <div className="res-infor-det">
                      <h2>Tổng cộng</h2>
                      <div className="res-order-det">
                        <h4>Phương thức thanh toán </h4>
                        <p>:</p>
                        <p>Thanh toán tiền mặt</p>
                      </div>
                      <div className="res-order-det">
                        <h4>Phí vận chuyển </h4>
                        <p>:</p>
                        <p>0đ</p>
                      </div>
                      <div className="res-order-det">
                        <h4>Tổng tiền </h4>
                        <p>:</p>
                        <p>{this.getTotal()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, { pushHistory, resetOrderAdded })(
  OrderReceipt
);
