import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import { getStockHisByProductVar } from "../../../state/actions/stockHistoryActions";
import StockHistoryRow from "./StockHistoryRow";
import "./modal.css";

const mapStateToProps = (state) => ({
  history: state.history,
  userToken: state.authUser.token,
  user: state.authUser.user,
  details: state.modal.details,
  totalDocuments: state.stockHis.totalDocuments,
  stockHises: state.stockHis.stockHises,
  isLoaded: state.stockHis.isLoaded,
  permissions: state.auth.permissions,
});

class ModalStockHistory extends Component {
  state = {
    sort: [{ value: 5 }, { value: 10 }, { value: 20 }],
    limit: 5,
    page: 1,
    pages: [],
    start: 1,
    end: 5,
    query: "",
    isNextBtnShow: true,
    cancelReason: "",
  };

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return year + "-" + month + "-" + dt;
  };

  componentDidMount() {
    const { limit, page, query } = this.state;
    const { idProductVar } = this.props.details;
    this.props.getStockHisByProductVar({
      limit,
      page,
      query,
      idProductVar,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isLoaded } = this.props;
    if (isLoaded == true && this.state.pages == prevState.pages) {
      this.getPages();
    }
  }

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
    const { idProductVar } = this.props.details;
    this.props.getStockHisByProductVar({
      limit,
      page,
      query,
      idProductVar,
    });
    this.getPages();
    this.getStartEndDocuments();
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
      const { idProductVar } = this.props.details;
      this.props.getStockHisByProductVar({
        limit,
        page,
        query,
        idProductVar,
      });
      this.getStartEndDocuments();
    });
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
                href="javascript:void(0);"
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
              href="javascript:void(0)"
              onClick={() => this.handleChoosePage(-1)}
            >
              {">>"}
            </a>
          </li>
        </>
      );
    }
  };
  renderStockHises = () => {
    const { start, page, limit } = this.state;
    const { stockHises, isLoaded } = this.props;

    return !isLoaded ? (
      <tr>
        <td>
          <Loader></Loader>
        </td>
      </tr>
    ) : (
      stockHises.map((eachStockHis, index) => (
        <StockHistoryRow
          key={eachStockHis.id}
          stockHis={eachStockHis}
          index={index + start - 1}
          pages={{ limit, page, idProductVar: eachStockHis.idProductVar }}
        />
      ))
    );
  };

  render() {
    const { totalDocuments, details, permissions } = this.props;
    const { start, end, page, limit, query } = this.state;
    return (
      <div className="modal-wrapper">
        <div
          style={{
            background: "#fff",
            padding: "15px 10px 0px 5px",
            width: "650px",
            marginTop: "55px",
          }}
          className="login-box"
        >
          <button
            onClick={() => this.props.showModal({ show: false })}
            style={{ float: "right", marginTop: "-10px" }}
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            ×
          </button>
          <div className="stock-modal">
            <h3 className="login-box-msg">Lịch sử nhập kho</h3>
            <div className="col-md-4">
              {permissions.includes("createStockAmount") && (
                <button
                  style={{ marginBottom: "5px" }}
                  className="btn btn-info"
                  onClick={() => {
                    this.props.showModal({
                      show: true,
                      modalName: "modalUpdateQty",
                      details: {
                        pages: {
                          page,
                          limit,
                          idProductVar: details.idProductVar
                            ? details.idProductVar
                            : details.pages.idProductVar,
                        },
                      },
                    });
                  }}
                >
                  Nhập kho
                </button>
              )}
            </div>
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
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
                                <label>
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
                              className="table table-bordered table-striped"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "5%" }}>#</th>
                                  <th style={{ width: "10%" }}>Số lượng</th>
                                  <th style={{ width: "10%" }}>Đơn giá</th>
                                  <th style={{ width: "10%" }}>Người nhập</th>
                                  {(permissions.includes("editStockAmount") ||
                                    permissions.includes(
                                      "deleteStockAmount"
                                    )) && (
                                    <th style={{ width: "10%" }}>Thao tác</th>
                                  )}
                                </tr>
                              </thead>

                              <tbody>{this.renderStockHises()}</tbody>

                              <tfoot></tfoot>
                            </table>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            {totalDocuments == 0 ? (
                              <div
                                className="dataTables_info"
                                id="example1_info"
                                role="status"
                                aria-live="polite"
                              >
                                Không có dữ liệu
                              </div>
                            ) : (
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
                            )}
                          </div>
                          <div className="col-sm-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="example1_paginate"
                            >
                              <ul
                                className="pagination"
                                style={{
                                  float: "right",
                                  margin: 0,
                                  padding: 0,
                                }}
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
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  pushHistory,
  showModal,
  getStockHisByProductVar,
})(ModalStockHistory);
