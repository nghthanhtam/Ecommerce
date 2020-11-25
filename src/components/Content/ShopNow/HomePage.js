import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "../../../assets/css/home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMovieCates } from '../../../state/actions/movieCateActions';
import { showModal } from '../../../state/actions/modalActions';
import Category from "./Category/Category";
import TitlePane from "./TitlePane/TitlePane";
import Product from "./Product/Product";
import Keyword from "./Product/Keyword";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Login from "./Auth/Login"

const mapStateToProps = (state) => ({
  movieCates: state.movieCate.movieCates,
  isLoadedMovieCate: state.movieCate.isLoaded,
  show: state.modal.show,
  modalName: state.modal.modalName,
  isAuthenticated: state.authUser.isAuthenticated,
});

class HomePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      categoryList: [
        {
          name: "ACTION",
          description: "You want an Avenger?",
          picLink: "./img/action-movie.png",
          color: "cate-pink",
        },
        {
          name: "ROMANCE",
          description: "Let's head on the 'Titanic'!",
          picLink: "./img/romance-movie.png",
          color: "cate-orange",
        },
        {
          name: "HORROR",
          description: "Annabelle will scare you!",
          picLink: "./img/horror-movie.png",
          color: "cate-pastel",
        },
        {
          name: "SCI-FI",
          description: "Get ready on Interception?",
          picLink: "./img/scifi-movie.png",
          color: "cate-pink",
        },
        {
          name: "COMEDY",
          description: "Laugh with High Kick?",
          picLink: "./img/comedy-movie.png",
          color: "cate-orange",
        },
        {
          name: "FAMILY",
          description: "Others",
          picLink: "./img/family-movie.png",
          color: "cate-pastel",
        },
        {
          name: "KIDS",
          description: "Others",
          picLink: "./img/stuff.png",
          color: "cate-pink",
        },
      ],
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
      keywords: [
        { color: "kw-blue" },
        { color: "kw-violet" },
        { color: "kw-red" },
        { color: "kw-green" },
        { color: "kw-blue" },
        { color: "kw-violet" },
        { color: "kw-red" },
        { color: "kw-green" },
      ],
      header: "header",
      picLink: "./img/blue.png",
      section: "section-blue",
      left: 0,
      isOpen: false
    };

    this.changePic = this.changePic.bind(this);
  }
  componentDidMount() {
    const { getMovieCates } = this.props
    getMovieCates({ limit: 1000, page: 1, query: '' })
  }

  componentDidUpdate() {
    const { isAuthenticated, showModal } = this.props
    if (isAuthenticated) showModal({ show: false })
  }

  changePic = (e) => {
    if (e.target.alt === "blue") {
      this.setState({ picLink: "./img/blue.png" });
      this.setState({ section: "section-blue" });
    } else if (e.target.alt === "red") {
      this.setState({ picLink: "./img/red.png" });
      this.setState({ section: "section-red" });
    } else {
      this.setState({ picLink: "./img/black.png" });
      this.setState({ section: "section-black" });
    }
  };

  render() {
    const { productList, keywords } = this.state;
    const { movieCates, isLoadedMovieCate, show, modalName } = this.props
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "slides",
    };
    const settingsKW = {
      infinite: true,
      speed: 1000,
      slidesToShow: 7,
      slidesToScroll: 4,
      className: "slider",
    };
    const settingsHis = {
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 3,
      className: "slider",
    };
    return (
      <Fragment>
        {show && modalName == 'login' && (
          <Login />
        )}
        <Header />
        {isLoadedMovieCate ?
          <Fragment>
            <div style={{ zIndex: 10, marginBottom: "300px", position: "relative", backgroundColor: "#f7f7f7" }}>
              <Slider {...settings}>
                <div>
                  <div className={this.state.section}>
                    <div className="user-content">
                      <div className="textBox">
                        <h2>
                          why not <br />
                          <span>Shop Now</span>{" "}
                        </h2>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's
                          standard dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make a
                          type specimen book. It has survived not only five
                          centuries, but also the leap into electronic typesetting,
                          remaining essentially unchanged. It was popularised in the
                          1960s with the release of Letraset sheets containing Lorem
                          Ipsum is simply dummy text of the printing and typesetting
                          industry.
                      </p>
                        <Link className="item" to="/">
                          View all products
                      </Link>
                      </div>
                      <div className="imgBox">
                        <img src={this.state.picLink} alt="blue" />
                      </div>
                    </div>

                    <ul className="thumb">
                      <li>
                        <img
                          className="pepsi"
                          src="./img/blue.png"
                          alt="blue"
                          onClick={this.changePic}
                        />
                      </li>
                      <li>
                        <img
                          className="red"
                          src="./img/red.png"
                          alt="red"
                          onClick={this.changePic}
                        />
                      </li>
                      <li>
                        <img
                          className="pepsi"
                          src="./img/black.png"
                          alt="black"
                          onClick={this.changePic}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="section-red">
                    <div className={this.state.header}>
                      <Link className="logo" to="/home">
                        Logo
                      </Link>
                      <ul>
                        <li>
                          <Link className="item" to="/">
                            Cart
                        </Link>
                        </li>
                        <li>
                          <Link className="item" to="/">
                            Profile
                        </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="user-content">
                      <div className="textBox">
                        <h2>
                          why not <br />
                          <span>Shop Now</span>{" "}
                        </h2>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the industry's
                          standard dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make a
                          type specimen book. It has survived not only five
                          centuries, but also the leap into electronic typesetting,
                          remaining essentially unchanged. It was popularised in the
                          1960s with the release of Letraset sheets containing Lorem
                          Ipsum is simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the 1500s, when an unknown printer
                      </p>
                        <Link className="item" to="/">
                          View all products
                      </Link>
                      </div>
                      <div className="imgBox">
                        <img src={this.state.picLink} alt="blue" />
                      </div>
                    </div>

                    <ul className="thumb">
                      <li>
                        <img
                          className="pepsi"
                          src="./img/blue.png"
                          alt="blue"
                          onClick={this.changePic}
                        />
                      </li>
                      <li>
                        <img
                          className="red"
                          src="./img/red.png"
                          alt="red"
                          onClick={this.changePic}
                        />
                      </li>
                      <li>
                        <img
                          className="pepsi"
                          src="./img/black.png"
                          alt="black"
                          onClick={this.changePic}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </Slider>

              <TitlePane title="MOVIE CATEGORIES" isNotShop={true} />
              <div className="list-wrapper">
                <div className="cate-grid">
                  {movieCates.map((cate, index) => {
                    return <Category key={index} cate={cate} />;
                  })}
                </div>
              </div>

              <TitlePane title="Best Sellers in Septemper" />
              <div className="list-wrapper">
                <div className="grid-home">
                  {productList.map((item, index) => {
                    return <Product key={index} />;
                  })}
                </div>
              </div>

              <TitlePane title="Top Adventure Movie Products" />
              <div className="list-wrapper">
                <div className="grid-home">
                  {productList.map((item, index) => {
                    return <Product key={index} />;
                  })}
                </div>
              </div>

              <div className="container-kw">
                <div className="title-kw">HOT KEYWORDS</div>
                <div className="sliderwrapper">
                  <Slider
                    style={{
                      width: "94%",
                    }}
                    {...settingsKW}
                  >
                    {keywords.map((item, index) => {
                      return <Keyword key={index} item={item} />;
                    })}
                  </Slider>
                </div>
              </div>

              <div className="container-for-you">
                <div className="title-for-you">ONLY FOR YOU</div>
                <div className="list-wrapper">
                  <div className="grid-home">
                    {productList.map((item, index) => {
                      return <Product key={index} />;
                    })}
                  </div>
                </div>
              </div>

              <div className="container-his">
                <div className="title-his">YOUR BROWSING HISTORY</div>
                <div className="sliderwrapper">
                  <Slider
                    style={{
                      width: "94%",
                    }}
                    {...settingsHis}
                  >
                    {productList.map((item, index) => {
                      return <Product key={index} />;
                    })}
                  </Slider>
                </div>
              </div>

              <div className="banner-wrapper">
                <img
                  style={{ width: "900px", zIndex: 13 }}
                  alt="banner"
                  src="./img/banner.png"
                />

                <div className="banner-form">
                  <div className="text-wrapper">
                    <div className="text-stay">STAY</div>
                    <div className="text-wus">WITHUS</div>
                  </div>
                  <div className="cart-btn">
                    <i className="fa fa-shopping-cart"></i> SIGN IN
                </div>
                OR
                <div className="cart-btn">
                    <i className="fa fa-handshake-o"></i>BE OUR PARTNER
                </div>
                </div>
              </div>

              <TitlePane title="Top Adventure Movie Products" />
              <div className="list-wrapper">
                <div className="grid-home">
                  {productList.map((item, index) => {
                    return <Product key={index} />;
                  })}
                </div>
              </div>
            </div>
            <Footer />
          </Fragment> : null}

      </Fragment>
    );
  }
}

HomePage.propTypes = {
  getMovieCates: PropTypes.func.isRequired,
  movieCates: PropTypes.array.isRequired,
};

const ModalContainer = <div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.5)'
}} />

const Modal = <div style={{
  background: '#fff',
  position: 'absolute',
  top: '50px',
  right: 'calc(50% - 100px)',
  border: '1px solid #000',
  padding: '20px',
  minHeight: '200px',
}} />
export default connect(mapStateToProps, { getMovieCates, showModal })(HomePage);
