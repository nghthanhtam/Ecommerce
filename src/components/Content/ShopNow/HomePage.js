import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../../assets/css/home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMovieCates } from "../../../state/actions/movieCateActions";
import { getTrendingProducts } from "../../../state/actions/productActions";
import { showModal } from "../../../state/actions/modalActions";
import Category from "./Category/Category";
import TitlePane from "./TitlePane/TitlePane";
import Keyword from "./Product/Keyword";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ShowingProduct from "./Product/ShowingProduct";
import { getProductsByFilters } from "../../../state/actions/productActions";

const mapStateToProps = (state) => ({
  movieCates: state.movieCate.movieCates,
  isLoadedMovieCates: state.movieCate.isLoaded,
  show: state.modal.show,
  modalName: state.modal.modalName,
  isAuthenticated: state.authUser.isAuthenticated,
  isProductsLoaded: state.product.isLoaded,
  products: state.product.products,
  history: state.history.history,
  isTrendingProductsLoaded: state.product.isTrendingProductsLoaded,
  trendingProducts: state.product.trendingProducts,
});

class HomePage extends React.Component {
  state = {
    productList: [1, 2, 3, 4, 5, 6, 7, 8],
    keywords: [
      { color: "kw-blue", value: "Wonder Woman" },
      { color: "kw-violet", value: "giày" },
      { color: "kw-red", value: "Tom & Jerry" },
      { color: "kw-green", value: "Wanda" },
      { color: "kw-blue", value: "mô hình" },
      { color: "kw-violet", value: "tiểu thuyết" },
      { color: "kw-red", value: "súng" },
      { color: "kw-green", value: "Wanda Vision" },
    ],
    header: "header",
    picLink: "./img/blue.png",
    section: "section-blue",
    left: 0,
    isOpen: false,
  };

  componentDidMount() {
    const {
      getMovieCates,
      getProductsByFilters,
      getTrendingProducts,
    } = this.props;
    getMovieCates({ limit: 1000, page: 1, query: "" });
    getProductsByFilters({
      limit: 10,
      page: 1,
      arrayFilter: [{ name: "idCategory", value: 1 }],
    });
    getTrendingProducts();

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        picLink:
          prevState.picLink == "./img/red.png"
            ? "./img/blue.png"
            : prevState.picLink == "./img/blue.png"
            ? "./img/black.png"
            : "./img/red.png",
        section:
          prevState.section == "section-red"
            ? "section-blue"
            : prevState.section == "section-blue"
            ? "section-black"
            : "section-red",
      }));
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAuthenticated, showModal, show } = this.props;
    if (isAuthenticated && show) showModal({ show: false });
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
    const { keywords } = this.state;
    const {
      movieCates,
      isLoadedMovieCates,
      products,
      isProductsLoaded,
      isTrendingProductsLoaded,
      trendingProducts,
    } = this.props;

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
      slidesToShow: 6,
      slidesToScroll: 4,
      className: "slider",
    };

    return (
      <Fragment>
        <Header />
        {isLoadedMovieCates ? (
          <Fragment>
            <div
              style={{
                zIndex: 10,
                marginBottom: "280px",
                position: "relative",
                backgroundColor: "#f0f0f0",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Slider {...settings}>
                <div>
                  <div className={this.state.section}>
                    <div className="user-content">
                      <div className="textBox">
                        <h2>
                          Tại sao không? <br />
                          <span>Shop Now</span>{" "}
                        </h2>
                        <p>
                          ShopNow sẽ không ngừng mang lại những điều bất ngờ đến
                          cuộc sống hằng ngày của các tín đồ phim ảnh với mức
                          giá vô cùng phải chăng và đa dạng các sự lựa chọn đến
                          từ các nhà bán uy tín. ShopNow mang sứ mệnh như 1 nơi
                          lưu giữ, phát triển và truyền lửa đến tất cả mọi người
                          với những vật dụng mang màu sắc của nhân vật phim ảnh
                          mà bạn yêu thích.
                        </p>
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
                  <div className={this.state.section}>
                    <div className="user-content">
                      <div className="textBox">
                        <h2>
                          Tại sao không? <br />
                          <span>Shop Now</span>{" "}
                        </h2>
                        <p>
                          ShopNow sẽ không ngừng mang lại những điều bất ngờ đến
                          cuộc sống hằng ngày của các tín đồ phim ảnh với mức
                          giá vô cùng phải chăng và đa dạng các sự lựa chọn đến
                          từ các nhà bán uy tín. ShopNow mang sứ mệnh như 1 nơi
                          lưu giữ, phát triển và truyền lửa đến tất cả mọi người
                          với những vật dụng mang màu sắc của nhân vật phim ảnh
                          mà bạn yêu thích.
                        </p>
                        <Link className="item" to="/">
                          Tham quan các cửa hàng
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

              <TitlePane title="Danh mục thể loại phim  " isNotShop={true} />
              <div className="list-wrapper">
                <div className="cate-grid">
                  {isLoadedMovieCates &&
                    movieCates.map((cate, index) => {
                      return <Category key={index} cate={cate} />;
                    })}
                </div>
              </div>

              {isProductsLoaded && (
                <>
                  <TitlePane title="Tham quan các cửa hàng" />
                  <div className="list-wrapper">
                    <div className="grid-home">
                      {products.map((item, index) => {
                        return <ShowingProduct key={index} item={item} />;
                      })}
                    </div>
                  </div>
                </>
              )}

              {isTrendingProductsLoaded && trendingProducts.length > 0 && (
                <>
                  <TitlePane title="Sản phẩm từ phim đang HOT" />
                  <div className="list-wrapper">
                    <div className="grid-home">
                      {trendingProducts.map((item, index) => {
                        return <ShowingProduct key={index} item={item} />;
                      })}
                    </div>
                  </div>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="container-kw">
                  <div className="title-kw">TỪ KHÓA HOT</div>
                  <div className="sliderwrapper">
                    <Slider
                      style={{
                        width: "1240px",
                        height: "160px",
                      }}
                      {...settingsKW}
                    >
                      {keywords.map((item, index) => {
                        return <Keyword key={index} item={item} />;
                      })}
                    </Slider>
                  </div>
                </div>
              </div>

              {/* <div className="container-for-you">
                <div className="title-for-you">ONLY FOR YOU</div>
                <div className="list-wrapper">
                  <div className="grid-home">
                    {productList.map((item, index) => {
                      return <Product key={index} />;
                    })}
                  </div>
                </div>
              </div> */}

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
                  <div
                    className="cart-btn"
                    onClick={() => this.props.history.push("/shopnow/register")}
                  >
                    <i className="fa fa-handshake-o"></i>BE OUR PARTNER
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  getMovieCates: PropTypes.func.isRequired,
  movieCates: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {
  getMovieCates,
  showModal,
  getProductsByFilters,
  getTrendingProducts,
})(HomePage);
