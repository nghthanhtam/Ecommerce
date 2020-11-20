import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../../assets/css/product.css';

import Product from './Product';
import ShowingProduct from './ShowingProduct';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class ProductList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      similarProductList: [{ id: 1, variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] }],
      productList: [1, 2, 3, 4, 5, 6, 7],
      header: 'header',
      picLink: './img/blue.png',
      section: 'section-blue',
      left: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.changePic = this.changePic.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    if (window.scrollY > 10) {
      this.setState({ header: 'header1' });
    } else {
      this.setState({ header: 'header' });
    }
    this.setState({
      left: (-window.scrollY * 0.5).toString() + 'px',
    });
  };

  changePic = (e) => {
    if (e.target.alt === 'blue') {
      this.setState({ picLink: './img/blue.png' });
      this.setState({ section: 'section-blue' });
    } else if (e.target.alt === 'red') {
      this.setState({ picLink: './img/red.png' });
      this.setState({ section: 'section-red' });
    } else {
      this.setState({ picLink: './img/black.png' });
      this.setState({ section: 'section-black' });
    }
  };

  render() {
    let { productList, similarProductList } = this.state;
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 4,
      className: 'slider',
    };
    return (
      <div>
        <Header />
        <div
          style={{
            zIndex: 10,
            marginBottom: '300px',
            position: 'relative',
            backgroundColor: '#f7f7f7'
          }}
        >
          <div className="nohome-section" />

          <div style={{ display: 'flex', padding: '40px', justifyContent: 'center' }}>
            <div className="filter-list">
              <div className="ui action input">
                <input type="text" placeholder="Search..." />
                <button className="ui icon button">
                  <i className="search icon"></i>
                </button>
              </div>

              <h1 className="title-filter">Movie Types</h1>

              <div className="ui checkbox">
                <input type="checkbox" className="example" />
                <label>Make my profile visible</label>
              </div>
              <div style={{ marginBottom: '5px' }} className="ui checkbox">
                <input type="checkbox" className="example" />
                <label>Make my profile visible</label>
              </div>
              <div style={{ marginBottom: '5px' }} className="ui checkbox">
                <input type="checkbox" className="example" />
                <label>Make my profile visible</label>
              </div>

              <h1 className="title-filter">Age Ranges</h1>
              <div className="ui checkbox">
                <input type="checkbox" className="example" />
                <label>2 to 4 years</label>
              </div>
              <div className="ui checkbox">
                <input type="checkbox" className="example" />
                <label>5 to 7 years</label>
              </div>
              <div className="ui checkbox">
                <input type="checkbox" className="example" />
                <label>8 to 13 years</label>
              </div>

              <h1 className="title-filter">Price</h1>
              <p>Pick the price</p>
              <div className="price-filter">
                <input
                  className="price-inp"
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="$ Min"
                />
                <div
                  style={{
                    width: '5px',
                    borderTop: '2px solid #c8c8c8',
                    margin: '5px',
                  }}
                ></div>
                <input
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    padding: '12px',
                    width: '90px',
                    height: '10px',
                    boxSizing: 'border-box',
                  }}
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="$ Max"
                />
              </div>

              <div
                className="btn-go"
                style={{
                  width: '60px',
                  height: '30px',
                  border: '1px solid #ccc',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Go
              </div>

              <h1 className="title-filter">Avalability</h1>
              <div className="ui checkbox">
                <input type="checkbox" className="example" />
                <label>Include Out of Stock</label>
              </div>

              <h1 className="title-filter">PRODUCT TAGS</h1>
              <div>
                <div className="row-flex">
                  <button className="tag">Captain</button>
                  <button className="tag">Glass</button>
                </div>
                <div className="row-flex">
                  <button className="tag">Keyboard</button>
                  <button className="tag">Mouse</button>
                </div>
                <div className="row-flex">
                  <button className="tag">Tshirt</button>
                  <button className="tag">Novel</button>
                </div>
              </div>
            </div>
            <div className="column-flex">
              <div className="filter-pane">
                <div>Showing 1-12 of 40 results</div>
                <div className="row-flex-center">
                  <div style={{ marginRight: '10px' }}>Sort By</div>
                  <div>
                    <select className="ui dropdown">
                      <option value="">Price</option>
                      <option value="1">New stock</option>
                      <option value="0">Rate</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div className="list-wrapper">
                  <div className="grid">
                    {similarProductList.map((item, index) => {
                      return <ShowingProduct key={index} item={item} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div >

            <div className="rec-product-wrapper">
              <h3 style={{ color: '#0d1136', marginRight: 'auto' }}>
                SẢN PHẨM KHÁC TRONG CÙNG PHIM
              </h3>
              <Slider style={{ width: '106%', paddingTop: 0 }} {...settings} >
                {productList.map((item, index) => {
                  return <Product key={index} />;
                })}
              </Slider>
            </div>
            <div className="rec-product-wrapper">
              <h3 style={{ color: '#0d1136', marginRight: 'auto' }}>
                SẢN PHẨM KHÁC TƯƠNG TỰ
              </h3>
              <Slider style={{ width: '106%', paddingTop: 0 }} {...settings} >
                {productList.map((item, index) => {
                  return <Product key={index} />;
                })}
              </Slider>
            </div>
          </div>

        </div>

        <Footer />
      </div >
    );
  }
}

export default ProductList;
