import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { CloudinaryContext } from "cloudinary-react";
import { pushHistory } from "../../../../state/actions/historyActions";
import { updateProductVar } from "../../../../state/actions/productVarActions";
import qs from "qs";
import request from "superagent";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    token: state.auth.token,
  };
};

class ProductVarEdit extends Component {
  static contextType = CloudinaryContext.contextType;
  state = {
    id: "",
    name: "",
    SKU: "",
    marketPrice: 0,
    price: 0,
    status: "",
    arrImages: [],
    statuses: [
      { label: "Đang chờ duyệt", value: "pending" },
      { label: "Đang kinh doanh", value: "active" },
      { label: "Ngừng kinh doanh", value: "inactive" },
    ],
  };

  componentDidMount() {
    const id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
      .id;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/${id}`,
        this.tokenConfig(this.props.token)
      )
      .then((response) => {
        let {
          id,
          name,
          SKU,
          marketPrice,
          price,
          status,
          Images,
        } = response.data;
        this.setState({
          id,
          name,
          SKU,
          marketPrice,
          price,
          status,
          arrImages: Images,
        });
      })
      .catch((er) => console.log(er.response));
  }

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

  handleChangeSelect = (selectedItem, { name }) => {
    this.setState({ [name]: selectedItem.value });
  };

  handleFileSelect = (e) => {
    const validateFile = (file) => {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/x-icon",
      ];
      if (validTypes.indexOf(file.type) === -1) {
        return false;
      }
      return true;
    };

    const url =
      `https://api.cloudinary.com/v1_1/` + process.env.CLOUD_NAME + `/upload`;

    let files = e.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          const fileName = files[i].name;
          request
            .post(url)
            .field("upload_preset", "ml_default")
            .field("file", files[i])
            .field("multiple", true)
            .field("api_key", "444253177844458")
            .field(
              "tags",
              fileName ? `myphotoalbum,${fileName}` : "myphotoalbum"
            )
            .field("context", fileName ? `photo=${fileName}` : "")
            .end((error, response) => {
              if (response) {
                this.setState(
                  (prepState) => ({
                    arrImages: [
                      ...prepState.arrImages,
                      {
                        ...files[i],
                        url: response.body.url,
                        public_id: response.body.public_id,
                      },
                    ],
                  }),
                  () => console.log(this.state.arrImages)
                );
              }
            });
        } else {
          files[i]["invalid"] = true;
          this.setState({ errorMessage: "Định dạng tệp không phù hợp" });
        }
      }
    }
  };

  handleSubmit = (e) => {
    const { id, name, SKU, marketPrice, price, status } = this.state;
    e.preventDefault();

    const newProductVar = {
      id,
      name,
      SKU,
      marketPrice,
      price,
      status,
    };
    this.props.updateProductVar(newProductVar);
    //Quay về trang chính
    this.props.history.push("/product");
  };

  handleCancel = (e) => {
    this.props.history.push("/product");
  };

  oncheckboxChange = (id) => {
    this.setState(
      (prepState) => {
        let arrImages = [...prepState.arrImages];
        arrImages.map((image) => {
          if (image.id == id) image.isMain = true;
          else image.isMain = false;
        });
        return {
          arrImages,
        };
      },
      () => console.log(this.state.arrImages)
    );
  };

  render() {
    const {
      id,
      name,
      SKU,
      marketPrice,
      price,
      status,
      arrImages,
      statuses,
    } = this.state;
    return (
      <Fragment>
        {/* {!id ? (
          <Loader></Loader>
        ) : ( */}
        <div>
          <section className="content-header">
            <ol className="breadcrumb">
              <li>
                <a href="fake_url">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="fake_url">Sản phẩm</a>
              </li>
              <li>
                <a href="fake_url">Chỉnh sửa</a>
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
                          type="text"
                          placeholder="Loading..."
                          className="form-control"
                          value={id}
                          disabled
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="SKU">SKU</label>
                        <input
                          className="form-control"
                          name="SKU"
                          type="text"
                          placeholder="Loading..."
                          className="form-control"
                          value={SKU}
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
                        <label htmlFor="marketPrice">Giá niêm yết</label>
                        <input
                          className="form-control"
                          name="marketPrice"
                          type="number"
                          placeholder="Loading..."
                          className="form-control"
                          value={marketPrice}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Giá bán</label>
                        <input
                          className="form-control"
                          name="price"
                          type="number"
                          placeholder="Loading..."
                          className="form-control"
                          value={price}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Tình trạng</label>
                        <Select
                          name="status"
                          onChange={this.handleChangeSelect}
                          isSearchable={true}
                          options={statuses}
                          placeholder="Loading ..."
                          value={statuses.filter(
                            (option) => option.value === status
                          )}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputFile">Hình ảnh</label>
                        <input
                          type="file"
                          id="exampleInputFile"
                          onChange={this.handleFileSelect}
                        />
                      </div>
                      <div className="sku-grid">
                        {arrImages.length > 0 &&
                          arrImages.map((photo, index) => {
                            return (
                              <label
                                key={index}
                                htmlFor={photo}
                                className="skuproduct-card"
                              >
                                <img
                                  style={{ width: "100%", height: "90%" }}
                                  className="product-pic"
                                  src={photo.url}
                                  alt="sản phẩm"
                                />
                                <div className="product-info">
                                  <input
                                    className="color-checked"
                                    type="checkbox"
                                    checked={photo.isMain}
                                    onChange={() =>
                                      this.oncheckboxChange(photo.id)
                                    }
                                  />
                                </div>
                              </label>
                            );
                          })}
                        {/* <div className="upload-area">
                          <i className="fa fa-upload fa-3x" />
                          <p className="upload-text">Kéo và thả ảnh vào để tải ảnh lên</p>
                          {errorMessage}
                        </div> */}
                      </div>
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
                      <button type="submit" className="btn btn-info pull-right">
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* )} */}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, { pushHistory, updateProductVar })(
  ProductVarEdit
);
