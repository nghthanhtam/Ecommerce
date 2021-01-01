import React from "react";

class DuplicateProduct extends React.Component {
  componentDidMount() {
    console.log(this.props.item);
  }

  render() {
    const { id, name, brand, arrayImage } = this.props.item;
    return (
      <div className={id !== "" ? "duplicate-card" : "duplicate-card-hidden"}>
        <h1>{name}</h1>
        <p>{brand}</p>
        <img
          className="product-pic"
          src={arrayImage[0] ? arrayImage[0].url : ""}
          alt="product"
        />
        <div className="duplicate-info">
          <div
            onClick={() => this.props.pickProduct(id)}
            className="duplicate-btn"
          >
            Bán sản phẩm này
          </div>
        </div>
      </div>
    );
  }
}

export default DuplicateProduct;
