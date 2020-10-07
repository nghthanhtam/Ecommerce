import React, { Component, Fragment } from "react";

import Loader from "react-loader";
import Select from "react-select";
import ProductModal from "./ProductModal";

class ProductAdd extends Component {
  state = {
    propValueList: [],
    isPriceBoardHidden: true,
    skuproduct: { productId: "", sku: "", price: 0, qty: 0 },
    skuProductList: [{ _id: 0, productId: "", sku: "", price: 0, qty: 0 }],
    productList: [1, 2, 3, 4],
  };

  onsaveProp = (obj) => {
    this.setState({ isPriceBoardHidden: false });
    this.setState((prepState) => ({
      propValueList: [...prepState.propValueList, obj],
    }));
  };

  addRow = () => {
    let { skuproduct } = this.state,
      obj = {};

    obj = Object.assign(skuproduct);

    this.setState((prepState) => ({
      //add obj to list sku product
      skuProductList: [...prepState.skuProductList, obj],
    }));
  };

  onCellNameEdit = (e, index) => {
    let val = e.target.textContent;
    this.setState((state) => {
      let skuProductList = [...state.skuProductList];

      for (var product of skuProductList) {
        if (product._id == index) {
          const newItem = Object.assign(product);
          newItem["quantity"] = product.quantitydb - val;
          newItem["usedqty"] = val;
          newItem["options"] = this.state.options;
          newItem["createAt"] = new Date();

          skuProductList.splice(index, 1); //xoa 1 phan tu o vi tri index
          skuProductList.splice(index, 0, newItem); //chen newItem vao vi tri thu index
        }
      }

      return {
        skuProductList,
      };
    });
  };
  removeItem = (index) => {
    this.setState((prepState) => {
      let skuProductList = [...prepState.skuProductList];
      skuProductList.splice(index, 1);
      return {
        skuProductList,
      };
    });
  };

  render() {
    const { propValueList, skuProductList, productList } = this.state;
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
    const handleFiles = (files) => {
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          this.setState((prepState) => ({
            productList: [...prepState.productList, files[i].name],
          }));
        } else {
          // set error message
        }
      }
    };
    const fileDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length) {
        handleFiles(files);
      }
    };

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

                    <section
                      style={{ marginLeft: "-15px" }}
                      className="content"
                    >
                      <label for="exampleInputEmail1">
                        Điền thông tin giá sản phẩm
                      </label>

                      {/* /.box-header */}
                      <div className="box-body">
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
                                  Thêm dòng
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
                                  <th style={{ width: "2%" }}>#</th>
                                  {propValueList.map((item) => (
                                    <th style={{ width: "15%" }}>
                                      {item.name}
                                    </th>
                                  ))}

                                  <th style={{ width: "15%" }}>Tên sản phẩm</th>
                                  <th style={{ width: "15%" }}>Mã sản phẩm</th>
                                  <th style={{ width: "15%" }}>Giá niêm yết</th>
                                  <th style={{ width: "15%" }}>Giá bán</th>
                                  <th style={{ width: "2%" }}></th>
                                </tr>
                              </thead>

                              <tbody>
                                {skuProductList.map((product, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    {propValueList.map((item) => (
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
                                      onBlur={(e) =>
                                        this.onCellNameEdit(e, index)
                                      }
                                      name="name"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                    ></td>
                                    <td
                                      name="sku"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                    ></td>

                                    <td
                                      name="fakeprice"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                    ></td>
                                    <td
                                      name="price"
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
                                        onClick={() => this.removeItem(index)}
                                        className="fa fa-trash"
                                      ></div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>
                    <label for="exampleInputEmail1">
                      Chọn hình ảnh cho sản phẩm
                    </label>

                    <div className="sku-grid">
                      {productList.map((item, index) => {
                        return (
                          <label for={item} className="skuproduct-card">
                            <img
                              className="product-pic"
                              src="../img/blue.png"
                              alt="product"
                            />
                            <div className="product-info">
                              <input
                                className="color-checked"
                                type="checkbox"
                                id={item}
                              />
                            </div>
                          </label>
                        );
                      })}

                      <div
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                        className="upload-area"
                      >
                        <i className="fa fa-upload fa-3x" />
                        <p className="upload-text">
                          Nhấn hoặc kéo thả ảnh vào để tải ảnh lên
                        </p>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Mô tả sản phẩm (100 kí tự)</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        placeholder="Nhập mô tả ..."
                      ></textarea>
                    </div>
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
export default ProductAdd;
const inputField = {
  "&:focus": {
    outline: "none",
  },
};
