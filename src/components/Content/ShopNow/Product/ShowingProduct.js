import React from "react";
import "../../../../assets/css/product.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { addLaterlist } from "../../../../state/actions/laterListActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  isLoaded: state.product.isLoaded,
});

class ShowingProduct extends React.Component {
  state = {
    mainPhoto: "",
    mainPrice: "",
  };

  convertPrice = (value) => {
    console.log(value);
    if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else return 0;
  };

  handleVariantPhotos = (ele) => {
    let productVar = this.props.item.ProductVars.filter((obj) => {
      return obj.id == ele.idProductVar;
    });
    this.setState({ mainPhoto: ele.url, mainPrice: productVar[0].price });
  };

  initPrice = () => {
    const { item } = this.props;
    let productVar = item.ProductVars.filter((obj) => {
      return obj.id == item.arrayImage[0].idProductVar;
    });
    return productVar[0].price;
  };

  render() {
    const { item } = this.props;
    const { mainPhoto, mainPrice } = this.state;
    const settings = {
      infinite: true,
      speed: 800,
      slidesToScroll: 2,
      className: "slider-provar",
    };
    return (
      <div className="product-card">
        <div style={{ height: "315px" }}>
          <div
            onClick={() =>
              this.props.history.push({
                pathname: `/shopnow/product-detail/idProduct/${item.id}/idShop/${item.idShop}`,
              })
            }
          >
            <h1>{item.name}</h1>
            {item.marketPrice - Number(item.price) > 0 && (
              <p>Tiết kiệm: ${item.marketPrice - Number(item.price)}</p>
            )}
            <img
              className="product-pic"
              src={mainPhoto ? mainPhoto : item.arrayImage[0].url}
              alt="../img/not-avai.jpg"
            />
          </div>

          <div style={{ zIndex: 1000 }}>
            <Slider
              {...settings}
              slidesToShow={
                item.arrayImage.length < 4 ? item.arrayImage.length : 4
              }
            >
              {item.arrayImage.map((ele, index) => {
                return (
                  <div key={index}>
                    <img
                      onMouseOver={() => this.handleVariantPhotos(ele)}
                      onMouseOut={() => this.handleVariantPhotos(ele)}
                      style={{ width: "32px", height: "40px" }}
                      src={ele.url}
                      alt="photo"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="showing-price">
          {mainPrice
            ? this.convertPrice(Number(mainPrice))
            : this.convertPrice(Number(this.initPrice()))}
          đ
        </div>
        <div className="product-info">
          <div
            className="product-btn"
            onClick={() =>
              this.props.history.push({
                pathname: `/shopnow/product-detail/idProduct/${item.id}/idShop/${item.idShop}`,
              })
            }
          >
            {/* <i className="las la-cart-plus"></i> */}
            Xem chi tiết
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { addLaterlist })(ShowingProduct);
