import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/product.css";
import Loader from "react-loader";

import ShowingProduct from "../Product/ShowingProduct";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProductsByIdShop,
  sortProducts,
} from "../../../../state/actions/productActions";
import { getShopById } from "../../../../state/actions/shopActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  products: state.product.products,
  shop: state.shop.shop,
  isLoaded: state.product.isLoaded,
  isShopLoaded: state.shop.isLoaded,
  totalDocuments: state.product.totalDocuments,
});

class Shop extends React.Component {
  state = {
    header: "header",
    picLink: "./img/blue.png",
    section: "section-blue",
    left: 0,

    limit: 1000,
    page: 1,
    start: 1,
    end: 8,
    query: "",
    pages: [],
    isNextBtnShow: true,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const { getProductsByIdShop, getShopById } = this.props;
    const { limit, page, query } = this.state;
    if (this.props.match) {
      const { idShop } = this.props.match.params;
      getProductsByIdShop({
        limit,
        page,
        query,
        idShop,
        arrayStatus: ["accepted"],
      });
      getShopById(idShop);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { totalDocuments, isLoaded } = this.props;
    if (isLoaded == true && this.state.pages == prevState.pages) {
      this.getPages();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getStartEndDocuments() {
    const { limit, page } = this.state;
    const { totalDocuments } = this.props;

    let pages = Math.floor(totalDocuments / limit),
      remainder = totalDocuments % limit;
    if (remainder !== 0) pages += 1;

    this.setState({ start: (page - 1) * limit + 1 }, () => {
      let end;
      if (Math.floor(totalDocuments / limit) + 1 == page)
        end = (page - 1) * limit + (totalDocuments % limit);
      else end = page * limit;
      this.setState({ end: end });
    });
  }

  rerenderPage = () => {
    const { limit, page, query } = this.state;
    this.props.getProductsByIdShop({
      limit,
      page,
      query,
      idShop: 1,
      arrayStatus: ["accepted"],
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
        { pageNumber: "..." },
        { pageNumber: newArray.length },
      ];
    }
    this.setState({ pages: newArray });
  };

  handleOnChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (e.target.name === "query") {
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
      this.setState({ header: "header1" });
    } else {
      this.setState({ header: "header" });
    }
    this.setState({
      left: (-window.scrollY * 0.5).toString() + "px",
    });
  };

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

  handleChoosePage = (e) => {
    if (e === "...") return;
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
      const { limit, page, query } = this.state;
      const { getProductsByIdShop } = this.props;
      getProductsByIdShop({
        limit,
        page,
        query,
        idShop: 1,
        arrayStatus: ["accepted"],
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
                  ? "paginae_button active"
                  : "paginate_button"
              }
            >
              <a
                className="paga-link"
                name="currentPage"
                href="#"
                onClick={() => this.handleChoosePage(eachButton.pageNumber)}
              >
                {eachButton.pageNumber}
              </a>
            </li>
          ))}
          <li className="paginate_button">
            <a
              className={
                isNextBtnShow === true ? "paga-link" : "paga-link_hidden"
              }
              name="currentPage"
              href="#"
              onClick={() => this.handleChoosePage(-1)}
            >
              {">>"}
            </a>
          </li>
        </>
      );
    }
  };

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  selectFilter = (e) => {
    const { value } = e.target;
    this.props.sortProducts(value);
  };

  render() {
    const { start, end } = this.state;
    const {
      products,
      isLoaded,
      totalDocuments,
      isShopLoaded,
      shop,
    } = this.props;

    return (
      <div>
        <Header />
        <div
          style={{
            zIndex: 10,
            marginBottom: "300px",
            position: "relative",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div className="nohome-section" />
          <div className="container1">
            <div
              style={{
                display: "flex",
                padding: "40px",
                justifyContent: "center",
              }}
            >
              <div className="shop-profile">
                <div className="shop-pic">
                  <img src="./img/shop.png"></img>
                </div>
                <div className="shop-infor">
                  {isShopLoaded && (
                    <>
                      <div className="shop-name">
                        <div>Cửa hàng:</div>
                        <div style={{ fontWeight: "500", marginLeft: "5px" }}>
                          {shop.name}
                        </div>
                      </div>
                      <div style={{ color: "grey" }}>
                        Thành viên từ {this.convertDate(shop.createdAt)}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="column-flex">
                <div className="filter-pane">
                  <div className="ui action input" style={{ width: "500px" }}>
                    <input
                      type="text"
                      name="query"
                      placeholder="Tìm kiếm sản phẩm của shop..."
                      onChange={this.handleOnChange}
                    />
                    <button className="ui icon button">
                      <i className="search icon"></i>
                    </button>
                  </div>
                  <div className="row-flex-center">
                    <div style={{ marginRight: "10px" }}>Sort By</div>
                    <div>
                      <select
                        className="ui dropdown"
                        onChange={this.selectFilter}
                      >
                        <option value="des">Giá giảm dần</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="latest">Hàng mới</option>
                        <option value="bestsold">Bán chạy</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="list-wrapper">
                    {isLoaded && products.length > 0 && (
                      <div className="grid">
                        {products.map((item, index) => {
                          return <ShowingProduct key={index} item={item} />;
                        })}
                      </div>
                    )}
                    {isLoaded && products.length == 0 && (
                      <div
                        className="grid"
                        style={{ width: "932px", height: "350px" }}
                      >
                        Không tìm thấy sản phẩm nào
                      </div>
                    )}
                    {!isLoaded && (
                      <div
                        className="grid"
                        style={{ width: "932px", height: "350px" }}
                      >
                        Chờ tí nhé! Hệ thống đang xử lý!
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="col-sm-7"
                  style={{ width: "100%", display: "flex", padding: 0 }}
                >
                  <div
                    style={{ marginLeft: "auto" }}
                    className="dataTables_paginate paging_simple_numbers"
                    id="example1_paginate"
                  >
                    <ul className="pagination">{this.renderPageButtons()}</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Shop.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  getProductsByIdShop: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {
  getProductsByIdShop,
  getShopById,
  sortProducts,
})(Shop);
