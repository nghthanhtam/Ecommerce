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
    console.log(ele);
    this.setState({ mainPhoto: ele.Images[0].url })
  }

  componentDidMount() {
    const { item } = this.props
    this.setState({ mainPhoto: item.productVars[0].Images[0].url })
  }

  render() {
    const { name, description, filePath, price, item } = this.props;
    const { mainPhoto } = this.state
    const settings = {
      infinite: true,
      speed: 800,
      slidesToScroll: 2,
      className: 'slider-provar',
      arrows: false
    };
    return (
      <div className="product-card" onClick={() => this.props.history.push(`/product-detail/${item.id}`)}>
        <h1>Captain Mouse</h1>
        <p>Saved: $4</p>
        <img className="product-pic" src={mainPhoto} alt="../img/not-avai.jpg" />

        <Slider {...settings} slidesToShow={4} >
          {item.productVars.map((ele, index) => {
            return (
              <div key={index} style={{ padding: '-10px' }}>
                <img onMouseOver={() => this.handleVariantPhotos(ele)}
                  onMouseOut={() => this.handleVariantPhotos(ele)}
                  style={{ width: '40px', height: '40px' }} src={ele.Images[0].url} alt="photo" />
              </div>
            )
          })}
        </Slider>

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
