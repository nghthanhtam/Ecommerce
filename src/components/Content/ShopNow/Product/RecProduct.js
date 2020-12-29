import React from "react";
import "../../../../assets/css/product.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Product extends React.Component {
  state = {};

  render() {
    let { name, brand, arrayImage } = this.props.item;
    return (
      <div className="recproduct-card">
        <h1>{name}</h1>
        <p>Thương hiệu: {brand}</p>
        <img
          src={arrayImage.length > 0 ? arrayImage[0].url : ""}
          alt="product"
        />
        <div className="product-info">
          <div className="product-btn">Chi tiết</div>
        </div>
      </div>
    );
  }
}

export default Product;
