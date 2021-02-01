import React from "react";
import "../../../../assets/css/product.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class Product extends React.Component {
  state = {};

  render() {
    let { name, brand, arrayImage, id, idShop } = this.props.item;
    return (
      <div
        className={name !== "" ? "recproduct-card" : "recproduct-card-hidden"}
        onClick={() => {
          this.props.history.push({
            pathname: `/shopnow/product-detail/idProduct/${id}/idShop/${idShop}`,
          });
          this.props.history.go(0);
        }}
      >
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

export default connect(mapStateToProps, null)(Product);
