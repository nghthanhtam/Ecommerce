import React from 'react';
import '../../../../assets/css/product.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Product extends React.Component {
  state = {

  };

  addToCart = () => {
    //goi api count so luong record trong CartDet
  };
  render() {
    let { name, description, filePath, price } = this.props;
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 4,
      slidesToScroll: 2,
      className: 'slider',
      arrows: false
    };
    return (
      <div className="product-card">
        <h1>Captain Mouse</h1>
        <p>Saved: $4</p>
        <img className="product-pic" src="../img/blue.png" alt="product" />
        <div className="product-info">
          <div className="product-price">90$</div>
          <div onClick={() => this.addToCart()} className="product-btn">
            {/* <i className="fa fa-eye"></i> */}
            Chi tiết
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
