import React from 'react';
import '../../../../assets/css/product.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  history: state.history.history
});

class ShowingProduct extends React.Component {
  state = {
    mainPhoto: ''
  };

  handleVariantPhotos = (ele) => {
    this.setState({ mainPhoto: ele.url })
  }

  componentDidMount() {
    const { item } = this.props
    console.log(item);
    if (item.arrayImage.length > 0) this.setState({ mainPhoto: item.arrayImage[0].url })
  }

  render() {
    const { item } = this.props;
    const { mainPhoto } = this.state
    const settings = {
      infinite: true,
      speed: 800,
      slidesToScroll: 2,
      className: 'slider-provar',
    };
    return (
      <div className="product-card" >
        <div style={{ height: '335px', }}>
          <div onClick={() => this.props.history.push({ pathname: `/shopnow//product-detail/idProduct/${item.id}/idShop/${item.idShop}` })}>
            <h1>{item.name}</h1>
            {item.marketPrice - Number(item.price) > 0 && <p>Saved: ${item.marketPrice - Number(item.price)}</p>}
            <img className="product-pic" src={mainPhoto} alt="../img/not-avai.jpg" />
          </div>

          <div style={{ zIndex: 1000 }} >
            <Slider {...settings} slidesToShow={item.arrayImage.length < 4 ? item.arrayImage.length : 4} >
              {item.arrayImage.map((ele, index) => {
                return (
                  <div key={index}>
                    <img onMouseOver={() => this.handleVariantPhotos(ele)}
                      onMouseOut={() => this.handleVariantPhotos(ele)}
                      style={{ width: '32px', height: '40px' }} src={ele.url} alt="photo" />
                  </div>
                )
              })}
            </Slider>
          </div>

        </div>
        <div className="product-info">
          <div className="product-price">90$</div>
          <div className="product-btn">
            <i className="las la-cart-plus"></i>Mua sau
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ShowingProduct);
