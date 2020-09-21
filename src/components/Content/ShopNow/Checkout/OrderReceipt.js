import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class OrderReceipt extends React.Component {
  constructor(props) {
    super();
    this.state = {
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
      replyBoxHidden: false,
    };
  }

  replyClick = () => {
    let { replyBoxHidden } = this.state;
    this.setState({ replyBoxHidden: !replyBoxHidden });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="nohome-section"></div>
        <div className="receipt-container">
          <div className="order-res-card">
            <div className="res-infor">
              <div className="btn-home">Quay lại trang chủ</div>
              <h1>Đặt hàng thành công</h1>
              <p>Cảm ơn! Bạn đã đặt hàng thành công</p>
              <div className="sumup">
                <div className="res-order">
                  <h4>Mã đơn hàng</h4>
                  <p>1444</p>
                </div>
                <div className="res-order">
                  <h4>Ngày đặt</h4>
                  <p>21/09/2020</p>
                </div>
                <div className="res-order">
                  <h4>Tổng tiền</h4>
                  <p>200 000đ</p>
                </div>
                <div className="res-order">
                  <h4>Ngày đặt</h4>
                  <p>21/09/2020</p>
                </div>
              </div>
              <div className="res-infor-det">
                <h2>Chi tiết đơn hàng</h2>
                <div className="res-order-det">
                  <h4>Tổng số lượng </h4>
                  <p>:</p>
                  <p>3 món</p>
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
              </div>

              <div className="res-infor-det">
                <h2>Tổng cộng</h2>
                <div className="res-order-det">
                  <h4>Phương thức thanh toán </h4>
                  <p>:</p>
                  <p>Thanh toán qua thẻ visa</p>
                </div>
                <div className="res-order-det">
                  <h4>Phí vận chuyển </h4>
                  <p>:</p>
                  <p>12000đ</p>
                </div>
                <div className="res-order-det">
                  <h4>Tổng tiền </h4>
                  <p>:</p>
                  <p>200000đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default OrderReceipt;
