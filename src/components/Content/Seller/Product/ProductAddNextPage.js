import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./product.css";
import axios from "axios";
import Loading from "../../ShopNow/Loading/Loading";
import request from "superagent";

const mapStateToProps = (state) => ({
  isLoaded: state.product.isLoaded,
  token: state.auth.token,
  history: state.history.history,
});

class ProductAddNextPage extends Component {
  state = {
    images: [],
    errorMessage: "",
    errUploadMsg: "",
    propValueList: [],
    isPriceBoardHidden: true,
    variantList: [],
    isTransition: false,
    isUploading: false,
  };

  componentDidMount = () => {
    const { images, arrProductVar } = this.props.location;
    if (images) this.setState({ images });

    //luu arrProductVar thanh 1 state vi phai thay doi selectedfiles cua no arrProductVar
    this.setState({ arrProductVarState: arrProductVar });
  };

  back = () => {
    const { images } = this.state;
    const {
      arrProductVar,
      arrVariants,
      product,
      details,
      idProduct,
    } = this.props.location;
    this.props.history.push({
      pathname: "/seller/add-product",
      details: {
        idProduct,
        images,
        arrProductVar,
        arrVariants,
        product,
        details,
      },
    });
  };

  upload = () => {
    const {
      arrProductVar,
      arrVariants,
      product,
      idProduct,
    } = this.props.location;
    const { images, arrProductVarState } = this.state;

    let validateArrVariants = [];
    arrVariants.map((variant) => {
      if (!variant.name.__isNew__) {
        let tempArr = [];
        variant.values.map((v) => {
          if (v.__isNew__) {
            tempArr.push(v.value);
          }
        });
        if (tempArr.length > 0) {
          validateArrVariants.push({
            idVariant: variant.name.value,
            values: tempArr,
          });
        }
      } else {
        variant.values = variant.values.map(({ label }) => label);
        validateArrVariants.push({
          name: variant.name.label,
          values: variant.values,
        });
      }
    });

    console.log("arrProductVar: ", arrProductVar);
    console.log("arrVariants: ", validateArrVariants);
    console.log("product: ", product);
    console.log("images: ", images);

    // const formData = new FormData();
    // images.forEach((file) => {
    //   formData.append("photos", file);
    // });
    // formData.append("arrProductVar", JSON.stringify(arrProductVar));
    // formData.append("arrVariants", JSON.stringify(validateArrVariants));
    // if (!idProduct) formData.append("product", JSON.stringify(product));

    const dataInput = {
      arrProductVar: arrProductVarState,
      arrVariants: validateArrVariants,
      product,
    };
    if (idProduct) delete dataInput.product;

    const config = {
      headers: {
        // "Content-Type":
        //   'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
        "Content-type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    };

    this.setState({ isTransition: true });

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/v2/`,
        dataInput,
        config
      )
      .then((response) => {
        console.log("response product add: ", response);
        if (response) {
          this.props.history.push("/seller/product");
          this.setState({ isTransition: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCheckImages = (photoChecked, productVarIndex) => {
    this.setState(
      (preState) => {
        let arrProductVarState = [...preState.arrProductVarState];
        for (var photo of arrProductVarState[productVarIndex].images) {
          if (photo.publicId == photoChecked.publicId) {
            photo.isMain = !photo.isMain;
          }
        }
        return {
          arrProductVarState,
        };
      },
      () => console.log(this.state.arrProductVarState)
    );
  };

  render() {
    const {
      errorMessage,
      isTransition,
      isUploading,
      errUploadMsg,
    } = this.state;
    const { arrProductVar } = this.props.location;
    const dragOver = (e) => {
      e.preventDefault();
    };
    const dragEnter = (e) => {
      e.preventDefault();
    };
    const dragLeave = (e) => {
      e.preventDefault();
    };
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

    const handleFiles = (files, index) => {
      const url =
        `https://api.cloudinary.com/v1_1/` + process.env.CLOUD_NAME + `/upload`;
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          const fileName = files[i].name;
          this.setState({ isUploading: true, errUploadMsg: "" });
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
            .end((error, res) => {
              this.setState({ isUploading: false });
              if (res) {
                this.setState((preState) => {
                  let arrProductVarState = [...preState.arrProductVarState];
                  for (var productvar of arrProductVarState) {
                    if (productvar.index == index) {
                      productvar.images.push({
                        ...files[i],
                        url: res.body.url,
                        publicId: res.body.public_id,
                        isMain: false,
                      });
                    }
                  }
                  return {
                    arrProductVarState,
                  };
                });

                this.setState((prepState) => ({
                  images: [
                    ...prepState.images,
                    {
                      ...files[i],
                      url: res.body.url,
                      publicId: res.body.public_id,
                      isMain: false,
                    },
                  ],
                }));
              } else {
                this.setState({
                  errUploadMsg: "Không thể upload ảnh " + fileName,
                });
              }
            });
        } else {
          files[i]["invalid"] = true;
          this.setState({ errorMessage: "File type not permitted" });
        }
      }
    };

