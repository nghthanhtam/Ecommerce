import React from 'react';

class DuplicateProduct extends React.Component {
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
      <div className="duplicate-card">
        <h1>Captain Mouse</h1>
        <p>SKU: 0988464DF65</p>
        <img className="product-pic" src="../img/blue.png" alt="product" />
        <div className="duplicate-info">
          <div onClick={() => this.addToCart()} className="duplicate-btn">
            Bán sản phẩm này
          </div>
        </div>
      </div>
    );
  }
}

export default DuplicateProduct;
