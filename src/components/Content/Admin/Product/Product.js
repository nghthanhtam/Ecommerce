import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../../../actions/categoryActions";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";
import Select from "react-select";
import ProductModal from "./ProductModal";

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  isLoaded: state.category.isLoaded,
});

class Product extends Component {
  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
    rows: [],
    isPriceBoardHidden: false,
  };

  resetState = () => {
    this.setState({ select: "5", currentPage: 1, query: "" });
  };
  componentDidMount() {}

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

  onsaveProp = (obj) => {
    this.setState((prepState) => ({ rows: [...prepState.rows, obj] }));
  };

  render() {
    const { select, rows } = this.state;

    return (
      <Fragment>
        <Fragment>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Đăng ký sản phẩm mới
              {/* <small>Preview</small> */}
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="fake_url">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="fake_url">Sản phẩm</a>
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
                    <div class="form-group">
                      <label for="exampleInputEmail1">Tên sản phẩm</label>
                      <input
                        className="form-control"
                        id="name"
                        placeholder="Nhập tên sản phẩm ..."
                      />
                    </div>
                    <div class="form-group">
                      <label>Danh mục</label>
                      <select class="form-control">
                        <option>option 1</option>
                        <option>option 2</option>
                        <option>option 3</option>
                        <option>option 4</option>
                        <option>option 5</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Thương hiệu</label>
                      <input
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Nhập tên sản phẩm ..."
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">
                        Sản phẩm có nhiều lựa chọn theo màu sắc, kích cỡ,...?
                      </label>
                      <ProductModal onsaveProp={this.onsaveProp} />
                    </div>
                    <div className="tag-box">
                      <div className="prop-tag">
                        <div>Màu</div>
                        <div onClick={this.removeProp} className="tag-close">
                          ×
                        </div>
                      </div>
                      <div className="prop-tag">
                        <div>Kích cỡ</div>
                        <div>×</div>
                      </div>
                    </div>

                    <section className="content">
                      <div className="row">
                        {/* left column */}
                        <div className="col-md-121">
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
                                        <button
                                          type="button"
                                          id="btnAdd"
                                          style={{ float: "left" }}
                                          className="btn btn-primary"
                                          data-toggle="modal"
                                          onClick={this.addRow}
                                        >
                                          + Thêm dòng
                                        </button>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div
                                        id="example1_filter"
                                        className="dataTables_filter"
                                      ></div>
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
                                          {rows.map((item, index) => (
                                            <th style={{ width: "15%" }}>
                                              {item.name}
                                            </th>
                                          ))}

                                          <th style={{ width: "15%" }}>
                                            Tên sản phẩm
                                          </th>
                                          <th style={{ width: "15%" }}>
                                            Mã sản phẩm
                                          </th>
                                          <th style={{ width: "15%" }}>
                                            Giá niêm yết
                                          </th>
                                          <th style={{ width: "15%" }}>
                                            Giá bán
                                          </th>
                                          <th style={{ width: "2%" }}></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          {rows.map((item, index) => (
                                            <td bgcolor="#FFFFFF">
                                              <Select
                                                styles={{
                                                  control: (base, state) => ({
                                                    ...base,
                                                    borderColor: "transparent",
                                                  }),
                                                }}
                                                options={item.list}
                                              />
                                            </td>
                                          ))}

                                          <td
                                            onBlur={(e) => this.handleClick(e)}
                                            id="used-qty"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                            contentEditable="true"
                                          ></td>
                                          <td
                                            onBlur={(e) => this.handleClick(e)}
                                            id="used-qty"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                            contentEditable="true"
                                          ></td>

                                          <td
                                            onBlur={(e) => this.handleClick(e)}
                                            id="used-qty"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                            contentEditable="true"
                                          ></td>
                                          <td
                                            onBlur={(e) => this.handleClick(e)}
                                            id="used-qty"
                                            bgcolor="#FFFFFF"
                                            style={inputField}
                                            contentEditable="true"
                                          ></td>
                                          <td bgcolor="#FFFFFF">
                                            <div
                                              style={{
                                                cursor: "pointer",
                                                float: "right",
                                              }}
                                              onClick={() => this.removeItem()}
                                              className="fa fa-trash"
                                            ></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
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
                  {/* /.box-header */}
                  <div className="box-body"></div>
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
        </Fragment>
      </Fragment>
    );
  }
}

// Category.propTypes = {
//   getCategories: PropTypes.func.isRequired,
//   categories: PropTypes.array.isRequired,
//   isLoaded: PropTypes.bool.isRequired,
// };

// export default connect(mapStateToProps, { getCategories })(Product);
export default Product;
const inputField = {
  "&:focus": {
    outline: "none",
  },
};
