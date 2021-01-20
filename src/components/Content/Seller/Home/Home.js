import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import "./home.css";
import { getOrdersByShop } from "../../../../state/actions/orderActions";
import { getLogSellers } from "../../../../state/actions/logSellerActions";
import OrderRowHome from "../Order/OrderRowHome";

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  isLoaded: state.order.isLoaded,
  totalDocuments: state.order.totalDocuments,
  idShop: state.auth.role.idShop,
  sellerLogs: state.logSeller.sellerLogs,
  isLogSellerLoaded: state.logSeller.isLoaded,
});

class Home extends Component {
  state = {
    sort: [{ value: 5 }, { value: 10 }, { value: 20 }],
    limit: 5,
    page: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
    start: 1,
    end: 5,
    isNextBtnShow: true,
  };

  componentDidMount = () => {
    const { limit, page, query } = this.state;
    const { idShop, getOrdersByShop, getLogSellers } = this.props;
    getOrdersByShop({ limit, page, query, idShop, done: false });
    getLogSellers({ limit, page, query, idShop });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isLoaded } = this.props;
    if (isLoaded == true && this.state.pages == prevState.pages) {
      this.getPages();
    }
  }

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();
    let hour =
      newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
    let minutes =
      newDate.getMinutes() < 10
        ? `0${newDate.getMinutes()}`
        : newDate.getMinutes();
    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year + " " + hour + ":" + minutes;
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

  rerenderPage = () => {
    const { limit, page, query } = this.state;
    const { idShop, getOrdersByShop } = this.props;
    getOrdersByShop({ limit, page, query, idShop });
    this.getPages();
    this.getStartEndDocuments();
  };

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

  handleChoosePage = (e) => {
    if (e === "...") return;
    const { totalDocuments, idShop, getOrdersByShops } = this.props;
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
      let idShop = 1;
      getOrdersByShops({
        limit,
        page,
        query,
        idShop,
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
                  : "paginate_button "
              }
            >
              <a
                className="paga-link"
                name="page"
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

  getPages = () => {
    const { limit, query } = this.state;
    const { totalDocuments } = this.props;
    if (totalDocuments == 0) return;

    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

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

  renderOrders = () => {
    const { orders, isLoaded } = this.props,
      { start } = this.state;
    return !isLoaded ? (
      <tr>
        <td>
          <Loader></Loader>
        </td>
      </tr>
    ) : (
      orders.map((order, index) => (
        <OrderRowHome key={index} order={order} index={index + start - 1} />
      ))
    );
  };

  renderSelect = () => {
    const { sort, limit } = this.state;
    return (
      <select
        onChange={this.handleOnChange}
        name="limit"
        aria-controls="example1"
        style={{ margin: "0px 5px" }}
        className="form-control input-sm"
        value={limit}
      >
        {sort.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
  };

  render() {
    const {
      isLoaded,
      isLogSellerLoaded,
      totalDocuments,
      sellerLogs,
    } = this.props;
    const { start, end, query } = this.state;
    return (
      <Fragment>
        {!isLoaded && !isLogSellerLoaded ? (
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
                      <a href="/seller/product" className="small-box-footer">
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
                      <a href="/seller/order" className="small-box-footer">
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
                      <a href="/seller/salereport" className="small-box-footer">
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
                      <a href="/seller/employee" className="small-box-footer">
                        Xem chi tiết <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                </div>
                {/* /.row */}
                {/* Main row */}
                <div className="row-flex">
                  {/* Left col */}
                  <section className="content" style={{ flex: 1 }}>
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
                              Danh sách đơn hàng cần xử lý
                            </h3>
                          </div>
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
                                      {this.renderSelect()}
                                      kết quả
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-sm-12">
                                <table
                                  id="example1"
                                  className="table table-bordered"
                                >
                                  <thead className="order-header">
                                    <tr>
                                      <th
                                        style={{
                                          width: "5%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Mã đơn hàng
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Khách hàng
                                      </th>

                                      <th
                                        style={{
                                          width: "5%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Số điện thoại
                                      </th>
                                      <th
                                        style={{
                                          width: "15%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Địa chỉ giao hàng
                                      </th>
                                      <th
                                        style={{
                                          width: "10%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Tổng giá trị
                                      </th>
                                      <th
                                        style={{
                                          width: "10%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Tình trạng
                                      </th>
                                      <th
                                        style={{
                                          width: "10%",
                                          fontFamily: "Saira, sans-serif",
                                        }}
                                      >
                                        Thao tác
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>{this.renderOrders()}</tbody>
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
                                  Hiển thị{" "}
                                  {query == ""
                                    ? start +
                                      " đến " +
                                      (totalDocuments < end
                                        ? totalDocuments
                                        : end) +
                                      " trong "
                                    : ""}{" "}
                                  {totalDocuments} kết quả
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
                    style={{
                      margin: "15px -25px 0 0",
                      fontSize: "12px",
                      overflow: "auto",
                      flex: 0.3,
                    }}
                  >
                    {sellerLogs.map((log) => {
                      return (
                        <div className="log-row">
                          <div>{this.convertDate(log.createdAt)}</div>
                          <div className="log-timeline">
                            <div className="log-line"></div>
                            <div className="log-round"></div>
                            <div className="log-line"></div>
                          </div>
                          <div style={{ flex: 1 }}>{log.actionDetail}</div>
                        </div>
                      );
                    })}
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
  getOrdersByShop: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getOrdersByShop, getLogSellers })(
  Home
);
