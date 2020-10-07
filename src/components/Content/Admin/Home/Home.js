import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import axios from "axios";

import { getProducts } from "../../../../actions/productActions";
import ProductRow from "../Product/ProductRow";

const mapStateToProps = (state) => ({
  products: state.product.products,
  isLoaded: state.product.isLoaded,
});

class Home extends Component {
  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
  };

  componentDidMount = () => {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();
    this.getPages();
    this.props.getProducts({ select, currentPage, query });
  };
  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getProducts({ select, currentPage, query });
      this.getPages();
      this.getTotalDocuments();
    });
  };

  getTotalDocuments = () => {
    const { query } = this.state;
    console.log(query);
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/count/${newQuery}`
      )
      .then((response) => {
        this.setState({ totalDocuments: response.data });
      })
      .catch((er) => {
        console.log(er.response);
      });
  };
  handleChoosePage = (e) => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getProducts({ select, currentPage, query });
    });
  };
  renderPageButtons = () => {
    const { pages, currentPage } = this.state;

    return pages.map((eachButton) => (
      <li
        key={eachButton.pageNumber}
        className={
          currentPage === eachButton.pageNumber
            ? "paginae_button active"
            : "paginate_button "
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
    ));
  };

  getPages = () => {
    const { select, query } = this.state;
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/count/${newQuery}`
      )
      .then((response) => {
        console.log("aaaaaaaaa");
        let pages = Math.floor(response.data / select);
        let remainder = response.data % select;
        let newArray = [];
        if (remainder !== 0) pages += 1;

        for (let i = 0; i < pages; i++) {
          newArray.push({ pageNumber: i + 1 });
        }

        this.setState({ pages: newArray });
      })
      .catch((er) => {
        console.log(er.response);
      });
  };
  renderProducts = () => {
    const { products } = this.props;
    return products.map((eachPro, index) => (
      <ProductRow
        history={this.props.history}
        key={eachPro._id}
        product={eachPro}
        index={index}
      />
    ));
  };
  render() {
    const { isLoaded } = this.props;
    const { select, totalDocuments } = this.state;
    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
          <React.Fragment>
            <div>
              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>Dashboard</h1>
                <ol className="breadcrumb">
                  <li>
                    <a href="xd">
                      <i className="fa fa-dashboard" /> Home
                    </a>
                  </li>
                  <li className="active">Dashboard</li>
                </ol>
              </section>
              {/* Main content */}
              <section className="content">
                {/* Small boxes (Stat box) */}
                <div className="row">
                  <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-aqua">
                      <div className="inner">
                        <h3>20</h3>
                        <p>Sản phẩm đang bán</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag" />
                      </div>
                      <a href="./order" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  {/* ./col */}
                  {/* ./col */}
                  <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-red">
                      <div className="inner">
                        <h3>65</h3>
                        <p>Đơn hàng đang xử lý</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-pie-graph" />
                      </div>
                      <a href="xd" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  {/* ./col */}
                  <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-green">
                      <div className="inner">
                        <h3>
                          250000<sup style={{ fontSize: 20 }}>VND</sup>
                        </h3>
                        <p>Doanh thu hôm nay</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>
                      <a href="xd" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  {/* ./col */}
                  <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-yellow">
                      <div className="inner">
                        <h3>20</h3>
                        <p>Nhân viên</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person-add" />
                      </div>
                      <a href="./employee" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                </div>
                {/* /.row */}
                {/* Main row */}
                <div className="row-flex">
                  {/* Left col */}
                  <section className="content" style={{ flex: 3 }}>
                    <div className="row">
                      {/* left column */}

                      <div className="box">
                        <div
                          className="box-header"
                          style={{ marginTop: "5px" }}
                        >
                          <div
                            style={{ paddingLeft: "0px" }}
                            className="col-md-8"
                          >
                            <h3 className="box-title">
                              Hoạt động của nhân viên
                            </h3>
                          </div>
                          {/* <div className="col-md-4">
                        <ProductModal />
                      </div> */}
                        </div>
                        {/* /.box-header */}
                        <div className="box-body">
                          <div
                            id="example1_wrapper"
                            className="dataTables_wrapper form-inline dt-bootstrap"
                          >
                            <div className="row">
                              <div>
                                <div className="col-sm-6">
                                  <div
                                    className="dataTables_length"
                                    id="example1_length"
                                  >
                                    <label
                                      style={{
                                        fontFamily: "Montserrat, sans-serif",
                                      }}
                                    >
                                      Hiển thị
                                      <select
                                        onChange={this.handleOnChange}
                                        name="select"
                                        aria-controls="example1"
                                        style={{ margin: "0px 5px" }}
                                        className="form-control input-sm"
                                        value={this.state.select}
                                      >
                                        {this.state.sort.map((option) => (
                                          <option
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.value}
                                          </option>
                                        ))}
                                      </select>
                                      kết quả
                                    </label>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div
                                    id="example1_filter"
                                    className="dataTables_filter"
                                  >
                                    <label
                                      style={{
                                        float: "right",
                                        fontFamily: "Saira, sans-serif",
                                      }}
                                    >
                                      Tìm kiếm
                                      <input
                                        type="search"
                                        name="query"
                                        style={{ margin: "0px 5px" }}
                                        className="form-control input-sm"
                                        placeholder="Nhập từ khóa...  "
                                        aria-controls="example1"
                                        onChange={this.handleOnChange}
                                        value={this.state.query}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-sm-12">
                                <table
                                  id="example1"
                                  className="table table-bordered table-striped"
                                >
                                  <thead>
                                    <tr>
                                      <th style={{ width: "5%" }}>#</th>
                                      <th
                                        style={{
                                          width: "20%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Tên sản phẩm
                                      </th>
                                      <th
                                        style={{
                                          width: "20%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        SKU
                                      </th>
                                      <th
                                        style={{
                                          width: "20%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Đơn giá
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Số lượng tồn
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>{this.renderProducts()}</tbody>
                                  <tfoot></tfoot>
                                </table>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-5">
                                <div
                                  className="dataTables_info"
                                  id="example1_info"
                                  role="status"
                                  aria-live="polite"
                                >
                                  Hiển thị 1 đến {select} trong {totalDocuments}{" "}
                                  mục
                                </div>
                              </div>
                              <div className="col-sm-7">
                                <div
                                  className="dataTables_paginate paging_simple_numbers"
                                  id="example1_paginate"
                                >
                                  <ul
                                    className="pagination"
                                    style={{ float: "right" }}
                                  >
                                    {this.renderPageButtons()}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*/.col (left) */}
                        </div>
                        {/* /.row */}
                      </div>
                    </div>
                  </section>
                  {/* /.Left col */}
                  {/* right col (We are only adding the ID to make the widgets sortable)*/}
                  <div
                    className="col-md-4"
                    style={{ margin: "12px -15px 0 0px", flex: 1 }}
                  >
                    <div className="progress-group">
                      <span className="progress-text">Đơn hàng hủy</span>
                      <span className="progress-number">
                        <b>160</b>/200
                      </span>

                      <div className="progress sm">
                        <div
                          className="progress-bar progress-bar-aqua"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="progress-group">
                      <span className="progress-text">Đơn hàng thành công</span>
                      <span className="progress-number">
                        <b>310</b>/400
                      </span>

                      <div className="progress sm">
                        <div
                          className="progress-bar progress-bar-red"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="progress-group">
                      <span className="progress-text">
                        Sản phẩm đang kinh doanh
                      </span>
                      <span className="progress-number">
                        <b>480</b>/800
                      </span>

                      <div className="progress sm">
                        <div
                          className="progress-bar progress-bar-green"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="progress-group">
                      <span className="progress-text">
                        Sản phẩm ngừng kinh doanh
                      </span>
                      <span className="progress-number">
                        <b>250</b>/500
                      </span>

                      <div className="progress sm">
                        <div
                          className="progress-bar progress-bar-yellow"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <span className="progress-text">
                        Số lượng đánh giá, góp ý
                      </span>
                      <span className="progress-number">
                        <b>310</b>/400
                      </span>

                      <div className="progress sm">
                        <div
                          className="progress-bar progress-bar-aqua"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <span className="progress-text">
                        Số lượng đánh giá, góp ý
                      </span>
                      <span className="progress-number">
                        <b>310</b>/400
                      </span>

                      <div className="progress sm">
                        <div
                          className="progress-bar progress-bar-red"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* right col */}
                </div>
                {/* /.row (main row) */}
              </section>
              {/* /.content */}
            </div>
          </React.Fragment>
        )}
      </Fragment>
    );
  }
}
Home.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getProducts })(Home);
