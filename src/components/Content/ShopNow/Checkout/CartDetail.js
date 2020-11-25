import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CartDetail extends React.Component {
  state = {
    productList: [1, 2, 3, 4, 5, 6, 7, 8],
    replyBoxHidden: false,
  };

  showDiscount = () => {
    const { item } = this.props
    return ((item.marketPrice - item.price) / item.marketPrice) * 100
  }
  render() {
    const { item, cItem, deleteCartItem } = this.props
    return (
      <div className="order">
        <div className="order-pic">
          <img alt="product" src="../img/blue.png" />
        </div>
        <div className="order-content">
          <div className="order-title">{item.name}</div>
          <div className="row-flex">
            <div className="order-shop">Cung cấp bởi</div>
            <div className="order-button"> {cItem.name}</div>
          </div>

          <div className="row-flex">
            <div className="order-button" onClick={() => deleteCartItem(item.idCart)}> Xóa</div>
            <div className="order-button">Để dành mua sau</div>
          </div>
        </div>
        <div className="order-price">
          <p className="price-af">{item.price} VND</p>
          {this.showDiscount() != 0 ?
            <div className="row-flex">
              <div className="price-bf">{item.marketPrice}</div>|
              <div className="percent">-{this.showDiscount()}%</div>
            </div> : null}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              height: "35px",
              width: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
            }}
          >
            <i className="fa fa-minus"></i>
          </div>
          <input
            style={{
              width: "50px",
              height: "35px",
              textAlign: "center",
              border: "1px solid #ccc",
            }}
          />
          <div
            style={{
              backgroundColor: "white",
              height: "35px",
              width: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
            }}
          >
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default CartDetail;
