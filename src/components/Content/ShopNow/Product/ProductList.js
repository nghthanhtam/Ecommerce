import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../../assets/css/product.css';

import Product from './Product';
import ShowingProduct from './ShowingProduct';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RecProduct from './RecProduct'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductsByMovieCate } from '../../../../state/actions/productActions'

const mapStateToProps = (state) => ({
  history: state.history.history,
  products: state.product.products,
  isLoaded: state.product.isLoaded,
  totalDocuments: state.product.totalDocuments
});

class ProductList extends React.Component {
  state = {
    similarProductList:
      [{ variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] },
      { variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] },
      { variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] },
      { variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] },
      { variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] },
      { variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] },
      { variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] },
      { variants: [{ filePath: '../img/blue.png' }, { filePath: '../img/red.png' }, { filePath: '../img/blue.png' }, { filePath: '../img/black.png' }] }
      ],
    productList: [1, 2, 3, 4, 5, 6, 7],
    header: 'header',
    picLink: './img/blue.png',
    section: 'section-blue',
    left: 0,

    idMovieCat: '',
    limit: 8,
    page: 1,
    start: 1,
    end: 8,
    pages: [],
    isNextBtnShow: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const { getProductsByMovieCate } = this.props
    const { limit, page } = this.state
    if (this.props.location.idMovieCat) {
      const { idMovieCat } = this.props.location
      this.setState({ idMovieCat })
      getProductsByMovieCate({ limit, page, idCategory: idMovieCat })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { totalDocuments, isLoaded } = this.props;
    if (isLoaded == true && this.state.pages == prevState.pages) {
      this.getPages();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getStartEndDocuments() {
    const { limit, page } = this.state;
    const { totalDocuments } = this.props;

    let pages = Math.floor(totalDocuments / limit),
      remainder = totalDocuments % limit;
    if (remainder !== 0) pages += 1;
    console.log(totalDocuments);

    this.setState({ start: (page - 1) * limit + 1 }, () => {
      let end;
      if (Math.floor(totalDocuments / limit) + 1 == page)
        end = (page - 1) * limit + (totalDocuments % limit);
      else end = page * limit;
      this.setState({ end: end });
    });
  }

  rerenderPage = () => {
    const { limit, page, idMovieCat } = this.state;
    this.props.getProductsByMovieCate({
      limit,
      page,
      idCategory: idMovieCat
    });
    this.getPages();
    this.getStartEndDocuments();
  };

  getPages = () => {
    const { limit } = this.state;
    const { totalDocuments } = this.props;
    if (totalDocuments == 0) return;

    let pages = Math.floor(totalDocuments / limit);
    let remainder = totalDocuments % limit;
    let newArray = [];
    if (remainder !== 0) pages += 1;

    for (let i = 0; i < pages; i++) {
      newArray.push({ pageNumber: i + 1 });
    }

    //Nếu totalDocuments > 6 thì pageButtons được chia ra làm 3 nút số đầu - dấu 3 chấm - nút số cuối
    if (newArray && newArray.length > 6) {
      newArray = [
        { pageNumber: 1 },
        { pageNumber: 2 },
        { pageNumber: 3 },
        { pageNumber: '...' },
        { pageNumber: newArray.length },
      ];
    }
    this.setState({ pages: newArray });
  };

  handleOnChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (e.target.name === 'query') {
        this.setState({ page: 1 }, () => {
          this.rerenderPage();
        });
      } else {
        this.rerenderPage();
      }
    });
  };

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

  handleChoosePage = (e) => {
    const { totalDocuments } = this.props;
    const { limit, page } = this.state;
    let pages = Math.floor(totalDocuments / limit),
      remainder = totalDocuments % limit;
    if (remainder !== 0) pages += 1;

    if (e === -1) {
      e = page + 1;
      if (e === pages) this.setState({ isNextBtnShow: false });
    } else {
      if (e === pages) this.setState({ isNextBtnShow: false });
      else this.setState({ isNextBtnShow: true });
    }

    this.setState({ page: e }, () => {
      const { limit, page, idMovieCat } = this.state;
      const { getProductsByMovieCate } = this.props
      getProductsByMovieCate({
        limit,
        page,
        idCategory: idMovieCat,
      });
      this.getStartEndDocuments();
    });
  };

  renderPageButtons = () => {
    const { pages, page, isNextBtnShow } = this.state;
    if (pages.length > 1) {
      return (
        <>
          {pages.map((eachButton) => (
            <li
              key={eachButton.pageNumber}
              className={
                page === eachButton.pageNumber
                  ? 'paginae_button active'
                  : 'paginate_button'}>
              <a
                className="paga-link"
                name="currentPage"
                href="#"
                onClick={() => this.handleChoosePage(eachButton.pageNumber)}>
                {eachButton.pageNumber}
              </a>
            </li>
          ))}
          <li className="paginate_button">
            <a
              className={
                isNextBtnShow === true ? 'paga-link' : 'paga-link_hidden'
              }
              name="currentPage"
              href="#"
              onClick={() => this.handleChoosePage(-1)}
            >
              {'>>'}
            </a>
          </li>
        </>
      );
    }
  };

  render() {
    const { productList, similarProductList, start, end } = this.state;
    const { products, isLoaded, totalDocuments } = this.props
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
                <div>Hiển thị từ{' '} {start}  đến {totalDocuments < end ? totalDocuments : end} trong  {totalDocuments} kết quả</div>
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
                    {isLoaded && products.map((item, index) => {
                      return <ShowingProduct key={index} item={item} />;
                    })}
                  </div>
                </div>
              </div>
              <div className="col-sm-7"
                style={{ width: '100%', display: 'flex', padding: 0 }}>
                <div style={{ marginLeft: 'auto' }} className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                  <ul className="pagination">
                    {this.renderPageButtons()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div >

            <div className="rec-product-wrapper">
              <h3>
                SẢN PHẨM KHÁC TRONG CÙNG PHIM
              </h3>
              <Slider style={{ width: '106%', paddingTop: 0 }} {...settings} >
                {productList.map((item, index) => {
                  return <RecProduct key={index} />;
                })}
              </Slider>
            </div>
            <div className="rec-product-wrapper">
              <h3>
                SẢN PHẨM KHÁC TƯƠNG TỰ
              </h3>
              <Slider style={{ width: '106%', paddingTop: 0 }} {...settings} >
                {productList.map((item, index) => {
                  return <RecProduct key={index} />;
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

ProductList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  getProductsByMovieCate: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getProductsByMovieCate })(ProductList);
