import React from "react";
import "../../../../assets/css/product.css";

class Product extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }
  addToCart = () => {
    //goi api count so luong record trong CartDet
  };
  render() {
    let { name, description, filePath, price } = this.props;
    return (
      <div className="product-card">
        <h1>Captain Mouse</h1>
        <p>Saved: $4</p>
        <img className="product-pic" src="../img/blue.png" alt="product" />
        <div className="product-info">
          <div className="product-price">90$</div>
          <div onClick={() => this.addToCart()} className="product-btn">
            <i className="las la-cart-plus"></i>Cart
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