    const fileDrop = (e, index) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length) {
        handleFiles(files, index);
      }
    };

    return (
      <Fragment>
        {!arrProductVar ? (
          <Redirect to="/seller/add-product" />
        ) : (
          <Fragment>
            {isTransition && <Loading />}
            <section className="content-header">
              <h1>Đăng ký sản phẩm mới</h1>
              <ol className="breadcrumb">
                <li>
                  <a href="fake_url">
                    <i className="fa fa-dashboard" /> Trang chủ
                  </a>
                </li>
                <li>
                  <a href="fake_url">Đăng ký sản phẩm mới</a>
                </li>
                <li>
                  <a href="fake_url">Chọn hình ảnh</a>
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
                      <div style={{ marginBottom: "20px" }}>
                        <label>Chọn hình ảnh cho sản phẩm</label>
                        <br />
                        <span>1. Kích thước yêu cầu: 500 x 500</span>
                        <br />
                        <span>
                          2. Hình ảnh phải được xóa nền và không được chứa chữ
                        </span>
                        <br />
                        <span>
                          3. Hình ảnh được tick chọn là hình đại diện cho mỗi
                          thuộc tính
                        </span>
                      </div>

                      {arrProductVar &&
                        arrProductVar.map((product, pindex) => {
                          return (
                            <div key={pindex}>
                              <p
                                style={{
                                  background: "#f5f5f5",
                                  padding: "10px",
                                  fontSize: "16px",
                                  fontWeight: "700",
                                }}
                              >
                                {product.name}
                              </p>
                              <div
                                className="productadd-grid"
                                onDragOver={dragOver}
                                onDragEnter={dragEnter}
                                onDragLeave={dragLeave}
                                onDrop={(e) => fileDrop(e, pindex)}
                              >
                                {product.images.length > 0 &&
                                  product.images.map((item, index) => {
                                    return (
                                      <label
                                        key={index}
                                        htmlFor={item}
                                        className="skuproduct-card"
                                      >
                                        <img
                                          style={{
                                            width: "100%",
                                            height: "90%",
                                          }}
                                          className="product-pic"
                                          src={item.url}
                                          alt="product"
                                        />
                                        <div className="product-info">
                                          <input
                                            className="color-checked"
                                            type="checkbox"
                                            onChange={() =>
                                              this.handleCheckImages(
                                                item,
                                                pindex
                                              )
                                            }
                                            checked={item.isMain}
                                          />
                                        </div>
                                      </label>
                                    );
                                  })}
                                <div className="upload-area">
                                  <i className="fa fa-upload fa-3x" />
                                  <p className="upload-text">
                                    Kéo và thả ảnh vào để tải ảnh lên
                                  </p>
                                  {errorMessage}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ color: "red", marginRight: "5px" }}>
                          {errUploadMsg}
                        </div>
                        <button
                          style={{ width: "100px", marginRight: "5px" }}
                          type="button"
                          className="btn btn-block btn-default"
                          onClick={this.back}
                        >
                          Quay lại
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={this.upload}
                          disabled={isUploading}
                        >
                          Yêu cầu phê duyệt
                        </button>
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
export default connect(mapStateToProps)(ProductAddNextPage);
