import React, { Component, Fragment } from "react";
import EmployeeModal from "./EmployeeModal";
import EmployeeRow from "./EmployeeRow";
import { connect } from "react-redux";
import { getEmployees } from "../../../../actions/employeeActions";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";

const mapStateToProps = (state) => ({
  employees: state.employee.employees,
  isLoaded: state.employee.isLoaded,
});

class Employee extends Component {
  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
  };

  resetState = () => {
    this.setState({ select: "5", currentPage: 1, query: "" });
  };
  componentDidMount() {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();
    this.getPages();
    this.props.getEmployees({ select, currentPage, query });
  }

  getTotalDocuments = () => {
    const { query } = this.state;

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

  handleOnChange = (e) => {
    console.log(typeof e.target.name + " " + e.target.name);
    e.persist();
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (e.target.name === "query") {
        this.setState({ currentPage: 1 }, () => {
          this.rerenderPage();
        });
      } else {
        this.rerenderPage();
      }
    });
  };

  rerenderPage = () => {
    const { select, currentPage, query } = this.state;
    this.props.getEmployees({ select, currentPage, query });
    this.getPages();
    this.getTotalDocuments();
  };

  renderEmployees = () => {
    const { employees } = this.props;
    return employees.map((eachEmployee, index) => (
      <EmployeeRow
        history={this.props.history}
        key={eachEmployee._id}
        employee={eachEmployee}
        index={index}
      />
    ));
  };
  handleChoosePage = (e) => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getEmployees({ select, currentPage, query });
    });
  };

  renderSelect = () => {
    const { sort, select } = this.state;
    return (
      <select
        onChange={this.handleOnChange}
        name="select"
        aria-controls="example1"
        style={{ margin: "0px 5px" }}
        className="form-control input-sm"
        value={select}
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

  render() {
    const { select, totalDocuments } = this.state;
    const { isLoaded } = this.props;
    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
          <Fragment>
            {/* Content Header (Page header) */}
            <section className="content-header">
              <h1>
                Nhân viên
                {/* <small>Preview</small> */}
              </h1>
              <ol className="breadcrumb">
                <li>
                  <a href="fake_url">
                    <i className="fa fa-dashboard" /> Trang chủ
                  </a>
                </li>
                <li>
                  <a href="fake_url">Nhân viên</a>
                </li>
              </ol>
            </section>
            {/* Main content */}
            <section className="content">
              <div className="row">
                {/* left column */}
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header" style={{ marginTop: "5px" }}>
                      <div style={{ paddingLeft: "5px" }} className="col-md-8">
                        <h3 className="box-title">Quản lý nhân viên</h3>
                      </div>

                      <div className="col-md-4">
                        <EmployeeModal />
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
                                <label>
                                  Hiển thị
                                  {this.renderSelect()}
                                  kết quả
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div
                                id="example1_filter"
                                className="dataTables_filter"
                              >
                                <label style={{ float: "right" }}>
                                  Tìm kiếm:
                                  <input
                                    type="search"
                                    name="query"
                                    style={{ margin: "0px 5px" }}
                                    className="form-control input-sm"
                                    placeholder="Nhập từ khóa... "
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
                                  <th style={{ width: "10%" }}>#</th>
                                  <th style={{ width: "20%" }}>
                                    Tên tài khoản
                                  </th>
                                  <th style={{ width: "20%" }}>Vai trò</th>
                                  <th style={{ width: "20%" }}>Trạng thái</th>
                                  <th style={{ width: "30%" }}>Hành động</th>
                                </tr>
                              </thead>
                              <tbody>{this.renderEmployees()}</tbody>
                              <tfoot>
                                <tr>
                                  <th>#</th>
                                  <th>Tên tài khoản</th>
                                  <th>Vai trò</th>
                                  <th>Trạng thái</th>
                                  <th>Hành động</th>
                                </tr>
                              </tfoot>
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
                              Hiển thị 1 đến {select} trong {totalDocuments} kết
                              quả
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
              </div>
            </section>
            {/* /.content */}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Employee.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getEmployees })(Employee);