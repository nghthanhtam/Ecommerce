import React from 'react';
import '../../../../assets/css/product.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Product extends React.Component {
  state = {

  };

  render() {
    let { name, description, filePath, price } = this.props;
    return (
      <div className="recproduct-card">
        <h1>Captain Mouse</h1>
        <p>Saved: $4</p>
        <img src="../img/blue.png" alt="product" />
        <div className="product-info">
          <div className="product-price">90$</div>
          <div className="product-btn">
            Chi tiết
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
