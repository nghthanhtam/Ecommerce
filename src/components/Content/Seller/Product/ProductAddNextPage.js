import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./product.css";
import axios from "axios";
import Loading from "../../ShopNow/Loading/Loading";

const mapStateToProps = (state) => ({
  isLoaded: state.product.isLoaded,
  token: state.auth.token,
});

class ProductAddNextPage extends Component {
  state = {
    selectedFiles: [],
    errorMessage: "",
    propValueList: [],
    isPriceBoardHidden: true,
    variantList: [],
    isTransition: false,
  };

  componentDidMount = () => {
    const { selectedFiles, arrProductVar } = this.props.location;
    if (selectedFiles) this.setState({ selectedFiles });

    //luu arrProductVar thanh 1 state vi phai thay doi selectedfiles cua no
    this.setState({ arrProductVarState: arrProductVar });
  };

  back = () => {
    const { selectedFiles } = this.state;
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
        selectedFiles,
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
    const { selectedFiles } = this.state;
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
    console.log("selectedFiles: ", selectedFiles);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });
    formData.append("arrProductVar", JSON.stringify(arrProductVar));
    formData.append("arrVariants", JSON.stringify(validateArrVariants));
    if (!idProduct) formData.append("product", JSON.stringify(product));

    const config = {
      headers: {
        "Content-Type":
          'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
        Authorization: `Bearer ${this.props.token}`,
      },
    };
    this.setState({ isTransition: true });
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/`,
        formData,
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

  handleCheckPhotos = (e) => {
    console.log(e.target);
  };

  render() {
    const { errorMessage, isTransition } = this.state;
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
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          this.setState(
            (preState) => {
              let arrProductVarState = [...preState.arrProductVarState];
              for (var product of arrProductVarState) {
                if (product.index == index) {
                  product.selectedFiles.push(files[i]);
                }
              }
              return {
                arrProductVarState,
              };
            },
            () => {
              console.log(
                "arrProductVarState: ",
                this.state.arrProductVarState
              );
            }
          );

          files[i].filePath = URL.createObjectURL(files[i]);
          this.setState((prepState) => ({
            selectedFiles: [...prepState.selectedFiles, files[i]],
          }));
        } else {
          files[i]["invalid"] = true;
          this.setState({ errorMessage: "File type not permitted" });
        }
      }
    };
    const fileDrop = (e, index) => {
      console.log(index);
      e.preventDefault();
      const files = e.dataTransfer.files;

      if (files.length) {
        handleFiles(files, index);
      }
    };

    return (
      <Fragment>
        {isTransition && <Loading />}
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
                      3. Hình ảnh được tick là hình đại diện cho mỗi nhóm thuộc
                      tính
                    </span>
                  </div>

                  {arrProductVar.map((product, pindex) => {
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
                          {product.selectedFiles.length > 0 &&
                            product.selectedFiles.map((item, index) => {
                              return (
                                <label
                                  key={index}
                                  htmlFor={item}
                                  className="skuproduct-card"
                                >
                                  <img
                                    style={{ width: "100%", height: "90%" }}
                                    className="product-pic"
                                    src={item.filePath}
                                    alt="product"
                                  />
                                  <div className="product-info">
                                    <input
                                      className="color-checked"
                                      type="checkbox"
                                      id={item}
                                      onChange={this.handleCheckPhotos}
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

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                    >
                      Yêu cầu phê duyệt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /.content */}
      </Fragment>
    );
  }
}

// ProductAddNextPage.propTypes = {
//   getCategories: PropTypes.func.isRequired,
//   categories: PropTypes.array.isRequired,
//   isLoaded: PropTypes.bool.isRequired,
// };

export default connect(mapStateToProps)(ProductAddNextPage);
//export default ProductAddNextPage;
