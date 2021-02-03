import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";

import { pushHistory } from "../../../../state/actions/historyActions";
import { updateProduct } from "../../../../state/actions/productActions";
import { getProductCates } from "../../../../state/actions/productCateActions";
import { getMovies } from "../../../../state/actions/movieActions";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    token: state.authAdmin.token,
    productCates: state.productCate.productCates,
    movies: state.movie.movies,
    isProductCatesLoaded: state.productCate.isLoaded,
    isMoviesLoaded: state.movie.isLoaded,
  };
};

class ProductInforEdit extends Component {
  state = {
    id: "",
    name: "",
    brand: "",
    idMovie: "",
    idShop: "",
    status: "",
    idProductCat: "",
    description: "",
    Details: [],
    nameObj: {},
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProductCates({ limit: 1000, page: 1, query: "" });
    this.props.getMovies({ limit: 1000, page: 1, query: "" });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${id}`,
        this.tokenConfig(this.props.token)
      )
      .then((r) => {
        let {
          id,
          name,
          brand,
          idMovie,
          idProductCat,
          description,
          idShop,
          status,
          Details,
        } = r.data;
        this.setState(
          {
            id,
            name,
            brand,
            idMovie,
            idShop,
            status,
            idProductCat,
            description,
            Details,
          },
          () => console.log(Details)
        );

        this.setState({
          nameObj: {
            author: "Tác giả",
            publisher: "Nhà xuất bản",
            language: "Ngôn ngữ",
          },
        });
      })
      .catch((er) => console.log(er));
  }

  onChangeSelect = (selectedItem, type) => {
    if (type == "idMovie") this.setState({ idMovie: selectedItem.id });
    if (type == "idProductCat")
      this.setState({ idProductCat: selectedItem.id });
  };

  tokenConfig = (token) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    //Header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDetChange = (e) => {
    const { value, name } = e.target;
    this.setState((prepState) => {
      let Details = [...prepState.Details];
      Details.map((d) => {
        if (d.detail == name) {
          d.value = value;
        }
      });
      return {
        Details,
      };
    });
  };

  handleChangeSelect = (selectedItem, { name }) => {
    this.setState({ [name]: selectedItem.value });
  };

  handleSubmit = (e) => {
    const {
      id,
      name,
      brand,
      idMovie,
      idProductCat,
      description,
      Details,
    } = this.state;
    e.preventDefault();
    let details = {};
    Details.map((d) => {
      details[d.detail] = d.value;
    });
    console.log(details);
    const newProduct = {
      id,
      name,
      brand,
      idMovie,
      idProductCat,
      description,
      details,
    };
    this.props.updateProduct(newProduct);

    //Quay về trang chính
    this.props.history.push("/admin/product");
  };

  handleCancel = (e) => {
    this.props.history.push("/admin/product");
  };

  render() {
    const {
      id,
      name,
      brand,
      idMovie,
      idProductCat,
      description,
      Details,
      nameObj,
    } = this.state;
    const {
      productCates,
      isProductCatesLoaded,
      isMoviesLoaded,
      movies,
    } = this.props;
    return (
      <Fragment>
        {!isProductCatesLoaded || !isMoviesLoaded ? (
          <div>Loading...</div>
        ) : (
          <div>
            <section className="content-header">
              <ol className="breadcrumb">
                <li>
                  <a href="/admin/home">
                    <i className="fa fa-dashboard" /> Trang chủ
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">Thông tin sản phẩm</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Chỉnh sửa</a>
                </li>
              </ol>
            </section>
            {/* Main content */}
            <section
              className="content"
              style={{ width: "165vw", marginTop: "10px" }}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">Cập nhật thông tin sản phẩm</h3>
                    </div>
                    {/* /.box-header */}
                    {/* form start */}
                    <form role="form" onSubmit={this.handleSubmit}>
                      <div className="box-body">
                        <div className="form-group">
                          <label htmlFor="id">ID</label>
                          <input
                            className="form-control"
                            name="id"
                            type="number"
                            placeholder="Loading..."
                            className="form-control"
                            value={id}
                            disabled
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Tên sản phẩm</label>
                          <input
                            className="form-control"
                            name="name"
                            type="text"
                            placeholder="Loading..."
                            className="form-control"
                            value={name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="brand">Thương hiệu</label>
                          <input
                            className="form-control"
                            name="brand"
                            type="text"
                            placeholder="Loading..."
                            className="form-control"
                            value={brand}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="idMovie">Tên phim</label>
                          <Select
                            styles={{
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 3000,
                              }),
                            }}
                            name="idMovie"
                            onChange={(e) => this.onChangeSelect(e, "idMovie")}
                            isSearchable={true}
                            options={movies}
                            placeholder="Loading..."
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            value={movies.filter(
                              (option) => option.id == idMovie
                            )}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="idProductCat">
                            Thể loại sản phẩm
                          </label>
                          <Select
                            styles={{
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 3000,
                              }),
                            }}
                            name="idProductCat"
                            onChange={(e) =>
                              this.onChangeSelect(e, "idProductCat")
                            }
                            isSearchable={true}
                            options={productCates}
                            placeholder="Loading..."
                            getOptionLabel={(option) => option.description}
                            getOptionValue={(option) => option.id}
                            value={productCates.filter(
                              (option) => option.id === idProductCat
                            )}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Mô tả</label>
                          <textarea
                            className="form-control"
                            name="description"
                            type="text"
                            placeholder="Loading..."
                            className="form-control"
                            value={description}
                            onChange={this.handleChange}
                          />
                        </div>
                        {Details.map((d) => {
                          return Object.keys(nameObj).map((item, index) => {
                            return (
                              <Fragment key={index}>
                                {item == d.detail && (
                                  <div className="form-group">
                                    <label htmlFor="idShop">
                                      {nameObj[item]}:
                                    </label>
                                    <input
                                      className="form-control"
                                      name={item}
                                      type="text"
                                      placeholder="Loading..."
                                      className="form-control"
                                      value={d.value}
                                      onChange={this.handleDetChange}
                                    />
                                  </div>
                                )}
                              </Fragment>
                            );
                          });
                        })}
                      </div>
                      {/* /.box-body */}
                      <div className="box-footer">
                        <button
                          type="button"
                          onClick={this.handleCancel}
                          className="btn btn-default"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="btn btn-info pull-right"
                        >
                          Lưu
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, {
  pushHistory,
  updateProduct,
  getProductCates,
  getMovies,
})(ProductInforEdit);
