import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { addLaterlist } from "../../../../state/actions/laterListActions";

const mapStateToProps = (state) => ({
  idUser: state.authUser.user.id,
});

class CartDetail extends React.Component {
  state = {};

  showDiscount = () => {
    const { item } = this.props;
    let discount = ((item.marketPrice - item.price) / item.marketPrice) * 100;
    return Math.ceil(discount * Math.pow(10, 2)) / Math.pow(10, 2);
  };

  render() {
    const { item, cItem, deleteCartItem, amountChange, idUser } = this.props;
    return (
      <div className="order">
        <div className="order-pic">
          <img alt="product" src={item.Images[0].url} />
        </div>
        <div className="order-content">
          <div className="order-title">{item.name}</div>
          <div className="row-flex">
            <div className="order-shop">Cung cấp bởi</div>
            <div className="order-button"> {cItem.name}</div>
          </div>

          <div className="row-flex">
            <div
              className="order-button"
              onClick={() => deleteCartItem(item.idCart)}
            >
              {" "}
              Xóa
            </div>
            <div
              className="order-button"
              onClick={() => addLaterlist({ idProductVar: item.id, idUser })}
            >
              Để dành mua sau
            </div>
          </div>
        </div>
        <div className="order-price">
          <p className="price-af">
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
          </p>
          {this.showDiscount() != 0 ? (
            <div className="row-flex">
              <div className="price-bf">
                {item.marketPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              |<div className="percent">-{this.showDiscount()}%</div>
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            className="minus-btn"
            onClick={() => amountChange(item.amount - 1, item.idCart, item.id)}
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
            value={item.amount}
            onChange={this.onChange}
          />
          <div
            className="plus-btn"
            onClick={() => amountChange(item.amount + 1, item.idCart, item.id)}
          >
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { addLaterlist })(CartDetail);
