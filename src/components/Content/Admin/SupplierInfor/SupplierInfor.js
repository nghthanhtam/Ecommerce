import React, { Component, Fragment } from "react";
import EmployeeModal from "../Employee/EmployeeModal";
import EmployeeRow from "../Employee/EmployeeRow";
import { getEmployees } from "../../../../actions/employeeActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";

import { useFormik } from "formik";
import * as Yup from "yup";

const mapStateToProps = (state) => ({
  employees: state.employee.employees,
  isLoaded: state.employee.isLoaded,
});

class SupplierInfor extends Component {
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

  renderEmployees = () => {
    const { employees } = this.props;
    return employees.map((emp, index) => (
      <EmployeeRow
        history={this.props.history}
        key={emp._id}
        employee={emp}
        index={index}
      />
    ));
  };

  handleOnChange = (e) => {
    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (format.test(this.state.query)) {
      return;
    }
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { select, currentPage, query } = this.state;

      this.props.getEmployees({ select, currentPage, query });
      this.getPages();
      this.getTotalDocuments();
    });
  };

  handleChoosePage = (e) => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getEmployees({ select, currentPage, query });
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

  render() {
    const { select, totalDocuments } = this.state;
    const { isLoaded } = this.props;

    // A custom validation function. This must return an object
    // which keys are symmetrical to our values/initialValues
    const validate = (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length > 50) {
        errors.name = "Must be 50 characters or less";
      }
      if (!values.code) {
        errors.code = "Required";
      } else if (values.code.length > 15) {
        errors.code = "Must be 15 characters or less";
      }
      if (!values.buscode) {
        errors.buscode = "Required";
      } else if (values.buscode.length > 20) {
        errors.buscode = "Must be 20 characters or less";
      }
      if (!values.city) {
        errors.city = "Required";
      } else if (values.city.length > 50) {
        errors.city = "Must be 50 characters or less";
      }
      if (!values.admin) {
        errors.admin = "Required";
      } else if (values.admin.length > 50) {
        errors.admin = "Must be 50 characters or less";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    };

    const SignupForm = () => {
      const formik = useFormik({
        initialValues: {
          name: "",
          code: "",
          email: "",
          buscode: "",
          city: "",
        },
        validate,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });
      return (
        <form onSubmit={formik.handleSubmit} style={{ padding: "5px" }}>
          <div className="row-flex">
            <div style={{ width: "100%", padding: "5px" }}>
              <label htmlFor="name">Tên gian hàng</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}

              <label htmlFor="code">Mã gian hàng</label>
              <input
                className="form-control"
                id="code"
                name="code"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              {formik.errors.code ? (
                <div style={{ color: "red" }}>{formik.errors.code}</div>
              ) : null}

              <label htmlFor="email">Email </label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div style={{ width: "100%", padding: "5px" }}>
              <label htmlFor="buscode">Mã đăng ký kinh doanh</label>
              <input
                className="form-control"
                id="buscode"
                name="buscode"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.buscode}
              />
              {formik.errors.buscode ? (
                <div style={{ color: "red" }}>{formik.errors.buscode}</div>
              ) : null}

              <label htmlFor="city">Tỉnh/Thành phố</label>
              <input
                className="form-control"
                id="city"
                name="city"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {formik.errors.city ? (
                <div style={{ color: "red" }}>{formik.errors.city}</div>
              ) : null}

              <label htmlFor="admin">Người phụ trách</label>
              <input
                className="form-control"
                id="admin"
                name="admin"
                type="admin"
                onChange={formik.handleChange}
                value={formik.values.admin}
              />
              {formik.errors.admin ? (
                <div style={{ color: "red" }}>{formik.errors.admin}</div>
              ) : null}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Cập nhật
          </button>
        </form>
      );
    };
    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
          <Fragment>
            {/* Content Header (Page header) */}
            <section className="content-header">
              <h1>
                Thông tin nhà bán
                {/* <small>Preview</small> */}
              </h1>
              <ol className="breadcrumb">
                <li>
                  <a href="fake_url">
                    <i className="fa fa-dashboard" /> Trang chủ
                  </a>
                </li>
                <li>
                  <a href="fake_url">Thông tin nhà bán</a>
                </li>
              </ol>
            </section>

            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <SignupForm />
                  </div>
                </div>
              </div>
            </section>

            <section className="content" style={{ marginTop: "-30px" }}>
              <div className="col-md-12">
                <div className="row">
                  <div className="box">
                    <div className="box-header" style={{ marginTop: "5px" }}>
                      <div style={{ paddingLeft: "0px" }} className="col-md-8">
                        <h3 className="box-title">Danh sách mã giảm giá</h3>
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
                                    Mã
                                  </th>
                                  <th
                                    style={{
                                      width: "20%",
                                      fontFamily: "Saira, sans-serif",
                                    }}
                                  >
                                    Phần trăm giảm giá
                                  </th>
                                  <th
                                    style={{
                                      width: "20%",
                                      fontFamily: "Saira, sans-serif",
                                    }}
                                  >
                                    Thời hạn giảm giá
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
                              <tbody>{this.renderEmployees()}</tbody>
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
                              Hiển thị 1 đến {select} trong {totalDocuments} mục
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
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

SupplierInfor.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getEmployees })(SupplierInfor);
