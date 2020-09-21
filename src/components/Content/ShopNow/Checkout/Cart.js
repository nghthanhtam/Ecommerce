import React from "react";
import Button from "@material-ui/core/Button";
import "font-awesome/css/font-awesome.min.css";
import "../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CartDetail from "./CartDetail";

class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      orderList: [1, 2, 3, 4, 5],
    };
  }
  checkout = () => {};

  render() {
    let { orderList } = this.state;
    return (
      <div>
        <Header />
        <div className="nohome-section"></div>
        <div className="cart-container">
          <div className="cart-card">
            <div className="order-list">
              {orderList.map(() => {
                return <CartDetail />;
              })}
            </div>
            <div className="center-col-flex">
              <p className="promo-title">Mã giảm giá</p>
              <div class="ui action input">
                <input type="text" placeholder="Nhập ở đây..." />
                <button class="ui button">Áp dụng</button>
              </div>
              <div className="checkout">
                <p> Thành tiền</p>
                <p className="total"> 200000đ</p>
              </div>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#3571a7",
                  width: "108%",
                  marginTop: "20px",
                }}
                onClick={() => this.checkout()}
              >
                Tiến hành đặt hàng
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Cart;
