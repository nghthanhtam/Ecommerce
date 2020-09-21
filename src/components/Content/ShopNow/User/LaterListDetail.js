import React from "react";
import Button from "@material-ui/core/Button";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class LaterListDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
      replyBoxHidden: false,
    };
  }

  render() {
    return (
      <div className="order">
        <div className="order-pic">
          <img alt="product" src="../img/blue.png" />
        </div>
        <div className="order-content">
          <div className="order-title">Chuột Captain America</div>
          <div className="row-flex">
            <div className="order-shop">Cung cấp bởi</div>
            <div className="order-button"> Hana Shop</div>
          </div>

          <div className="row-flex">
            <Button
              style={{
                color: "white",
                backgroundColor: "#3571a7",
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="order-price">
          <p className="price-af">100000đ</p>
          <div className="row-flex">
            <div className="price-bf">200000đ</div>|
            <div className="percent">-50%</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LaterListDetail;
