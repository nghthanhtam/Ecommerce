import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import "./home.css";

import { getPurchases } from "../../../../state/actions/purchaseActions";
import PurchaseRow from "../Order/APurchaseRow";

const mapStateToProps = (state) => ({
  purchases: state.purchase.purchases,
  isLoaded: state.purchase.isLoaded,
  totalDocuments: state.purchase.totalDocuments,
});

class AHome extends Component {
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
    const { getPurchases } = this.props;
    getPurchases({ limit, page, query, status: "warning" });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isLoaded } = this.props;
    if (isLoaded == true && this.state.pages == prevState.pages) {
      this.getPages();
    }
  }

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
    const { getPurchases } = this.props;
    getPurchases({ limit, page, query, status: "warning" });
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
    const { totalDocuments, getPurchases } = this.props;
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
      getPurchases({
        limit,
        page,
        query,
        query,
        status: "warning",
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

  renderPurchases = () => {
    const { purchases, isLoaded } = this.props,
      { start } = this.state;
    return !isLoaded ? (
      <tr>
        <td>
          <Loader></Loader>
        </td>
      </tr>
    ) : (
      purchases.map((purchase, index) => (
        <PurchaseRow
          key={purchase.id}
          purchase={purchase}
          index={index + start - 1}
        />
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
    const { isLoaded, totalDocuments } = this.props;
    const { start, end, query, isNextBtnShow } = this.state;
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
                      <a href="./purchase" className="small-box-footer">
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
                                  <thead className="purchase-header">
                                    <tr>
                                      <th>Mã đơn tổng</th>
                                      <th>Người nhận</th>
                                      <th>Số điện thoại</th>
                                      <th>Địa chỉ</th>
                                      <th>Ngày đặt</th>
                                      <th>Tình trạng</th>
                                      <th>Thao tác</th>
                                    </tr>
                                  </thead>
                                  <tbody>{this.renderPurchases()}</tbody>
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
                    <div className="log-row">
                      <div>08:58:51, 22/10/2020</div>
                      <div className="log-timeline">
                        <div className="log-line"></div>
                        <div className="log-round"></div>
                        <div className="log-line"></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        Nhân viên 001 chỉnh sửa sản phẩm 004
                      </div>
                    </div>
                    <div className="log-row">
                      <div>08:58:51, 22/10/2020</div>
                      <div className="log-timeline">
                        <div className="log-line"></div>
                        <div className="log-round"></div>
                        <div className="log-line"></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        Nhân viên 001 chỉnh sửa sản phẩm 004 dfffffffff
                        ffffffffff fffffffff fffffffffs sfdf
                      </div>
                    </div>
                    <div className="log-row">
                      <div>08:58:51, 22/10/2020</div>
                      <div className="log-timeline">
                        <div className="log-line"></div>
                        <div className="log-round"></div>
                        <div className="log-line"></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        Nhân viên 001 chỉnh sửa sản phẩm 004 dfffffffff
                        ffffffffff fffffffff fffffffffs sfdf
                      </div>
                    </div>
                    <div className="log-row">
                      <div>08:58:51, 22/10/2020</div>
                      <div className="log-timeline">
                        <div className="log-line"></div>
                        <div className="log-round"></div>
                        <div className="log-line"></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        Nhân viên 001 chỉnh sửa sản phẩm 004 dfffffffff
                        ffffffffff fffffffff fffffffffs sfdf
                      </div>
                    </div>
                    <div className="log-row">
                      <div>08:58:51, 22/10/2020</div>
                      <div className="log-timeline">
                        <div className="log-line"></div>
                        <div className="log-round"></div>
                        <div className="log-line"></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        Nhân viên 001 chỉnh sửa sản phẩm 004
                      </div>
                    </div>
                    <div className="log-row">
                      <div>08:58:51, 22/10/2020</div>
                      <div className="log-timeline">
                        <div className="log-line"></div>
                        <div className="log-round"></div>
                        <div className="log-line"></div>
                      </div>
                      <div style={{ flex: 1 }}>
                        Nhân viên 001 chỉnh sửa sản phẩm 004
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
AHome.propTypes = {
  getPurchases: PropTypes.func.isRequired,
  purchases: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getPurchases })(AHome);
