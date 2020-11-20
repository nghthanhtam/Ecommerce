import React from 'react';
import '../../../../assets/css/product.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ShowingProduct extends React.Component {
  state = {
    mainPhoto: ''
  };

  handleVariantPhotos = (ele) => {
    this.setState({ mainPhoto: ele.filePath })
  }

  componentDidMount() {
    const { item } = this.props
    this.setState({ mainPhoto: item.variants[0].filePath })
  }

  render() {
    const { name, description, filePath, price, item } = this.props;
    const { mainPhoto } = this.state
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
        <img className="product-pic" src={mainPhoto} alt="../img/not-avai.jpg" />

        <Slider {...settings} >
          {item.variants.map((ele, index) => {
            return (
              <div key={index} style={{ padding: '-10px' }}>
                <img onMouseOver={() => this.handleVariantPhotos(ele)} style={{ width: '40px', height: '35px' }} src={ele.filePath} alt="photo" />
              </div>
            )
          })}
        </Slider>

        <div className="product-info">
          <div className="product-price">90$</div>
          <div className="product-btn">
            <i className="las la-cart-plus"></i>Cart
          </div>
        </div>
      </div>
    );
  }
}

export default ShowingProduct;
