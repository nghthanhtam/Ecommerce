import React, { Fragment } from "react";
import Loader from "react-loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/product.css";
import Rating from "@material-ui/lab/Rating";
import ShowingProduct from "./ShowingProduct";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductsByFilters } from "../../../../state/actions/productActions";
import { getProductCates } from "../../../../state/actions/productCateActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  products: state.product.products,
  productCates: state.productCate.productCates,
  isLoaded: state.product.isLoaded,
  isProCateLoaded: state.productCate.isLoaded,
  totalDocuments: state.product.totalDocuments,
});

class ProductList extends React.Component {
  state = {
    productList: [1, 2, 3, 4, 5, 6, 7],
    skeletonList: [1, 2, 3, 4],
    header: "header",
    picLink: "./img/blue.png",
    section: "section-blue",
    left: 0,

    idMovieCat: "",
    limit: 8,
    page: 1,
    start: 1,
    end: 8,
    pages: [],
    isNextBtnShow: true,

    arrayFilter: [],
    maxRange: "",
    minRange: "",
    idProductCategory: "",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const { getProductsByFilters, getProductCates } = this.props;
    const { limit, page } = this.state;

    //get productlist by movieCate
    if (this.props.match) {
      const { idMovieCat } = this.props.match.params;

      this.setState({ idMovieCat });
      getProductsByFilters({
        limit,
        page,
        arrayFilter: [{ name: "idCategory", value: idMovieCat }],
      });
      getProductCates({ limit: 1000, page: 1 });
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
    const { limit, page, idMovieCat } = this.state;
    this.props.getProductsByFilters({
      limit,
      page,
      arrayFilter: [{ name: "idCategory", value: idMovieCat }],
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
      const { limit, page, idMovieCat } = this.state;
      const { getProductsByFilters } = this.props;
      getProductsByFilters({
        limit,
        page,
        arrayFilter: [{ name: "idCategory", value: idMovieCat }],
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

  onChangeFilter = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterProducts = (filterCate, star, productCate) => {
    const { maxRange, minRange, idProductCategory, limit, page } = this.state;
    let arrayFilter = [...this.state.arrayFilter];

    //if (idProductCategory == '') arrayFilter.push({ name: 'idProductCategory', value: idProductCategory, description: productCate.description })

    if (filterCate == "idProductCategory" || filterCate == "rating") {
      if (arrayFilter.some((e) => e.name === filterCate)) {
        arrayFilter.map((f) => {
          if (f.name == filterCate) {
            f["value"] = star ? star : productCate.id;
            f["description"] = star ? star + " sao" : productCate.description;
          }
        });
      } else {
        arrayFilter.push({
          name: filterCate,
          value: star ? star : productCate.id,
          description: star ? star + " sao" : productCate.description,
        });
      }
    } else if (filterCate == "price") {
      //check nếu minRange đã dc chọn, thay bằng cái mới
      if (arrayFilter.some((e) => e.name === "minRange")) {
        arrayFilter.map((f) => {
          if (f.name == "minRange") f["value"] = minRange;
        });
      } else {
        if (minRange !== "")
          arrayFilter.push({ name: "minRange", value: minRange });
      }

      //check nếu maxRange đã dc chọn, thay bằng cái mới
      if (arrayFilter.some((e) => e.name === "maxRange")) {
        arrayFilter.map((f) => {
          if (f.name == "maxRange") f["value"] = maxRange;
        });
      } else {
        if (maxRange !== "")
          arrayFilter.push({ name: "maxRange", value: maxRange });
      }
    }
    if (arrayFilter.length > 0) {
      this.setState({ arrayFilter });
      this.props.getProductsByFilters({ limit, page, arrayFilter });
    }
  };

  renderCritName = (filter) => {
    if (filter.name == "idProductCategory" || filter.name == "rating")
      return filter.description;
    if (filter.name == "minRange") {
      return "> " + filter.value;
    }
    if (filter.name == "maxRange") return "< " + filter.value;
  };

  clearFilter = (f) => {
    const { limit, page } = this.state;
    this.setState(
      (state) => {
        let arrayFilter = [...state.arrayFilter];
        arrayFilter.map((item) => {
          if (f.name == item.name) {
            item.value = "";
          }
        });
        return {
          arrayFilter,
        };
      },
      () =>
        this.props.getProductsByFilters({
          limit,
          page,
          arrayFilter: this.state.arrayFilter,
        })
    );
  };

  render() {
    const {
      skeletonList,
      productList,
      start,
      end,
      minRange,
      maxRange,
      arrayFilter,
    } = this.state;
    const {
      products,
      isLoaded,
      isProCateLoaded,
      productCates,
      totalDocuments,
    } = this.props;
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 5,
      slidesToScroll: 4,
      className: "slider",
    };
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
          {isLoaded && isProCateLoaded ? (
            <Fragment>
              <div className="nohome-section" />
              <div className="container1">
                <div
                  style={{
                    display: "flex",
                    padding: "40px",
                    justifyContent: "center",
                  }}
                >
                  <div className="filter-list">
                    <div className="ui action input">
                      <input type="text" placeholder="Search..." />
                      <button className="ui icon button">
                        <i className="search icon"></i>
                      </button>
                    </div>

                    {/* <h1 className="title-filter">Movie Types</h1>
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
                </div> */}

                    <h3 className="title-filter">ĐÁNH GIÁ</h3>
                    {[5, 4, 3].map((star, index) => {
                      return (
                        <div
                          key={index}
                          className="star-wrapper"
                          onClick={() => this.filterProducts("rating", star)}
                        >
                          <Rating
                            name="size-small"
                            value={star}
                            size="small"
                            readOnly
                          />
                          <div style={{ marginLeft: "5px" }}>Từ {star} sao</div>
                        </div>
                      );
                    })}

                    <h3 className="title-filter">GIÁ TIỀN</h3>
                    <div className="price-filter">
                      <input
                        className="price-inp"
                        type="number"
                        name="minRange"
                        placeholder="$ Min"
                        value={minRange}
                        onChange={this.onChangeFilter}
                      />
                      <div
                        style={{
                          width: "5px",
                          borderTop: "2px solid #c8c8c8",
                          margin: "5px",
                        }}
                      ></div>
                      <input
                        style={{
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          padding: "12px",
                          width: "90px",
                          height: "10px",
                          boxSizing: "border-box",
                        }}
                        type="number"
                        name="maxRange"
                        placeholder="$ Max"
                        value={maxRange}
                        onChange={this.onChangeFilter}
                      />
                    </div>

                    <div
                      className="btn-go"
                      onClick={() => this.filterProducts("price")}
                      style={{
                        width: "60px",
                        height: "30px",
                        border: "1px solid #ccc",
                        textDecoration: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Chọn
                    </div>

                    {/* <h1 className="title-filter">Avalability</h1>
                <div className="ui checkbox">
                  <input type="checkbox" className="example" />
                  <label>Include Out of Stock</label>
                </div> */}

                    <h2 className="title-filter">LOẠI SẢN PHẨM</h2>
                    <div className="productcat-grid">
                      {productCates.map((item, index) => {
                        return (
                          <button
                            key={index}
                            onClick={() =>
                              this.filterProducts(
                                "idProductCategory",
                                null,
                                item
                              )
                            }
                            className="tag"
                          >
                            {item.description}
                          </button>
                        );
                      })}
                    </div>

                    {/* <div className="row-flex">
                      <button className="tag">Captain</button>
                      <button className="tag">Glass</button>
                    </div> */}
                    {/* <div>
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
                    </div> */}
                  </div>
                  <div className="column-flex">
                    {arrayFilter.length > 0 && (
                      <>
                        Tiêu chí đang chọn:
                        <div className="row-flex">
                          {arrayFilter.map((f, index) => {
                            return (
                              <div
                                key={index}
                                style={{ padding: "10px 10px 10px 0" }}
                              >
                                {f.value !== "" && (
                                  <div className="criteria">
                                    <div className="cri-name">
                                      {this.renderCritName(f)}{" "}
                                    </div>
                                    <span
                                      onClick={() => this.clearFilter(f)}
                                      aria-hidden="true"
                                    >
                                      ×
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    <div className="filter-pane">
                      <div>
                        Hiển thị từ {start} đến{" "}
                        {totalDocuments < end ? totalDocuments : end} trong{" "}
                        {totalDocuments} kết quả
                      </div>
                      <div className="row-flex-center">
                        <div style={{ marginRight: "10px" }}>Sort By</div>
                        <div>
                          <select className="ui dropdown">
                            <option value="des">Giá giảm dần</option>
                            <option value="asc">Giá tăng dần</option>
                            <option value="bestsold">Bán chạy</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="list-wrapper">
                        <div className="grid">
                          {isLoaded &&
                            products.length > 0 &&
                            products.map((item, index) => {
                              return <ShowingProduct key={index} item={item} />;
                            })}
                        </div>
                        {(!isLoaded || (isLoaded && products.length == 0)) && (
                          <div className="grid" style={{ width: "900px" }}>
                            <p>Không tìm thấy sản phẩm nào</p>
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
                        <ul className="pagination">
                          {this.renderPageButtons()}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <Loader />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

ProductList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  getProductsByFilters: PropTypes.func.isRequired,
  getProductCates: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  productCates: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {
  getProductsByFilters,
  getProductCates,
})(ProductList);
