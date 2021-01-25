import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { addCart } from "../../../../state/actions/cartActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  idUser: state.authUser.user.id,
});

class LaterListDetail extends React.Component {
  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  showDiscount = () => {
    const { item } = this.props;
    let discount = ((item.marketPrice - item.price) / item.marketPrice) * 100;
    return Math.ceil(discount * Math.pow(10, 2)) / Math.pow(10, 2);
  };

  visitShop = (idShop, shopName) => {
    this.props.history.push(`/shopnow/shop/${idShop}/${shopName}`);
  };

  render() {
    const { item, addCart, idUser } = this.props;
    return (
      <div className="order">
        <div className="order-pic">
          <img
            alt="product"
            src={item.Images.length > 0 ? item.Images[0].url : ""}
          />
        </div>
        <div className="order-content">
          <div className="order-title">{item.name}</div>
          <div className="row-flex">
            <div className="order-shop">Cung cấp bởi</div>
            <div
              className="order-button"
              onClick={() => this.visitShop(item.Shop.id, item.Shop.name)}
            >
              {item.Shop.name}
            </div>
          </div>

          <div className="row-flex">
            <Button
              style={{
                color: "white",
                backgroundColor: "#3571a7",
              }}
              onClick={() => {
                addCart({ idProductVar: item.id, idUser, amount: 1 });
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="order-price">
          <p className="price-af">{this.convertPrice(item.price)}đ</p>
          <div className="row-flex">
            <div className="price-bf">
              {this.convertPrice(item.marketPrice)}đ
            </div>
            |<div className="percent">-{this.showDiscount()}%</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { addCart })(LaterListDetail);
